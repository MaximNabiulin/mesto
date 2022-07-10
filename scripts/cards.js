 class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;

    // const template = document.querySelector(this._templateSelector);
    // this._element = template.content.querySelector('.place').cloneNode(true);

    // this._element.querySelector('.place__title').textContent = this._title;
    // this._element.querySelector('.place__image').src = this._image;
    // this._element.querySelector('.place__image').alt = this._title;

    // this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const cardElement = template.content.querySelector('.place').cloneNode(true);

    return cardElement;
  }

  _openViewer() {
    const popup = document.querySelector('.popup_type_image-view');
    const image = popup.querySelector('.popup__image');
    const caption = popup.querySelector('.popup__image-caption');
    image.src = this._image;
    image.alt = this._title;
    caption.textContent = this._title;
    popup.classList.add('popup_opened');
  }

  _handleLikeButton() {
    this._element.querySelector('.place__like-button')
      .classList.toggle('place__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    delete this._element;
  }

  _setEventListeners() {
    const imageElement = this._element.querySelector('.place__image');
    const likeButton = this._element.querySelector('.place__like-button');
    const deleteButton = this._element.querySelector('.place__delete-button');

    imageElement.addEventListener ('click', () => {
      this._openViewer();
    });

    likeButton.addEventListener ('click', () => {
      this._handleLikeButton()
    });

    deleteButton.addEventListener ('click', () => {
      this._handleDeleteButton()
    });
  }

  getElement() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__title').textContent = this._title;
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._title;
    return this._element
  }
}

export { Card }