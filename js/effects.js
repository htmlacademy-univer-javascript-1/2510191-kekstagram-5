const Effects = {
  Chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1 },
  Sepia: { style: 'sepia', min: 0, max: 1, step: 0.1 },
  Marvin: { style: 'invert', min: 0, max: 100, step: 1 },
  Phobos: { style: 'blur', min: 0, max: 3, step: 0.1 },
  Heat: { style: 'brightness', min: 1, max: 3, step: 0.1 },
  None: {}
};

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const previewPictureElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const removeFilter = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  previewPictureElement.style.filter = '';
  previewPictureElement.className = '';

  document.getElementById('effect-none').checked = true;

  sliderContainerElement.classList.add('hidden');
  effectLevelValueElement.value = '';
};

sliderContainerElement.classList.add('hidden');

function onChangeEffect(evt) {
  if (evt.target.matches('.effects__radio')) {
    const button = evt.target;
    const effect = button.value;

    if (sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    updateEffect(effect);
  }
}

function updateEffect(effect) {
  if (effect !== 'none') {
    sliderContainerElement.classList.remove('hidden');
    noUiSlider.create(sliderElement, {
      range: {
        min: Effects[effect.charAt(0).toUpperCase() + effect.slice(1)].min,
        max: Effects[effect.charAt(0).toUpperCase() + effect.slice(1)].max,
      },
      start: Effects[effect.charAt(0).toUpperCase() + effect.slice(1)].max,
      step: Effects[effect.charAt(0).toUpperCase() + effect.slice(1)].step,
      connect: 'lower',
    });

    sliderElement.noUiSlider.on('update', () => {
      const value = sliderElement.noUiSlider.get();
      effectLevelValueElement.value = value;
      const effectSettings = Effects[effect.charAt(0).toUpperCase() + effect.slice(1)];
      switch (effect) {
        case 'marvin':
          previewPictureElement.style.filter = `${effectSettings.style}(${value}%)`;
          break;
        case 'phobos':
          previewPictureElement.style.filter = `${effectSettings.style}(${value}px)`;
          break;
        default:
          previewPictureElement.style.filter = `${effectSettings.style}(${value})`;
          break;
      }
    });
  } else {
    removeFilter();
  }
}

export { onChangeEffect, removeFilter };
