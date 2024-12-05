const EFFECTS = {
  'chrome': {'style': 'grayscale', 'min': 0, 'max': 1, 'step': 0.1},
  'sepia': {'style': 'sepia', 'min': 0, 'max': 1, 'step': 0.1},
  'marvin': {'style': 'invert', 'min': 0, 'max': 100, 'step': 1},
  'phobos': {'style': 'blur', 'min': 0, 'max': 3, 'step': 0.1},
  'heat': {'style': 'brightness', 'min': 1, 'max': 3, 'step': 0.1},
  'none': {},
};

const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewPicture = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');

sliderContainer.classList.add('hidden');

function onChangeEffect(evt){
  if (evt.target.matches('.effects__radio')){
    const button = evt.target;
    const effect = button['value'];

    if(slider.noUiSlider){
      slider.noUiSlider.destroy();
    }
    updateEffect(effect);
  }
}

function updateEffect(effect){
  if (effect !== 'none'){
    sliderContainer.classList.remove('hidden');
    noUiSlider.create(slider, {
      range: {
        min: EFFECTS[effect]['min'],
        max: EFFECTS[effect]['max']
      },
      start: EFFECTS[effect]['max'],
      step: EFFECTS[effect]['step'],
      connect: 'lower'
    });

    slider.noUiSlider.on('update', ()=>{
      effectLevelValue['value'] = slider.noUiSlider.get();

      switch(effect){
        case 'chrome':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${slider.noUiSlider.get()})`;
          break;
        case 'sepia':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${slider.noUiSlider.get()})`;
          break;
        case 'marvin':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${slider.noUiSlider.get()}%)`;
          break;
        case 'phobos':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${slider.noUiSlider.get()}px)`;
          break;
        case 'heat':
          previewPicture.style.filter = `${EFFECTS[effect]['style']}(${slider.noUiSlider.get()})`;
          break;
      }
    });
  } else{
    sliderContainer.classList.add('hidden');
    effectLevelValue['value'] = '';
    previewPicture.style.filter = '';
  }
}

export { onChangeEffect };
