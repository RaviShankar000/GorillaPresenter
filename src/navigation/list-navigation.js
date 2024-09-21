GorillaPresenter.navigableListItem = function(text, customClass, parameter,type,iconBefore,iconAfter){
    if(iconBefore === undefined){
        iconBefore = "";
    }
    else{
        iconBefore = "<span class='" + iconBefore + "'></span>";
    }
    if(iconAfter === undefined){
        iconAfter = "";
    }
    else{
        iconAfter = "<span class='" + iconAfter + "'></span>";
    }
    
    if(type ===  "title"){
        return "<li class='navigable-list-item navigable-list-title'>" +  text +  "</li>";
    }
    else if(type === "header"){
        return "<li class='navigable-list-item navigable-list-header'>"  + text  + "</li>";
    }
    else if (type === "error"){
        return "<li class='navigable-list-item navigable-list-error'>" + text + "</li>";
    }
    else {
    return "<li class='navigable-list-item link " + customClass + "' parameter='" + parameter + "'>" + iconBefore +  text + iconAfter + "</li>";
    }
}
GorillaPresenter.navigableList = function(listParameters){
    let items = listParameters.items;
    let list = "<ul class='navigable-list'>"
    let customClass = listParameters.customClass;
    for(let i = 0; i < items.length; i++){
        list += GorillaPresenter.navigableListItem(items[i].text,customClass,items[i].parameter,items[i].type,listParameters.iconBefore,listParameters.iconAfter);
    }
    list += "</ul>";
    return list;
}

GorillaPresenter.openNewWindow = function(evt,url){
    evt.preventDefault();
    evt.stopImmediatePropagation();
    window.open(url, '_blank');
}

    