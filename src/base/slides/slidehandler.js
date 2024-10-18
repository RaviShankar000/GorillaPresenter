SlideHandler = {
  inverseTransformations: {
    "swipeInFromRight":"swipeInFromLeft",
    "swipeInFromLeft":"swipeInFromRight",
    "swipeInFromTop":"swipeInFromBottom",
    "swipeInFromBottom":"swipeInFromTop",
    "zoomIn":"zoomIn",
    "cutIn":"cutIn",
    "crossDisolveIn":"crossDisolveIn",
    "fadeInFromBlack":"fadeInFromBlack",
    "fadeInFromWhite":"fadeInFromWhite",
    "fadeInFromGray":"fadeInFromGray",
    "irisIn":"irisIn",
    "irisInFromWhite":"irisInFromWhite",
    "irisInFromBlack":"irisInFromBlack",
    "irisInFromGray":"irisInFromGray",
    "spinIn":"spinIn",
  },

  workspaceChooser: "slidehandler-workspace-chooser",
  slideSelector: "slidehandler-slide-selector",
  slideClass: "slide",
  slideSelector: "slide-selector",
  slideIndex: 0,
  slideID: null,
  speakerNotesWindow: null,
  sicTransit: new SicTransit("#slideroot",".panel"),

  slideSelected: function(id){
    SlideHandler.slideID = id;
    SlideHandler.slideIndex = SlideHandler.getSlideIndex(id);
    SlideHandler.displaySlide(id);
  },

  loadPresentation: function(){
    document.getElementById(SlideHandler.workspaceChooser).click();
  },
  workspaceChosen: function(){
    let uploader = document.getElementById(SlideHandler.workspaceChooser);
    let workspace = uploader.files[0];
    let reader = new FileReader();
    reader.onloadend = function(evt){
      let newfile = evt.target.result;
      parent.clearDocumentAndWrite(newfile);
    };
    reader.readAsText(workspace);
  },
  downloadPresentation: function(){
    SlideHandler.saveSlides();
    let iframe_template = BrowserFileSystem.readInternalTextFile("base/internal_frame_template.html");
    let version = BrowserFileSystem.readInternalTextFile("build/version").trim();
    let build = BrowserFileSystem.readInternalTextFile("build/build").trim();
    let date = BrowserFileSystem.readInternalTextFile("build/build_date").trim();
    iframe_template = iframe_template.replace(/___VERSION___/g, version);
    iframe_template = iframe_template.replace(/___BUILD___/g, build);
    iframe_template = iframe_template.replace(/___BUILD_DATE___/g, date);
    iframe_template = iframe_template.replace(/___FILESYSTEM___/g, "BrowserFileSystem.fs=" + JSON.stringify(BrowserFileSystem.fs));
    iframe_template = iframe_template.replace(/___DEBUGGING___/g,debugging);
    iframe_data =  "var iframeContent = \"" + BrowserFileSystem.bytesToBase64(iframe_template) + "\";\n";
    let index_template = BrowserFileSystem.readInternalTextFile("base/index_template.html");
    index_template = index_template.replace(/___IFRAMECONTENT___/,iframe_data);
    if(debugging){
      console.log("Downloading debuggable file");
      BrowserFileSystem.downloadFile("GorillaPresenter" + SlideHandler.downloadDate(),iframe_template,"text/html");
    }
    else{
      console.log("Downloading base file");
    BrowserFileSystem.downloadFile("GorillaPresenter" + SlideHandler.downloadDate(),index_template,"text/html");
    }
  },
 
  getSlideIndex: function(slideID){
    let ids = SlideRenderer.slideIDs;
    for(slideIndex = 0; slideIndex < ids.length; slideIndex++){
      if(ids[slideIndex] === slideID){
        return slideIndex;
      }
    }
    UIHandler.warn(LanguageHandler.translate("No slide with this ID:",Language.currentLanguage) + slideID);
    return -1;
  },
 
  displaySlideByIndex: function(slideIndex,reverse=false){
    let slideId = SlideRenderer.slideIDs[slideIndex];
    SlideHandler.displaySlide(slideId,reverse);
  },

  displaySlide: function(slideId,reverse=false){
  if(slideId === undefined){
    UIHandler.warn(LanguageHandler.translate("No slide with this ID:",Language.currentLanguage) + slideId);
    return;
  }
  console.log("Displaying slide " + slideId);
  /* let slides = document.getElementsByClassName("slide");
  for(let i = 0; i < slides.length; i++){
    slides[i].style.display = "none";
  } */
  let transition = "swipeInFromRight";
  if(reverse === true){
    transition = SlideHandler.inverseTransformations[transition];
  }

  /*let slide = document.getElementById(slideId);
  slide.style.display = "block"; */
  SlideHandler.sicTransit.performTransition({"panelSelector":"#" + slideId, "transitionName":transition,"stackRotationNumber":0});
},

showSpeakerNotes: function(){
  if(SlideHandler.speakerNotesWindow === null || SlideHandler.speakerNotesWindow.closed){
    SlideHandler.speakerNotesWindow = window.open("",Language.translate("Speaker Notes",Language.currentLanguage),"scrollbars=yes,resizable=yes,location=no,toolbar=no,menubar=no,width=800,height=600");
}
else{
   SlideHandler.speakerNotesWindow.focus();
}
let notes = SlideHandler.speakerNotes.replace(/\n/g,"<br/><br/>\n");
 SlideHandler.speakerNotesWindow.document.write("<html><head><title>" + Language.translate("Speaker Notes",Language.currentLanguage) + "</title></head><body>" + notes + "</body></html>");
},
}
