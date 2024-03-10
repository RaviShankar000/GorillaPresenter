// Copyright 2024 by Anthony W. Hursh. MIT License.

let GorillaPresenter = {
    slideRoot: "gorilla-presenter-slideroot",
    slideClass: ".gorilla-presenter-slide",
    slideIdFragment: "gorilla-presenter-slide-",
    slidePosition:-1,
    speakerNotes:"",
    editor_mode: "light",
    slideIDs: [],
    slideTransitionsForward: [],
    slideTransitionsBack: [],
    themes : {},
    currentLanguage:"en",
    slideEditorPosition:0,
    themeEditorPosition:0,
    mainMenuVisible:false,
    onHomeScreen:false,
    fullScreen:false,
    showUIScreen:function(id){
      let screens = document.querySelectorAll(".gorilla-presenter-screen");
      for(let i=0;i<screens.length;i++){
        screens[i].style.display = "none";
      }
      let screen = document.getElementById(id);
      screen.style.display = "block";
      screen.focus();
    },
    processMainMenuClick:function(event){
      let target = event.target;
      let label = target.innerHTML;
      switch(label){
        case "Slide Show":GorillaPresenter.showHomeScreen();break;
        case "Enter/Exit Full Screen":if(GorillaPresenter.fullScreen === true){
             GorillaPresenter.exitFullScreen()
            }
            else{
              GorillaPresenter.enterFullScreen();
            }break;
        case "Slide Editor":GorillaPresenter.showSlideEditor();break;
        case "Image Editor":GorillaPresenter.showImageEditor();break;
        case "Save Presentation":GorillaPresenter.downloadSlides();break;
        case "Theme Editor":GorillaPresenter.showThemeEditor();break;
        case "Documentation":GorillaPresenter.showDocumentation();break;
        case "About":GorillaPresenter.showAbout();break;
        case "Done":GorillaPresenter.hideMainMenu();break;
      }
      GorillaPresenter.hideMainMenu();
    },
    saveEditorCursors:function(){
      let slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
      GorillaPresenter.slideEditorPosition = slideEditor.selectionStart;
      let themeEditor = document.getElementById("gorilla-presenter-theme-text-editor");
      GorillaPresenter.themeEditorPosition = themeEditor.selectionStart;
    },
    showSlideEditor:function(){
      GorillaPresenter.saveEditorCursors();
      GorillaPresenter.showUIScreen("gorilla-presenter-slide-editor-container");
      GorillaPresenter.onHomeScreen = false;
      let themeEditor = document.getElementById("gorilla-presenter-theme-text-editor");
      GorillaPresenter.themeData = themeEditor.value;
      let slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
      slideEditor.value = GorillaPresenter.slideData;
      slideEditor.focus();
      slideEditor.setSelectionRange(GorillaPresenter.slideEditorPosition, GorillaPresenter.slideEditorPosition);
    },
    showThemeEditor:function(){
      GorillaPresenter.saveEditorCursors();
      GorillaPresenter.showUIScreen("gorilla-presenter-theme-editor-container");
      GorillaPresenter.onHomeScreen = false;
      let slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
      GorillaPresenter.slideData = slideEditor.value;
      let themeEditor = document.getElementById("gorilla-presenter-theme-text-editor");
      themeEditor.value = GorillaPresenter.themeData;
      themeEditor.focus();
      themeEditor.setSelectionRange(GorillaPresenter.themeEditorPosition, GorillaPresenter.themeEditorPosition);
    },
    showImageEditor:function(){
      GorillaPresenter.showUIScreen("gorilla-presenter-image-editor-container");
      let imageEditor = document.getElementById("gorilla-presenter-image-editor");
      imageEditor.focus();
      GorillaPresenter.onHomeScreen = false;
    },
    showHomeScreen:function(){
      GorillaPresenter.showUIScreen("gorilla-presenter-slideroot");
      GorillaPresenter.updateData();
      GorillaPresenter.displaySlide("cutIn");
      GorillaPresenter.onHomeScreen = true;
    },
    showAbout:function(){
      GorillaPresenter.showUIScreen("gorilla-presenter-about-container");
      GorillaPresenter.onHomeScreen = false;
    },
    updateData:function(){
      GorillaPresenter.slideData = document.getElementById("gorilla-presenter-slide-text-editor").value;
      GorillaPresenter.themeData = document.getElementById("gorilla-presenter-theme-text-editor").value;
      GorillaPresenter.renderSlides(GorillaPresenter.slideRoot);
      GorillaPresenter.renderThemes();
      GorillaPresenter.saveSlides();
    },
    saveSlides:function(){
      BrowserFileSystem.writeInternalTextFile("userdata/slides",GorillaPresenter.slideData);
      BrowserFileSystem.writeInternalTextFile("userdata/slideposition",GorillaPresenter.slidePosition.toString());
      BrowserFileSystem.writeInternalTextFile("userdata/themes",GorillaPresenter.themeData);
    },
    startup:function(){
      GorillaPresenter.setHeadLink("icon",BrowserFileSystem.readInternalFileDataURL("icons/favicon.ico"),"image/x-icon");
      GorillaPresenter.setHeadLink("icon",BrowserFileSystem.readInternalFileDataURL("icons/favicon-192x192.png"),"image/png");
      GorillaPresenter.setHeadLink("apple-touch-icon",BrowserFileSystem.readInternalFileDataURL("icons/apple-touch-icon-180x180.png"),"image/png");
      GorillaPresenter.renderMainMenu();
      if(BrowserFileSystem.fileExists("userdata/slides.md") === false){
        console.log("No slides found.");
        GorillaPresenter.slideData ="";
      }
      else {
        GorillaPresenter.slideData = BrowserFileSystem.readInternalTextFile("userdata/slides.md");
      }
      document.getElementById("gorilla-presenter-slide-text-editor").value = GorillaPresenter.slideData;
     if(BrowserFileSystem.fileExists("userdata/slideposition") === false){
        GorillaPresenter.slidePosition = -1;
      }
      else {
        GorillaPresenter.slidePosition = parseInt(BrowserFileSystem.readInternalTextFile("userdata/slideposition"));
      }
      if(BrowserFileSystem.fileExists("userdata/language") === false){
        GorillaPresenter.language = "en";
      }
      else {
        GorillaPresenter.language = BrowserFileSystem.readInternalTextFile("userdata/language").trim();
      }
      if(BrowserFileSystem.fileExists("userdata/themes.csx") === false){
        GorillaPresenter.themeData = "";
      }
      else {
        GorillaPresenter.themeData = BrowserFileSystem.readInternalTextFile("userdata/themes.csx");
      }
      document.getElementById("gorilla-presenter-theme-text-editor").value = GorillaPresenter.themeData;
      GorillaPresenter.renderThemes();
      if(BrowserFileSystem.fileExists("userdata/themename") === false){
        BrowserFileSystem.writeInternalTextFile("userdata/themename","Default");
      }
      let themename = BrowserFileSystem.readInternalTextFile("userdata/themename");
      GorillaPresenter.setTheme(themename);
      GorillaPresenter.renderSlides(GorillaPresenter.slideRoot);
      let aboutElement = document.getElementById("gorilla-presenter-about");
      aboutElement.innerHTML = aboutElement.innerHTML + GorillaPresenter.markdown.render( BrowserFileSystem.collectLicenses());
      GorillaPresenter.showHomeScreen();
      let screens = document.getElementsByClassName("gorilla-presenter-screen");
      GorillaPresenter.touchStartTimer = GorillaPresenter.touchEndTimer =  GorillaPresenter.clickTimer = null;
        GorillaPresenter.setMenuHandlers(document.body);
  },
    setMenuHandlers:function(element){
      element.addEventListener('keydown', function(event) {
        const isCmdOrCtrl = event.ctrlKey || event.metaKey;
        if (isCmdOrCtrl && event.key.toLowerCase() === 'e') {
          if(GorillaPresenter.mainMenuVisible === false){
              GorillaPresenter.showMainMenu(event);
          }
          else{
            GorillaPresenter.hideMainMenu(event);
          }
          return;
        }
        GorillaPresenter.hideMainMenu(event);
        if(GorillaPresenter.onHomeScreen === false){
          return;
        }
        // Try to handle any keys that someone might try to use to navigate the slides.
        if(event.key === "ArrowRight"){
            GorillaPresenter.slideForward();
            return;
        }
        if(event.key === "ArrowLeft"){
            GorillaPresenter.slideBack();
            return;
        }
        if(event.key === "ArrowDown"){
          GorillaPresenter.slideForward();
          return;
      }
      if(event.key === "ArrowUp"){
          GorillaPresenter.slideBack();
          return;
      }
        if(event.key === "PageDown"){
          GorillaPresenter.slideForward();
          return;
      }
      if(event.key === "PageUp"){
          GorillaPresenter.slideBack();
          return;
      }
      if(event.key === "Enter"){
        GorillaPresenter.slideForward();
        return;
      }
      if(event.key === "Backspace"){
        GorillaPresenter.slideBack();
        return;
      }
      if(event.code === "Space"){
        GorillaPresenter.slideForward();
        return;
      }
      // In case a desperate user tries to escape full screen mode. :-)
      if(event.code === "Escape"){
        GorillaPresenter.exitFullScreen();
        return;
      }
      return;
    });

    // Long press detection for touch devices
    element.addEventListener('touchstart', function(event) {
        GorillaPresenter.touchStartX = event.touches[0].clientX;
        GorillaPresenter.touchStartTimer = setTimeout(function() {
            if(GorillaPresenter.mainMenuVisible === false){
              GorillaPresenter.showMainMenu(event);
            }
            else{
              GorillaPresenter.hideMainMenu(event);
            }
        }, 500);
    });
      element.addEventListener('touchend', function(event) {
          clearTimeout(GorillaPresenter.touchStartTimer);
            GorillaPresenter.touchStartTimer = null;
            const touchEndX = event.changedTouches[0].clientX;
            const touchStartX = GorillaPresenter.touchStartX;
            const touchThreshold = 50;
            if (touchEndX - touchStartX > touchThreshold) {
            GorillaPresenter.slideBack();
            } else if (touchStartX - touchEndX > touchThreshold) {
            GorillaPresenter.slideForward();
            }
      });
      element.addEventListener('touchmove', function(event) {
          clearTimeout(GorillaPresenter.touchStartTimer);
          GorillaPresenter.touchStartTimer = null;
      });
      
      element.addEventListener('mousedown', function(event) {
        if (GorillaPresenter.mainMenuVisible === true && !event.target.closest("#gorilla-presenter-main-menu")) {
          GorillaPresenter.hideMainMenu(event);
          return;
        }
        GorillaPresenter.isLongClick = false;
        GorillaPresenter.clickTimer = setTimeout(function() {
            GorillaPresenter.isLongClick = true;
            if(GorillaPresenter.mainMenuVisible === false) {
                GorillaPresenter.showMainMenu(event);
            }
            else {
                GorillaPresenter.hideMainMenu(event);
            }
        }, 1000);
    });
    
    element.addEventListener('mouseup', function(event) {
        clearTimeout(GorillaPresenter.clickTimer);
        if (!GorillaPresenter.isLongClick) {
            // It was a short click, advance to the next slide
            if (event.target.id === "gorilla-presenter-slideroot" || event.target.closest("#gorilla-presenter-slideroot")) {
              GorillaPresenter.slideForward();
            }
        }
        GorillaPresenter.clickTimer = null;
    });
    
    element.addEventListener('mouseleave', function(event) {
        clearTimeout(GorillaPresenter.clickTimer);
        GorillaPresenter.clickTimer = null;
    });   
    },
    renderSlides:function(element){
      GorillaPresenter.speakerNotes = "";
      for(let i = 0; i < GorillaPresenter.slideIDs.length; i++) {
        let slideId = GorillaPresenter.slideIDs[i];
        let slideElement = document.getElementById(slideId);
        if(slideElement) {
          slideElement.remove();
        }
      }
      GorillaPresenter.slideIDs = [];
      let text; 
      let slidelines = GorillaPresenter.slideData.split("\n");
      let decommentedlines = [];
      for(let i=0;i < slidelines.length;i++){
         text = slidelines[i];
        if(text.indexOf(";") === 0){
          GorillaPresenter.speakerNotes += text.substring(1) + "\n";
          continue;
        }
        decommentedlines.push(text);
      }
      text = decommentedlines.join("\n");
      let slidetexts = text.split(/^# /gm);
      slidetexts.shift();
      for(let j=0; j < slidetexts.length;j++){
        let slidetext = "# " + slidetexts[j];
        let newSlide = document.createElement("div");
        let id = GorillaPresenter.slideIdFragment + uuid();
        newSlide.setAttribute("class", GorillaPresenter.slideClass);
        newSlide.setAttribute("id", id);
        newSlide.innerHTML =  `<div class="gorilla-presenter-editable"><div class="gorilla-presenter-slide-container">` + GorillaPresenter.markdown.render(slidetext) + "</div></div>";
        document.getElementById(GorillaPresenter.slideRoot).appendChild(newSlide);
        GorillaPresenter.sicTransit.transferPanel(newSlide);
        renderMathInElement(newSlide);
        GorillaPresenter.slideIDs.push(id);
      }
    },
    slideForward:function(){
      let transition = GorillaPresenter.slideTransitionsForward[GorillaPresenter.slidePosition];
      console.log("slideForward: Transition is " + transition);
      if(transition === undefined){
        transition = "swipeInFromRight";
      }
      GorillaPresenter.slidePosition = GorillaPresenter.slidePosition + 1;
      GorillaPresenter.displaySlide(transition);
    },

    slideBack:function(){
      let transition = GorillaPresenter.slideTransitionsBack[GorillaPresenter.slidePosition];
      if(transition === undefined){
        transition = "swipeInFromLeft"
      } 
      GorillaPresenter.slidePosition = GorillaPresenter.slidePosition - 1;
      GorillaPresenter.displaySlide(transition);
    },


    displaySlide:function(transition){
      console.log("displaySlide: transition is "  + transition);
      if(GorillaPresenter.slideIDs.length === 0){
        GorillaPresenter.warn(GorillaPresenter.translate("No slides. You'll have to make some first.",GorillaPresenter.currentLanguage));
        return;
      }
      if(GorillaPresenter.slidePosition < 0){
        GorillaPresenter.slidePosition = 0;
        GorillaPresenter.warn(GorillaPresenter.translate("At first slide.",GorillaPresenter.currentLanguage));
        return;
      }
      if(GorillaPresenter.slidePosition >= GorillaPresenter.slideIDs.length){
        GorillaPresenter.slidePosition = GorillaPresenter.slideIDs.length -1 ;
        GorillaPresenter.warn(GorillaPresenter.translate("At last slide.",GorillaPresenter.currentLanguage));
        return;
      }
      if(GorillaPresenter.sicTransit.isValidTransition(transition) === false){
        warn(GorillaPresenter.translate("Unrecognized transition",GorillaPresenter.currentLanguage) + ": " + transition);
        return;
      }
      let slideId = GorillaPresenter.slideIDs[GorillaPresenter.slidePosition];
      if(slideId === undefined){
        GorillaPresenter. warn(GorillaPresenter.translate("No slide with this ID:",GorillaPresenter.currentLanguage) + slideId);
        return;
      }
  /*    panelSelector: the selector for the panel to be transitioned. See selectPanel() for details.
      transitionName: the name of the transition to be performed. See getTransitionList() for a list of currently defined transitions.
      stackRotationNumber: the number of times to rotate the stack.  Only used by the rotateStack transition. Positive numbers move panels from the top of the stack to the bottom. Negative numbers move panels from the bottom of the stack to the top. Zero is a no-op. Default is 1. */
      GorillaPresenter.sicTransit.performTransition({"panelSelector":"#" + slideId, "transitionName":transition,"stackRotationNumber":0});
    // GorillaPresenter.sicTransit.showPanel("#" + slideId);
    },
    warn:function(message){
      let slideElement = document.getElementById(GorillaPresenter.slideRoot);
      const slideStyles = window.getComputedStyle(slideElement);
      let warningElement = document.getElementById("gorilla-presenter-warning-message");
      warningElement.innerHTML = message;
      warningElement.style.opacity = 0;
      warningElement.style.display = "block";
      let warningElementStyle = window.getComputedStyle(warningElement);
      let slideWidth = parseInt(slideStyles.width);
      let slideHeight = parseInt(slideStyles.height);
      let warningWidth = parseInt(warningElementStyle.width);
      let warningHeight = parseInt(warningElementStyle.height);
      let left = (slideWidth - warningWidth) / 2;
      let top = (slideHeight - warningHeight) / 2;
      warningElement.style.left = left + "px";
      warningElement.style.top = top + "px"; 
      
      fadeIn(warningElement);
      setTimeout(function(){
        fadeOut(warningElement);
      },1000);
    },
    setLanguage(language){
      GorillaPresenter.currentLanguage = language;
      if(language !== "en"){
        this.warn(translate("Support for languages other than English is experimental. Please report any issues at",language) + " https://github.com/pulpgrinder/GorillaPresenter");
      }
      BrowserFileSystem.writeInternalTextFile("userdata/language",language);
    },
    renderMainMenu:function(){
      let mainMenu = document.getElementById("gorilla-presenter-main-menu");
       mainMenu.innerHTML = "<div class='gorilla-presenter-main-menu-item'><span class='translatable'>Select Theme</span>: <select title='Theme Selector' id='gorilla-presenter-theme-selector' onchange='GorillaPresenter.themeSelected(this.value)'></select></div>";
      let menuItems = ["Slide Show","Enter/Exit Full Screen","Slide Editor","Image Editor","Save Presentation","Theme Editor","Documentation","About","Done"];
      for(let i=0;i<menuItems.length;i++){
        let menuItem = document.createElement("div");
        menuItem.innerHTML = "<span class='translatable'>" + menuItems[i] + "</span>";
        menuItem.className = "gorilla-presenter-main-menu-item link";
        menuItem.onclick = GorillaPresenter.processMainMenuClick;
        mainMenu.appendChild(menuItem);
      }
      let languageDiv = document.createElement("div")
      languageDiv.className = "gorilla-presenter-main-menu-item link";
      languageDiv.innerHTML = "<span class='translatable'>Select Language</span>: </span> <select title='Language Selector' id='gorilla-presenter-language-selector' onchange='GorillaPresenter.selectLanguage(this.value)'></select>";
      mainMenu.appendChild(languageDiv);
      GorillaPresenter.loadLanguages();
      document.getElementById("gorilla-presenter-language-selector").onchange = GorillaPresenter.selectLanguage;
        GorillaPresenter.translateUI();
    },
    translateUI:function(){
      let language = GorillaPresenter.currentLanguage;
      let translations = GorillaPresenter.translations;
      let elements = document.getElementsByClassName("translatable");
      for(let i=0;i<elements.length;i++){
        let element = elements[i];
        let text = element.innerHTML;
        console.log("Translating " + text);
        let translation = translations[text];
        if(translation !== undefined){
          let translatedText = translation[language];
          if(translatedText !== undefined){
            element.innerHTML = translatedText;
          }
        }
      }
    },
    selectLanguage:function(event){
      GorillaPresenter.setLanguage(event.target.value);
      GorillaPresenter.renderMainMenu();
      GorillaPresenter.showMainMenu();
      GorillaPresenter.renderThemes();
    },
    loadLanguages:function(){
      let languageSelector = document.getElementById("gorilla-presenter-language-selector");
      languageSelector.innerHTML = "";
      console.log("Language selector is now empty");
      let languages = Object.keys(GorillaPresenter.translations["Slide Show"]);
      console.log("There are " + languages.length + " languages.")
      for(let i=0;i<languages.length;i++){
        let language = languages[i];
        let option = document.createElement("option");
        option.value = language;
        option.innerHTML = language;
        if(language === GorillaPresenter.currentLanguage){
          option.selected = true;
        }
        languageSelector.appendChild(option);
      }
    },
    showMainMenu:function(event){
      GorillaPresenter.mainMenuVisible = true;
      GorillaPresenter.saveEditorCursors();
      let slideElement = document.getElementById(GorillaPresenter.slideRoot);
      const slideStyles = window.getComputedStyle(slideElement);
      let mainMenu = document.getElementById("gorilla-presenter-main-menu");
      mainMenu.style.opacity = 1;
      mainMenu.style.display = "block";
      let mainMenuStyle = window.getComputedStyle(mainMenu);
      let slideWidth = parseInt(slideStyles.width);
      let slideHeight = parseInt(slideStyles.height);
      let menuWidth = parseInt(mainMenuStyle.width);
      let menuHeight = parseInt(mainMenuStyle.height);
      let left = (slideWidth - menuWidth) / 2;
      let top = (slideHeight - menuHeight) / 2;
      mainMenu.style.left = left + "px";
      mainMenu.style.top = top + "px";
   /*    setTimeout(function(){
        GorillaPresenter.hideMainMenu();
      },7000); */
    },
    hideMainMenu:function(event){
      let mainMenu = document.getElementById("gorilla-presenter-main-menu");
      mainMenu.style.display = "none";
      GorillaPresenter.mainMenuVisible = false;
    },
    
    bytes_to_base_64:function(buffer){
      let arr = new Uint8Array(buffer)
      let raw = '';
      for (let i = 0, l = arr.length; i < l; i++) {
        raw += String.fromCharCode(arr[i]);
      }
      return window.btoa(raw);
    },
   
  insertTextAtCaret: function(text) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
  },
 

/*   handleEditorPaste: function(event) {
    console.log('paste event detected.');
    let element = event.target;
    if(element.classList.contains('gorilla-presenter-editor')){
        console.log('Pasted in an editable element');
      let text = event.clipboardData.getData('text/plain');
      GorillaPresenter.insertTextAtCaret(text);
    }
  }, */
    
    enterFullScreen:function(){
      let element = document.body;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitrequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
      }
      GorillaPresenter.fullScreen = true;
    },
    exitFullScreen:function(){
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      GorillaPresenter.fullScreen = false;
    },
    setHeadLink: function(tagValue, dataURI,dataMimeType) {
      if (typeof tagValue !== 'string'){
        throw new TypeError('tagvalue: string expected');
      }
      if (typeof dataURI !== 'string'){
        throw new TypeError('dataURI: string expected');
      }
      if (typeof dataMimeType !== 'string'){
        throw new TypeError('dataMimeType: string expected');
      }
      let head = document.getElementsByTagName('head')[0];
      let newElement = document.createElement('link');
      newElement.type = dataMimeType;
      newElement.rel = tagValue;
      newElement.href = dataURI;
      head.appendChild(newElement);
    },
    
}

GorillaPresenter.sicTransit =  new SicTransit("#" + GorillaPresenter.slideRoot,GorillaPresenter.slideClass);
GorillaPresenter.markdown =  window.markdownit({html:true,xhtmlOut:true,typographer:true});
  