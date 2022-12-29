const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      return console.log(data);
    })
    .catch((err) => console.log(`Smth went wrong: ${err}`));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })

    .then((data) =>
      data.filter((contact) => {
        if (contact.id === contactId) {
          return console.log(contact);
        }
      })
    )
    .catch((err) => console.log(`Smth went wrong: ${err}`));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })

    .then(async (data) => {
      data.filter((contact) => {
        if (contact.id === contactId) {
          deletedContact = data.splice(data.indexOf(contact), 1);
          fs.writeFile(contactsPath, JSON.stringify(data));
          console.log(`Contact ${contactId} DELETED`);
        }
      });
    })

    .catch((err) => console.log(`Smth went wrong: ${err}`));
}

function addContact(name, email, phone) {
  let newContact;
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      data.map((contact) => {
        if (contact.name === name) {
          return console.log("Name already exist");
        } else {
          return (newContact = { id: uuidv4(), name, email, phone });
        }
      });
      data.push(newContact);
      return data;
    })

    .then(async (data) => {
      console.log(data);
      await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    })

    .catch((err) => console.log(`Smth went wrong: ${err}`));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
