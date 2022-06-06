const editButton = document.querySelector('#edit-button');
const addButton = document.querySelector('#add-button');

const popupEditProfile = document.querySelector('.popup__profile');
const closeEditProfile = document.querySelector('#profile-close');
const popupAddPlace = document.querySelector('.popup__new-place');
const closeAddPlace = document.querySelector('#place-close');
const popupViewImage = document.querySelector('.popup__image-view');
const closeViewImage = document.querySelector('#view-close');

const popupImageLink = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-self');
const formProfileElement = document.querySelector('#profile-edit-form');
const nameInput = document.querySelector('.popup__profile-name');
const jobInput = document.querySelector('.popup__profile-aboutself');

const placesContainer = document.querySelector ('.places');
const placeTemplate = document.querySelector('#place-template').content;
const formPlaceElement = document.querySelector('#new-place-form');
const namePlaceInput = document.querySelector('#place-name');
const linkPlaceInput = document.querySelector('#place-image-link');

const cards = [...initialCards];

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

const textInput = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};


function addCard(name, link) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__image').src = link;
  placeElement.querySelector('.place__image').alt = name;

  placeElement.querySelector('.place__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('place__like-button_active');
  });

  placeElement.querySelector('.place__delete-button').addEventListener('click', () => {
    placeElement.remove();
  });

  placeElement.querySelector('.place__image').addEventListener('click', () => {
    openPopup(popupViewImage);
    popupImageLink.src = link;
    popupImageLink.alt = name;
    popupImageCaption.textContent = name;
  });

  placesContainer.append(placeElement);
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

editButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  textInput();
});

addButton.addEventListener('click', function() {
  openPopup(popupAddPlace);
});

closeEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

closeAddPlace.addEventListener('click', function() {
  closePopup(popupAddPlace);
});

closeViewImage.addEventListener('click', function() {
  closePopup(popupViewImage);
});

formProfileElement.addEventListener('submit', formSubmitHandler);

formPlaceElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeName = document.querySelector('#place-name');
  const placeLink = document.querySelector('#place-image-link');

  addCard(placeName.value, placeLink.value);

  placeName.value = '';
  placeLink.value = '';
  closePopup(popupAddPlace);
});

cards.forEach(({name, link}) => {
  addCard(name, link);
});