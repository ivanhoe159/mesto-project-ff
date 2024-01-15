const openModal = function(popup) {
    const closeButton = popup.querySelector('.popup__close');
    const submitButton = popup.querySelector('.popup__button');
    popup.classList.add('popup_is-opened');
    function handleListener(evt) {
      if((evt.target == closeButton || evt.target == submitButton || evt.target == popup) || (evt.key == 'Escape')) {
        document.removeEventListener('keydown', handleListener);
        document.removeEventListener('click', handleListener);
        closeModal(popup);
      }
    }
    document.addEventListener('keydown', handleListener);
    document.addEventListener('click', handleListener);
  }
  
  const closeModal = function(popup) {
    popup.classList.remove('popup_is-opened');
  }

  export {openModal, closeModal};