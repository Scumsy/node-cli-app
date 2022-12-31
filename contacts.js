const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return console.log(parsedData);
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath));
    const searchedContact = parsedData.filter((contact) => {
      if (contact.id === contactId) {
        return contact;
      }
    });
    return console.log(searchedContact);
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath));
    parsedData.filter((contact) => {
      if (contact.id === contactId) {
        parsedData.splice(parsedData.indexOf(contact), 1);
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
    console.log(`Contact ${contactId} DELETED`);
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath));
    parsedData.push({ id: uuidv4(), name, email, phone });
    console.log(parsedData);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf8");
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
