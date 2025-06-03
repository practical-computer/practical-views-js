export async function ensureDeclarativeOpenModalDialogsAreModal(event) {
  const openDialogs = event.target.querySelectorAll(`dialog[data-ensure-modal][open]`)
  openDialogs.forEach((dialog) => { dialog.close(); dialog.showModal() })
}