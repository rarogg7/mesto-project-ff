// Импортируем из других файлов

import { openModal } from "./modal.js";
import { popupTypeImage, popupCaption, popupImage } from "../pages/index.js";

// Экспортируем в другие файлы

export { createCard, deleteCard, likeCard, cardPopup };

// Темплейт карточки

const templateCard = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(item, deleteCard) {
  const cardElement = templateCard
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  // Тело карточки, что отрисовывается

  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;

  // Кнопка удаления карточки

  deleteCardButton.addEventListener("click", deleteCard);

  // Ставим лайк

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton);
  });

  // Увеличиваем картинку

  cardImage.addEventListener("click", () => {
    cardPopup(cardImage);
  });

  return cardElement;
}

// Функция удаления карточки со страницы

function deleteCard(cardElement) {
  cardElement.target.closest(".card").remove();
}

// Функция где открываем картинку во весь экран

function cardPopup(cardImage) {
  popupCaption.textContent = cardImage.alt;
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  openModal(popupTypeImage);
}

// Ставим лайк карточке

function likeCard (element) {
  element.classList.toggle("card__like-button_is-active");
};
