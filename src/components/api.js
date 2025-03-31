// 1. Подключаюсь к серверу
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "bc58507a-89a2-4ee2-8c62-f9f770fcad89",
    "Content-Type": "application/json",
  },
};

//  2. Делаем запрос к серверу
const checkResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Произошла ошибка: ${response.status}`);
};

// 3. Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((result) => {
      return checkResponse(result);
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных пользователя:", error);
    });
};

// 4. Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((result) => {
      return checkResponse(result);
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных с сервера:", error);
    });
};

// 5. Редактирование профиля
export const updateUserInfo = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((result) => {
    return checkResponse(result);
  });
};

// 6. Добавление новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((result) => {
      return checkResponse(result);
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных на сервер:", error);
    });
};

// 8. Удаление карточки
export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((result) => {
    return checkResponse(result);
  });
};

// 9. Постановка и снятие лайка
export function likeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function unlikeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// 10. Обновление аватара пользователя
export const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
    .then((result) => {
      return checkResponse(result);
    })
    .catch((error) => {
      console.error("Не удалось обновить фото профиля:", error);
    });
};