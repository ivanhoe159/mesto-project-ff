import {removeCard, putLike, removeLike} from '../components/api.js';

function addCard(cardTemplate, initialCard, clickCard, likeCard, deleteCard, userID) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const deleteElement = newCard.querySelector('.card__delete-button');
    const likeElement = newCard.querySelector('.card__like-button');
    const likeCounter = newCard.querySelector('.card__like-counter');
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    if(initialCard.owner._id != userID)
        deleteElement.style.visibility = 'hidden';
    if(initialCard.likes.find(node => node._id == userID)) {
        likeElement.classList.toggle('card__like-button_is-active');
    }
    newCard.querySelector('.card__title').textContent = initialCard.name;
    deleteElement.addEventListener('click', function() {deleteCard(newCard, initialCard._id)});
    likeElement.addEventListener('click', function() {likeCard(likeElement, likeCounter, initialCard._id)});
    likeCounter.textContent = initialCard.likes.length;
    cardImage.addEventListener('click', () => clickCard(initialCard));
    return newCard;
}

const deleteCard = function(currentCard, cardID) {
    removeCard(cardID)
    .then((result) => {
      currentCard.remove();      
    })
    .catch((err) => {
      console.log(err); 
    }); 
}

const likeCard = function(likeElement, likeCounter, cardID) {
    if(likeElement.classList.contains('card__like-button_is-active')) {
        removeLike(cardID)
        .then((result) => {
            likeElement.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = result.likes.length;       
        }) 
        .catch((err) => {
          console.log(err); 
        }); 
    }
    else {
        putLike(cardID)
        .then((result) => {
          likeElement.classList.toggle('card__like-button_is-active');
          likeCounter.textContent = result.likes.length;       
        })
        .catch((err) => {
          console.log(err); 
        }); 
    }
}  

export {addCard, deleteCard, likeCard}