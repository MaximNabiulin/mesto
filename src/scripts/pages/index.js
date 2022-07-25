import './index.css';

import Card from '../components/Cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cards,
  validationSettings,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  placesContainer,
  editButton,
  addButton
} from '../utils/constants.js';

const profileInfo = new UserInfo({
    nameSelector: profileName,
    jobSelector: profileJob
  }
);

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const editProfilePopup = new PopupWithForm({
    popupSelector: '.popup_type_profile-editor',
    handleFormSubmit: (data) => {
      profileInfo.setUserInfo(data);
      editProfilePopup.close();
    }
  }
);

editProfilePopup.setEventListeners();

// ПОПАП ПРОСМОТРА ИЗОБРАЖЕНИЯ
const viewImagePopup = new PopupWithImage('.popup_type_image-view');

viewImagePopup.setEventListeners();

// СОЗДАНИЕ КАРТОЧКИ
const createCard = (item) => {
  const card = new Card ({
    data: item,
    templateSelector: '#place-template',
    handleCardClick: (image, title) => {
      viewImagePopup.open(image, title);
    }
  });
  const cardElement = card.getElement();
  return cardElement;
};

// СОЗДАНИЕ ЭКЗЕМПЛЯРА Section
const cardsList = new Section({
    items: cards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  },
  placesContainer
);

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const newPlaceCardPopup = new PopupWithForm({
    popupSelector: '.popup_type_new-place',
    handleFormSubmit: (item) => {
      cardsList.addItem(createCard(item), false);
      newPlaceCardPopup.close();
    }
  }
);

newPlaceCardPopup.setEventListeners();

// ВАЛИДАЦИЯ ФОРМ
const formValidators = {};
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

// ОТКРЫТИЕ ФОРМЫ ПРОФИЛЯ
editButton.addEventListener('click', function() {
  const initialInfo = profileInfo.getUserInfo();
  nameInput.value = initialInfo.profileName;
  jobInput.value = initialInfo.profileJob;
  formValidators['profile-edit-form'].resetValidation();
  editProfilePopup.open();
});

// ОТКРЫТИЕ ФОРМЫ СОЗДАНИЯ КАРТОЧКИ
addButton.addEventListener('click', function() {
  formValidators['new-place-form'].resetValidation();
  newPlaceCardPopup.open();
});

cardsList.renderItems();