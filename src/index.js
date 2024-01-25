import '../styles/index.css'; 
import {initialCards} from '../src/components/cards.js'
import {addCard} from '../src/components/card.js';
import {openModal, closeModal} from '../src/components/modal.js';

const page = document.querySelector('.page');
const profileTitle = page.querySelector('.profile__title');
const profileDesc = page.querySelector('.profile__description');
const placesList = page.querySelector('.places__list');
const editPopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const editForm = editPopup.querySelector('.popup__form');
const newCardForm = newCardPopup.querySelector('.popup__form');
const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_description');
const placeName = page.querySelector('.popup__input_type_card-name');
const linkURL = page.querySelector('.popup__input_type_url');
const cardTemplate = page.querySelector('#card-template');

//some training

const its = [];
console.log(its.pop());

function clickCard(initialCard) {
  popupImage.src = initialCard.link;
  popupImage.alt = initialCard.name;
  popupCaption.textContent = initialCard.name;
  openModal(imagePopup);
};  

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModal(editPopup);
}

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  const card = {
    name: placeName.value,
    link: linkURL.value
  };
  const newCard = addCard(cardTemplate, card, clickCard);
  placesList.prepend(newCard);
  closeModal(newCardPopup);
}

editForm.addEventListener('submit', profileFormSubmit);
newCardForm.addEventListener('submit', cardFormSubmit);

editButton.addEventListener('click', function(evt) {
  evt.stopPropagation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  openModal(editPopup);
});

addButton.addEventListener('click', function(evt) {
  evt.stopPropagation();
  placeName.value = '';
  linkURL.value = '';
  openModal(newCardPopup);
});

initialCards.forEach(card => {
    const newCard = addCard(cardTemplate, card, clickCard);
    placesList.append(newCard);
})


