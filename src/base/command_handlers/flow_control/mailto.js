GorillaPresenter.processMailto = function(directiveparts){
    directiveparts = directiveparts.join(" ");
    directiveparts = directiveparts.split("|");
   
    if(directiveparts.length < 4){
        return "<span class='gorilla-presenter-error-message'>Found mailto without enough arguments; need prompt, email, subject, and body</span>";
    }
    let prompt = directiveparts[0];
    let email = directiveparts[1];
    let subject = directiveparts[2];
    let body = directiveparts[3];
    let mailtoSources = {
    customClass:"gorilla-presenter-isbn",
    items: [
        {
            type: "clickable",
            text: prompt,
            parameter: "mailto:" + email + "?subject=" + subject + "&body=" + body
        },
    ]}
    GorillaPresenter.clickHandlers["gorilla-presenter-mailto"] = function(evt){
        evt.preventDefault();
        evt.stopPropagation()
        evt.stopImmediatePropagation();
        GorillaPresenter.sendMail(evt,evt.target.getAttribute("parameter"));
    }
    return GorillaPresenter.navigableList(mailtoSources);
}