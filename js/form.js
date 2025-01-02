import { isEscapeKey } from './util.js';
import { resetZoomValue } from './zoom.js';
import { sendData } from './api.js';
import { onChangeEffect, removeFilter} from './effects.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const MAX_TAGS = 5;
const TAGS_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  INVALID_COUNT: `Максимум ${MAX_TAGS} хэштегов`,
  NOT_ORIGINAL: 'Теги не должны повторяться',
  INVALID_TAG: 'Тег не валиден'
};

const bodyElement = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fieldForHashTages = document.querySelector('.text__hashtags');
const fieldForDescription = document.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');
const inputButton = form.querySelector('.img-upload__input');
const effectsList = document.querySelector('.effects__list');
const effectsPreview = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeForm = () => {
  form.reset();
  pristine.reset();
  resetZoomValue();
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  effectsList.removeEventListener('click', onChangeEffect);
  removeFilter();
};

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    await sendData(new FormData(form))
      .then(() => {
        showSuccessMessage();
        removeFilter();
        resetZoomValue();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        closeForm();
      });
  }
});

const openForm = (evt) =>{
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  effectsList.addEventListener('click', onChangeEffect);
  overlay.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = overlay.querySelector('img').src;
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
};

const convertTagsList = (string) => string.trim().split(' ').filter((tag) => Boolean(tag.length));
const isOnFocus = () => document.activeElement === fieldForHashTages || document.activeElement === fieldForDescription;
const compareTagsNumber = (string) => convertTagsList(string).length <= MAX_TAGS;
const compareOriginalTag = (string) => {
  const lowerString = convertTagsList(string).map((currentTag) => currentTag.toUpperCase());
  return lowerString.length === new Set(convertTagsList(string)).size;
};
const compareValidTag = (string) => convertTagsList(string).every((tag) => TAGS_PATTERN.test(tag));

function onDocumentKeyDown(evt){
  if(isEscapeKey && !isOnFocus()){
    evt.preventDefault();
    closeForm();
  }
}

const onCancelClick = () => closeForm();
const onInputOverlayClick = (evt) => openForm(evt);

pristine.addValidator(
  fieldForHashTages,
  compareTagsNumber,
  ErrorMessages.INVALID_COUNT,
  1,
  true
);

pristine.addValidator(
  fieldForHashTages,
  compareOriginalTag,
  ErrorMessages.NOT_ORIGINAL,
  2,
  true
);

pristine.addValidator(
  fieldForHashTages,
  compareValidTag,
  ErrorMessages.INVALID_TAG,
  3,
  true
);

inputButton.addEventListener('change', onInputOverlayClick);
cancelButton.addEventListener('click', onCancelClick);
