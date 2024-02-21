PocketPresenter.slideIDNumber = 1;
PocketPresenter.sicTransit = new SicTransit("#guerrilla-presenter-slideroot",".guerrilla-presenter-slide"),
PocketPresenter.addSlide = function(template){
        let slideElement = document.getElementById("guerrilla-presenter-slideroot");
        let id = "guerrilla-presenter-slide-" + PocketPresenter.slideIDNumber;
        PocketPresenter.slideIDNumber++;
        let newSlide = document.createElement("div");
        newSlide.setAttribute("class", "guerrilla-presenter-slide");
        newSlide.setAttribute("id", id);
        let html = this.processTemplate(template)
        newSlide.innerHTML = html;
        document.body.appendChild(newSlide);
        PocketPresenter.sicTransit.showPanel("#" + id);
    },
PocketPresenter.processTemplate = function(template){
        return JSON.stringify(template);
    }