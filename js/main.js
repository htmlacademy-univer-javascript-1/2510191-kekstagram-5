import { generatePhoto } from './generate-photo.js';
import { renderPictures } from './gallery.js';
import './form.js';

const posts = [];
for (let i = 1; i <= 25; i++) {
  const currentPhoto = generatePhoto(i);
  posts.push(currentPhoto);
}

renderPictures(posts);
