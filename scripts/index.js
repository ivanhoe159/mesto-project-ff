const page = document.querySelector('.page');
const placesList = page.querySelector('.places__list');
const cardTemplate = page.querySelector('#card-template');

const deleteCard = function() {
    const currentCard = this.closest('.card');
    currentCard.remove();
}

function addCard(initialCard, deleteCard) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = initialCard.link;
    newCard.querySelector('.card__image').alt = initialCard.name;
    newCard.querySelector('.card__title').textContent = initialCard.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return newCard;
}

initialCards.forEach(card => {
    const newCard = addCard(card, deleteCard);
    placesList.append(newCard);
})