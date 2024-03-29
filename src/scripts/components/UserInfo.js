export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
  }

  // возвратить объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._jobSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
    this._avatarSelector.alt = data.name;
  }
}