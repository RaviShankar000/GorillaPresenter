GorillaPresenter.syncEditorTextAreas = function (event) {
  const source = event.target;
  let mainEditor = document.getElementById("gorilla-presenter-slide-text-editor");
  let splitEditor = document.getElementById("gorilla-presenter-secondary-slide-text-editor");
  const target = source === mainEditor ? splitEditor : mainEditor;

  // Save scroll positions
  const sourceScroll = source.scrollTop;
  const targetScroll = target.scrollTop;

  // Synchronize text
  mainEditor.value = splitEditor.value = source.value;
  
  // Restore scroll positions
  source.scrollTop = sourceScroll;
  target.scrollTop = targetScroll;
}

GorillaPresenter.editorResized = function() {
  console.log("editors resized");
  let height = GorillaPresenter.slideEditor.offsetHeight;
  let containerHeight = GorillaPresenter.slideEditor.parentElement.offsetHeight;
  GorillaPresenter.splitEditor.style.height =  (containerHeight - height) + "px";
 }

GorillaPresenter.initSlideEditor = function(){
    const slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
    slideEditor.style.height = '100%';
    GorillaPresenter.slideEditor = slideEditor;
    const splitEditor = document.getElementById("gorilla-presenter-secondary-slide-text-editor");
    splitEditor.style.height = '0%';
    new ResizeObserver(GorillaPresenter.editorResized).observe(slideEditor);
    GorillaPresenter.splitEditor = splitEditor;
    const showButton = document.getElementById('split-editor');
    const hideButton = document.getElementById('unsplit-editor');
    GorillaPresenter.initEditorButtons();
    GorillaPresenter.setButtonTranslations();
    slideEditor.value = GorillaPresenter.slideData;
    splitEditor.value = GorillaPresenter.slideData;
    slideEditor.addEventListener('input', GorillaPresenter.saveEditorCursors);
    slideEditor.addEventListener('paste', GorillaPresenter.handleEditorPaste);
    slideEditor.focus();
    console.log("adding split editor event listeners");
['input', 'cut', 'paste'].forEach(eventType => {
    slideEditor.addEventListener(eventType, GorillaPresenter.syncEditorTextAreas);
    splitEditor.addEventListener(eventType, GorillaPresenter.syncEditorTextAreas);
});
showButton.addEventListener('click', () => {
    slideEditor.style.height = "50%";
    splitEditor.style.height = "50%";
    splitEditor.style.display = 'block';
    showButton.style.display = 'none';
    hideButton.style.display = 'inline';
});
hideButton.addEventListener('click', () => {
    splitEditor.style.display = 'none';
    showButton.style.display = 'inline';
    hideButton.style.display = 'none';
    GorillaPresenter.slideEditor.style.height = '100%';
});
  }

  GorillaPresenter.showSlideEditor = function(){
    GorillaPresenter.showUIScreen("gorilla-presenter-slide-editor-container");
    GorillaPresenter.currentScreen = "Slide Editor";
    let slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
   slideEditor.value = GorillaPresenter.slideData;
   if(GorillaPresenter.config.slidePosition < 0){
      GorillaPresenter.config.slideEditorPosition = 0;
    }
    else {
      GorillaPresenter.config.slideEditorPosition = GorillaPresenter.slideOffsets[GorillaPresenter.config.slidePosition];
    }
    
    setTimeout(function(){
      slideEditor.setSelectionRange(GorillaPresenter.config.slideEditorPosition, GorillaPresenter.config.slideEditorPosition);
      slideEditor.blur();
      slideEditor.focus();
      
  },100);
  }
GorillaPresenter.saveEditorCursors = function(){
    let slideEditor = document.getElementById("gorilla-presenter-slide-text-editor");
    GorillaPresenter.config.slideEditorPosition = slideEditor.selectionStart;
  }

GorillaPresenter.updateEditorData = function(){
    let editor = document.getElementById("gorilla-presenter-slide-text-editor");
    GorillaPresenter.slideData = editor.value;
    GorillaPresenter.config.slideEditorPosition = editor.selectionStart;
    console.log("rendering slides from updateEditorData");
    GorillaPresenter.renderPresentationData();
    GorillaPresenter.saveConfig();
}

  
GorillaPresenter.insertTextAtCaret = function(text) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
  },
 

GorillaPresenter.handleEditorPaste = function(event) {
    console.log("handling editor paste");
    let element = event.target;
    if(element.classList.contains('gorilla-presenter-editor')){
      let text = event.clipboardData.getData('text/plain');
      GorillaPresenter.insertTextAtCaret(text);
    }
}

GorillaPresenter.performEditorFunction = function(event){
  alert("performing editor function: " + event.target.title);
}

GorillaPresenter.initEditorButtons = function(){
  let editorButtons = document.querySelectorAll('.gorilla-presenter-editor-button');
  editorButtons.forEach(function(button){
    button.addEventListener('click', GorillaPresenter.performEditorFunction);
  });
  GorillaPresenter.setButtonTranslations();
}

GorillaPresenter.setButtonTranslations = function(){
  let currentLanguage = GorillaPresenter.config.currentLanguage;
  let buttons = document.querySelectorAll('.gorilla-presenter-editor-button');
  buttons.forEach(function(button){
    let englishtitle = button.getAttribute('englishtitle');
    button.title = GorillaPresenter.translate(englishtitle,currentLanguage);
  });
}
