import likeActive from '../../images/like-active.svg';
import likeInactive from '../../images/like-inactive.svg';

function addCard(newCard, initialCard, deleteCard, imagePopup, openModal) {
    const likeElement = newCard.querySelector('.card__like-button');
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    newCard.querySelector('.card__title').textContent = initialCard.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    likeElement.style.backgroundImage = 'url('+likeInactive+')';
    likeElement.addEventListener('click', function() {likeCard(likeElement)});
    cardImage.addEventListener('click', function(evt) {
      evt.stopPropagation();
      imagePopup.querySelector('.popup__image').src = cardImage.src;
      imagePopup.querySelector('.popup__image').alt = cardImage.alt;
      imagePopup.querySelector('.popup__caption').textContent = initialCard.name;
      openModal(imagePopup);
    });
    return newCard;
}

const likeCard = function(likeElement) {
  if(likeElement.style.backgroundImage != 'url("'+likeActive+'")')
    likeElement.style.backgroundImage = 'url("'+likeActive+'")';
  else likeElement.style.backgroundImage = 'url("'+likeInactive+'")';
}

const deleteCard = function() {
    const currentCard = this.closest('.card');
    currentCard.remove();
}

export {addCard, likeCard, deleteCard}