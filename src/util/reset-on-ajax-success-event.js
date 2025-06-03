export async function resetOnAjaxSuccessEvent(event) {
  const target = event.target
  if(!target?.dataset?.resetOnAjaxSuccess){ return }
  target.reset()
}