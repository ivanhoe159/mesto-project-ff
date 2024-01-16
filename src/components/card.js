function addCard(cardTemplate, initialCard, deleteCard, likeCard) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    const likeElement = newCard.querySelector('.card__like-button');
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    newCard.querySelector('.card__title').textContent = initialCard.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    likeElement.addEventListener('click', function() {likeCard(likeElement)});
    return newCard;
}

const deleteCard = function() {
    const currentCard = this.closest('.card');
    currentCard.remove();
}

export {addCard, deleteCard}