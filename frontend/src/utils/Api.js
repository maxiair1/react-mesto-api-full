
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

  getProfile() {
    return  this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      headers: this.settings.headers,
    })
  }

  editProfile(user) {
    return this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.settings.headers,
      body: JSON.stringify(user)
    })
  }

  updateAvatar(avatar){
    return this._makeNewFetch(`${this.settings.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.settings.headers,
      body: JSON.stringify(avatar)
    })
  }

  getCards() {
    return this._makeNewFetch(`${this.settings.baseUrl}/cards`, {
      headers: this.settings.headers
    })
  }

  addCard(card) {
    return this._makeNewFetch(`${this.settings.baseUrl}/cards`, {
      method: "POST",
      headers: this.settings.headers,
      body: JSON.stringify(card)
    })
}

  deleteCard(id) {
    return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.settings.headers,
    })
}

  changeLikeCardStatus(id,isLiked){
    if(!isLiked){
      //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this.settings.headers
      })
    } else {
      //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this.settings.headers
      })
    }
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: '026e3cd0-c777-4ed1-873d-bcc2b8a959a1',
    'Content-Type': 'application/json'
  }
})