import {getReauthenticationToken} from '../util/get-reauthentication-token'


async function submitFormEvent(event){
  if(this.hasReauthenticated) { return }
  event.preventDefault()
  event.stopImmediatePropagation()
  let element = event.currentTarget
  await getReauthenticationToken(element.form)
  element.hasReauthenticated = true
  element.form.requestSubmit()
}

async function clearHasReauthenticated(event) {
  let element = event.currentTarget.hasReauthenticated = false
}

class SubmitFormAfterReauthenticationElement extends HTMLElement {
  hasReauthenticated;

  constructor() {
    super();
    this.hasReauthenticated = false
  }

  connectedCallback() {
    if(!this.isConnected){ return }
    this.addEventListener(`submit`, submitFormEvent)
    this.addEventListener(`ajax:complete`, clearHasReauthenticated)
  }

  get form() {
    return this.querySelector(`:scope form`)
  }
}

if (!window.customElements.get('submit-form-after-reauthentication')) {
  window.SubmitFormAfterReauthenticationElement = SubmitFormAfterReauthenticationElement;
  window.customElements.define('submit-form-after-reauthentication', SubmitFormAfterReauthenticationElement);
}