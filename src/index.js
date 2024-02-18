import '../styles/index.css'; 
import {addCard, deleteCard, likeCard} from '../src/components/card.js';
import {openModal, closeModal} from '../src/components/modal.js';
import {enableValidation, clearValidation} from '../src/components/validation.js';
import {loadUser, loadCards, editProfile, loadNewCard, loadNewAvatar} from '../src/components/api.js';

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
  noSymbolsSelector: 'popup__input-nosymbol',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
}
let userID;

enableValidation(validationConfig);


Promise.all([loadUser(), loadCards()])
  .then(([userData, cards]) => {
    userID = userData._id;
    profileTitle.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    cards.forEach(card => {
      const newCard = addCard(cardTemplate, card, clickCard, likeCard, deleteCard, userID);
      placesList.append(newCard);
    })
  })
  .catch(err => {
    console.log(err); 
  });

function clickCard(initialCard) {
  popupImage.src = initialCard.link;
  popupImage.alt = initialCard.name;
  popupCaption.textContent = initialCard.name;
  openModal(imagePopup);
};  

function submitProfileForm(evt) {
  evt.preventDefault(); 
  editPopup.querySelector('.popup__button').textContent = "Сохранение...";
  editProfile(nameInput, jobInput)
  .then((result) => {
    closeModal(editPopup);
    profileTitle.textContent = result.name;
    profileDesc.textContent = result.about;
    clearValidation(editPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  }) 
  .finally(() => {
    editPopup.querySelector('.popup__button').textContent = "Сохранить";
  })
}

function submitCardForm(evt) {
  evt.preventDefault(); 
  newCardPopup.querySelector('.popup__button').textContent = "Сохранение...";
  loadNewCard(placeName, linkURL)
  .then((result) => {
    closeModal(newCardPopup);
    const newCard = addCard(cardTemplate, result, clickCard, likeCard, deleteCard, userID);
    placesList.prepend(newCard);
    clearValidation(newCardPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    newCardPopup.querySelector('.popup__button').textContent = "Сохранить";
  })
}

function submitAvatarForm(evt) {
  evt.preventDefault(); 
  avatarPopup.querySelector('.popup__button').textContent = "Сохранение...";
  loadNewAvatar(avatarURL)
  .then((result) => {
    closeModal(avatarPopup);
    profileImage.style.backgroundImage = `url('${result.avatar}')`;
    clearValidation(avatarPopup, validationConfig);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    avatarPopup.querySelector('.popup__button').textContent = "Сохранить";
  })
}

editForm.addEventListener('submit', submitProfileForm);
newCardForm.addEventListener('submit', submitCardForm);
avatarForm.addEventListener('submit', submitAvatarForm);

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


