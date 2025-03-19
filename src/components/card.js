import { deleteCardServer, unlikeCardServer, likeCardServer } from "./api.js";

// Экспортируем в другие файлы
export { createCard, deleteCard, likeCard };

// Функция создания карточки
function createCard(
  cardData,
  openFullImagePopup,
  userId,
) {
  const templateCard = document.querySelector("#card-template").content;
  const cardElement = templateCard
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  // Тело карточки, что отрисовывается
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  //   Условие для постановки лайка карточке
  if (cardData.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardData['_id'], cardLikeCounter, cardLikeButton );
  });

  //  Условие для появления кнопки удаления у карточки
  if (cardData.owner['_id'] !== userId) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener("click", () => {
      deleteCard(cardData['_id'], cardElement);
    });
  }

  // Увеличиваем картинку
  cardImage.addEventListener("click", () =>
    openFullImagePopup(cardData)
  );

  return cardElement;
}

// Функция удаления карточки со страницы
function deleteCard(cardId, cardElement) {
  deleteCardServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

// Ставим лайк карточке
function likeCard(cardId, cardLikeCounter, cardLikeButton) {
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  const likeAction = isLiked ? unlikeCardServer(cardId) : likeCardServer(cardId);

  likeAction.then((event) => {
    cardLikeCounter.textContent = event.likes.length;
    cardLikeButton.classList.toggle("card__like-button_is-active");
  })
  .catch(error => {
    console.error('Ошибка при лайке карточки:', error);
})
}