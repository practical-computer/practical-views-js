export async function focusOnAjaxSuccessEvent(event) {
  const target = event.target
  const focusTargetSelector = target?.dataset?.focusOnAjaxSuccess
  if(!focusTargetSelector){ return }

  const focusTarget = document.querySelector(focusTargetSelector)
  focusTarget?.focus()
}