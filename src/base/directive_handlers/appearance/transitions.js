GorillaPresenter.transitionTable = {
    "swiperight":["swipeInFromRight","swipeInFromLeft"], 
    "swipeleft":["swipeInFromLeft","swipeInFromRight"],
    "swipetop":["swipeInFromTop","swipeInFromBottom"],
    "swipebottom":["swipeInFromBottom","swipeInFromTop"],
    "cut":["cutIn","cutIn"],
    "crossdissolve":["crossDissolveIn","crossDissolveIn"],
    "iris":["irisIn","irisIn"],
    "spin":["spinIn","spinIn"],
    "zoom":["zoomIn","zoomIn"]
}

GorillaPresenter.setTransition = function(directiveparts,slideIndex){
    let transition = directiveparts[0];
    if(GorillaPresenter.transitionTable[transition] === undefined){
        GorillaPresenter.slideTransitions[slideIndex] = ["cut","cut"]
        return "Unrecognized transition: " + directiveparts[0];
    }
    else {
        GorillaPresenter.slideTransitions[slideIndex] = GorillaPresenter.transitionTable[transition];
    }
    return "";
}