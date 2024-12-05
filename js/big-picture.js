import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const bodyElement = document.querySelector('body');

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentsList.append(fragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
    document.removeEventListener('keydown', onEscapeKeyDown);
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onEscapeKeyDown);
};


const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bodyElement.classList.add('modal-open');
  loadCommentsButton.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  renderComments(picture.comments);
  document.body.classList.add('modal-open');
};

closeBigPictureButton.addEventListener('click', onCloseBigPictureClick);

export { openBigPicture };
