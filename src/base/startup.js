
function isInStandaloneMode() {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}



GorillaPresenter.checkMobileSafari = function() {
  GorillaPresenter.isMobileSafari =
    /iPhone|iPad|iPod/.test(navigator.userAgent) && 
    /Safari/.test(navigator.userAgent) && 
    !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent) &&
    'ontouchstart' in window 

}


GorillaPresenter.startup = function() {
    GorillaPresenter.checkMobileSafari();
    if(GorillaPresenter.isMobileSafari){
      alert("iOS");
    }
    GorillaPresenter.loadConfig();
    GorillaPresenter.loadThemes();
    GorillaPresenter.loadSlides();
    GorillaPresenter.initSlideEditor();
    GorillaPresenter.sicTransit =  new SicTransit("#" + GorillaPresenter.slideRoot,GorillaPresenter.slideSelector);
    GorillaPresenter.sicTransit.setParameter("callback",GorillaPresenter.transitionDone,"*");
    GorillaPresenter.markdown =  window.markdownit({html:true,xhtmlOut:true,typographer:true});
    let aboutElement = document.getElementById("gorilla-presenter-about");
    aboutElement.innerHTML = aboutElement.innerHTML + GorillaPresenter.markdown.render(BrowserFileSystem.collectLicenses());
    //GorillaPresenter.renderPresentationData();
    GorillaPresenter.showSlideShowScreen();
    GorillaPresenter.renderMainMenu();
    GorillaPresenter.setTheme();
    GorillaPresenter.touchStartTimer = GorillaPresenter.touchEndTimer =  GorillaPresenter.clickTimer = null;
    GorillaPresenter.setMenuHandlers(document.body);

}