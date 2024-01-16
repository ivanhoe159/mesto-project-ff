function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup); 
    }
}  

function closeByMouse(evt) {
    console.log('test');
    const openedPopup = document.querySelector('.popup_is-opened');
    const closeButton = openedPopup.querySelector('.popup__close');
    const submitButton = openedPopup.querySelector('.popup__button');
    if(evt.target == closeButton || evt.target == submitButton || evt.target == openedPopup)
        closeModal(openedPopup);
}

const openModal = function(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', closeByMouse);
  }
  
  const closeModal = function(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', closeByMouse);
  }

  export {openModal, closeModal};