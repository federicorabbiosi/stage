function ciao() {
  var x = [1, 2, 3, 4]
  var y = 2
  let el = document.getElementById("text")

  var min = Math.min(x.map(n => {return n}))
  console.log(min)
  alert('ciao ' + el.value + ' ' + min)
}
