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

initialCards.forEach((item) => {
  const cardElement = templateCard.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  placeCardList.append(cardElement);
});

// @todo: Функция удаления карточки

document.querySelector("body").onclick = (ev) => {
  if (ev.target.className != "card__delete-button") return;
  ev.target.closest(".card").remove();
  // item.remove();
};
