export async function handleJSONRedirectionEvent(event){
  if(event.detail.fetchResponse.status != 322) { return }

  let responseJSON = await event.detail.fetchResponse.json()
  let location = responseJSON.location
  window.location.assign(location)
  event.preventDefault()
}