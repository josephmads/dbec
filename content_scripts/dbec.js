// dbec

const userAlertStyle = `
  background: #ff8080;
  padding: .75rem;
  max-width: 30rem;
  border-radius: 5px;
`;

function main() {
  const sender = document.body.querySelector("span[email]");
  const senderEmail = sender.attributes.email.value;

  // use regex to isolate domain after @ and assign to variable
  const domainRegex = /(?<=@).*/g;
  const domainArray = senderEmail.match(domainRegex);
  const senderDomain = domainArray[0];
  console.log("main1");

  // Define the API URL
  // const rdapUrl = `https://rdap.verisign.com/com/v1/domain/${senderDomain}`;

  // Make Get request to RDAP API
  async function getRdapRecords(domain) {
    try {
      const response = await fetch(`https://www.rdap.net/domain/${domain}`);
      const data = await response.json();
      const registration = data.events[0]["eventDate"];
      // console.log(`${senderDomain} was registered on ${registration}`)

      // display message to user
      const target = document.getElementById(":1v");
      const userAlert = document.createElement("div");
      userAlert.textContent = `${domain} was registered on ${registration}`;
      userAlert.style.cssText = userAlertStyle;
      target.before(userAlert);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  getRdapRecords(senderDomain);
}

// use Regex to match URL fragment identifier
const urlRegex = /#\w*\W\w*/g;
const urlFrag = window.location.hash;
const urlFragArray = urlFrag.match(urlRegex);
const urlFragMatch = urlFragArray[0];

// Delay functions to allow necessary elements to load -- needs to change to a eventlistener
setTimeout(() => {
  console.log("timeout");
  if (window.location.hash === urlFragMatch) {
    main();
  }
}, 5000);
