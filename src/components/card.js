function addCard(cardTemplate, initialCard, deleteCard, clickCard) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const likeElement = newCard.querySelector('.card__like-button');
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    newCard.querySelector('.card__title').textContent = initialCard.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    likeElement.addEventListener('click', function() {likeCard(likeElement)});
    function clickCardHandler(evt) {
        evt.stopPropagation();
        clickCard(cardImage);
    }
    cardImage.addEventListener('click', clickCardHandler);
    return newCard;
}

const deleteCard = function() {
    const currentCard = this.closest('.card');
    currentCard.remove();
}

const likeCard = function(likeElement) {
    likeElement.classList.toggle('card__like-button_is-active');
}  

export {addCard, deleteCard}