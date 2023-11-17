"use client";
import React, { useState, useEffect } from "react";

export default function EditMember() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${process.env.DOMAIN}/contact`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching Contacts:", error);
      }
    };

    fetchContacts();
  }, []);
  return (
    <div>
      <h3 className="text-2xl">Recent feedback</h3>
      {contacts.map((contact, index) => (
        <div key={index} className="bg-emerald-300 my-1 w-full p-2 rounded">
          <p className="font-semibold">Title: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Content: {contact.message}</p>
        </div>
      ))}
    </div>
  );
}
