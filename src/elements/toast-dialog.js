import './auto-expire'

async function autoExpireTickHandler(event) {
  const element = event.currentTarget
  element.remainingTimeIndicator.value = (event.detail.remainingRatio * 100)
}

async function autoExpiredHandler(event) {
  const element = event.currentTarget
  element.dialog.close()
}

class ToastDialog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if(!this.isConnected){ return }

    this.addEventListener(`auto-expire:tick`, autoExpireTickHandler)
    this.addEventListener(`auto-expire:expired`, autoExpiredHandler)
  }

  disconnectedCallback(){}

  get remainingTimeIndicator() {
    return this.querySelector(`[remaining-time-indicator]`)
  }

  get dialog() {
    return this.querySelector(`:scope > dialog`)
  }
}

if (!window.customElements.get('toast-dialog')) {
  window.ToastDialog = ToastDialog;
  window.customElements.define('toast-dialog', ToastDialog);
}