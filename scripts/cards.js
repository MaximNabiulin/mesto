class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const cardElement = template.content.querySelector('.place').cloneNode(true);

    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('place__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    delete this._element;
  }

  _setEventListeners() {
    this._imageElement = this._element.querySelector('.place__image');
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');

    this._imageElement.addEventListener ('click', () => {
      this._handleCardClick(this._title, this._image);
    });

    this._likeButton.addEventListener ('click', () => {
      this._handleLikeButton()
    });

    this._deleteButton.addEventListener ('click', () => {
      this._handleDeleteButton()
    });
  }

  getElement() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__title').textContent = this._title;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    return this._element;
  }
}

export { Card }