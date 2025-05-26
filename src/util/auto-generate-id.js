export function autoGenerateID(prefix) {
  var iterator = -0
  var seconds = new Date().getTime()

  do {
    iterator += 1
    var generated = `${prefix}-${seconds}-${iterator}`
  } while(document.getElementById(generated))

  return generated
}