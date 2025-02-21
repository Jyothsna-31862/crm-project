// src/components/Contacts.js
import React, { useState } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
  ]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({ name: '', email: '', phone: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Contacts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Contact
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase())).map(contact => (
                <tr key={contact.id}>
                  <td className="px-6 py-4">{contact.name}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.phone}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(contact.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mb-2 border rounded"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-2 border rounded"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 mb-4 border rounded"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 rounded text-white">Cancel</button>
              <button onClick={handleAddContact} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
