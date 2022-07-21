
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
    const {headers} = this.settings;
    return  this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      //headers: this.settings.headers,
      headers: {
        headers,
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  editProfile(user, token) {
    return this._makeNewFetch(`${this.settings.baseUrl}/users/me`, {
      method: "PATCH",
      // headers: this.settings.headers,
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
      // headers: this.settings.headers,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(avatar)
    })
  }

  getCards(token) {
    const {headers} = this.settings;

    return this._makeNewFetch(`${this.settings.baseUrl}/cards`, {
      headers: {
        headers,
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  addCard(card, token) {
    const {headers} = this.settings;
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
      // headers: this.settings.headers,
    })
}

  changeLikeCardStatus(id,isLiked, token){
    if(!isLiked){
      //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        // headers: this.settings.headers
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    } else {
      //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
      return this._makeNewFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        // headers: this.settings.headers
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    }
  }
}

export const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  // baseUrl: "http://localhost:3001",
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    // authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM2ZDQ3MmFlMTdjOTRhOTIyNjg2NjEiLCJpYXQiOjE2NTgzMjIzMDQsImV4cCI6MTY1ODkyNzEwNH0.S1DznGY41H06NpzZkp5jfoJBIY9YnSS33fr1_m7Px_c',
    'Content-Type': 'application/json'
  }
})