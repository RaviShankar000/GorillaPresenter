GorillaScript = {
    preprocess(sourceText) {
        offsets = [];
        currentPosition = 0;
        slidecounter = 0;
        // Ensure file starts with a header
        if (!sourceText.startsWith('#')) {
            sourceText = '#\n' + sourceText;
        }
        // Handle line breaks: \\n (but not \\\n) becomes <br />
        // We need to look for \\n that isn't preceded by \
        //  sourceText = sourceText.replace(/(?<!\\)\\\\n/g, '<br />');

        // Split into slides at H1 boundaries (# at start of line)
        const lines = sourceText.split('\n');
        const slides = [];
        let currentTitle = '';
        let currentBody = [];
        let currentComments = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // Check if this is an H1 header (starts with single #, followed by space or end)
            if (line.match(/^#(?:\s|$)/)) {
                // If we have a previous slide, save it
                if (i > 0) {
                    slides.push(GorillaScript.renderSlideData(currentTitle, currentBody.join('\n'), currentComments.join('\n')));
                    slidecounter++;
                    currentComments = [];
                    currentTitle = '';
                    currentBody = [];
                    currentComments = [];
                }
                offsets.push(currentPosition);
                // Start new slide
                currentTitle = line;
                // slideoffset = slideoffset + line.length + 1; // +1 for newline
                currentBody = [];
            } else {
                if ((line.endsWith('\\')) && (!line.endsWith('\\\\'))) {
                    // Line continuation, remove trailing backslash and don't add newline
                    line = line.slice(0, -1) + "<br />";
                    currentPosition = currentPosition - 5; // for <br />
                }
                if (line.startsWith('\\#')) {
                    // Escaped header, treat as normal line
                    currentBody.push(line.substring(1)); // Remove escape character
                } else
                    if (line.startsWith(';')) {
                        // Add to current slide comments
                        currentComments.push(line);
                    } else {
                        currentBody.push(line);
                    }
            }
            currentPosition = currentPosition + line.length + 1; // +1 for newline
        }

        // Don't forget the last slide
        slides.push(GorillaScript.renderSlideData(currentTitle, currentBody.join('\n'), currentComments.join('\n')));
        slidecounter++;
        currentComments = [];
        currentTitle = '';
        currentBody = [];
        currentComments = [];
        for (let i = 0; i < slides.length; i++) {
            slides[i].offset = offsets[i] || 0;
        }
        console.log("Total slides processed:", slidecounter);
        return slides;
    },

    renderSlideData(title, body, comments) {
        trimmedTitle = title.trimStart();
        trimmedBody = body.trimStart();
        trimmedComments = comments.trimStart();
        slide = {
            title: trimmedTitle,
            body: trimmedBody,
            comments: trimmedComments,
            renderedTitle: GorillaMarkdown.mdparse.render(trimmedTitle),
            renderedBody: GorillaMarkdown.mdparse.render(trimmedBody),
            //renderedComments: GorillaMarkdown.mdparse.render(trimmedComments),
            renderedComments: trimmedComments,  // Keep comments as plain text
        }
        return slide;
    },

};