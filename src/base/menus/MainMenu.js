GorillaPresenter.mainMenuVisible = false;
GorillaPresenter.currentScreen = "Slide Show";

GorillaPresenter.renderMainMenu = function () {
  let mainMenu = document.getElementById("gorilla-presenter-main-menu");
  mainMenu.innerHTML = "";
  if (GorillaPresenter.currentScreen === "Slide Show") {
    GorillaPresenter.renderSlideSelector();
  }
  GorillaPresenter.renderMainMenuItems(mainMenu);
  GorillaPresenter.renderThemes(mainMenu);
  GorillaPresenter.renderFontStackSelectors(mainMenu);
  GorillaPresenter.renderLanguages(mainMenu);
},

  GorillaPresenter.renderMainMenuItems = function (mainMenu) {
    //let mainMenu = document.getElementById("gorilla-presenter-main-menu");
    let menuItems = ["Slide Show", "Slide Editor", "Save Presentation", "Load Presentation", "Enter/Exit Full Screen", "Show Speaker Notes",  "Media Library",  "About"];
    for (let i = 0; i < menuItems.length; i++) {
      if (GorillaPresenter.currentScreen === menuItems[i]) {
        continue;
      }

      let menuItem = document.createElement("div");
      menuItem.setAttribute("baselabel", menuItems[i]);
      menuItem.innerHTML = "<span class='translatable'>" + menuItems[i] + "</span>";
      menuItem.className = "gorilla-presenter-main-menu-item link";
      menuItem.onclick = GorillaPresenter.processMainMenuClick;
      mainMenu.appendChild(menuItem);
    }
  }

