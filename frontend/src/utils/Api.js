import { BASE_URL } from './devConst.js';

class Api {
  constructor(settings) {
    this.settings = settings;
  }

  _makeNewFetch(url, props = {}){
    return fetch(url, {
      method: props.method,
      headers: props.headers,
      body:props.body
    })
    .then( res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
}

  getProfile(token) {
    return  this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  editProfile(user, token) {
    return this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    })
  }

  updateAvatar(avatar,token){
    return this._makeNewFetch(`${this.settings.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(avatar)
    })
  }

  getCards(token) {

    return this._makeNewFetch(`${this.settings.baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  addCard(card, token) {
    console.log('addCardApi: ', JSON.stringify(card))
    return this._makeNewFetch(`${this.settings.baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(card),
    })
}

  deleteCard(id, token) {
    return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
}

  changeLikeCardStatus(id,isLiked, token){
    if(!isLiked){
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    } else {
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    }
  }
}

export const api = new Api({
  baseUrl: `${BASE_URL}`,
})