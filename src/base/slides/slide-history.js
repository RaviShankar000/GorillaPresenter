GorillaPresenter.slidenav = {};
GorillaPresenter.slidenav.backHistory = [];
GorillaPresenter.slidenav.forwardHistory = [];

GorillaPresenter.slidenav.addSlideToHistory = function(slideIndex){
    GorillaPresenter.slidenav.backHistory.push(slideIndex);
}


GorillaPresenter.slidenav.slideForward = function(){
    if(GorillaPresenter.transitionBusy === true){
      return;
    }
    if(GorillaPresenter.slideIDs.length === 0){
      GorillaPresenter.warn(GorillaPresenter.translate("No slides. You'll have to make some first.",GorillaPresenter.config.currentLanguage));
      return;
    }
    GorillaPresenter.slidenav.backHistory.push(GorillaPresenter.config.slidePosition);
    if(GorillaPresenter.slidenav.forwardHistory.length > 0){
        let slideIndex = GorillaPresenter.slidenav.forwardHistory.pop();
        GorillaPresenter.config.slidePosition = slideIndex;
    }
    else{
        GorillaPresenter.config.slidePosition = GorillaPresenter.config.slidePosition + 1;
    }
    if(GorillaPresenter.config.slidePosition >= GorillaPresenter.slideIDs.length){
      GorillaPresenter.config.slidePosition = (GorillaPresenter.slideIDs).length -1 ;
      GorillaPresenter.warn(GorillaPresenter.translate("At last slide.",GorillaPresenter.config.currentLanguage));
      GorillaPresenter.slidenav.pop();
      return;
    }
    let transition = GorillaPresenter.slideTransitions[GorillaPresenter.config.slidePosition][0];
    if(transition === undefined){
      transition = "swipeInFromRight";
    }
    GorillaPresenter.displaySlide(transition);
  }
  
  GorillaPresenter.slidenav.slideBack = function(){
    if(GorillaPresenter.transitionBusy === true){
      return;
    }
    if(GorillaPresenter.slideIDs.length === 0){
      GorillaPresenter.warn(GorillaPresenter.translate("No slides. You'll have to make some first.",GorillaPresenter.config.currentLanguage));
      return;
    }
    GorillaPresenter.slidenav.forwardHistory.push(GorillaPresenter.config.slidePosition);
    if(GorillaPresenter.slidenav.backHistory.length > 0){
        let slideIndex = GorillaPresenter.slidenav.backHistory.pop();
        GorillaPresenter.config.slidePosition = slideIndex;
    }
    else{
        GorillaPresenter.config.slidePosition = GorillaPresenter.config.slidePosition - 1;
    }
    if(GorillaPresenter.config.slidePosition < 0){
      GorillaPresenter.config.slidePosition = 0;
      GorillaPresenter.warn(GorillaPresenter.translate("At first slide.",GorillaPresenter.config.currentLanguage));
      GorillaPresenter.slidenav.forwardHistory.pop();
      return;
    }
    let transition = GorillaPresenter.slideTransitions[GorillaPresenter.config.slidePosition][1];
    if(transition === undefined){
      transition = "swipeInFromLeft"
    }
    GorillaPresenter.displaySlide(transition);
  }