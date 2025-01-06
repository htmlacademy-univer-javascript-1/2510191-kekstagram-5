const ERROR_DISPLAY_TIME = 5000;

const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.style.zIndex = '100';
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.padding = '10px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';
  alertContainerElement.textContent = message;
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ERROR_DISPLAY_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);


    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
};

const getRandomInt = (val1, val2) => {
  const lower = Math.ceil(Math.min(val1, val2));
  const upper = Math.floor(Math.max(val1, val2));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElements = (arr, count) => {
  const randomIndexList = [];
  const max = Math.min(count, arr.length);

  while (randomIndexList.length < max) {
    const id = getRandomInt(0, arr.length - 1);
    if (!randomIndexList.includes(id)) {
      randomIndexList.push(id);
    }
  }

  return randomIndexList.map((id) => arr[id]);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, getRandomElements, isEscapeKey, showAlert, debounce };
