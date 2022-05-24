const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__profile-name');
const jobInput = document.querySelector('.popup__profile-aboutself');

const openPopup = function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const closePopup = function() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  console.log('Handler Run');
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);