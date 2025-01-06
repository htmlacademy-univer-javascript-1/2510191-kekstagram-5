import { renderPictures } from './gallery.js';
import { debounce, getRandomElements } from './util.js';

const filterSectionElement = document.querySelector('.img-filters');
const defaultFilterElement = document.querySelector('#filter-default');
const randomFilterElement = document.querySelector('#filter-random');
const popularFilterElement = document.querySelector('#filter-discussed');

const MaxPicturesCount = 10;
const ActiveTabClass = 'img-filters__button--active';

const getRandomPictures = (pictures, count) => getRandomElements(pictures, count);

const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;
const getDiscussedPhotos = (pictures) => pictures.slice().sort(sortByComments);

const removePhotos = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const changePictures = (pictures, filterElement) => {
  removePhotos();
  const activeFilterElement = document.querySelector(`.${ActiveTabClass}`);
  activeFilterElement.classList.remove(ActiveTabClass);
  renderPictures(pictures);
  filterElement.classList.add(ActiveTabClass);
};

const showFilteredPictures = (pictures) => {
  renderPictures(pictures);
  filterSectionElement.classList.remove('img-filters--inactive');

  randomFilterElement.addEventListener('click', debounce(() => {
    changePictures(getRandomPictures(pictures, MaxPicturesCount), randomFilterElement);
  }));

  popularFilterElement.addEventListener('click', debounce(() => {
    changePictures(getDiscussedPhotos(pictures), popularFilterElement);
  }));

  defaultFilterElement.addEventListener('click', debounce(() => {
    changePictures(pictures, defaultFilterElement);
  }));
};

export { showFilteredPictures };
