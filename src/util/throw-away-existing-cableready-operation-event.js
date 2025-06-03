export async function throwAwayExistingCableReadyOperationEventHandler(event) {
  const existingSelector = event?.detail?.existingSelector
  if(!existingSelector){return}
  if(!document.querySelector(existingSelector)){ return }
  event.detail.cancel = true
}