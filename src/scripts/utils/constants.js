const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');
const profileAvatar = document.querySelector('.profile__avatar');

const placesContainer = document.querySelector ('.places');

const templatePlaceSelector ='#place-template'

const popupEditProfileSelector = '.popup_type_profile-editor';
const popupEditAvatarSelector = '.popup_type_avatar-editor';
const popupAddCardSelector = '.popup_type_new-place';
const popupViewImageSelector = '.popup_type_image-view';
const popupDeleteCardSelector = '.popup_type_delete-card';

const editButton = document.querySelector('#edit-button');
const avatarEditButton = document.querySelector('#avatar-button');
const addButton = document.querySelector('#add-button');

export {
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
}