export async function openModalDialogOnCableCarEvent(event) {
  const openModalDialogId = event?.detail?.openModalDialogId
  if(!openModalDialogId){return}
  const modalDialog = document.getElementById(openModalDialogId)
  if(!modalDialog){ return }
  if(modalDialog.open){ modalDialog.close() }
  modalDialog.showModal()
}