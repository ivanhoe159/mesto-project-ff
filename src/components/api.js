import {checkResponse} from '../components/utils/utils.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: '14623f3a-7681-4149-84a8-6e2abb29c429',
      'Content-Type': 'application/json'
    }
  }

  export function loadUser() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(checkResponse)
  }

  export function loadCards() {
    return fetch(`${config.baseUrl}/cards`, {
       headers: config.headers
    })
    .then(checkResponse)
  }

  export function editProfile(nameInput, jobInput) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: nameInput.value,
          about: jobInput.value
        })
      })
      .then(checkResponse)
  }

  export function loadNewCard(placeName, linkURL) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify ({
          name: placeName.value,
          link: linkURL.value
        }),
        headers: config.headers
      })
      .then(checkResponse) 
  }

  export function loadNewAvatar(avatarURL) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          avatar: avatarURL.value
        })
      })
      .then(checkResponse)
  }

  export function removeCard(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse)
  }

  export function putLike(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(checkResponse)
  }

  export function removeLike(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(checkResponse)
  }