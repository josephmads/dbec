const sender = document.body.getElementsByClassName("gD");

sender[0].style.border = "3px solid red";

let senderEmail = sender[0].attributes.email.value;
console.log(`This message is from ${senderEmail}`);

// use regex to isolate domain after @ and assign to variable

const domainRegex = /(?<=@).*/g;
const domainArray = senderEmail.match(domainRegex);
const senderDomain = domainArray[0];
console.log(senderDomain);

// Define the API URL

const url = `https://rdap.verisign.com/com/v1/domain/${senderDomain}`;

// Make a GET request

async function getRdapRecords() {
  return fetch(url).then(response => response.json());
}
 
const rdapData  = await getRdapRecords();

const registration = rdapData.events[0]["eventDate"]


// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     rdap = data;
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
    
