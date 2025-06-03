export async function removeDisabledSinceJsLoaded(event) {
  const elementsToEnable = event.target.querySelectorAll(`[data-remove-disabled-when-js-loaded]`)
  elementsToEnable.forEach((element) => { element.removeAttribute(`disabled`) })
}