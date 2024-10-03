GorillaPresenter.processISBN = function(directiveparts){
    directiveparts = directiveparts.join(" ");
    directiveparts = directiveparts.split("|");
    if(directiveparts.length < 2){
        return "<span class='gorilla-presenter-error-message'>Found ISBN without enough arguments; need ISBN and title</span>";
    }
    let isbn = directiveparts[0];
    let title = directiveparts[1];
    let coverId = uuid();
    let bookSources = {
        customClass:"gorilla-presenter-isbn",
        items: [
            {
                type:"title",
                text: title,
                parameter: "title",
            },
            {
                type: "clickable",
                text: "Worldcat",
                parameter: "https://www.worldcat.org/isbn/" + isbn,
            },
            {
                text: "Amazon",
                parameter: "https://www.amazon.com/s?k=" + isbn,
            },
            {
                text: "Google Books",
                parameter: "https://books.google.com/books?isbn=" + isbn,
            },
            {
                text: "Open Library",
                parameter: "https://openlibrary.org/isbn/" + isbn,
            },
            {
                text: "Barnes and Noble",
                parameter: "https://www.barnesandnoble.com/s/" + isbn,
            },
            {
                text: "AbeBooks",
                parameter: "https://www.abebooks.com/servlet/SearchResults?isbn=" + isbn
            },
        ]
    };
    GorillaPresenter.clickHandlers["gorilla-presenter-isbn"] = function(evt){
        evt.preventDefault();
        evt.stopPropagation()
        evt.stopImmediatePropagation();
        GorillaPresenter.openNewWindow(evt,evt.target.getAttribute("parameter"));
    }
    return GorillaPresenter.navigableList(bookSources);
}
