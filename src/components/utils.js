// Отрисовываем состояние кнопки сохранить
const renderSaveTextButton = ({isLoading, buttonElement}) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

export { renderSaveTextButton };
