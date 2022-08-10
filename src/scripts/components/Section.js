export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element, direction = true) {
    if (direction) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });

  }
}