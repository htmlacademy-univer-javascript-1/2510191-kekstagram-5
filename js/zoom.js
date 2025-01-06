const MIN_ZOOM_VALUE = 25;
const ZOOM_STEP = 25;
const DEFAULT_ZOOM_VALUE = 100;
const MAX_ZOOM_VALUE = 100;

const uploadZoomElement = document.querySelector('.img-upload__scale');
const zoomSmallerElement = uploadZoomElement.querySelector('.scale__control--smaller');
const zoomBiggerElement = uploadZoomElement.querySelector('.scale__control--bigger');
const zoomValueElement = uploadZoomElement.querySelector('.scale__control--value');
const pictureElement = document.querySelector('.img-upload__preview img');

const zoomImage = (value) => {
  pictureElement.style.transform = `scale(${value / 100})`;
  zoomValueElement.value = `${value}%`;
};

const onBiggerZoomClick = () => {
  const biggerValue = parseInt(zoomValueElement.value, 10) + ZOOM_STEP;
  zoomImage(Math.min(biggerValue, MAX_ZOOM_VALUE));
};

const onSmallerZoomClick = () => {
  const smallerValue = parseInt(zoomValueElement.value, 10) - ZOOM_STEP;
  zoomImage(Math.max(smallerValue, MIN_ZOOM_VALUE));
};

const resetZoomValue = () => zoomImage(DEFAULT_ZOOM_VALUE);

zoomBiggerElement.addEventListener('click', onBiggerZoomClick);
zoomSmallerElement.addEventListener('click', onSmallerZoomClick);

export { resetZoomValue };
