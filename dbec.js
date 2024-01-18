let sender = document.body.getElementsByClassName("gD");

sender[0].style.border = "3px solid red";

let senderEmail = sender[0].attributes.email.value;
console.log(`This message is from ${senderEmail}`);

// use regex to isolate domain after @ and assign to variable

const domainRegex = /(?<=@).*/g;
let domainArray = senderEmail.match(domainRegex);
let senderDomain = domainArray[0];
console.log(senderDomain);


// https://www.freecodecamp.org/news/make-api-calls-in-javascript/#asynchronous-javascript

// Define the API URL
const apiURL = `https://rdap.verisign.com/com/v1/domain/${senderDomain}`;

// Make a GET request
fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
