
GorillaPresenter.scoreSelfTest = function(event,isCorrect){
    if(isCorrect === "true"){
        alert(GorillaPresenter.config.correctAnswer);
    }
    else{
        alert(GorillaPresenter.config.incorrectAnswer);
    }
}

GorillaPresenter.setTestResponses = function(responses){
    let responseparts = responses.join(" ").split("|");
    if(responseparts.length < 2){
        return "<span class='gorilla-presenter-error-message'>Error: Found selftestresponses without correct and incorrect answers.</span>";
    }
    GorillaPresenter.config.correctAnswer = responseparts[0];
    GorillaPresenter.config.incorrectAnswer = responseparts[1];
    GorillaPresenter.saveConfig();
    return "";
}

GorillaPresenter.processSelfTest = function(titleparts,directivelines){
    let title = titleparts.join(" ").trim();
    if(title === "")
    {
        return "<span class='gorilla-presenter-error-message'>Found selftest directive without title.</span>";
    }
    console.log("selfTest title is " + title);

    if(directivelines.length < 0){
        return "<span class='gorilla-presenter-error-message'>Found selftest directive without body.</span>";
    }
    
    let selftestobject = {
        customClass: "gorilla-presenter-selftest",
        items: []
    };
    selftestobject.items.push({
        type: "title",
        text: title,
        parameter: "title"
    });
    let questions = directivelines.join("\n").split("\n\n");
    console.log("selftest: there are " + questions.length + " questions");
    console.log("the questions are " + questions);
    for(i = 0; i < questions.length; i++){
        if(questions[i].trim() === ""){
            continue;
        }
        selftestobject.items = selftestobject.items.concat(GorillaPresenter.processSelfTestQuestion(questions[i]));
    }
    GorillaPresenter.clickHandlers["gorilla-presenter-selftest"] = function(evt){
        evt.preventDefault();
        evt.stopPropagation()
        evt.stopImmediatePropagation();
        GorillaPresenter.scoreSelfTest(evt,evt.target.getAttribute("parameter"));
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
                text: "Error: Found selftest question '" + questiontitle + "' without a correct answer."
            }
        ];
    }
    return questionarray;
}
