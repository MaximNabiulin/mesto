// Класс-модель

export default class User {
  constructor({name, about, avatar, _id, cohort}) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this.id = _id;
    this.cohort = cohort;
  }
}

// To do: сделать проверку входных данных,