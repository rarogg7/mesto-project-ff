export { clearValidation, enableValidation };
// 1. Сообщение об ошибке: показываем ошибку
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// 1. Сообщение об ошибке: скрываем ошибку
function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
}

// 7. Очищаем ошибки валидации
function clearValidation(
  formElement,
  { inputSelector, inputErrorClass, errorClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
}

// 2. Функция проверки валидности формы
function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// 5. Обработчик события ввода
function setEventListeners(
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
    });
  });
}

// 6. Добавляем валидацию
function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
}