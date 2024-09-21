GorillaPresenter.processExternalLinks = function(titleparts,links){
    let title = titleparts.join(" ").trim();;
    console.log("externalLinks title is " + title);
    console.log("externalLinks links are " + links);
    console.log("externalLinks links length is " + links.length);
    if(title === "")
    {
        return "<span class='gorilla-presenter-error-message'>Found externallinks directive without title.</span>";
    }
    console.log("externalLinks title is " + title);

    if(links.length < 0){
        return "<span class='gorilla-presenter-error-message'>Found externalLinks directive without links.</span>";
    }

    let linksobject = {
        customClass: "gorilla-presenter-externallinks icon-link-ext",
        items: []
    };
    linksobject.items.push({
        type: "title",
        text: title,
        parameter: "title"
    });
    for(i = 0; i < links.length; i++){
        console.log("externalLinks link is " + links[i]);
        if(links[i].trim() === ""){
            continue;
        }
        let link = links[i].split("|");
        if(link.length < 2){
            return "<span class='gorilla-presenter-error-message'>Found externallinks without enough arguments; need title and URL</span>";
        }
        let title = link[0];
        let url = link[1];
        linksobject.items.push({
            type: "clickable",
            text: title,
            parameter: url
        }); 
    }
    GorillaPresenter.clickHandlers["gorilla-presenter-externallinks"] = function(evt){
        evt.preventDefault();
        evt.stopPropagation()
        evt.stopImmediatePropagation();
        GorillaPresenter.openNewWindow(evt,evt.target.getAttribute("parameter"));
    }
    return GorillaPresenter.navigableList(linksobject);
}