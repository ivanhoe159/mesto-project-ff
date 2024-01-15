import '../styles/index.css'; 
import currentAvatar from '../images/avatar.jpg';
import {initialCards} from '../src/components/cards.js'
import {addCard, deleteCard} from '../src/components/card.js';
import {openModal} from '../src/components/modal.js';

const page = document.querySelector('.page');
const profileTitle = page.querySelector('.profile__title');
const profileImage = page.querySelector('.profile__image');
const profileDesc = page.querySelector('.profile__description');
const placesList = page.querySelector('.places__list');
const editPopup = page.querySelector('.popup_type_edit');
const newCardPopup = page.querySelector('.popup_type_new-card');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const formsList = page.querySelectorAll('.popup__form');
const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_description');
const placeName = page.querySelector('.popup__input_type_card-name');
const linkURL = page.querySelector('.popup__input_type_url');
const cardTemplate = page.querySelector('#card-template');
const imagePopup = page.querySelector('.popup_type_image');

profileImage.style.backgroundImage = 'url('+currentAvatar+')';

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const currentForm = this.attributes["name"].value;
    if(currentForm == 'edit-profile') {
      profileTitle.textContent = nameInput.value;
      profileDesc.textContent = jobInput.value;
    }
    else if(currentForm == 'new-place') {
      const card = {
        name: placeName.value,
        link: linkURL.value
      };
      const nodeCard = cardTemplate.content.querySelector('.card').cloneNode(true);
      const newCard = addCard(nodeCard, card, deleteCard, imagePopup, openModal);
      placesList.prepend(newCard);
    }
    this.reset();
}

formsList.forEach(form => {
  form.addEventListener('submit', handleFormSubmit);
});

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
    const nodeCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const newCard = addCard(nodeCard, card, deleteCard, imagePopup, openModal);
    placesList.append(newCard);
})



