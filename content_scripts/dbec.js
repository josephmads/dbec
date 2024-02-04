// dbec

const userAlertStyle = `
  background: #ff0000;
  padding: .75rem;
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
      const tld = domain.substr(domain.length - 3);
      let url = "";
      
      // keep trying rdap.net/domain/

      // replace with a for loop? 
      if (tld === "com") {
        url = `https://rdap.verisign.com/com/v1/domain/${domain}`;
      } else if (tld === "net") {
        url = `https://rdap.verisign.com/net/v1/domain/${domain}`;
      } else {
        url = `https://rdap.verisign.com/$TLD/v1/domain/${domain}`;
        url = `https://rdap.donuts.co/rdap/domain/${domain}`;
        url = `https://rdap.identitydigital.services/rdap/domain/${domain}`;
      }

      const response = await fetch(url);
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

// Delay functions to allow necessary elements to load -- needs to change to a eventlistener
setTimeout(() => {
  console.log("timeout");
  main();
}, 5000);
