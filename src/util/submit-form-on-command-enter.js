export async function submitFormOnCommandEnter(event) {
  if(event.key == "Enter" && (event.metaKey || event.ctrlKey)){
    event.target.form.requestSubmit()
  }
}