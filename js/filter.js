import { renderPictures } from './gallery.js';
import { debounce, getRandomElements } from './util.js';

const filterSection = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const popularFilter = document.querySelector('#filter-discussed');

const MAX_PICTURES_COUNT = 10;
const ACTIVE_TAB = 'img-filters__button--active';

const getRandomPictures = (pictures, count) => getRandomElements(pictures, count);

const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;
const getDiscussedPhotos = (pictures) => pictures.slice().sort(sortByComments);

const removePhotos = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const changePictures = (pictures, filter) => {
  removePhotos();
  const activeFilter = document.querySelector(`.${ACTIVE_TAB}`);
  activeFilter.classList.remove(ACTIVE_TAB);
  renderPictures(pictures);
  filter.classList.add(ACTIVE_TAB);
};

const showFilteredPictures = (pictures) => {
  renderPictures(pictures);
  filterSection.classList.remove('img-filters--inactive');

  randomFilter.addEventListener('click', debounce(() => {
    changePictures(getRandomPictures(pictures, MAX_PICTURES_COUNT), randomFilter);
  }));

  popularFilter.addEventListener('click', debounce(() => {
    changePictures(getDiscussedPhotos(pictures), popularFilter);
  }));

  defaultfFilter.addEventListener('click', debounce(() => {
    changePictures(pictures, defaultfFilter);
  }));
};

export { showFilteredPictures };
