// import {initialCards} from "./cards";
const log = console.log;

// @todo: Темплейт карточки

const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placeCardList = document.querySelector(".places__list");
const avatarProfile = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");
const avatarLinkInput = document.getElementById("avatar-link");
const cardButtonDelete = document.querySelector(".card__delete-button");

// @todo: Функция создания карточки

function createCard(item, deleteCard) {
  const cardElement = templateCard
    .querySelector(".places__item")
    .cloneNode(true);

  // Тело карточки, что отрисовывается
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;

  // Кнопка удаления карточки
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", deleteCard);

  return cardElement;
}

// @todo: Отрисовка карточи на странице

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  placeCardList.append(cardElement);
});

// @todo: Функция удаления карточки

function deleteCard(el) {
  el.target.closest(".card").remove();
}
