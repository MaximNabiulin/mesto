export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    const userInfo = {
      profileName: this._nameSelector.textContent,
      profileJob: this._jobSelector.textContent
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._jobSelector.textContent = data.job;
  }
}