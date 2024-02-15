function addCard(cardTemplate, initialCard, clickCard) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const deleteElement = newCard.querySelector('.card__delete-button');
    const likeElement = newCard.querySelector('.card__like-button');
    const likeCounter = newCard.querySelector('.card__like-counter');
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    if(initialCard.owner._id != '1cebd42a12c2c9befb1391c9')
        deleteElement.style.visibility = 'hidden';
    if(initialCard.likes.find(node => node._id == '1cebd42a12c2c9befb1391c9')) {
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
    currentCard.remove();
    return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/${cardID}`, {
        method: 'DELETE',
        headers: {
          authorization: '14623f3a-7681-4149-84a8-6e2abb29c429'
        }
      })
}

const likeCard = function(likeElement, likeCounter, cardID) {
    likeElement.classList.toggle('card__like-button_is-active');
    if(likeElement.classList.contains('card__like-button_is-active')) {
      return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
          authorization: '14623f3a-7681-4149-84a8-6e2abb29c429'
        }
      })
        .then(res => res.json())
        .then((result) => {
            likeCounter.textContent = result.likes.length;       
        }); 
    }
    else {
        return fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${cardID}`, {
            method: 'DELETE',
            headers: {
              authorization: '14623f3a-7681-4149-84a8-6e2abb29c429'
            }
          })
            .then(res => res.json())
            .then((result) => {
                likeCounter.textContent = result.likes.length;       
            }); 
    }
}  

export {addCard, deleteCard, likeCard}