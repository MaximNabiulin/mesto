const popupEditProfile = document.querySelector('.popup_type_profile-editor');
const popupAddPlace = document.querySelector('.popup_type_new-place');
const popupViewImage = document.querySelector('.popup_type_image-view');

const closeButtons = document.querySelectorAll('.popup__close-button');

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
const placeInputName = document.querySelector('#place-name');
const placeInputLink = document.querySelector('#place-image-link');

const cards = [...initialCards];

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

const fillProfileInputs = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const createCard = function (name, link) {
  const element = placeTemplate.querySelector('.place').cloneNode(true);
  const titleElement = element.querySelector('.place__title');
  const imageElement = element.querySelector('.place__image');

  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  element.querySelector('.place__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('place__like-button_active');
  });

  element.querySelector('.place__delete-button').addEventListener('click', () => {
    element.remove();
  });

  imageElement.addEventListener('click', () => {
    openPopup(popupViewImage);
    popupImageLink.src = link;
    popupImageLink.alt = name;
    popupImageCaption.textContent = name;
  });

  return element;
};

// Решил поменять немного логику добавления карточек из массива, на более гибкий
const addCards = (data, direction = true) => {
  const fragment = document.createDocumentFragment();
  data.forEach (({name, link}) => {
    const element = createCard(name, link);
    if (direction) {
      fragment.append(element)
    } else {
      fragment.prepend(element)
    };
  })
  if (direction) {
    placesContainer.append(fragment)
  } else {
    placesContainer.prepend(fragment)
  };
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Также решил объединить обработчики и начальное добавление карточек на страницу в одну функцию: init
const init = () => {
  const editButton = document.querySelector('#edit-button');
  const addButton = document.querySelector('#add-button');
  editButton.addEventListener('click', function() {
    openPopup(popupEditProfile);
    fillProfileInputs();
  });

  addButton.addEventListener('click', function() {
    openPopup(popupAddPlace);
  });

  closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup))
  });

  formProfileElement.addEventListener('submit', handleProfileFormSubmit);

  formPlaceElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    addCards([{
      name: placeInputName.value,
      link: placeInputLink.value,
    }], false);

    evt.target.reset();
    closePopup(popupAddPlace);
  });

  addCards(cards);
};

init();