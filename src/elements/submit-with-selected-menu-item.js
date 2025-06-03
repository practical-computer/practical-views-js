const menuItemSelectedEvent = async function(event) {
  const dropdownElement = event.currentTarget
  const menuElement = event.target
  const value = event.detail.item.value

  dropdownElement.form.elements[event.target.dataset.fieldName].value = value
  dropdownElement.form.requestSubmit()
}

class SubmitWithSelectedMenuItemElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if(!this.isConnected){ return }

    this.addEventListener(`wa-select`, menuItemSelectedEvent)
  }

  get form() {
    return this.querySelector(`:scope form`)
  }

}

if (!window.customElements.get('submit-with-selected-menu-item')) {
  window.customElements.define('submit-with-selected-menu-item', SubmitWithSelectedMenuItemElement);
}