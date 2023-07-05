const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const searchContacts = await listContacts();
  const contactById = searchContacts.find(
    (contact) => contact.id === contactId
  );

  return contactById || null;
};

const removeContact = async (contactId) => {
  const arrayContacts = await listContacts();
  const index = arrayContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const deleteContact = arrayContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(arrayContacts, null, 2));
  return deleteContact;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
