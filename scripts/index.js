import { Card } from './Cards.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_type_profile-editor');
const popupAddPlace = document.querySelector('.popup_type_new-place');

const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');
const formProfileElement = document.querySelector('#profile-edit-form');
const nameInput = document.querySelector('.popup__profile-name');
const jobInput = document.querySelector('.popup__profile-aboutself');

const placesContainer = document.querySelector ('.places');
const formPlaceElement = document.querySelector('#new-place-form');
const placeInputName = document.querySelector('#place-name');
const placeInputLink = document.querySelector('#place-image-link');

const popupViewImage = document.querySelector('.popup_type_image-view');
const popupImageLink = popupViewImage.querySelector('.popup__image');
const popupImageCaption = popupViewImage.querySelector('.popup__image-caption');

const cards = [...initialCards];

const formValidators = {};

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener ('keydown', keydownHandler);
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener ('keydown', keydownHandler);
};

const closeOpenPopup = () => {
  const popup = document.querySelector('.popup_opened');
  if (popup) {
    closePopup(popup);
  }
};

const keydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeOpenPopup();
  }
};

const fillProfileInputs = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const createCard = (item) => {
  const card = new Card (item, '#place-template', handleCardClick);
  const cardElement = card.getElement();
  return cardElement;
}

const addCards = (data, direction = true) => {
  const fragment = document.createDocumentFragment();
  data.forEach ((item) => {
    if (direction) {
      fragment.append(createCard(item))
    } else {
      fragment.prepend(createCard(item))
    }
  })
  if (direction) {
    placesContainer.append(fragment)
  } else {
    placesContainer.prepend(fragment)
  }
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();

  addCards([{
    name: placeInputName.value,
    link: placeInputLink.value,
  }], false);

  evt.target.reset();
  closePopup(popupAddPlace);
};

function handleCardClick(title, image) {
  popupImageLink.src = image;
  popupImageLink.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupViewImage);
}

const init = () => {
  const editButton = document.querySelector('#edit-button');
  const addButton = document.querySelector('#add-button');

  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
      const validator = new FormValidator(settings, formElement);
      const formName = formElement.getAttribute('name');

      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(validationSettings);

  // ФОРМА ПРОФИЛЯ
  editButton.addEventListener('click', function() {
    fillProfileInputs();
    formValidators['profile-edit-form'].resetValidation();
    openPopup(popupEditProfile);
  });

  formProfileElement.addEventListener('submit', handleProfileFormSubmit);


  // ФОРМА СОЗДАНИЯ КАРТОЧКИ
  addButton.addEventListener('click', function() {
    formValidators['new-place-form'].resetValidation();
    openPopup(popupAddPlace);
  });

  formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    });
  });

  addCards(cards);
};

init();