import { generatePhoto } from './generate-photo.js';
import { renderPhotos } from './draw.js';

const posts = [];
for (let i = 1; i <= 25; i++) {
  const currentPhoto = generatePhoto(i);
  posts.push(currentPhoto);
}

renderPhotos(posts);
