const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const ROUTES = {
  GET_DATA:'/data',
  SEND_DATA:'/'
};

const HTTP_REQUESTS = {
  GET:'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные с сервера',
  SEND_DATA: 'Не удалось отправить форму'
};

const loadData = (route, errorText, method = HTTP_REQUESTS.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, {method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(ROUTES.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => loadData(ROUTES.SEND_DATA, ErrorText.SEND_DATA, HTTP_REQUESTS.POST, body);

export {getData, sendData};
