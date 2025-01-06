import { openBigPicture } from './big-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__img').alt = picture.description;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', () => {
    openBigPicture(picture);
  });

  return newPicture;
};

const createPicturesFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureItem = createPicture(picture);
    fragment.appendChild(pictureItem);
  });
  return fragment;
};

const renderPictures = (p) => {
  const fragment = createPicturesFragment(p);
  picturesList.appendChild(fragment);
};

export { renderPictures };
