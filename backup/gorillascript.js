/**
 * GorillaScript - A text markup language that renders to HTML
 */

class GorillaScript {
  constructor(options = {}) {
    // Dispatch table for custom command handlers
    this.handlers = options.handlers || {};
    
    // Available CSS classes (for validation)
    this.cssClasses = options.cssClasses || new Set();
    
    // Class stack for nested style commands
    this.classStack = [];
    
    // Line tracking for error messages
    this.currentLine = 1;
    
    // Standard HTML tags (common ones - can be extended)
    this.htmlTags = new Set([
      'p', 'div', 'span', 'a', 'b', 'i', 'u', 'strong', 'em', 'br',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
      'img', 'video', 'audio', 'canvas',
      'form', 'input', 'button', 'select', 'option', 'textarea',
      'code', 'pre', 'blockquote', 'cite',
      'section', 'article', 'header', 'footer', 'nav', 'aside',
      'abbr', 'address', 'bdi', 'bdo', 'caption', 'col', 'colgroup',
      'data', 'datalist', 'del', 'details', 'dfn', 'dialog', 'embed',
      'fieldset', 'figcaption', 'figure', 'hr', 'iframe', 'ins',
      'kbd', 'label', 'legend', 'main', 'map', 'mark', 'meter',
      'noscript', 'object', 'optgroup', 'output', 'param', 'picture',
      'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script',
      'small', 'source', 'sub', 'summary', 'sup', 'svg', 'template',
      'time', 'title', 'track', 'var', 'wbr'
    ]);
  }

  /**
   * Preprocessor: Convert newline-based paragraphs to \p...\ commands
   * Also handles & line continuation and && for literal &
   */
  preprocess(input) {
    const lines = input.split('\n');
    const paragraphs = [];
    let currentParagraph = [];
    let inContinuation = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Handle && (literal &) - temporarily replace with placeholder
      line = line.replace(/&&/g, '\x00');
      
      // Check if line ends with & (line continuation)
      const hasLineContinuation = line.endsWith('&');
      
      // Remove trailing & if present
      if (hasLineContinuation) {
        line = line.slice(0, -1);
      }
      
      // Restore && to &
      line = line.replace(/\x00/g, '&');
      
      // Handle empty lines
      if (line.trim() === '') {
        if (currentParagraph.length > 0) {
          // End current paragraph
          paragraphs.push('\\p ' + currentParagraph.join('') + '\\');
          currentParagraph = [];
          inContinuation = false;
        }
        continue;
      }
      
      // Add line to current paragraph
      currentParagraph.push(line);
      
      // If line had continuation, add <br /> and continue
      if (hasLineContinuation) {
        currentParagraph.push('<br />');
        inContinuation = true;
      } else {
        // No continuation - end paragraph
        paragraphs.push('\\p ' + currentParagraph.join('') + '\\');
        currentParagraph = [];
        inContinuation = false;
      }
    }
    
    // Handle any remaining paragraph
    if (currentParagraph.length > 0) {
      paragraphs.push('\\p ' + currentParagraph.join('') + '\\');
    }
    
