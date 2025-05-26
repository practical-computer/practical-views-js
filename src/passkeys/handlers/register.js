import {
  create,
  parseCreationOptionsFromJSON,
} from "@github/webauthn-json/browser-ponyfill";

let submitFormEvent = async function(event){
  const csrfToken = document.getElementsByName("csrf-token")[0].content;

  let form = event.currentTarget
  let credentialFieldName = form.dataset.credentialFieldName

  if(form.dataset.attemptWithPasskey) {
    delete form.dataset.attemptWithPasskey
    return
  }

  event.preventDefault()
  event.stopImmediatePropagation()

  let data = new FormData(form)
  data.delete('_method')

  let newChallengeURL = new URL(form.dataset.challengeUrl)

  let challengeFetch = fetch(newChallengeURL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: data,
  })

  const challengeJSON = await(await challengeFetch).json()
  const credentialCreationOptions = parseCreationOptionsFromJSON({publicKey: challengeJSON})

  const credentialCreationResponse = await create(credentialCreationOptions)

  form.elements[credentialFieldName].value = JSON.stringify(credentialCreationResponse)

  form.dataset.attemptWithPasskey = true

  form.requestSubmit()
}

export {submitFormEvent}