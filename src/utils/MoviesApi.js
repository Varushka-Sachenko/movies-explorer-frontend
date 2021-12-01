



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
  
    getMovies() {
      //console.log('checkapi')
      return fetch(`${this.adress}`, {
        headers: {
          authorization: this._token
        }
      })
        .then(res => {
          return this._checkResult(res)
        })
        .then(res => {
          return this._changeToJson(res)
        })
  
    }
}

  