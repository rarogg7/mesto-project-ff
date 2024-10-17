// Импортируем из других файлов

import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

import "./index.css";

// DOM узлы

const placeCardList = document.querySelector(".places__list");

// Попапы

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");
const popupFormEditProfile = popupTypeEdit.querySelector(".popup__form");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close"); // Кнопка закрыть всплывающее окно

// Новые карточки

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = popupTypeNewCard.querySelector(".popup__form");
const popupInputTypeCardName = popupNewCardForm.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeCardUrl = popupNewCardForm.querySelector(
  ".popup__input_type_url"
);

// Функция отрисовки карточек на странице

function renderCard() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, likeCard, cardPopup);
    placeCardList.append(cardElement);
  });
}

renderCard(initialCards); // Вызываем функцию и рисуем на странице данные карточки

// Окно добавления карточки на страницу

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

// Закрываем окно кликом на крестик

popupCloseButtons.forEach((element) => {
  element.addEventListener("click", () => {
    closeModal(element.parentNode.parentNode);
  });
});

// Закрываем попап кликом на оверлей

popups.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") &&
      !event.target.classList.contains("popup__content")
    ) {
      closeModal(element);
    }
  });
});

//  Редактируем профиль

function editProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
}

// Слушатель

profileEditButton.addEventListener("click", editProfile);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupTypeEdit);
}

// Слушатель

popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Функция добавления карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeCardUrl.value,
  };

  placeCardList.prepend(
    createCard(newCardData, deleteCard, cardPopup, likeCard)
  );

  popupNewCardForm.reset(); // Очищаем

  closeModal(popupTypeNewCard);
}

// Слушатель

popupNewCardForm.addEventListener("submit", handleNewCardSubmit);

// Функция где открываем картинку во весь экран

function cardPopup(cardData) {
  popupCaption.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  openModal(popupTypeImage);
}
