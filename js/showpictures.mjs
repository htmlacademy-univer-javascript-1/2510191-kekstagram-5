// showpictures.mjs
import {generatePhotos} from './data.js';

const galleryContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoCollection = generatePhotos();
const galleryFragment = document.createDocumentFragment();

photoCollection.forEach(({url, description, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  const photoImage = photoElement.querySelector('.picture_img');
  photoImage.src = url;
  photoImage.alt = description;
  photoElement.querySelector('.picture_likes').textContent = likes;
  photoElement.querySelector('.picture_comments').textContent = comments.length;
  galleryFragment.appendChild(photoElement);
});

galleryContainer.appendChild(galleryFragment);
