
let UIHandler = {
    fontStackOptions: {
        "Antique": "--antique-font-stack",
        "Didone": "--didone-font-stack",
        "Generic Cursive": "--cursive-font-stack",
        "Generic Serif": "--serif-font-stack",
        "Generic Sans Serif": "--sans-serif-font-stack",
        "Generic Monospace": "--monospace-font-stack",
        "Handwritten": "--handwritten-font-stack",
        "Humanist": "--humanist-font-stack",
        "Humanist (classical)": "--classical-humanist-font-stack",
        "Humanist (geometric)": "--geometric-humanist-font-stack",
        "Industrial": "--industrial-font-stack",
        "Monospace Code": "--monospace-code-font-stack",
        "Monospace Slab Serif": "--monospace-slab-serif-font-stack",
        "Neo-Grotesque": "--neo-grotesque-font-stack",
        "Old Style": "--old-style-font-stack",
        "Rounded Sans": "--rounded-sans-font-stack",
        "System UI": "--system-ui-font-stack",
        "Transitional": "--transitional-font-stack",
    },
    headingFontStack: "--didone-font-stack",
    bodyFontStack: "--humanist-font-stack",
    codeFontStack: "--monospace-code-font-stack",
    mainMenuWrapper: document.getElementById("main-menu-wrapper"),
    fullScreen: false,
    speakerNotesWindow: null,
    currentScreen: "slideshow",
    headingFontStackSelected: function () {
        let fontStack = document.getElementById("heading-font-stack-selector").value;
        UIHandler.headingFontStack = fontStack;
        console.log("Heading font stack selected: " + UIHandler.headingFontStack);
        UIHandler.setFontStacks();
    },
    bodyFontStackSelected: function () {
        let fontStack = document.getElementById("body-font-stack-selector").value;
        UIHandler.bodyFontStack = fontStack;
        console.log("Body font stack selected: " + UIHandler.bodyFontStack);
        UIHandler.setFontStacks();
    },
    codeFontStackSelected: function () {
        let fontStack = document.getElementById("code-font-stack-selector").value;
        UIHandler.codeFontStack = fontStack;
        console.log("Code font stack selected: " + UIHandler.codeFontStack);
        UIHandler.setFontStacks();
    },

    setFontStacks: function () {
        console.log("Setting font stacks");
        if (document.getElementById("ui-font-stack")) {
            document.getElementById("ui-font-stack").remove();
        }
        let styleElement = document.createElement('style');
        styleElement.id = "ui-font-stack";
        styleElement.innerHTML = ":root {\n--slide-heading-font-stack: var(" + UIHandler.headingFontStack + ");\n--slide-body-font-stack: var(" + UIHandler.bodyFontStack + ");\n--slide-code-font-stack:var(" + UIHandler.codeFontStack + ");}\n";
        document.head.appendChild(styleElement);
        ConfigHandler.saveConfig();
    },
    loadFontStackSelectors: function () {
        let headingFontStackSelector = document.getElementById("heading-font-stack-selector");
        let bodyFontStackSelector = document.getElementById("body-font-stack-selector");
        let codeFontStackSelector = document.getElementById("code-font-stack-selector");
        let fontStacks = Object.keys(UIHandler.fontStackOptions);
        fontStacks.sort();
        for (let i = 0; i < fontStacks.length; i++) {
            let fontStack = fontStacks[i];
            let option = document.createElement("option");
            option.value = UIHandler.fontStackOptions[fontStack];
            option.text = fontStack;
            if (option.value === UIHandler.headingFontStack) {
                option.selected = true;
            }
            headingFontStackSelector.add(option);
            option = document.createElement("option");
            option.value = UIHandler.fontStackOptions[fontStack];
            option.text = fontStack;
            if (option.value === UIHandler.bodyFontStack) {
                option.selected = true;
            }
            bodyFontStackSelector.add(option);
            option = document.createElement("option");
            option.value = UIHandler.fontStackOptions[fontStack];
            option.text = fontStack;
            if (option.value === UIHandler.codeFontStack) {
                option.selected = true;
            }
            codeFontStackSelector.add(option);
        }
    },

    warn: function (message) {
        alert(message);
    },
    error: function (message) {
        alert(message);
    },
    notify: function (message) {
        alert(message);
    },

    exitFullScreen: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        UIHandler.fullScreen = false;
    },
    enterFullScreen: function () {
        let element = document.body;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitrequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
        fullScreen = true;
    },
    toggleFullScreen: function () {
        if (UIHandler.fullScreen === true) {
            UIHandler.exitFullScreen();
        }
        else {
            UIHandler.enterFullScreen();
        }
    },

    wireUI: function (element) {
        // Need to handle this in case the user enters/exits full screen mode using the browser menu or hitting esc on the keyboard.
        document.onfullscreenchange = (event) => {
            if (document.fullscreenElement !== null) {
                UIHandler.fullScreen = true;
            }
            else {
                UIHandler.fullScreen = false;
            }
        };

        window.addEventListener('popstate', (event) => {
            if (SlideHandler.backHistory.length > 0) {
                SlideHandler.slideBack();
            } else {
                history.back();
            }
        });

        element.addEventListener('keydown', function (event) {
            const isCmdOrCtrl = event.ctrlKey || event.metaKey;
            if (isCmdOrCtrl && event.key.toLowerCase() === 's') {
                /*   event.preventDefault();
                   GorillaPresenter.editor.updateEditorData();
                   GorillaPresenter.downloadSlides(); */
                // Save editor and download slides
                return;
            }
            if (isCmdOrCtrl && event.key.toLowerCase() === 'e') {
                if (UIHandler.mainMenuVisible === false) {
                    UIHandler.mainMenuWrapper.showModal();
                    UIHandler.mainMenuVisible = true;
                }
                else {
                    UIHandler.mainMenuWrapper.close();
                    UIHandler.mainMenuVisible = false;
                }
                return;
            }

            // Try to handle any keys that someone might try to use to navigate the slides.
            if (event.key === "ArrowRight") {
                SlideHandler.slideForward();
                return;
            }
            if (event.key === "ArrowLeft") {
                SlideHandler.slideBack();
                return;
            }
            if (event.key === "Enter") {
                SlideHandler.slideForward();
                return;
            }
            if (event.key === "Backspace") {
                SlideHandler.slideBack();
                return;
            }
            if (event.code === "Space") {
                SlideHandler.slideForward();
                return;
            }
            // In case a desperate user tries to escape full screen mode. :-)
            if (event.code === "Escape") {
                if (UIHandler.mainMenuVisible === true) {
                    UIHandler.mainMenuWrapper.close();
                    return;
                }
                if (UIHandler.fullScreen === true) {
                    UIHandler.exitFullScreen();
                    UIHandler.fullScreen = false;
                    return;
                }
            }
            return;
        });

        // Long press detection for touch devices
        element.addEventListener('touchstart', function (event) {
            UIHandler.touchStartX = event.touches[0].clientX;
            UIHandler.touchStartTimer = setTimeout(function () {
                if (UIHandler.mainMenuVisible === false) {
                    UIHandler.showMainMenu(event);
                    return;
                }
                else {
                    UIHandler.hideMainMenu(event);
                    return;
                }
            }, 500);
        });
        element.addEventListener('touchend', function (event) {
            clearTimeout(UIHandler.touchStartTimer);
            UIHandler.touchStartTimer = null;
            const touchEndX = event.changedTouches[0].clientX;
            const touchStartX = UIHandler.touchStartX;
            const touchThreshold = 50;
            if (touchEndX - touchStartX > touchThreshold) {
                SlideHandler.slideBack();
            } else if (touchStartX - touchEndX > touchThreshold) {
                SlideHandler.slideForward();
            }
        });
        element.addEventListener('touchmove', function (event) {
            clearTimeout(UIHandler.touchStartTimer);
            UIHandler.touchStartTimer = null;
        });
        element.addEventListener('mouseup', function (event) {
            if (UIHandler.mainMenuVisible === true && !event.target.closest("#main-menu-wrapper")) {
                UIHandler.hideMainMenu(event);
                return;
            }
            const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
            if (isCtrlOrCmdPressed) {
                UIHandler.showMainMenu(event);
                return;
            }
            const selection = window.getSelection();
            const selectedText = selection.toString();

            if (selectedText.length > 0) {
                return;
            }
            if ((UIHandler.currentScreen === "slideshow") && (event.target.id === "slideroot" || event.target.closest("#slideroot"))) {
                const viewportWidth = window.innerWidth;
                const x = event.clientX;
                if (x < viewportWidth / 2) {
                    SlideHandler.slideBack();
                } else {
                    // Mouseup on the right half

                    SlideHandler.slideForward();
                }
                return;
            }
        });
        document.querySelectorAll('.menu-choice').forEach(choice => {
            choice.addEventListener("click", function (event) {
                let menuText = UIHandler.getAttributeFromElementOrDescendant(event.currentTarget, "data-english-text");
                UIHandler.mainMenuClicked(menuText)
            })
        })

    },


    showSpeakerNotes: function () {
        if (UIHandler.speakerNotesWindow === null || UIHandler.speakerNotesWindow.closed) {
            UIHandler.speakerNotesWindow = window.open("", LanguageHandler.translate("Speaker Notes", LanguageHandler.currentLanguage), "scrollbars=yes,resizable=yes,location=no,toolbar=no,menubar=no,width=800,height=600");
        }
        else {
            UIHandler.speakerNotesWindow.focus();
        }
        let notes = SlideRenderer.speakerNotes; //SlideRenderer.speakerNotes.replace(/\n/g,"<br/>\n");
        let noteStyle = BrowserFileSystem.readInternalTextFile("userdata/speakernotes.css");
        UIHandler.speakerNotesWindow.document.write("<html><head><title>" + LanguageHandler.translate("Speaker Notes", LanguageHandler.currentLanguage) + "</title>\n<style>\n" + noteStyle + "\n</style></head><body>" + notes + "</body></html>");
    },

    mainMenuClicked: function (text) {
        console.log("Main menu item clicked: " + text);
        UIHandler.hideMainMenu();
        switch (text) {
            case "Slide Editor":
                UIHandler.showSlideEditor();
                break;
            case "Save Presentation":
                IOHandler.savePresentation();
                break;
            case "Load Presentation":
                IOHandler.loadPresentation();
                break;
            case "Enter/Exit Full Screen":
                UIHandler.toggleFullScreen();
                break;
            case "Show Speaker Notes":
                UIHandler.showSpeakerNotes();
                break;
            case "Media Library":
                UIHandler.showMediaLibrary();
                break;
            case "Print Slides":
                UIHandler.printSlides();
                break;
            case "Theme Editor":
                UIHandler.showThemeEditor();
                break;
            case "About":
                UIHandler.showAbout();
                break;
            default:
                UIHandler.warn("No action defined for menu choice: " + text);
        }
    },





    showMainMenu: function (event) {
        UIHandler.mainMenuWrapper.show();
        UIHandler.mainMenuVisible = true;
    },
    hideMainMenu: function (event) {
        UIHandler.mainMenuWrapper.close();
        UIHandler.mainMenuVisible = false;
    },


    getAttributeFromElementOrDescendant: function (element, attributeName) {
        if (element.hasAttribute && element.hasAttribute(attributeName)) {
            return element.getAttribute(attributeName);
        }
        for (let i = 0; i < element.children.length; i++) {
            const attrValue = UIHandler.getAttributeFromElementOrDescendant(element.children[i], attributeName);
            if (attrValue !== null) {
                return attrValue;
            }
        }
        return null;
    },
}
