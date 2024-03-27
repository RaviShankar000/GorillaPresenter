GorillaPresenter.loadPresentationData = function(){
    GorillaPresenter.loadThemes();
    GorillaPresenter.loadLanguage();
    GorillaPresenter.loadFontStacks();
    GorillaPresenter.loadSlides();

  }


  GorillaPresenter.savePresentationData = function(){
    GorillaPresenter.saveSlides();
    GorillaPresenter.saveThemes();
    GorillaPresenter.saveLanguage();
    GorillaPresenter.saveFontStacks();

  }

  GorillaPresenter.renderPresentationData = function(){
    let mainMenu = document.getElementById("gorilla-presenter-main-menu");
    GorillaPresenter.renderLanguages(mainMenu);
    GorillaPresenter.renderFontStackSelectors(mainMenu);
    GorillaPresenter.renderSlides();
  }
