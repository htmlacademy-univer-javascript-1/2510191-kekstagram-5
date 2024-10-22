const namesUser = ['Дима', 'Кирилл', 'Маша', 'Ярослав', 'Елизавета', 'Камилла', 'Лада'];
const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const useNumbersImg = [];
const useID = [];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateComment() {
  const commentPersons = [];
  for (let i = 1; i <= getRandomInt(1, 30); i++) {
    let newID;
    do {
      newID = getRandomInt(1, 12345);
    } while (useID.includes(newID));
    useID.push(newID);
    const commentPerson = [];
    for (let j = 1; j <= getRandomInt(1, 2); j++) {
      commentPerson.push(comments[getRandomInt(0, comments.length - 1)]);
    }
    commentPersons.push({
      id: newID,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: commentPerson.join(' '),
      name: namesUser[getRandomInt(0, namesUser.length - 1)],
    });
  }
  return commentPersons;
}
function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    let randomNumberImage;
    do {
      randomNumberImage = getRandomInt(1, 25);
    } while (useNumbersImg.includes(randomNumberImage));
    useNumbersImg.push(randomNumberImage);
    const photo = {
      id: i,
      url: `photos/${randomNumberImage}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInt(15, 200),
      comments: generateComment(),
    };
    photos.push(photo);
  }
  return photos;
}
generatePhotos();
