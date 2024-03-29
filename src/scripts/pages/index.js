import './index.css';

import Card from '../components/Cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  validationSettings,
  profileName,
  profileJob,
  profileAvatar,
  placesContainer,
  templatePlaceSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  popupViewImageSelector,
  popupDeleteCardSelector,
  editButton,
  avatarEditButton,
  addButton
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '9fd8f809-2b73-494b-91df-a3deb101ee29',
    'Content-Type': 'application/json'
  }
});

let currentUser;

// ЗАГРУЗКА ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НАЧАЛЬНЫХ КАРТОЧЕК

Promise.all([api.getUserInfoFromApi(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    currentUser = userInfo;
    profileInfo.setUserInfo(userInfo);
    profileInfo.setUserAvatar(userInfo);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const profileInfo = new UserInfo({
    nameSelector: profileName,
    jobSelector: profileJob,
    avatarSelector: profileAvatar
  }
);

// ПОПАП РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
const editProfilePopup = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (data) => {
      editProfilePopup.renderLoading(true);
      api.editUserInfo(data)
        .then((userData) => {
          profileInfo.setUserInfo(userData);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfilePopup.renderLoading(false);
        });
    }
  }
);

editProfilePopup.setEventListeners();

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА ПРОФИЛЯ
const editAvatarPopup = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (data) => {
    editAvatarPopup.renderLoading(true);
    api.editUserAvatar(data)
      .then((userData) => {
        profileInfo.setUserAvatar(userData);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      });
  }
}
);

editAvatarPopup.setEventListeners();

// ПОПАП ПРОСМОТРА ИЗОБРАЖЕНИЯ
const viewImagePopup = new PopupWithImage(popupViewImageSelector);

viewImagePopup.setEventListeners();

// ПОПАП УДАЛЕНИЯ КАРТОЧКИ
const deleteCardPopup = new PopupWithDeleteConfirmation({
  popupSelector: popupDeleteCardSelector,
  handleFormSubmit: (card) => {
    api.deleteCard(card.cardId)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

deleteCardPopup.setEventListeners();

// СОЗДАНИЕ КАРТОЧКИ
const createCard = (item) => {
  const card = new Card ({
    data: item,
    templateSelector: templatePlaceSelector,
    handleCardClick: (image, title) => {
      viewImagePopup.open(image, title);
    },
    handleSetLike: (card) => {
      api.setlike(card.cardId)
        .then((data) => {
          card.update(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLike: (card) => {
      api.removeLike(card.cardId)
        .then((data) => {
          card.update(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteBtnClick: (card) => {
      deleteCardPopup.open(card);
    },
  }, currentUser._id);
  const cardElement = card.getElement();
  return cardElement;
};

// СОЗДАНИЕ ЭКЗЕМПЛЯРА Section
const cardsList = new Section({
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }
  },
  placesContainer
);

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const newPlaceCardPopup = new PopupWithForm({
    popupSelector: popupAddCardSelector,
    handleFormSubmit: (item) => {
      newPlaceCardPopup.renderLoading(true);
      api.addCard(item)
        .then((cardData) => {
          cardsList.addItem(createCard(cardData), false);
          newPlaceCardPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          newPlaceCardPopup.renderLoading(false);
        });
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

// ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
editButton.addEventListener('click', function() {
  const initialInfo = profileInfo.getUserInfo();
  editProfilePopup.setInputValues(initialInfo);
  formValidators['profile-edit-form'].resetValidation();
  editProfilePopup.open();
});

// ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ АВАТАРА ПРОФИЛЯ
avatarEditButton.addEventListener('click', function() {
  const initialAvatar = profileInfo.getUserInfo();
  editAvatarPopup.setInputValues(initialAvatar);
  formValidators['avatar-edit-form'].resetValidation();
  editAvatarPopup.open();
});

// ОТКРЫТИЕ ФОРМЫ СОЗДАНИЯ КАРТОЧКИ
addButton.addEventListener('click', function() {
  formValidators['new-place-form'].resetValidation();
  newPlaceCardPopup.open();
});