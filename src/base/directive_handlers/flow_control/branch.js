GorillaPresenter.getMatchingSlideName = function(nickname){
    nickname = nickname.trim().toLowerCase();
    for(let i = 0; i < GorillaPresenter.slideTitles.length; i++){  
        let filelc = GorillaPresenter.slideTitles[i].toLowerCase();
        if(filelc.indexOf(nickname) !== -1){
            return i;
        }
    }
    return null;
}

GorillaPresenter.navigateToSlide = function(evt,slideName){
    evt.preventDefault();
    evt.stopImmediatePropagation();
    let slideNumber = GorillaPresenter.getMatchingSlideName(slideName);
    if(slideNumber !== null){
        console.log("Navigating to slide " + slideNumber);
        GorillaPresenter.config.slidePosition = slideNumber;
        GorillaPresenter.displaySlide("cutIn");
    }
    else{
        console.error("No matching slide for " + slideName);
    }
}

GorillaPresenter.processBranch = function(titleparts,links){
    let title = titleparts.join(" ").trim();
    if(title === "")
    {
        return "<span class='gorilla-presenter-error-message'>Found branch directive without title.</span>";
    }
    console.log("branch title is " + title);

    if(links.length < 0){
        return "<span class='gorilla-presenter-error-message'>Found branch directive without slide list</span>";
    }
    let linksobject = {
        customClass: "gorilla-presenter-branch icon-right-hand",
        items: []
    };
    linksobject.items.push({
        type: "title",
        text: title,
        parameter: "title"
    });
    for(i = 0; i < links.length; i++){
        console.log("branch link is " + links[i]);
        if(links[i].trim() === ""){
            continue;
        }
        let link = links[i].split("|");
        if(link.length < 2){
            return "<span class='gorilla-presenter-error-message'>Found branch item without enough arguments; need title and slide name</span>";
        }
        let title = link[0];
        let slidename = link[1];
        linksobject.items.push({
            type: "branch",
            text: title,
            parameter: slidename
        }); 
    }
    GorillaPresenter.clickHandlers["gorilla-presenter-branch"] = function(evt){
        evt.preventDefault();
        evt.stopPropagation()
        evt.stopImmediatePropagation();
        GorillaPresenter.navigateToSlide(evt,evt.target.getAttribute("parameter"));
    }
    return GorillaPresenter.navigableList(linksobject);
}