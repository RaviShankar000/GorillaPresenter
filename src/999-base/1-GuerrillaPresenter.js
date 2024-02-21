
let GuerrillaPresenter = {
    slideRoot: "guerrilla-presenter-slideroot",
    slideClass: ".guerrilla-presenter-slide",
    slideIdFragment: "guerrilla-presenter-slide-",
  

    addSlide: function(template){
      let slideElement = document.getElementById(this.slideRoot);
      let id = this.slideIdFragment + Math.random();
      let newSlide = document.createElement("div");
      slideElement.appendChild(newSlide);
      newSlide.setAttribute("class", this.slideClass);
      newSlide.setAttribute("id", id);
      let html = this.processTemplate(template)
      newSlide.innerHTML = html;
      sicTransit.showPanel("#" + id);
    },

    processTemplate: function(template){
      return "<b>Hooha</b>";
    },
    
    bytes_to_base_64:function(buffer){
      let arr = new Uint8Array(buffer)
      let raw = '';
      for (let i = 0, l = arr.length; i < l; i++) {
        raw += String.fromCharCode(arr[i]);
      }
      return btoa(raw);
    },
    slideIDNumber:1,
    sicTransit: new SicTransit(this.slideRoot,this.slideClass),
    addSlide:function(template){
              let slideBase = document.getElementById(this.slideRoot);
                let id = this.slideIdFragment + this.slideIDNumber;
                this.slideIDNumber++;
                let newSlide = document.createElement("div");
                newSlide.setAttribute("class", this.slideClass);
                newSlide.setAttribute("id", id);
                let html = this.processTemplate(template)
                newSlide.innerHTML = html;
                document.body.appendChild(newSlide);
                this.sicTransit.showPanel("#" + id);
    },
    processTemplate: function(template){
            return JSON.stringify(template);
        }
}

