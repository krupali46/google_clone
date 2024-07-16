import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SINGLE_CONTACT, ADDCONTACTSUC } from '../action/ActionType';
import { getData, setData } from '../helper';
import generateUniqueId from 'generate-unique-id';

const initialState = {
    contacts: [],
    contact: null,
    isloading: false
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            let newContact = {
                ...action.payload,
                id: generateUniqueId({ length: 4, useLetters: false })
            };
            let newContacts = [...state.contacts, newContact];
            setData('contacts', newContacts);

            return {
                ...state,
                contacts: newContacts,
                isloading: false
            };  

        case SINGLE_CONTACT:
            return {
                ...state,
                contact: action.payload,
            };

        case UPDATE_CONTACT:
            let updatedContacts = state.contacts.map((ct) => {
                if (ct.id === state.contact.id) {
                    return { ...ct, ...action.payload };
                } else {
                    return ct;
                }
            });
            setData('contacts', updatedContacts);

            return {
                ...state,
                contacts: updatedContacts,
                contact: null
            };

        case DELETE_CONTACT:
            const remainingContacts = state.contacts.filter(ct => ct.id !== action.payload);
            setData('contacts', remainingContacts);
            return {
                ...state,
                contacts: remainingContacts
            };

        case "loading":
            return {
                ...state,
                isloading: true
            };

        case ADDCONTACTSUC:
            return {
                ...state,
                contacts: action.payload,
                isloading: false,
                contact: null
            };

        default:
            return state;
    }
};
