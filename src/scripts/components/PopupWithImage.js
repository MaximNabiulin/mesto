import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageLink = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(image, title) {
    this._popupImageLink.src = image;
    this._popupImageLink.alt = title;
    this._popupImageCaption.textContent = title;
    super.open();
  }
}