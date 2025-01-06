import { openBigPicture } from './big-picture.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (picture) => {
  const newPictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImgElement = newPictureElement.querySelector('.picture__img');
  const pictureLikesElement = newPictureElement.querySelector('.picture__likes');
  const pictureCommentsElement = newPictureElement.querySelector('.picture__comments');

  pictureImgElement.src = picture.url;
  pictureImgElement.alt = picture.description;
  pictureLikesElement.textContent = picture.likes;
  pictureCommentsElement.textContent = picture.comments.length;

  newPictureElement.addEventListener('click', () => {
    openBigPicture(picture);
  });

  return newPictureElement;
};

const createPicturesFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });
  return fragment;
};

const renderPictures = (pictures) => {
  const fragment = createPicturesFragment(pictures);
  picturesListElement.appendChild(fragment);
};

export { renderPictures };
