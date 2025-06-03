const storageKey = 'theme-preference'
const htmlDataAttributeName = `data-theme`

export function getColorPreference() {
  if(!localStorage){ return 'match-system' }
  //Has an explicit value been set? Use it if so
  if(localStorage.getItem(storageKey)){
    return localStorage.getItem(storageKey)
  } else {
    if(window.matchMedia(`(prefers-color-scheme:dark)`).matches){
      return 'dark'
    } else {
      return 'light'
    }
  }
}

export function setColorPreference(value){
  localStorage.setItem(storageKey, value)
  reflectColorPreference()
}

export function reflectColorPreference(){
  document.firstElementChild.setAttribute(htmlDataAttributeName, getColorPreference())
}


export function setDefaultColorPreference(defaultValue){
  if(defaultValue.toString().trim() == ""){ return }
  if(!localStorage){ return }
  if(localStorage.getItem(storageKey)){ return }
  setColorPreference(defaultValue)
}
