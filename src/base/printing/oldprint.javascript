GorillaPresenter.printSlides = function (slideClass, paperSize, slidesPerPage) {
    const printContainer = document.querySelector('.print-container');
    printContainer.innerHTML = ''; // Clear previous content
    const slides = GorillaPresenter.slideIDs;
    console.log("There are" + slides.length + " slides");
    //const slides = document.querySelectorAll(slideClass);

    // Define safe printable areas (in inches) for US Letter and A4 sizes
    const paperSizes = {
        'letter': { width: 8.5, height: 11, safeWidth: 7.5, safeHeight: 10 },
        'A4': { width: 8.27, height: 11.69, safeWidth: 7.27, safeHeight: 10.69 }
    };

    // Select paper size
    const size = paperSizes[paperSize === 'A4' ? 'A4' : 'letter'];

    // Handle layout and scaling based on number of slides per page
    if (slidesPerPage === 1) {
        return;
        // Single slide per page: rotate the slide 90 degrees and fill the page
        for (let i = 0; i < slides.length; i++) {
            const page = document.createElement('div');
            page.classList.add('print-page');
            console.log("cloning " + slides[i]);
            currentSlide = document.querySelector('#' + slides[i] + " " + 
                slideClass);
            //currentSlide = document.getElementById(slides[i]);
           // const clone = slides[i].cloneNode(true);
            const clone = currentSlide.cloneNode(true);
            //clone.style.transform = 'scale(' + (size.safeHeight / size.safeWidth) + ')';
            // clone.style.transform = 'scale(' + (size.safeWidth / size.safeHeight) + ')';
            clone.style.transformOrigin = 'center center';
            page.appendChild(clone);
            printContainer.appendChild(page);
        }   
      /*  slides.forEach(slide => {
            const page = document.createElement('div');
            page.classList.add('print-page');
            const clone = slide.cloneNode(true);
            clone.style.transform = 'rotate(90deg) scale(' + (size.safeHeight / size.safeWidth) + ')';
            clone.style.transformOrigin = 'center center';
            page.appendChild(clone);
            printContainer.appendChild(page);
        }); */
    } else if (slidesPerPage === 6) {
        // Six slides per page: distribute slides in a grid
        let rowContainer;
        let currentSlide;
        for (let i = 0; i < slides.length; i++) {
            currentSlide = document.querySelector('#' + slides[i] + " " + 
                slideClass)
       // slides.forEach((slide, index) => {
            if (i % 6 === 0) {
                rowContainer = document.createElement('div');
                rowContainer.classList.add('print-page');
                printContainer.appendChild(rowContainer);
            }

          //  const clone = slide.cloneNode(true);
            const clone = currentSlide.cloneNode(); //document.getElementById(slides[i]).cloneNode(true);
            const scaleFactor = Math.min(size.safeWidth / 3, size.safeHeight / 2) / clone.offsetWidth;
            clone.style.maxWidth = size.safeHeight / 3.1 + 'in';
            clone.style.maxHeight = size.safeWidth / 2.1 + 'in';
            clone.style.minWidth = clone.style.maxWidth;
            clone.style.minHeight = clone.style.maxHeight;
            clone.style.transform = 'scale(' + scaleFactor + ')';
            rowContainer.appendChild(clone);
    }
    }
    let nonprintables = document.querySelectorAll('.nonprintable');
    let nonprintablesDisplay = {};
    nonprintables.forEach(nonprintable => {
        nonprintablesDisplay[nonprintable] = nonprintable.style.display;
        nonprintable.style.display = 'none';
    }
    );
    document.querySelector('.print-container').style.display = 'block';
  //  window.print();
}