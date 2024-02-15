import '../styles/index.css'; 
import {addCard} from '../src/components/card.js';
import {openModal, closeModal} from '../src/components/modal.js';
import {enableValidation, clearValidation} from '../src/components/validation.js';
import {loadUser, loadCards, editProfile, newCard, newAvatar} from '../src/components/api.js';

const page = document.querySelector('.page');
const profileTitle = page.querySelector('.profile__title');
const profileDesc = page.querySelector('.profile__description');
const profileImage = page.querySelector('.profile__image');
const placesList = page.querySelector('.places__list');
const editPopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const avatarPopup = page.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const editForm = editPopup.querySelector('.popup__form');
const newCardForm = newCardPopup.querySelector('.popup__form');
const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const avatarButton = page.querySelector('.profile__edit-avatar');
const nameInput = page.querySelector('#popup__input_type_name');
const jobInput = page.querySelector('#popup__input_type_description');
const placeName = page.querySelector('#popup__input_type_card-name');
const linkURL = page.querySelector('#popup__input_type_url');
const avatarURL = page.querySelector('#popup__input_type_avatar');
const cardTemplate = page.querySelector('#card-template');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}

enableValidation(validationConfig);

loadUser()
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDesc.textContent = result.about;
    profileImage.style.backgroundImage = `url('${result.avatar}')`;
  })
  .catch((err) => {
    console.log(err); 
  }); 


loadCards()
  .then((result) => {
    result.forEach(card => {
      const newCard = addCard(cardTemplate, card, clickCard);
      placesList.append(newCard);
    })
  }) 
  .catch((err) => {
    console.log(err); 
  }); 


function clickCard(initialCard) {
  popupImage.src = initialCard.link;
  popupImage.alt = initialCard.name;
  popupCaption.textContent = initialCard.name;
  openModal(imagePopup);
};  

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  editPopup.querySelector('.popup__button').textContent = "Сохранение...";
  editProfile(nameInput, jobInput)
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDesc.textContent = result.about;
    closeModal(editPopup);
    clearValidation(editPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  }) 
}

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  newCardPopup.querySelector('.popup__button').textContent = "Сохранение...";
  newCard(placeName, linkURL)
  .then((result) => {
    const newCard = addCard(cardTemplate, result, clickCard);
    placesList.prepend(newCard);
    closeModal(newCardPopup);
    clearValidation(newCardPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

function avatarFormSubmit(evt) {
  evt.preventDefault(); 
  avatarPopup.querySelector('.popup__button').textContent = "Сохранение...";
  newAvatar(avatarURL)
  .then((result) => {
    profileImage.style.backgroundImage = `url('${result.avatar}')`;
    closeModal(avatarPopup);
    clearValidation(avatarPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

editForm.addEventListener('submit', profileFormSubmit);
newCardForm.addEventListener('submit', cardFormSubmit);
avatarForm.addEventListener('submit', avatarFormSubmit);

editButton.addEventListener('click', function(evt) {
  evt.stopPropagation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  openModal(editPopup);
  clearValidation(editPopup, validationConfig);
});

addButton.addEventListener('click', function(evt) {
  evt.stopPropagation();
  placeName.value = '';
  linkURL.value = '';
  openModal(newCardPopup);
  clearValidation(newCardPopup, validationConfig);
});

avatarButton.addEventListener('click', function(evt) {
  evt.stopPropagation();
  avatarURL.value = '';
  openModal(avatarPopup);
  clearValidation(avatarPopup, validationConfig);
});


