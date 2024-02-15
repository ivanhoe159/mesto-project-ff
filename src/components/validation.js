const noSymbols = /[^а-яёa-z\s\-]/i; 
const errorSymbols = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.";
const nameInput = document.querySelector('#popup__input_type_name');
const placeName = document.querySelector('#popup__input_type_card-name');

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const formButton = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
    formButton.disabled = true;
    inputElement.classList.add(`${validationConfig.inputErrorClass}`);
    errorElement.textContent = errorMessage;
  };
  
  function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
    errorElement.textContent = '';
  };
  
  function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig)
      });
    });
  }; 
  
  function isFormValid(formElement, validationConfig) {
    const formButton = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
    formButton.disabled = false;
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
    inputList.forEach((inputElement) => {
      if(!inputElement.validity.valid) 
        formButton.disabled = true;
    });
  }
  
  function isValid(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
      isFormValid(formElement, validationConfig);
      if(inputElement == nameInput || inputElement == placeName)
        isValidSymbol(formElement, inputElement, validationConfig);
    }
  };
  
  function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`))
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };

  function clearValidation(formElement, validationConfig) {
    const formButton = formElement.querySelector(`${validationConfig.submitButtonSelector}`);
    const spanList = Array.from(formElement.querySelectorAll(`${validationConfig.errorClass}`));
    const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`));
    formButton.textContent = "Сохранить";
    formButton.disabled = true;
    spanList.forEach((spanElement) => {
      spanElement.textContent = '';
    });
    inputList.forEach((inputElement) => {
      inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
    });
  }
  
  function isValidSymbol(formElement, inputElement, validationConfig) {
    if(noSymbols.test(inputElement.value))
      showInputError(formElement, inputElement, errorSymbols, validationConfig);
  }



  export {enableValidation, clearValidation};