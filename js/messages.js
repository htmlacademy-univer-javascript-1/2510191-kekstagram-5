import { isEscapeKey } from './util.js';

const bodyElement = document.body;
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButtonElement = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeMessageByEscape);
  bodyElement.removeEventListener('click', closeMessageByBodyClick);
  messageCloseButtonElement.removeEventListener('click', hideMessage);
  messageElement.remove();
};

function closeMessageByEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function closeMessageByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage();
  }
}

const showMessage = (messageElement, messageCloseButtonSelector) => {
  bodyElement.append(messageElement);
  document.addEventListener('keydown', closeMessageByEscape);
  bodyElement.addEventListener('click', closeMessageByBodyClick);
  bodyElement.querySelector(messageCloseButtonSelector).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => showMessage(successMessageElement, '.success__button');
const showErrorMessage = () => showMessage(errorMessageElement, '.error__button');

export { showSuccessMessage, showErrorMessage };
