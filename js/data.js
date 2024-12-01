import { getRandomInt } from './util.js';

const NAMES = [
  'Камилла',
  'Дима',
  'Крыса',
  'Миша',
  'Кирилл',
  'костя',
];

// Функция генерации случайного предложения для комментария
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция для генерации случаного 1 или 2 сообщений
function getRandomMessage() {
  // Генерация случайного числа от 1 до 2
  const countMessage = getRandomInt(1, 2);

  let message;
  if (countMessage === 2) {
    const firstIndex = getRandomInt(0, MESSAGE.length - 1);
    const secondIndex = getRandomInt(0, MESSAGE.length - 1);

    if (firstIndex !== secondIndex) {
      message = `${MESSAGE[firstIndex]} ${MESSAGE[secondIndex]}`;
    } else {
      message = MESSAGE[firstIndex];
    }
  } else {
    const index = getRandomInt(0, MESSAGE.length - 1);
    message = MESSAGE[index];
  }

  return message;
}


const idSet = new Set();
//const photoIdSet = new Set();

function getComment() {
  let idParam = getRandomInt(1, 10000);
  let photoIdParam = getRandomInt(1, 6);
  while (idSet.has(idParam)) {
    idParam = getRandomInt(1, 10000);
  }
  while (idSet.has(photoIdParam)) {
    photoIdParam = getRandomInt(1, 6);
  }

  return {
    id: getRandomInt(1, 10000),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };
}

export { getComment };
