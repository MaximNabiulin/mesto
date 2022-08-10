export default class Card {
  constructor(
    {
      data,
      templateSelector,
      handleCardClick,
      handleSetLike,
      handleRemoveLike,
      handleDeleteBtnClick
    },
    currentUserId
  ) {
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this._currentUserId = currentUserId;

    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteBtnClick = handleDeleteBtnClick;

    this.update(data);
  }

  // получаем шаблон карточки
  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const cardElement = template.content.querySelector('.place').cloneNode(true);

    this._imageElement = cardElement.querySelector('.place__image');
    this._likeButton = cardElement.querySelector('.place__like-button');
    this._deleteButton = cardElement.querySelector('.place__delete-button');
    this._likeCounter = cardElement.querySelector('.place__like-counter');

    return cardElement;
  }

  // проверяем и настраиваем вид элементов карточки
  _setupView() {
    this._setupDeleteBtnView();
    this._setupLikesView();
  }

  _setupLikesView() {
    if (this._likedByCurrentUser) {
      this._likeButton.classList.add('place__like-button_active');
    } else {
      this._likeButton.classList.remove('place__like-button_active');
    }
    this._likeCounter.textContent = this._likes.length;
  }

  _setupDeleteBtnView() {
    if (this._currentUserId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  // обновляет данные о карточке

  update(data) {
    this._title = data.name;
    this._image = data.link;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;

    this._likedByCurrentUser = this._likes.some(user => {
      return user._id === this._currentUserId;
    })

    this._setupView();
  }

  // метод удаления карточки

  deleteCard() {
    this._element.remove();
    delete this._element;
  }

  // устанавливаем обработчики событий

  _setEventListeners() {
    this._imageElement.addEventListener ('click', () => {
      this._handleCardClick(this._image, this._title);
    });

    this._likeButton.addEventListener ('click', () => {
      if (this._likedByCurrentUser) {
        this._handleRemoveLike(this)
      } else {
        this._handleSetLike(this)
      }
    });

    this._deleteButton.addEventListener ('click', () => {
      this._handleDeleteBtnClick(this);
    });
  }

  // возвращаем карточку

  getElement() {
    this._setEventListeners();

    this._element.querySelector('.place__title').textContent = this._title;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;
    return this._element;
  }
}