let sender = document.body.getElementsByClassName("gD") 

sender[0].style.border = "3px solid red"

let sender0 = sender[0].attributes.email

alert(`This message is from ${sender0.value}`)