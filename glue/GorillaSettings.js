let GorillaSettings = {
    loadSettings: async function() {
        settingsData = await fs.readTextFile("settings.json");
        if(settingsData){
        try{
            const settings = JSON.parse(settingsData);
            GorillaSettings.settings = settings;
            let settingsFields = document.getElementsByClassName("settingsvalue");
            for (let i = 0; i < settingsFields.length; i++) {
                let field = settingsFields[i];
                let varName = field.getAttribute("variable");
                if (varName && settings[varName] !== undefined) {
                    field.value = settings[varName];
                }
            }               
        } catch(e){
            GorillaPresenter.notify("Error parsing settings.json:", e);
        }
        this.applyCustomCSS();
        }
      document.querySelectorAll(".codejar").forEach((el) => { 
        el.style.fontSize = GorillaSettings.settings["editorFontSize"] + "px";
      });           
    },
    async saveSettings() {
        let settingsFields = document.getElementsByClassName("settingsvalue");
        for (let i = 0; i < settingsFields.length; i++) {
            let field = settingsFields[i];
            let varName = field.getAttribute("variable");
            if (varName) {
                GorillaSettings.settings[varName] = field.value;
            }
        }
        const settingsData = JSON.stringify(GorillaSettings.settings, null, 2);
        await fs.writeTextFile("settings.json", settingsData);
        GorillaSettings.applyCustomCSS();
    },
    applyCustomCSS: function() {
        const customCSS = GorillaSettings.settings["customCSS"] || "";
        let styleElement = document.getElementById("custom-css-style");
        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "custom-css-style";
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = customCSS;
    },

}