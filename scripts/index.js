const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__profile-name');
const jobInput = document.querySelector('.popup__profile-aboutself');

editButton.addEventListener('click', function() {
  popup.classList.add('popup__opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup__opened');
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);