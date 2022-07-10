import { Card } from './cards.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_type_profile-editor');
const popupAddPlace = document.querySelector('.popup_type_new-place');

const closeButtons = document.querySelectorAll('.popup__close-button');
const overlays = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');
const formProfileElement = document.querySelector('#profile-edit-form');
const nameInput = document.querySelector('.popup__profile-name');
const jobInput = document.querySelector('.popup__profile-aboutself');

const placesContainer = document.querySelector ('.places');
const formPlaceElement = document.querySelector('#new-place-form');
const placeInputName = document.querySelector('#place-name');
const placeInputLink = document.querySelector('#place-image-link');

const cards = [...initialCards];

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

const addCards = (data, direction = true) => {
  const fragment = document.createDocumentFragment();
  data.forEach (({name, link}) => {
    const card = new Card ({name, link}, '#place-template');
    const element = card.getElement();

    if (direction) {
      fragment.append(element)
    } else {
      fragment.prepend(element)
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

const init = () => {
  const editButton = document.querySelector('#edit-button');
  const addButton = document.querySelector('#add-button');

  // ФОРМА ПРОФИЛЯ
  {
    const formValidator = new FormValidator(validationSettings, popupEditProfile);

    editButton.addEventListener('click', function() {
      fillProfileInputs();
      formValidator.enableValidation();
      openPopup(popupEditProfile);
    });

    formProfileElement.addEventListener('submit', handleProfileFormSubmit);
  }

  // ФОРМА СОЗДАНИЯ КАРТОЧКИ
  {
    const formValidator = new FormValidator(validationSettings, formPlaceElement);

    addButton.addEventListener('click', function() {
      formValidator.enableValidation();
      openPopup(popupAddPlace);
    });

    formPlaceElement.addEventListener('submit', handlePlaceFormSubmit);
  }

  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

  overlays.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(overlay);
      }
    });
  });

  addCards(cards);
};

init();
