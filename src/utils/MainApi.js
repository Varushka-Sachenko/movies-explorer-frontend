



export default class Api {

  constructor({ adress, token }) {
    this.adress = adress
    this._token = token
  }
  _checkResult(res) {
    if (res.ok) {
      // const k = res.json()
      // console.log(k)
      return res
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _changeToJson(res) {
    return res.json()
  }

  loadUserInfo() {
    return fetch(`${this.adress}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this._token}`
      }
    })
      .then(res => {
        return this._checkResult(res)
        // console.log(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })


  }

  getSavedMovies() {
    return fetch(`${this.adress}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this._token}`
      }
    })
      .then(res => {
        return this._checkResult(res)
        // console.log(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })


  }

  editProfileINfo(data) {

    return fetch(`${this.adress}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(res => {

        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })
  }

  addSavedMovie(data) {
    return fetch(`${this.adress}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }

  deleteMovie(cardId) {
    return fetch(`${this.adress}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        // 'Content-Type': 'application/json'
      },
    })
      .then(res => {

        return this._checkResult(res)
      })
      .then(res => {
        return this._changeToJson(res)
      })

  }

}


