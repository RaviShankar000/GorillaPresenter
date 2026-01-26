let GorillaThemeHandler = {
  themes: {},
  headingFontStack: "--didone-font-stack",
  bodyFontStack: "--humanist-font-stack",
  codeFontStack: "--monospace-code-font-stack",
  themeData: "",
  init: async function () {
    await GorillaThemeHandler.setupThemes();
    await GorillaThemeHandler.setupEditorThemes();
    let sampleBody = document.getElementById("gorilla-sample-slide-body");
    let sampleText = sampleBody.innerHTML;
    sampleBody.innerHTML = GorillaMarkdown.mdparse.render(sampleText);
    GorillaThemeHandler.loadFontStackSelectors();
    GorillaThemeHandler.setTheme();
  },
  setupThemes: async function () {
    themeData = await fs.readTextFile("themevars.vss");
    GorillaThemeHandler.currentTheme = GorillaSettings.settings["theme"] || "Default";
    if (themeData) {
      GorillaThemeHandler.themeData = themeData;
    }
    else {
      GorillaThemeHandler.themeData = "";
    }
    GorillaThemeHandler.renderThemes();

  },
  setupEditorThemes: async function () {
    availableEditorThemes = await fs.readDirectory("prism-editor-themes/");
    let editorThemeSelector = document.getElementById("gorilla-editor-theme-selector");
    let optionsHTML = "";
    for (let i = 0; i < availableEditorThemes.length; i++) {
      let themeName = availableEditorThemes[i];
      let themeDisplayName = availableEditorThemes[i].replace("prism-editor-themes/", "").replace(".css", "").replace(/\-/g, " ");
      optionsHTML += "<option value='" + themeName + "'>" + themeDisplayName + "</option>";
    }

    editorThemeSelector.innerHTML = optionsHTML;
    let savedEditorTheme = GorillaSettings.settings["editorTheme"] || "default";
    editorThemeSelector.value = savedEditorTheme;
    await GorillaThemeHandler.applyEditorTheme(savedEditorTheme);
  },




  loadFontStackSelectors: function () {
    let headingSelector = document.getElementById("heading-font-stack-selector");
    let bodySelector = document.getElementById("body-font-stack-selector");
    let codeSelector = document.getElementById("code-font-stack-selector");
    let optionsHTML = "";
    for (let fontName in GorillaThemeHandler.fontStackOptions) {
      let fontVar = GorillaThemeHandler.fontStackOptions[fontName];
      optionsHTML += "<option value='" + fontVar + "'>" + fontName + "</option>";
    }
    headingSelector.innerHTML = optionsHTML;
    bodySelector.innerHTML = optionsHTML;
    codeSelector.innerHTML = optionsHTML;
    headingSelector.value = GorillaSettings.settings["headingFontStack"] || "--didone-font-stack";
    bodySelector.value = GorillaSettings.settings["bodyFontStack"] || "--serif-font-stack";
    codeSelector.value = GorillaSettings.settings["codeFontStack"] || "--monospace-code-font-stack";
  },
  setTheme: function () {
    let themeData = GorillaThemeHandler.themes[GorillaThemeHandler.currentTheme];
    if (themeData === undefined) {
      GorillaPresenter.notify("Theme not found. Using Default");
      themeData = GorillaThemeHandler.themes["Default"];
      GorillaSettings.settings["theme"] = "Default";
    }
    let styleElement = document.getElementById("theme");
    if (styleElement !== null) {
      styleElement.remove();
    }
    let fontData = "--heading-font-stack: var(" + GorillaSettings.settings["headingFontStack"] + ");\n" +
      "--slide-body-font-stack:var(" + GorillaSettings.settings["bodyFontStack"] + ");\n" +
      "--code-font-stack:var(" + GorillaSettings.settings["codeFontStack"] + ");\n";
    themeData = ":root{\n" + fontData + themeData + "\n}\n";
    styleElement = document.createElement('style');
    styleElement.innerHTML = themeData;
    styleElement.id = "theme";
    document.head.appendChild(styleElement);
  },

  renderThemes: async function () {
    let themeSelector = document.getElementById("theme-selector");
    themeSelector.innerHTML = "";
    let themeChoices = ""
    let unnamedCounter = 1;
    let themeBlocks = GorillaThemeHandler.themeData.split(/^%%%/gm);
    themeBlocks.shift();
    for (let i = 0; i < themeBlocks.length; i++) {
      let themeBlock = themeBlocks[i];
      let themeLines = themeBlock.split("\n");
      let themeName = themeLines[0].replace(/^%%%/, "").trim();
      if (themeName === "") {
        themeName = "Unnamed Theme " + unnamedCounter;
        unnamedCounter++;
      }
      themeLines.shift();
      GorillaThemeHandler.themes[themeName] = themeLines.join("\n");
    }
    let themeNames = Object.keys(GorillaThemeHandler.themes);
    themeNames.sort();
    for (let i = 0; i < themeNames.length; i++) {
      let themeName = themeNames[i];
      if (themeName === GorillaThemeHandler.currentTheme) {
        themeChoices += "<option value='" + themeName + "' selected>" + themeName + "</option>";
      }
      else {
        themeChoices += "<option value='" + themeName + "'>" + themeName + "</option>";
      }
    }
    themeSelector.innerHTML = themeChoices;
    themeSelector.value = GorillaThemeHandler.currentTheme;
  },
  themeSelected: function () {
    let themeSelector = document.getElementById("theme-selector");
    let themeName = themeSelector.value;
    GorillaThemeHandler.currentTheme = themeName;
    GorillaSettings.settings["theme"] = themeName;
    GorillaSettings.settings["headingFontStack"] = document.getElementById("heading-font-stack-selector").value;
    GorillaSettings.settings["bodyFontStack"] = document.getElementById("body-font-stack-selector").value;
    GorillaSettings.settings["codeFontStack"] = document.getElementById("code-font-stack-selector").value;
    GorillaThemeHandler.setTheme();
    GorillaFontLoader.loadFonts();
    GorillaSettings.saveSettings();

  },
  applyEditorTheme: async function (themeName) {
    GorillaSettings.settings["editorTheme"] = themeName;
    GorillaSettings.saveSettings();
    const editorThemeStyle = document.getElementById("editor-theme");
    editorThemeStyle.innerHTML = "";
    const themeCSS = await fs.readTextFile(themeName);
    if (themeCSS) {
      editorThemeStyle.innerHTML = themeCSS;
    }
    else {
      GorillaPresenter.notify("Editor theme file not found: " + themePath);
    }
    // Get rid of existing highlighting.
    document.querySelectorAll('pre code').forEach(block => {
      const text = block.textContent;
      block.innerHTML = '';
      block.textContent = text;
    });

    Prism.highlightAll(); // Re-highlight code blocks after theme change.
  },
  editorThemeSelected: async function () {
    let editorThemeSelector = document.getElementById("gorilla-editor-theme-selector");
    let themeName = editorThemeSelector.value;
    GorillaSettings.settings["editorTheme"] = themeName;
    await GorillaThemeHandler.applyEditorTheme(themeName);
    GorillaSettings.saveSettings();
  },
}