import { Component } from 'react';
import { nanoid } from 'nanoid';
import {load, save } from './shared/services/localStorage/storage';

import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';


class App extends Component {
  static defaultProps = {
    contacts: [],
  } 

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = load('contactsList');
    
        if(contacts?.length) {
            this.setState({
                contacts,
            })
        }

  }

  componentDidUpdate() {
    const { contacts } = this.state;
    save('contactsList', contacts);
  }


  handelFormSubmit = data => {
    const { name } = data;
    const { contacts } = this.state;
    const sameName = contacts.some(el => el.name === name);
    let contact = {};

    if (sameName) {
      alert(`${name} is already in contacts.`);
      return
    }
    else {
      contact = { id: nanoid(), ...data };
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  handleFilterData = e => {
    const { value } = e.target;
    this.setState({
      filter: value,
    })
    }
  getFilteredContacts() {
    const { filter, contacts } = this.state;
    
    if (!filter) {
      return contacts
    }
    return contacts.filter(({name}) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  removeContact = id=> {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),  
    }));
  }

  render() {
    
    const { handelFormSubmit, handleFilterData, removeContact } = this;
    const filtredContacts = this.getFilteredContacts();


    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={handelFormSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter
            title="Find contacts by name"
            filter={handleFilterData}
          />
          <ContactList contacts={filtredContacts} onClick={removeContact} />          
        </Section>
      </>
    );
  }
}

export default App;





/*  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
*/