
import { isEscapeKey } from './util.js';
import { resetZoomValue } from './zoom.js';
import { sendData } from './api.js';
import { onChangeEffect, removeFilter } from './effects.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const MaxTags = 5;
const TagsPattern = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  INVALID_COUNT: `Максимум ${MaxTags} хэштегов`,
  NOT_ORIGINAL: 'Теги не должны повторяться',
  INVALID_TAG: 'Тег не валиден',
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const hashTagsFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const inputButtonElement = formElement.querySelector('.img-upload__input');
const effectsListElement = document.querySelector('.effects__list');
const effectsPreviewElements = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeForm = () => {
  formElement.reset();
  pristine.reset();
  resetZoomValue();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  effectsListElement.removeEventListener('click', onChangeEffect);
  removeFilter();
};

formElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    await sendData(new FormData(formElement))
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

const openForm = (evt) => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  effectsListElement.addEventListener('click', onChangeEffect);
  const imageElement = overlayElement.querySelector('img');
  imageElement.src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = imageElement.src;
  effectsPreviewElements.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
};

const convertTagsList = (string) => string.trim().split(' ').filter((tag) => Boolean(tag.length));
const isOnFocus = () => document.activeElement === hashTagsFieldElement || document.activeElement === descriptionFieldElement;
const compareTagsNumber = (string) => convertTagsList(string).length <= MaxTags;
const compareOriginalTag = (string) => {
  const lowerString = convertTagsList(string).map((currentTag) => currentTag.toUpperCase());
  return lowerString.length === new Set(lowerString).size;
};
const compareValidTag = (string) => convertTagsList(string).every((tag) => TagsPattern.test(tag));

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt) && !isOnFocus()) {
    evt.preventDefault();
    closeForm();
  }
}

const onCancelClick = () => closeForm();
const onInputOverlayClick = (evt) => openForm(evt);

pristine.addValidator(
  hashTagsFieldElement,
  compareTagsNumber,
  ErrorMessages.INVALID_COUNT,
  1,
  true
);

pristine.addValidator(
  hashTagsFieldElement,
  compareOriginalTag,
  ErrorMessages.NOT_ORIGINAL,
  2,
  true
);

pristine.addValidator(
  hashTagsFieldElement,
  compareValidTag,
  ErrorMessages.INVALID_TAG,
  3,
  true
);

inputButtonElement.addEventListener('change', onInputOverlayClick);
cancelButtonElement.addEventListener('click', onCancelClick);
