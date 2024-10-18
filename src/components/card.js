// Функция создания карточки

function createCard(cardData, deleteCard, cardPopup) {
  const templateCard = document.querySelector("#card-template").content;

  const cardElement = templateCard
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  // Тело карточки, что отрисовывается

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Кнопка удаления карточки

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", deleteCard);

  // Ставим лайк
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeCard);

  // Увеличиваем картинку

  cardImage.addEventListener("click", () => cardPopup(cardData));

  return cardElement;
}

// Функция удаления карточки со страницы

function deleteCard(cardElement) {
  cardElement.target.closest(".card").remove();
}

// Ставим лайк карточке

function likeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

// Экспортируем в другие файлы

export { createCard, deleteCard, likeCard };
