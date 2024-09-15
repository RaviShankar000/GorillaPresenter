

GorillaPresenter.processExternalLinks = function(titleparts,links){
    let title = titleparts.join(" ").trim();
    if(title === "")
    {
        return "<span class='gorilla-presenter-error-message'>Found externallinks directive without title.</span>";
    }
    console.log("externalLinks title is " + title);

    if(links.length < 0){
        return "<span class='gorilla-presenter-error-message'>Found externalLinks directive without links.</span>";
    }

    let selftestobject = {
        customClass: "gorilla-presenter-externallinks",
        items: []
    };
    selftestobject.items.push({
        type: "title",
        text: title,
        parameter: "title"
    });
    for(i = 0; i < links.length; i++){
        let link = links[i].split("|");
        if(link.length < 2){
            return "<span class='gorilla-presenter-error-message'>Found externalLinks without enough arguments; need title and URL</span>";
        }
        let title = link[0];
        let url = link[1];
        selftestobject.items.push({
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
    return GorillaPresenter.navigableList(selftestobject);
}

GorillaPresenter.processSelfTestQuestion = function(question){
    let gotCorrectAnswer = false;
    let questionparts = question.split("\n");
    if(questionparts.length < 2){
        return [
            {
                type: "error",
                text: "Error: Found selftest question without title or answers."
            }
        ];
    }
    let questiontitle = questionparts[0];
    let questionarray = [{
        type: "header",
        text: questiontitle
    }];
    questionparts.shift();
    for(let i=0;i < questionparts.length;i++){
        let answer = questionparts[i];
        let text = answer.trim();
        if(text === ""){
            continue;
        } 
        let item = {
            text: text,
            parameter: "false"
        };
        if(answer.indexOf("*") === 0){
            gotCorrectAnswer = true;
            item.parameter = "true";
            item.text = answer.substring(1).trim();

        }
        questionarray.push(item);
    }
    if(gotCorrectAnswer === false){
        return [
            {
                type: "error",
                text: "Error: Found selftest question  " + questiontitle + "without correct answer."
            }
        ];
    }
    return questionarray;
}
