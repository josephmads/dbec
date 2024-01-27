// dbec

function main() {
  const sender = document.body.getElementsByClassName("gD");
  sender[0].style.border = "3px solid red"; //DELETE ME
  const senderEmail = sender[0].attributes.email.value;
  
  // use regex to isolate domain after @ and assign to variable
  const domainRegex = /(?<=@).*/g;
  const domainArray = senderEmail.match(domainRegex);
  const senderDomain = domainArray[0];
  
  // Define the API URL
  const rdapUrl = `https://rdap.verisign.com/com/v1/domain/${senderDomain}`;
  
  // Make Get request to RDAP API
  async function getRdapRecords(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const registration = data.events[0]["eventDate"]
      console.log(`${senderDomain} was registered on ${registration}`)
    } catch (error) {
      console.error("Error:", error);
    } 
  }

  getRdapRecords(rdapUrl)
}

// Delay functions to allow necessary elements to load
setTimeout(() => {
  main();
}, 3000);