    return paragraphs.join('');
  }

  /**
   * Parse attributes from |name|value|name|value| format
   */
  parseAttributes(attrString) {
    if (!attrString || attrString.trim() === '') {
      return {};
    }
    
    const attrs = {};
    let i = 0;
    
    while (i < attrString.length) {
      // Skip leading |
      if (attrString[i] === '|') {
        i++;
      }
      
      // Parse name
      let name = '';
      while (i < attrString.length && attrString[i] !== '|') {
        name += attrString[i];
        i++;
      }
      
      if (i >= attrString.length) break;
      i++; // Skip the | after name
      
      // Parse value (handle || as escaped |)
      let value = '';
      while (i < attrString.length) {
        if (attrString[i] === '|') {
          if (i + 1 < attrString.length && attrString[i + 1] === '|') {
            // Escaped pipe
            value += '|';
            i += 2;
          } else {
            // End of value
            break;
          }
        } else {
          value += attrString[i];
          i++;
        }
      }
      
      if (name.trim()) {
        attrs[name.trim()] = value;
      }
    }
    
    return attrs;
  }

  /**
   * Format attributes as HTML attribute string
   */
  formatAttributes(attrs) {
    const parts = [];
    for (const [name, value] of Object.entries(attrs)) {
      parts.push(`${name}="${value}"`);
    }
    return parts.length > 0 ? ' ' + parts.join(' ') : '';
  }

  /**
   * Check if a string is all HTML tags (for class application logic)
   */
  isAllTags(html) {
    const trimmed = html.trim();
    return trimmed.startsWith('<') && trimmed.endsWith('>');
  }

  /**
   * Apply classes to HTML output
   */
  applyClasses(html, classes) {
    if (classes.length === 0) {
      return html;
    }
    
    const classAttr = ' class="' + classes.join(' ') + '"';
    
    // Check if output is all tags
    if (this.isAllTags(html)) {
      // Apply class to each top-level tag
      return html.replace(/<(\w+)(\s[^>]*)?>/g, (match, tagName, attrs) => {
        return `<${tagName}${attrs || ''}${classAttr}>`;
      });
    } else {
      // Wrap in span
      return `<span${classAttr}>${html}</span>`;
    }
  }

  /**
   * Parse and process a command
   */
  parseCommand(input, startPos) {
    let i = startPos + 1; // Skip the initial backslash
    
    // Parse command name (must be followed by space, |, or \)
    let commandName = '';
    while (i < input.length && input[i] !== ' ' && input[i] !== '\\' && input[i] !== '|') {
      commandName += input[i];
      i++;
    }
    
    // If command name is empty or doesn't match expected pattern, it's not a command
    if (commandName === '' || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(commandName)) {
      return null;
    }
    
    // Must be followed by space, |, or \ for it to be a valid command
    if (i < input.length && input[i] !== ' ' && input[i] !== '|' && input[i] !== '\\') {
      return null;
    }
    
    // Skip one space after command name (if present)
    if (i < input.length && input[i] === ' ') {
      i++;
    }
    
    // Parse attributes
    let attrString = '';
    if (i < input.length && input[i] === '|') {
      while (i < input.length) {
        if (input[i] === '|') {
          if (i + 1 < input.length && input[i + 1] === '|') {
            attrString += '||';
            i += 2;
            continue;
          }
        }
        attrString += input[i];
        i++;
        
        // Check if we've finished attributes (next char is space or not |)
        if (i < input.length && input[i - 1] === '|' && input[i] !== '|') {
          break;
        }
      }
      
      // Skip one space after attributes
      if (i < input.length && input[i] === ' ') {
        i++;
      }
    }
    
    const attrs = this.parseAttributes(attrString);
    
    // Parse text argument (everything until closing \)
    let textArg = '';
    let depth = 1;
    
    while (i < input.length && depth > 0) {
      if (input[i] === '\\') {
        if (i + 1 < input.length && input[i + 1] === '\\') {
          // Escaped backslash
          textArg += '\\';
          i += 2;
        } else if (i + 1 < input.length && /[a-zA-Z]/.test(input[i + 1])) {
          // Possible nested command - check if it's valid
          const peekAhead = i + 1;
          let cmdName = '';
          let j = peekAhead;
          while (j < input.length && /[a-zA-Z0-9]/.test(input[j])) {
            cmdName += input[j];
            j++;
          }
          
          // Check if followed by space, |, or \
          if (j < input.length && (input[j] === ' ' || input[j] === '|' || input[j] === '\\')) {
            // Valid nested command
            const nested = this.parseCommand(input, i);
            if (nested) {
              textArg += nested.html;
              i = nested.endPos;
            } else {
              textArg += input[i];
              i++;
            }
          } else {
            // Not a valid command
            textArg += input[i];
            i++;
          }
        } else {
          // Closing backslash
          depth--;
          if (depth > 0) {
            textArg += input[i];
          }
          i++;
        }
      } else if (input[i] === '&') {
        // Handle && escape sequence
        if (i + 1 < input.length && input[i + 1] === '&') {
          textArg += '&';
          i += 2;
        } else {
          textArg += input[i];
          i++;
        }
      } else {
        textArg += input[i];
        i++;
      }
    }
    
    // Process the text argument recursively
    const processedText = this.processText(textArg);
    
    // Generate HTML based on command type
    let html;
    
    if (this.htmlTags.has(commandName.toLowerCase())) {
      // Standard HTML tag
      const attrStr = this.formatAttributes(attrs);
      const classes = this.classStack.length > 0 ? 
        ' class="' + this.classStack.join(' ') + '"' : '';
      html = `<${commandName}${attrStr}${classes}>${processedText}</${commandName}>`;
    } else if (this.handlers[commandName]) {
      // Custom handler
      if (Object.keys(attrs).length > 0) {
        GorillaPresenter.notify(`Attributes provided for custom command '${commandName}' will be ignored`);
      }
      html = this.handlers[commandName](processedText, attrs);
    } else {
      // Try as CSS class
      if (Object.keys(attrs).length > 0) {
        GorillaPresenter.notify(`Attributes provided for style class '${commandName}' will be ignored`);
      }
      
      if (!this.cssClasses.has(commandName)) {
        this.warn(`Applying class '${commandName}', but it isn't found in the current environment`);
      }
      
      // Push class onto stack
      this.classStack.push(commandName);
      const processedWithClass = this.processText(textArg);
      this.classStack.pop();
      
      // Apply class
      html = this.applyClasses(processedWithClass, [commandName]);
    }
    
    return { html, endPos: i };
  }

  /**
   * Process text, handling commands and escapes
   */
  processText(input) {
    let result = '';
    let i = 0;
    
    while (i < input.length) {
      if (input[i] === '\\') {
        if (i + 1 < input.length && input[i + 1] === '\\') {
          // Escaped backslash
          result += '\\';
          i += 2;
        } else if (i + 1 < input.length && /[a-zA-Z]/.test(input[i + 1])) {
          // Possible command
          const parsed = this.parseCommand(input, i);
          if (parsed) {
            result += parsed.html;
            i = parsed.endPos;
          } else {
            // Not a valid command, treat as literal
            result += input[i];
            i++;
          }
        } else {
          // Just a backslash
          result += input[i];
          i++;
        }
      } else if (input[i] === '&') {
        // Handle && escape sequence
        if (i + 1 < input.length && input[i + 1] === '&') {
          result += '&';
          i += 2;
        } else {
          result += input[i];
          i++;
        }
      } else if (input[i] === '\n') {
        // Track line numbers
        this.currentLine++;
        result += input[i];
        i++;
      } else {
        result += input[i];
        i++;
      }
    }
    
    return result;
  }

  /**
   * Main render function
   */
  render(input) {
    this.currentLine = 1;
    this.classStack = [];
    
    const preprocessed = this.preprocess(input);
    return this.processText(preprocessed);
  }

  /**
   * Emit a warning
   */
  warn(message) {
    const fullMessage = `GorillaScript warning (line ${this.currentLine}): ${message}`;
    if(GorillaPresenter && GorillaPresenter.notify){
      GorillaPresenter.notify(fullMessage);
      return;
    }
    if (typeof console !== 'undefined') {
      console.warn(fullMessage);
    } else if (typeof process !== 'undefined' && process.stderr) {
      process.stderr.write(fullMessage + '\n');
    }
  }

  /**
   * Emit an error and throw
   */
  error(message) {
    const fullMessage = `GorillaScript error (line ${this.currentLine}): ${message}`;
    if(GorillaPresenter && GorillaPresenter.notify){
      GorillaPresenter.notify(fullMessage);
    } 
    else if (typeof console !== 'undefined') {
      console.error(fullMessage);
    } else if (typeof process !== 'undefined' && process.stderr) {
      process.stderr.write(fullMessage + '\n');
    }
    
    throw new Error(fullMessage);
  }
}

// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GorillaScript;
}

if (typeof window !== 'undefined') {
  window.GorillaScript = GorillaScript;
}