GorillaPresenter.slideRoot = "gorilla-presenter-slideroot";
GorillaPresenter.slideClass = "gorilla-presenter-slide";
GorillaPresenter.slideSelector = ".gorilla-presenter-slide";
GorillaPresenter.slideIdFragment =  "gorilla-presenter-slide-";
GorillaPresenter.slidePosition = -1;
GorillaPresenter.speakerNotes = "";
GorillaPresenter.slideIDs = [];
GorillaPresenter.slideTransitionsForward = [];
GorillaPresenter.slideTransitionsBack =  [];
GorillaPresenter.transitionBusy = false; // This is a flag to prevent multiple transitions from happening at once.
GorillaPresenter.loadSlides = function(){
    if(BrowserFileSystem.fileExists("userdata/slides.md")){
        GorillaPresenter.slideData = BrowserFileSystem.readInternalTextFile("userdata/slides.md");
     }
     else{
        GorillaPresenter.slideData = "#No Slides\nYou need to add some slides\n";
     }
     document.getElementById("gorilla-presenter-slide-text-editor").value = GorillaPresenter.slideData;
    if(BrowserFileSystem.fileExists("userdata/slideposition")){
        GorillaPresenter.slidePosition = parseInt(BrowserFileSystem.readInternalTextFile("userdata/slideposition"));
    }
    else{
      GorillaPresenter.slidePosition = -1;
    }
  }

GorillaPresenter.renderSlides = function(element){
    GorillaPresenter.speakerNotes = "";
    for(let i = 0; i < GorillaPresenter.slideIDs.length; i++) {
      let slideId = GorillaPresenter.slideIDs[i];
      let slideElement = document.getElementById(slideId);
      if(slideElement){
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
    text = text + "# Gorilla Presenter\n\Gorilla Presenter needs your help.\n\n" + "<a href='https://www.gorillapresenter.com/support'><img src=" + BrowserFileSystem.readInternalFileDataURL("icons/logo-small.png") + " width='30%' height='30%' style='display:block;margin-left:auto;margin-right:auto;'></a>\n";
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

  }

GorillaPresenter.render1up = async function(papersize){
  const paperclass =  " " + papersize + "-landscape";
  const innerclass = "gorilla-presenter-printslide-1-up " + paperclass;
  
  const container1up = document.getElementById("gorilla-presenter-1-up-container");
  container1up.innerHTML = "";
  let text; 
  let slidelines = GorillaPresenter.slideData.split("\n");
  let decommentedlines = [];
  for(let i=0;i < slidelines.length;i++){
     text = slidelines[i];
    if(text.indexOf(";") === 0){
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
    newSlide.setAttribute("class", innerclass);
    newSlide.setAttribute("id", id);
    newSlide.innerHTML =   GorillaPresenter.markdown.render(slidetext) ;
    container1up.appendChild(newSlide);
    renderMathInElement(newSlide);
  }
    document.getElementById("gorilla-presenter-slideroot").style.display = "none";
    container1up.style.display="block";
    window.print();
    container1up.style.display="none";
    document.getElementById("gorilla-presenter-slideroot").style.display = "block";
  }

GorillaPresenter.render6up = async function(papersize){
  const paperclass =  " " + papersize + "-portrait";
  
  const slideclass = "gorilla-presenter-printslide-6-up-slide ";
  const pageclass = "gorilla-presenter-printslide-6-up-page ";
  const wrapperclass = "gorilla-presenter-6-up-slide-wrapper"
  const container6up = document.getElementById("gorilla-presenter-6-up-container");
  container6up.innerHTML = "";
  let text; 
  let slidelines = GorillaPresenter.slideData.split("\n");
  let decommentedlines = [];
  for(let i=0;i < slidelines.length;i++){
    text = slidelines[i];
    if(text.indexOf(";") === 0){
      continue;
    }
    decommentedlines.push(text);
  }
  text = decommentedlines.join("\n");
  let slidetexts = text.split(/^# /gm);
  slidetexts.shift();
  let currentPage;
  for(let j=0; j < slidetexts.length;j++){
    if(j % 6 === 0){
      currentPage = document.createElement("div");
      currentPage.setAttribute("class", pageclass + paperclass);
      container6up.appendChild(currentPage);
   }
    let slidetext = "# " + slidetexts[j];
    let newSlideWrapper = document.createElement("div");
    newSlideWrapper.setAttribute("class",wrapperclass);
    currentPage.appendChild(newSlideWrapper);
    let newSlide = document.createElement("div");
    let id = GorillaPresenter.slideIdFragment + uuid();
    newSlide.setAttribute("class", slideclass);
    newSlide.setAttribute("id", id);
    newSlide.innerHTML =   GorillaPresenter.markdown.render(slidetext) ;
    newSlideWrapper.appendChild(newSlide);
    renderMathInElement(newSlide);
  }
    document.getElementById("gorilla-presenter-slideroot").style.display = "none";
    container6up.style.display="block";
    window.print();
   /* container6up.style.display="none";
    document.getElementById("gorilla-presenter-slideroot").style.display = "block"; */
  }

  GorillaPresenter.saveSlides = function(){
    BrowserFileSystem.writeInternalTextFile("userdata/slides.md",GorillaPresenter.slideData);
    BrowserFileSystem.writeInternalTextFile("userdata/slideposition",GorillaPresenter.slidePosition.toString());
  }


GorillaPresenter.slideForward = function(){
  if(GorillaPresenter.transitionBusy === true){
    console.log("slideForward: Transition handler is busy.");
    return;
  }
  let transition = GorillaPresenter.slideTransitionsForward[GorillaPresenter.slidePosition];
  if(transition === undefined){
    transition = "swipeInFromRight";
  }
  GorillaPresenter.slidePosition = GorillaPresenter.slidePosition + 1;
  GorillaPresenter.displaySlide(transition);
}

GorillaPresenter.slideBack = function(){
  if(GorillaPresenter.transitionBusy === true){
    console.log("slideBack: Transition handler is busy.");
    return;
  }
  let transition = GorillaPresenter.slideTransitionsBack[GorillaPresenter.slidePosition];
  if(transition === undefined){
    transition = "swipeInFromLeft"
  } 
  GorillaPresenter.slidePosition = GorillaPresenter.slidePosition - 1;
  GorillaPresenter.displaySlide(transition);
}
GorillaPresenter.transitionDone = function(){
  GorillaPresenter.transitionBusy = false;
}
GorillaPresenter.displaySlide = function(transition){
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
  GorillaPresenter.transitionBusy = true;
  setTimeout(function(){GorillaPresenter.transitionBusy = false;},4000); // Just in case something goes wrong, we don't want to be stuck in transitionBusy mode.
  GorillaPresenter.sicTransit.performTransition({"panelSelector":"#" + slideId, "transitionName":transition,"stackRotationNumber":0});
}


  