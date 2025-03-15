import { deleteCardServer, unlikeCardServer, likeCardServer } from "./api.js";

// Экспортируем в другие файлы
export { createCard, deleteCard, likeCard };

// Функция создания карточки
function createCard(
  cardData,
  deleteCard,
  openFullImagePopup,
  likeCard,
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

  const cardId = cardData._id;
  const cardOwnerId = cardData.owner._id;

  // Тело карточки, что отрисовывается
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  //   Условие для постановки лайка карточке
  if (cardData.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardId, cardLikeButton, cardLikeCounter);
  });

  //  Условие для появления кнопки удаления у карточки
  if (cardOwnerId !== userId) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
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
  const likeAction = isLiked ? unlikeCardServer : likeCardServer;

  likeAction(cardId).then((event) => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
    cardLikeCounter.textContent = event.likes.length;
  });
}