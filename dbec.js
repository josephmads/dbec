// dbec

function getSenderDomain() {
  const sender = document.body.getElementsByClassName("gD");
  sender[0].style.border = "3px solid red"; //DELETE ME
  const senderEmail = sender[0].attributes.email.value;
  console.log(`This message is from ${senderEmail}`); //DELETE ME
  
  // use regex to isolate domain after @ and assign to variable
  
  const domainRegex = /(?<=@).*/g;
  const domainArray = senderEmail.match(domainRegex);
  const senderDomain = domainArray[0];
  console.log(senderDomain); //DELETE ME
  
  // Define the API URL
  
  const url = `https://rdap.verisign.com/com/v1/domain/${senderDomain}`;
  return url;
}

// Make a GET request

async function getRdapRecords(url) {
  try {
    console.log(typeof(url), url) //DELETE ME
    const response = await fetch(url);
    const data = await response.json();
    console.log(data) 
  } catch (error) {
    console.error("Error:", error);
  } 
}

function main() {
  const apiURL = getSenderDomain();
  console.log(apiURL)
  getRdapRecords(apiURL)
}

// Delay functions to allow necessary elements to load


setTimeout(() => {
  main();
}, 3000);