GorillaPresenter.setMenuHandlers = function (element) {
  // Need to handle this in case the user enters/exits full screen mode using the browser menu or hitting esc on the keyboard.
  document.onfullscreenchange = (event) => {
    if (document.fullscreenElement !== null) {
      GorillaPresenter.fullScreen = true;
    }
    else {
      GorillaPresenter.fullScreen = false;
    }
  };
  element.addEventListener('keydown', function (event) {
    const isCmdOrCtrl = event.ctrlKey || event.metaKey;
    if (isCmdOrCtrl && event.key.toLowerCase() === 's') {
      event.preventDefault();
      GorillaPresenter.editor.updateEditorData();
      GorillaPresenter.downloadSlides();
      return;
    }
    if (isCmdOrCtrl && event.key.toLowerCase() === 'e') {
      if (GorillaPresenter.mainMenuVisible === false) {
        GorillaPresenter.showMainMenu(event);
      }
      else {
        GorillaPresenter.hideMainMenu(event);
      }
      return;
    }
    GorillaPresenter.hideMainMenu(event);
    if (GorillaPresenter.currentScreen !== "Slide Show") {
      return;
    }
    // Try to handle any keys that someone might try to use to navigate the slides.
    if (event.key === "ArrowRight") {
      GorillaPresenter.slideForward();
      return;
    }
    if (event.key === "ArrowLeft") {
      GorillaPresenter.slideBack();
      return;
    }
    if (event.key === "Enter") {
      GorillaPresenter.slideForward();
      return;
    }
    if (event.key === "Backspace") {
      GorillaPresenter.slideBack();
      return;
    }
    if (event.code === "Space") {
      GorillaPresenter.slideForward();
      return;
    }
    // In case a desperate user tries to escape full screen mode. :-)
    if (event.code === "Escape") {
      if (GorillaPresenter.mainMenuVisible === true) {
        GorillaPresenter.hideMainMenu(event);
        return;
      }
      if (GorillaPresenter.fullScreen === true) {
        GorillaPresenter.exitFullScreen();
        GorillaPresenter.fullScreen = false;
        return;
      }
    }
    return;
  });

  // Long press detection for touch devices
  element.addEventListener('touchstart', function (event) {
    GorillaPresenter.touchStartX = event.touches[0].clientX;
    GorillaPresenter.touchStartTimer = setTimeout(function () {
      if (GorillaPresenter.mainMenuVisible === false) {
        GorillaPresenter.showMainMenu(event);
        return;
      }
      else {
        GorillaPresenter.hideMainMenu(event);
        return;
      }
    }, 500);
  });
  element.addEventListener('touchend', function (event) {
    clearTimeout(GorillaPresenter.touchStartTimer);
    GorillaPresenter.touchStartTimer = null;
    const touchEndX = event.changedTouches[0].clientX;
    const touchStartX = GorillaPresenter.touchStartX;
    const touchThreshold = 50;
    if (touchEndX - touchStartX > touchThreshold) {
      GorillaPresenter.slideBack();
    } else if (touchStartX - touchEndX > touchThreshold) {
      GorillaPresenter.slideForward();
    }
  });
  element.addEventListener('touchmove', function (event) {
    clearTimeout(GorillaPresenter.touchStartTimer);
    GorillaPresenter.touchStartTimer = null;
  });
  element.addEventListener('mouseup', function (event) {
    if (GorillaPresenter.mainMenuVisible === true && !event.target.closest("#gorilla-presenter-main-menu")) {
      GorillaPresenter.hideMainMenu(event);
      return;
    }
    const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;
    if (isCtrlOrCmdPressed) {
      GorillaPresenter.showMainMenu(event);
      return;
    }
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      return;
    }
    if ((GorillaPresenter.currentScreen === "Slide Show") && (event.target.id === "gorilla-presenter-slideroot" || event.target.closest("#gorilla-presenter-slideroot"))) {
      const viewportWidth = window.innerWidth;
      const x = event.clientX;
    if (x < viewportWidth / 2) {
      GorillaPresenter.slideBack();
    } else {
      // Mouseup on the right half
  
      GorillaPresenter.slideForward();
    }
      return;
    }
  });

},

  GorillaPresenter.processMainMenuClick = function (event) {
    let target = event.target;
    let label = GorillaPresenter.findAttributeInAncestors(target, "baselabel");
    if (label === null) {
      return;
    }
    switch (label) {
      case "Slide Show": GorillaPresenter.showSlideShowScreen(); break;
      case "Show Speaker Notes": GorillaPresenter.showSpeakerNotes(); break;
      case "Enter/Exit Full Screen": if (GorillaPresenter.fullScreen === true) {
        GorillaPresenter.exitFullScreen()
      }
      else {
        GorillaPresenter.enterFullScreen();
      } break;
      case "Slide Editor": GorillaPresenter.showSlideEditor(); break;
      case "Media Library": GorillaPresenter.showMediaLibrary(); break;
      case "Save Presentation": GorillaPresenter.downloadSlides(); break;
      case "Load Presentation": GorillaPresenter.loadPresentation(); break;
      case "Documentation": GorillaPresenter.showDocumentation(); break;
      case "About": GorillaPresenter.showAbout(); break;
    }
    GorillaPresenter.hideMainMenu(event);
  },
  

GorillaPresenter.showSlideShowScreen = function () {
  GorillaPresenter.showUIScreen("gorilla-presenter-slideroot");
  GorillaPresenter.editor.updateEditorData();
  GorillaPresenter.displaySlide("cutIn");
  GorillaPresenter.currentScreen = "Slide Show";
}

GorillaPresenter.showAbout = function () {
  GorillaPresenter.showUIScreen("gorilla-presenter-about-container");
  GorillaPresenter.currentScreen = "About";
}


GorillaPresenter.showMainMenu = function (event) {
  GorillaPresenter.renderMainMenu();

  GorillaPresenter.mainMenuVisible = true;
  GorillaPresenter.editor.saveEditorCursors();
  let slideElement = document.getElementById(GorillaPresenter.slideRoot);
  const slideStyles = window.getComputedStyle(slideElement);
  let mainMenu = document.getElementById("gorilla-presenter-main-menu");
  mainMenu.style.opacity = 1;
  mainMenu.style.display = "block";
  GorillaPresenter.centerElement(mainMenu);
}

GorillaPresenter.hideMainMenu = function (event) {
  if (GorillaPresenter.mainMenuVisible === false) {
    return
  }
  GorillaPresenter.eatMouseUp = true;
  let mainMenu = document.getElementById("gorilla-presenter-main-menu");
  mainMenu.style.display = "none";
  GorillaPresenter.mainMenuVisible = false;
}
