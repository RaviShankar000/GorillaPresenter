GorillaPresenter.convertPixelsToInches = function(pixels){
    floatPixels = parseFloat(pixels);
    return floatPixels / window.devicePixelRatio / 96;
}
GorillaPresenter.printSlides = function (slideClass, paperSize, slidesPerPage) {
    const printContainer = document.getElementById('print-container');
    const slideRoot = document.getElementById('gorilla-presenter-slideroot');
    console.log("printContainer is " + printContainer);
    console.log("slideRoot is " + slideRoot);
    printContainer.innerHTML = '';
    printContainer.style.display = 'block';
    const slides = GorillaPresenter.slideIDs;
    console.log("There are " + slides.length + " slides");
    if(slides.length === 0){
        GorillaPresenter.showErrorMessage("No slides found to print");
        return;
    }
    const templateSlide = document.querySelector('#' + slides[0]).cloneNode(true);
    console.log("initial templateSlide is " + templateSlide.id);
    templateSlide.style.display = 'none';
    // Define safe printable areas (in inches) for US Letter and A4 sizes
    const paperSizes = {
        'letter': { width: 8.5, height: 11, safeWidth: 7.5, safeHeight: 10 },
        'A4': { width: 8.27, height: 11.69, safeWidth: 7.27, safeHeight: 10.69 }
    };
    const size = paperSizes[paperSize === 'A4' ? 'A4' : 'letter'];
    // Handle layout and scaling based on number of slides per page
    if (slidesPerPage === 1) {
        for (let i = 0; i < slides.length; i++) {
            const currentSlide = document.getElementById(slides[i]);
            const page = document.createElement('div');
            page.classList.add('print-page-1-up');
            let currentSlideWidth = GorillaPresenter.convertPixelsToInches(getComputedStyle(currentSlide).width);
            let currentSlideHeight = GorillaPresenter.convertPixelsToInches(getComputedStyle(currentSlide).height);
            console.log("currentSlideWidth is " + currentSlideWidth);
            console.log("currentSlideHeight is " + currentSlideHeight);
           // let scaleFactor =   currentSlideHeight / size.safeWidth;
           // let scaleFactor = GorillaPresenter.convertPixelsToInches(getComputedStyle(currentSlide).width) / size.width;
            //console.log("scaleFactor is " + scaleFactor);
            page.style.height = size.safeHeight + "in";
            page.style.width = size.safeWidth + "in";
       //     page.style.left = -((page.width - size.safeWidth) / 2) + "in";
       //     page.style.top = ((page.height - size.safeHeight) / 2) + "in";
            currentSlide.style.width = (size.safeHeight - 1) + "in";
            currentSlide.style.height = (size.safeWidth - 1) + "in";
            currentSlide.style.top = 2 * (size.height - size.safeHeight) + "in";
            currentSlide.style.left = -(size.width - size.safeWidth) + "in";
           // let transformation = 'rotate(90deg) scale(' + scaleFactor + ')';
            let transformation = 'rotate(90deg)';
            console.log("transformation =" + transformation);
           currentSlide.style.transform = transformation
           currentSlide.style.transformOrigin = 'center center';
            currentSlide.classList.remove('sic-transit-panel');
            page.appendChild(currentSlide);
            printContainer.appendChild(page);
        } 
    } else if (slidesPerPage === 6) {
        let rowContainer;
        let currentSlide;
        for (let i = 0; i < slides.length; i++) {
            currentSlide = document.querySelector('#' + slides[i]);
  //          console.log("currentSlide is " + currentSlide);
            if (i % 6 === 0) {
                rowContainer = document.createElement('div');
                rowContainer.classList.add('print-page-6-up');
                printContainer.appendChild(rowContainer);
            }
            let displayStyle = getComputedStyle(currentSlide);
            let currentSlideWidth = GorillaPresenter.convertPixelsToInches(displayStyle.width);
            let currentSlideHeight = GorillaPresenter.convertPixelsToInches(displayStyle.height);
            /* console.log("currentSlideWidth is " + currentSlideWidth);
            console.log("currentSlideHeight is " + currentSlideHeight); */
            let scaleFactorWidth = (size.safeWidth / 3) / currentSlideWidth;
            let scaleFactorHeight = (size.safeHeight / 3) / currentSlideHeight;
            /* console.log("scaleFactorWidth is " + scaleFactorWidth);
            console.log("scaleFactorHeight is " + scaleFactorHeight); */
            let thumbnailWidth = ((size.safeWidth - 0.5) / 2) + "in";
            let thumbnailHeight = ((size.safeHeight - 0.5) / 3) + "in";
     /*        console.log("thumbnailWidth is " + thumbnailWidth);
            console.log("thumbnailHeight is " + thumbnailHeight); */
            currentSlide.classList.remove('sic-transit-panel');
            currentSlide.style.width = thumbnailWidth;
            currentSlide.style.height = thumbnailHeight;
            currentSlide.style.maxWidth = thumbnailWidth
            currentSlide.style.maxHeight = thumbnailHeight;
            currentSlide.style.minWidth = thumbnailWidth;
            currentSlide.style.minHeight = thumbnailHeight;
            currentSlide.style.position="relative";
            let transform = 'scale(' + scaleFactorHeight  + ')' //+ ',' + scaleFactorWidth + ')';
         //   console.log("transform is " + transform);
            currentSlide.style.transform = transform;
            //clone.style.transformOrigin = 'center center';
            rowContainer.appendChild(currentSlide);
        }
      
    }
    else {
        console.log("Unsupported number of slides per page: " + slidesPerPage);
        return;
    }
    let nonprintables = document.querySelectorAll('.nonprintable');
    let nonprintablesDisplay = {};
    nonprintables.forEach(nonprintable => {
        nonprintablesDisplay[nonprintable] = nonprintable.style.display;
        nonprintable.style.display = 'none';
    }
    );
    window.print();
 /*   for(let i = 0; i < slides.length; i++){
        let currentSlide = document.querySelector('#' + slides[i]);
        currentSlide.classList.add('sic-transit-panel');
        currentSlide.style.width = templateSlide.style.width;
        currentSlide.style.height = templateSlide.style.height;
        currentSlide.style.maxWidth = templateSlide.style.maxWidth;
        currentSlide.style.maxHeight = templateSlide.style.maxHeight;
        currentSlide.style.minWidth = templateSlide.style.minWidth;
        currentSlide.style.minHeight = templateSlide.style.minHeight;
        currentSlide.style.position = templateSlide.style.position;
        currentSlide.style.transform = templateSlide.style.transform;
        slideRoot.appendChild(currentSlide);
    }
    nonprintables.forEach(nonprintable => {
        nonprintable.style.display = nonprintablesDisplay[nonprintable];
    });
    printContainer.innerHTML = '';
    printContainer.style.display = 'none'; */
}
