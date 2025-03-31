// Функция открытия попапа
export function openModal(popupElement) {
  popupElement.classList.add("popup_is-animated");
  popupElement.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeKeyEscape);
}

// Функция закрытия попапа
export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-animated");
  popupElement.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeKeyEscape);
}

// Функция закрытия попапа по нажатию на ESC
export function closeKeyEscape(popupElement, event) {
  if (event.key === "Escape") {
    popupElement.classList.remove("popup_is-animated");
    const popupIsOpened = document.querySelector("popup_is-opened");

    closeModal(popupIsOpened);
  }
}
