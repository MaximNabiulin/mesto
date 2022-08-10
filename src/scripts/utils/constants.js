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

const editButton = document.querySelector('#edit-button');
const avatarEditButton = document.querySelector('#avatar-button');
const addButton = document.querySelector('#add-button');

export {
  validationSettings,
  profileName,
  profileJob,
  profileAvatar,
  placesContainer,
  editButton,
  avatarEditButton,
  addButton
}