import { showFilteredPictures } from './filter.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';

const loadPictures = async () => {
  try {
    showFilteredPictures(await getData());
  } catch (err){
    showAlert(err);
  }
};

loadPictures();
