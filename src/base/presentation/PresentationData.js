GorillaPresenter.config = {
  currentLanguage:"en",
  themeName:"Default",
  headingFontStack :"--didone-font-stack",
  bodyFontStack :"--humanist-font-stack",
  codeFontStack : "--monospace-code-font-stack",
  slideData:"",
  slidePosition: -1,
  slidesperpage: "6up",
  papersize: "usletter",
}

  GorillaPresenter.saveConfig = function(){
    BrowserFileSystem.writeInternalTextFile("userdata/config",JSON.stringify(GorillaPresenter.config));
  }
  GorillaPresenter.loadConfig = function(){
    if(BrowserFileSystem.fileExists("userdata/config") === false){
      GorillaPresenter.saveConfig();
    }
    GorillaPresenter.config = JSON.parse(BrowserFileSystem.readInternalTextFile("userdata/config"));
    document.getElementById("gorilla-presenter-slide-text-editor").value = GorillaPresenter.config.slideData;
  }

  GorillaPresenter.renderPresentationData = function(){
    let mainMenu = document.getElementById("gorilla-presenter-main-menu");
    GorillaPresenter.renderLanguages(mainMenu);
    GorillaPresenter.renderFontStackSelectors(mainMenu);
    GorillaPresenter.renderSlides();
  }
