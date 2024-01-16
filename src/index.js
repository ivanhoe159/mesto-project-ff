import '../styles/index.css'; 
import {initialCards} from '../src/components/cards.js'
import {addCard, deleteCard} from '../src/components/card.js';
import {openModal} from '../src/components/modal.js';

const page = document.querySelector('.page');
const profileTitle = page.querySelector('.profile__title');
const profileDesc = page.querySelector('.profile__description');
const placesList = page.querySelector('.places__list');
const editPopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const imagePopup = page.querySelector('.popup_type_image');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const formsList = page.querySelectorAll('.popup__form');
const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_description');
const placeName = page.querySelector('.popup__input_type_card-name');
const linkURL = page.querySelector('.popup__input_type_url');
const cardTemplate = page.querySelector('#card-template');

const likeCard = function(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

function clickCard(cardImage) {
  imagePopup.querySelector('.popup__image').src = cardImage.src;
  imagePopup.querySelector('.popup__image').alt = cardImage.alt;
  imagePopup.querySelector('.popup__caption').textContent = cardImage.alt;
  openModal(imagePopup);
};

function profileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
}

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  const card = {
    name: placeName.value,
    link: linkURL.value
  };
  const newCard = addCard(cardTemplate, card, deleteCard, likeCard);
  const cardImage = newCard.querySelector('.card__image');
  function clickCardHandler(evt) {
    evt.stopPropagation();
    clickCard(cardImage);
  }
  cardImage.addEventListener('click', clickCardHandler);
  placesList.prepend(newCard);
}

formsList[0].addEventListener('submit', profileFormSubmit);
formsList[1].addEventListener('submit', cardFormSubmit);

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
    const newCard = addCard(cardTemplate, card, deleteCard, likeCard);
    const cardImage = newCard.querySelector('.card__image');
    function clickCardHandler(evt) {
      evt.stopPropagation();
      clickCard(cardImage);
    }
    cardImage.addEventListener('click', clickCardHandler);
    placesList.append(newCard);
})



