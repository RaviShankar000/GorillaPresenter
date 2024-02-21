PocketPresenter.slideIDNumber = 1;
PocketPresenter.sicTransit = new SicTransit("#pocket-presenter-slideroot",".pocket-presenter-slide"),
PocketPresenter.addSlide = function(template){
        let slideElement = document.getElementById("pocket-presenter-slideroot");
        let id = "pocket-presenter-slide-" + PocketPresenter.slideIDNumber;
        PocketPresenter.slideIDNumber++;
        let newSlide = document.createElement("div");
        newSlide.setAttribute("class", "pocket-presenter-slide");
        newSlide.setAttribute("id", id);
        let html = this.processTemplate(template)
        newSlide.innerHTML = html;
        document.body.appendChild(newSlide);
        PocketPresenter.sicTransit.showPanel("#" + id);
    },
PocketPresenter.processTemplate = function(template){
        return JSON.stringify(template);
    }