import { showFilteredPictures } from './filter.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';

const loadPictures = async () => {
  try {
    const pictures = await getData();
    showFilteredPictures(pictures);
  } catch (error) {
    showAlert(error);
  }
};

loadPictures();
