// Отрисовываем состояние кнопки сохранить
const renderSaveTextButton = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

export { renderSaveTextButton };
