document.onload = my_init_function();

function my_init_function() {
  const images = document.querySelectorAll('.GImage');
  images.forEach(img => {
    img.onclick = function() {
      enlargeImage(this);
    };
  });
}

function enlargeImage(img) {
  const images = document.querySelectorAll('.GImage');
  images.forEach(image => {
    if (image !== img) {
      image.style.display = 'none';
    }
  });

  img.classList.add('enlarged');

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Schließen';
  closeButton.className = 'closeButton';
  closeButton.onclick = function() {
    resetGallery(img, closeButton);
  };

  img.parentElement.appendChild(closeButton);
}

function resetGallery(img, button) {
  const images = document.querySelectorAll('.GImage');
  images.forEach(image => {
    image.style.display = 'block';
  });

  img.classList.remove('enlarged');
  button.remove();
}
