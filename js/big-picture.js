import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const pictureCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialFooterTextElement = bigPictureElement.querySelector('.social__footer-text');
const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const createComment = (comment) => {
  const newCommentElement = document.createElement('li');
  const imgCommentElement = document.createElement('img');
  const textCommentElement = document.createElement('p');

  newCommentElement.classList.add('social__comment');
  imgCommentElement.classList.add('social__picture');
  textCommentElement.classList.add('social__text');

  imgCommentElement.src = comment.avatar;
  imgCommentElement.alt = comment.name;
  textCommentElement.textContent = comment.message;

  newCommentElement.appendChild(imgCommentElement);
  newCommentElement.appendChild(textCommentElement);
  commentFragment.appendChild(newCommentElement);
};

const renderComments = () => {
  commentListElement.innerHTML = '';
  commentCountElement.innerHTML = '';
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  commentCountElement.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  currentComments.slice(0, commentsCount).forEach(createComment);
  commentListElement.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  commentsCount = COMMENTS_STEP;
  currentComments = [];
  socialFooterTextElement.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const openBigPicture = (data) => {
  const { url, comments, likes, description } = data;

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  pictureCaptionElement.textContent = description;

  currentComments = comments.slice();
  renderComments();

  commentsLoaderElement.addEventListener('click', onLoadCommentsButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { openBigPicture };
