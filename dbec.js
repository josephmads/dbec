let sender = document.body.getElementsByClassName("gD");

sender[0].style.border = "3px solid red";

let senderEmail = sender[0].attributes.email.value;
console.log(`This message is from ${senderEmail}`);

// use regex to isolate domain after @ and assign to variable

const domainRegex = /(?<=@).*/g;
let domainArray = senderEmail.match(domainRegex);
let senderDomain = domainArray[0];
console.log(senderDomain);

// pass domain variable to https://www.rdap.net/domain/example.com