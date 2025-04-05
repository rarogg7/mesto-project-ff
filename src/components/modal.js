// Функция открытия попапа
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeKeyEscape);
}

// Функция закрытия попапа
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeKeyEscape);
}

// Функция закрытия попапа по нажатию на ESC
function closeKeyEscape(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closeModal(popupIsOpened);
  }
}

export {openModal, closeModal}