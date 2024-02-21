// dbec

const userAlertStyle = `
  background: #ff8080;
  padding: .75rem;
  max-width: 30rem;
  border-radius: 5px;
`;

function main() {
  const getSender = document.body.querySelector("span[email]");
  const senderEmail = getSender.attributes.email.value;

  /**
   * Isolates the domain from the email address
   * @param {string} email
   * @returns {string} isolated domain
   */
  function isolateDomain(email) {
    const domainRegex = /(?<=@).*/gi;
    const domainArray = email.match(domainRegex);
    const domain = domainArray[0];

    const checkForSubDomain = (domain.match(/\./g)||[]).length;

    if (checkForSubDomain > 1) {
      senderArray = domain.split('.');
      let tld = senderArray.pop()
      let sld = senderArray.pop()
      const cleanedDomain = `${sld}.${tld}`
      return cleanedDomain
    } else {
      return domain
    }
  }

  const senderDomain = isolateDomain(senderEmail)

  /**
   * Retrieves domain records from RDAP 
   * and displays registration date to user
   * @param {string} domain 
   */
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
