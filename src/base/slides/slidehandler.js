let SlideHandler = {
  inverseTransformations: {
    "swipeInFromRight": "swipeInFromLeft",
    "swipeInFromLeft": "swipeInFromRight",
    "swipeInFromTop": "swipeInFromBottom",
    "swipeInFromBottom": "swipeInFromTop",
    "zoomIn": "zoomIn",
    "cutIn": "cutIn",
    "crossDissolveIn": "crossDissolveIn",
    "fadeInFromBlack": "fadeInFromBlack",
    "fadeInFromWhite": "fadeInFromWhite",
    "fadeInFromGray": "fadeInFromGray",
    "irisIn": "irisIn",
    "irisInFromWhite": "irisInFromWhite",
    "irisInFromBlack": "irisInFromBlack",
    "irisInFromGray": "irisInFromGray",
    "spinIn": "spinIn",
  },

  transformationLookup: {
    "right": "swipeInFromRight",
    "left": "swipeInFromLeft",
    "top": "swipeInFromTop",
    "bottom": "swipeInFromBottom",
    "zoom": "zoomIn",
    "cut": "cutIn",
    "dissolve": "crossDissolveIn",
    "fadeblack": "fadeInFromBlack",
    "fadewhite": "fadeInFromWhite",
    "fadegray": "fadeInFromGray",
    "iris": "irisIn",
    "iriswhite": "irisInFromWhite",
    "irisblack": "irisInFromBlack",
    "irisgray": "irisInFromGray",
    "spin": "spinIn",
  },
  backHistory: [],
  forwardHistory: [],
  directNavigationHistory: [],
  nextTransition: "right",
  slideSelector: "slidehandler-slide-selector",
  slideClass: "slide",
  slideSelector: "slide-selector",
  slideIndex: 0,
  slideID: null,
  sicTransit: new SicTransit("#slideroot", ".panel"),

  slideSelected: function (id) {
    SlideHandler.directNavigate(id);
  },


  getSlideIndex: function (slideID) {
    let ids = SlideRenderer.slideIDs;
    for (let index = 0; index < ids.length; index++) {
      if (ids[index] === slideID) {
        return index;
      }
    }
    UIHandler.warn(LanguageHandler.translate("No slide with this ID:", LanguageHandler.currentLanguage) + slideID);
    return -1;
  },

  getSlideId: function (index) {
    return SlideRenderer.slideIDs[index];
  },

  displaySlideByIndex: function (index, reverse = false) {
    let slideId = SlideHandler.getSlideId(index);
    SlideHandler.displaySlide(slideId, reverse);
  },

  displaySlide: function (slideId, reverse = false) {
    if (slideId === undefined) {
      UIHandler.warn(LanguageHandler.translate("No slide with this ID:", LanguageHandler.currentLanguage) + slideId);
      return;
    }
    SlideHandler.slideID = slideId;
    let transition = SlideHandler.transformationLookup[SlideHandler.nextTransition];
    if (reverse === true) {
      transition = SlideHandler.inverseTransformations[transition];
    }
    SlideHandler.sicTransit.performTransition({ "panelSelector": "#" + slideId, "transitionName": transition, "stackRotationNumber": 0 });
  },

  addSlideToHistory: function (slideID) {
    if (slideID !== null) {
      SlideHandler.backHistory.push(slideID);
    }
  },




  directNavigate: function (slideID) {
    SlideHandler.forwardHistory = [];
    SlideHandler.addSlideToHistory(SlideHandler.slideID); // Save old slide.
    SlideHandler.directNavigationHistory.push(slideID);
    let slideNumber = SlideHandler.getSlideIndex(slideID);
    SlideHandler.slideIndex = slideNumber;
    SlideHandler.nextTransition = SlideRenderer.transitions[SlideHandler.getSlideId(SlideHandler.slideIndex)];
    SlideHandler.displaySlide(slideID, false);
  },

  directNavigateByIndex: function (index) {
    let slideID = SlideHandler.getSlideId(index);
    SlideHandler.directNavigate(slideID);
  },

  slideForward: function () {
    /*  if(GorillaPresenter.transitionBusy === true){
      return;
    } */
    if (SlideRenderer.slideIDs.length === 0) {
      GorillaPresenter.warn(LanguageHandler.translate("No slides. You'll have to make some first.", LanguageHandler.currentLanguage));
      return;
    }
    SlideHandler.backHistory.push(SlideHandler.slideID);
    if ((SlideHandler.forwardHistory.length > 0) && (SlideHandler.directNavigationHistory.length === 0)) {
      SlideHandler.slideID = SlideHandler.forwardHistory.pop();
      SlideHandler.slideIndex = SlideHandler.getSlideIndex(SlideHandler.slideID);
    }
    else {
      SlideHandler.slideIndex = SlideHandler.slideIndex + 1;
    }
    if (SlideHandler.slideIndex >= SlideRenderer.slideIDs.length) {
      SlideHandler.backHistory.pop()
      SlideHandler.slideIndex = SlideRenderer.slideIDs.length - 1;
      UIHandler.notify(LanguageHandler.translate("At last slide.", LanguageHandler.currentLanguage));
      // SlideHandler.displaySlideByIndex(SlideHandler.slideIndex);
      return;
    }
    SlideHandler.nextTransition = SlideRenderer.transitions[SlideHandler.getSlideId(SlideHandler.slideIndex)];
    SlideHandler.displaySlideByIndex(SlideHandler.slideIndex, false);
  },

  slideBack: function () {
    /*  if(GorillaPresenter.transitionBusy === true){
        return;
      } */
    if (SlideRenderer.slideIDs.length === 0) {
      UIHandler.warn(LanguageHandler.translate("No slides. You'll have to make some first.", LanguageHandler.currentLanguage));
      return;
    }
    SlideHandler.forwardHistory.push(SlideHandler.slideID);
    if (SlideHandler.backHistory.length > 0) {
      let previousSlideID = SlideHandler.backHistory.pop();
      let previousSlideIndex = SlideHandler.getSlideIndex(previousSlideID);
      SlideHandler.slideIndex = previousSlideIndex;

    }
    else {
      SlideHandler.slideIndex = SlideHandler.slideIndex - 1;
    }
    if (SlideHandler.directNavigationHistory.length > 0) {
      SlideHandler.directNavigationHistory.pop();
      if (SlideHandler.directNavigationHistory.length === 0) {
        SlideHandler.forwardHistory = [];
      }
    }
    if (SlideHandler.slideIndex < 0) {
      SlideHandler.slideIndex = 0;
      UIHandler.notify(LanguageHandler.translate("At first slide.", LanguageHandler.currentLanguage));
      SlideHandler.forwardHistory.pop();
      return;
    }
    SlideHandler.nextTransition = SlideRenderer.transitions[SlideHandler.getSlideId(SlideHandler.slideIndex)];
    SlideHandler.displaySlideByIndex(SlideHandler.slideIndex, true);
  },


}
