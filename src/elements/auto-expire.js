async function dispatchTickEvent(element) {
  const remainingSeconds = element.remainingSeconds
  const details = {
    remainingSeconds: remainingSeconds,
    remainingRatio: (remainingSeconds / element.durationInSeconds)
  }

  var event;

  if(remainingSeconds > 0) {
    event = new CustomEvent("auto-expire:tick", {detail: details, bubbles: true})
  } else {
    event = new CustomEvent("auto-expire:expired", {detail: details, bubbles: true})
    clearInterval(element.intervalID)
  }

  element.dispatchEvent(event)
}

class AutoExpire extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if(!this.isConnected){ return }

    var endTime = new Date()

    endTime.setSeconds(endTime.getSeconds() + this.durationInSeconds)

    this.setAttribute(`end-timestamp`, endTime.toISOString())
    this.intervalID = setInterval(dispatchTickEvent, this.tickRateInMilliseconds, this)
  }

  disconnectedCallback(){}

  get endTimestamp() {
    return new Date(this.getAttribute(`end-timestamp`))
  }

  get durationInSeconds() {
    return Number.parseInt(this.getAttribute(`duration-seconds`))
  }

  get tickRateInMilliseconds() {
    return Number.parseInt(this.getAttribute(`tick-rate-ms`))
  }

  get remainingSeconds() {
    var currentTime = new Date()
    var endTime = this.endTimestamp
    return (endTime.getTime() - currentTime.getTime()) / 1000
  }
}

if (!window.customElements.get('auto-expire')) {
  window.AutoExpire = AutoExpire;
  window.customElements.define('auto-expire', AutoExpire);
}