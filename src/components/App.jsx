import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './App.styled.js';

const LOCALSTORAGE_KEY = 'contactBoock';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.contacts) {
      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = ({ name, number }) => {
    const isExist = this.state.contacts.find(
      ({ contactName }) => contactName.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${isExist.contactName} is alredy in contacts!`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), contactName: name, number: number },
      ],
    }));
  };

  renderContactList = list => {
    return list.map(cont => (
      <li key={cont.id}>
        {cont.contactName}: {cont.number}
      </li>
    ));
  };

  onFind = name => {
    const findName = name.toLowerCase();
    this.setState({ filter: findName });
  };

  filterResult = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ contactName }) =>
      contactName.toLowerCase().includes(filter)
    );
  };

  deleteContact = id => {
    this.setState(pState => ({
      contacts: pState.contacts.filter(cont => cont.id !== id),
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        {!this.state.contacts.length ? (
          <h2>No contacts</h2>
        ) : (
          <>
            <h2>Contacts</h2>
            <Filter onFilter={this.onFind} />
            <ContactList
              contArr={this.filterResult()}
              onDelete={this.deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
}
