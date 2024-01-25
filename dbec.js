
function getSenderDomain() {
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

  return url;
}



// Make a GET request


// Delay functions to allow necessary elements to load

setTimeout(() => {
  const apiURL = getSenderDomain();
  console.log(apiURL)
}, 3000);






/* Not working fetches

// async function getRdapRecords() {
//   return fetch(url).then(response => response.json());
// }

// const rdapData  = await getRdapRecords();

// const registration = rdapData.events[0]["eventDate"]



// let rdapData;

// fetch(url).then(
//   function(u) { return u.json();}
// ).then(
//   function(json) {
//     rdapData = json;
//   }
// )

// const registration = rdapData.events[0]["eventDate"];
// console.log(`${senderDomain} was registered on ${registration}`);



// async function getRdapRecords() {
//   const response = await fetch(url);
//   const data = await response.json();
//   const registration = await data.events[0]["eventDate"];
//   console.log(data);
// }

// getRdapRecords()

// const senderDomainReg = getRdapRecords();

// const registration = rdapData.events[0]["eventDate"];

// console.log(`${senderDomain} was registered on ${senderDomainReg}`);

// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

*/
