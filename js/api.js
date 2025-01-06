const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  GetData: '/data',
  SendData: '/'
};

const HttpRequests = {
  Get: 'GET',
  Post: 'POST'
};

const ErrorText = {
  GetData: 'Не удалось загрузить данные с сервера',
  SendData: 'Не удалось отправить форму'
};

const loadData = (route, errorText, method = HttpRequests.Get, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(Routes.GetData, ErrorText.GetData);

const sendData = (body) => loadData(Routes.SendData, ErrorText.SendData, HttpRequests.Post, body);

export { getData, sendData };
