class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.email}`;
    }
}

// UC2: Ability to ensure valid contacts are added
function validateContact(contact) {
    const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
    const addressPattern = /^[a-zA-Z0-9\s]{4,}$/;
    const zipPattern = /^\d{5,6}$/;
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    if (!namePattern.test(contact.firstName) || !namePattern.test(contact.lastName))
        throw "Invalid Name";
    if (!addressPattern.test(contact.address) || !addressPattern.test(contact.city) || !addressPattern.test(contact.state))
        throw "Invalid Address, City, or State";
    if (!zipPattern.test(contact.zip)) throw "Invalid Zip Code";
    if (!phonePattern.test(contact.phoneNumber)) throw "Invalid Phone Number";
    if (!emailPattern.test(contact.email)) throw "Invalid Email";
}

// UC3: Ability to create Address Book array and add contacts
let addressBook = [];
function addContact(contact) {
    validateContact(contact);
    addressBook.push(contact);
}

// UC4: Ability to find a contact by name and edit it
function editContact(name, updatedContact) {
    let index = addressBook.findIndex(contact => contact.firstName === name);
    if (index !== -1) {
        validateContact(updatedContact);
        addressBook[index] = updatedContact;
    } else {
        console.log("Contact Not Found!");
    }
}

// UC5: Ability to delete a contact by name
function deleteContact(name) {
    addressBook = addressBook.filter(contact => contact.firstName !== name);
}

// UC6: Ability to count the number of contacts
function getContactCount() {
    return addressBook.reduce((count) => count + 1, 0);
}

// UC7: Ability to check for duplicate entries
function addContactWithDuplicateCheck(contact) {
    if (addressBook.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
        console.log("Duplicate Contact Found!");
        return;
    }
    addContact(contact);
}

// UC8: Ability to search a person in a particular city or state
function searchByCityOrState(city, state) {
    return addressBook.filter(contact => contact.city === city || contact.state === state);
}

// UC9: Ability to view persons by city or state
function viewByCityOrState(city, state) {
    console.log(`Contacts in ${city || state}:`);
    addressBook.filter(contact => contact.city === city || contact.state === state)
        .forEach(contact => console.log(contact.toString()));
}

// UC10: Ability to count contacts by city or state
function countByCityOrState() {
    let countMap = {};
    addressBook.forEach(contact => {
        countMap[contact.city] = (countMap[contact.city] || 0) + 1;
        countMap[contact.state] = (countMap[contact.state] || 0) + 1;
    });
    return countMap;
}