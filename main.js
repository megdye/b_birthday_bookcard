document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const infoBtn = document.querySelector('.info-btn');
    const caption = document.getElementById('caption')


    let currentIndex = 0;
    const animations = ['zoom-animation', 'rotate-animation', 'slide-right-animation', 'slide-left-animation'];
    const links = ['image1', 'image2', 'image3', 'image4', 'image5'];
    let currentAnimation = 0;

    function updateMainImage(index, direction) {
        mainImage.style.opacity = '0';
        mainImage.classList.remove(...animations);
        
        setTimeout(() => {
            mainImage.src = thumbnails[index].src;
            mainImage.style.opacity = '1';
            currentIndex = (currentIndex) % thumbnails.length;

            element = document.querySelectorAll('.content')[0];
            element.textContent=links[currentIndex];
            
            // A random animation
            const animationClass = animations[currentAnimation];
            mainImage.classList.add(animationClass);
            
            // animation index for the next transition
            currentAnimation = (currentAnimation + 1) % animations.length;
        }, 300);

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        currentIndex = index;  
    }

    function toggle (currentIndex, elements, specifiedDisplay) {
        var element, index;
      
        elements = elements.length ? elements : [elements];
        for (index = 0; index < elements.length; index++) {
          element = elements[index];
          currentIndex = (currentIndex) % thumbnails.length;
          element.textContent=links[currentIndex];

          if (isElementHidden(element)) {
            element.style.display = 'flex';
      
            // If the element is still hidden after removing the inline display
            if (isElementHidden(element)) {
              element.style.display = specifiedDisplay || 'block';
            }
          } else {
            element.style.display = 'none';
          }
        }
        function isElementHidden (element) {
          return window.getComputedStyle(element, null).getPropertyValue('display') === 'none';
        }
      }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex, 'prev');
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex, 'next');
    });

    infoBtn.addEventListener('click', function () {
        toggle(currentIndex, document.querySelectorAll('.content'));
      });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });



    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    mainImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    }

    // Initial animation
    mainImage.classList.add(animations[currentAnimation]);
    currentAnimation = (currentAnimation + 1) % animations.length;
});