GorillaPresenter.fullScreen = false;


GorillaPresenter.showUIScreen = function(id){
    let screens = document.querySelectorAll(".gorilla-presenter-screen");
    for(let i=0;i<screens.length;i++){
      screens[i].style.display = "none";
    }
    let screen = document.getElementById(id);
    screen.style.display = "block";
    screen.focus();
}

GorillaPresenter.enterFullScreen = function(){
    let element = document.body;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitrequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
    GorillaPresenter.fullScreen = true;
  }

  GorillaPresenter.exitFullScreen = function(){
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    GorillaPresenter.fullScreen = false;
  }

  GorillaPresenter.fadeOut = function(element) {
    let opacity = 1;
    function decrease() {
        opacity -= 0.02;
        if (opacity <= 0){
            // complete
            element.style.opacity = 0;
            element.style.display = "none";
            return true;
        }
        element.style.opacity = opacity;
        requestAnimationFrame(decrease);
    }
    decrease();
}
GorillaPresenter.fadeIn = function(element) {
    let opacity = 0;
    element.style.opacity =  0;
    element.style.display = "block";
    function increase() {
        opacity += 0.02;
        if (opacity >= 1){
            // complete
            element.style.opacity = 1;
            return true;
        }
        element.style.opacity = opacity;
        requestAnimationFrame(increase);
    }
    increase();
}


  GorillaPresenter.warn = function(message,time=1000){
    let warningElement = document.getElementById("gorilla-presenter-warning-message");
    warningElement.innerHTML = message;
    warningElement.style.opacity = 1;
    warningElement.style.display = "block";
   GorillaPresenter.centerElement(warningElement)
    GorillaPresenter.fadeIn(warningElement);
    setTimeout(function(){
      GorillaPresenter.fadeOut(warningElement);
    },time);
  }
  GorillaPresenter.centerElement = function(element){
    let slideElement = document.getElementById(GorillaPresenter.slideRoot);
    const slideStyles = window.getComputedStyle(slideElement);
    let elementStyle = window.getComputedStyle(element);
    let slideWidth = parseInt(slideStyles.width);
    console.log("slideWidth: " + slideWidth);
    let slideHeight = parseInt(slideStyles.height);
    console.log("slideHeight: " + slideHeight);
    let elementWidth = parseInt(elementStyle.width);
    let maxElementWidth = parseInt(elementStyle.maxWidth);
    let actualElementWidth = (elementWidth > maxElementWidth) ? maxelementWidth : elementWidth;
    let elementHeight = parseInt(elementStyle.height);
    let left = (slideWidth - actualElementWidth) / 2;
    console.log("left: " + left);
    let top = (slideHeight - elementHeight) / 2;
    console.log("top: " + top);
    element.style.left = left + "px";
    element.style.top = top + "px"; 
  }

  GorillaPresenter.renderPrinterDialog = function(){
    let printerDialog = document.getElementById("gorilla-presenter-printer-dialog");
    printerDialog.innerHTML = "";
    let dialogContent = "";
    dialogContent += "<span class='translatable'>Paper Size</span>:" + "<input type='radio' name='papersize' id='usletter' value='usletter'/>";
    dialogContent += "<label for='usletter'><span class='translatable'>US Letter</span></label>";
    dialogContent += "<input type='radio' name='papersize' id='a4' value='a4'/>";
    dialogContent += "<label for='a4'>A4</label>";
    dialogContent += "<br/>";
    dialogContent += "<span class='translatable'>Slides Per Page</span>:" + "<input type='radio' name='slidesperpage' id='slides6up' value='6up'/>";
    dialogContent += "<label for='slides6up'>6</label>";
    dialogContent += "<input type='radio' name='slidesperpage' id='slides1up' value='1up'/>";
    dialogContent += "<label for='slides1up'>1</label>";
    dialogContent += "<br/>";
    dialogContent += "<div><span class='translatable'>In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page</span>.</div>";
    dialogContent += "<br/>";
    dialogContent += "<button id='print-button' onclick='GorillaPresenter.printSlides()'><span class='translatable'>Print</span></button>";
    printerDialog.innerHTML = dialogContent;
    document.getElementById("gorilla-presenter-printer-dialog").style.display = "block";
    GorillaPresenter.centerElement(document.getElementById("gorilla-presenter-printer-dialog"));
  }