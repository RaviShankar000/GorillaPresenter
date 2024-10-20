let IOHandler = {
    workspaceChooser: "iohandler-workspace-chooser",
    loadPresentation: function () {
        document.getElementById(IOHandler.workspaceChooser).click();
    },
    workspaceChosen: function () {
        let uploader = document.getElementById(IOHandler.workspaceChooser);
        let workspace = uploader.files[0];
        let reader = new FileReader();
        reader.onloadend = function (evt) {
            let newfile = evt.target.result;
            parent.clearDocumentAndWrite(newfile);
        };
        reader.readAsText(workspace);
    },
    savePresentation: function () {
        // EditHandler.saveSlides();
        let iframe_template = BrowserFileSystem.readInternalTextFile("base/internal_frame_template.html");
        let version = BrowserFileSystem.readInternalTextFile("build/version").trim();
        let build = BrowserFileSystem.readInternalTextFile("build/build").trim();
        let date = BrowserFileSystem.readInternalTextFile("build/build_date").trim();
        iframe_template = iframe_template.replace(/___VERSION___/g, version);
        iframe_template = iframe_template.replace(/___BUILD___/g, build);
        iframe_template = iframe_template.replace(/___BUILD_DATE___/g, date);
        iframe_template = iframe_template.replace(/___FILESYSTEM___/g, "BrowserFileSystem.fs=" + JSON.stringify(BrowserFileSystem.fs));
        iframe_template = iframe_template.replace(/___DEBUGGING___/g, debugging);
        iframe_data = "var iframeContent = \"" + BrowserFileSystem.bytesToBase64(iframe_template) + "\";\n";
        let index_template = BrowserFileSystem.readInternalTextFile("base/index_template.html");
        index_template = index_template.replace(/___IFRAMECONTENT___/, iframe_data);
        if (debugging) {
            console.log("Downloading debuggable file");
            BrowserFileSystem.downloadFile("GorillaPresenter" + IOHandler.downloadDate(), iframe_template, "text/html");
        }
        else {
            console.log("Downloading base file");
            BrowserFileSystem.downloadFile("GorillaPresenter" + IOHandler.downloadDate(), index_template, "text/html");
        }
    },

    downloadDate: function () {
        const date = new Date();
        const year = date.getFullYear();
        const month = GorillaPresenter.pad(date.getMonth() + 1);
        const day = GorillaPresenter.pad(date.getDate());
        const hours = GorillaPresenter.pad(date.getHours());
        const minutes = GorillaPresenter.pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
}