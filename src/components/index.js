import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  editAvatar,
  addNewCard,
} from "../components/api.js";

import { clearValidation, enableValidation } from "../components/validation.js";

// Попапы
const placeCardList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const editAvatarInput = document.querySelector(".popup__input_type_avatar");

// Форма редактирования аватара
const editAvatarForm = document.forms["image-profile"]; // form: аватар "name: image-profile"
const avatarInput = editAvatarForm.elements["avatar"]; // input: аватар "name: avatar"

// Форма редактирования профиля
const editProfileForm = document.forms["edit-profile"]; // form: Редактировать профиль "name: edit-profile"
const nameInput = editProfileForm.elements["name"]; // Вводим имя пользователя
const jobInput = editProfileForm.elements["description"]; // Тут уже описание

// Форма добавления новой карточки
const editNewCardForm = document.forms["new-place"]; // form: Новое место "name: new-place"
const cardName = editNewCardForm.elements["new-place-name"];
const cardLink = editNewCardForm.elements["new-place-link"];

// Переменная ID
let userId = "";

// Конфиг валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig, renderSaveTextButton);

// Функция где открываем картинку во весь экран
export function openFullImagePopup(image) {
  popupImage.src = image.link;
  popupImage.alt = image.name;
  popupCaption.textContent = image.name;

  openModal(popupTypeImage);
}

// Окно добавления карточки на страницу
profileAddButton.addEventListener("click", () => {
  clearValidation(editNewCardForm, validationConfig);
  editNewCardForm.reset();

  openModal(popupTypeNewCard);
});

// Редактируем профиль
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);

  openModal(popupTypeEdit);
});

// Окно добавления аватарки
profileImage.addEventListener("click", () => {
  clearValidation(editAvatarForm, validationConfig);
  editAvatarForm.reset();

  openModal(popupTypeEditAvatar);
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

// Отрисовываем состояние кнопки сохранить
const renderSaveTextButton = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

// Форма профиля
function editProfileFormSubmit(event) {
  event.preventDefault();

  const title = nameInput.value;
  const description = jobInput.value;

  updateUserInfo(title, description)
    .then(() => {
      profileTitle.textContent = title;
      profileDescription.textContent = description;
      renderSaveTextButton(true, popupTypeEdit);
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Не удалось обновить данные профайла", error);
    });
}

// Слушатель заполнения формы пользователя
editProfileForm.addEventListener("submit", editProfileFormSubmit);

// Функция добавления карточки
function newCardForm(event) {
  event.preventDefault();

  addNewCard(cardName.value, cardLink.value)
    .then((newCardInfo) => {
      const newCard = createCard(newCardInfo, openFullImagePopup, userId);
      placeCardList.append(newCard);
      closeModal(popupTypeNewCard);
      editNewCardForm.reset();
    })
    .catch((error) => {
      console.log("Ошибка при добавлении новой карточки:", error);
    });
}

// Слушатель добавления карточки
editNewCardForm.addEventListener("submit", newCardForm);

// Отрисовываем карточки с сервера
// const myPromise = [getUserInfo(), getInitialCards()];

Promise.all([getUserInfo(), getInitialCards()])
  .then(function ([userInfo, cardList]) {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    cardList.forEach((cardInfo) => {
      const newCard = createCard(cardInfo, openFullImagePopup, userId);
      placeCardList.prepend(newCard);
    });
  })
  .catch((error) => {
    console.log(`Не удалось загрузить данные с сервера ${error}`);
  });

// Меняем аватар
function updateNewAvatar(event) {
  event.preventDefault();

  editAvatar(editAvatarInput.value)
    .then((avatar) => {
      profileImage.style.backgroundImage = `url(${avatar})`;
      closeModal(popupTypeEditAvatar);
      editAvatarForm.reset();
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    });
}

// Слушатель обновления аватара пользователя
editAvatarForm.addEventListener("submit", updateNewAvatar);
