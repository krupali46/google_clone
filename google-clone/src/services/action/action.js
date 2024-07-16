import axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, SINGLE_CONTACT } from './ActionType';
import generateUniqueId from 'generate-unique-id';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../FireBase';

export const addContact = (contact) => {
    return {
        type: ADD_CONTACT,
        payload: contact
    };
};

export const deleteItem = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id
    };
};

export const updateItem = (newRec) => {
    return {
        type: UPDATE_CONTACT,
        payload: newRec
    };
};

export const singleContact = (data) => {
    return {
        type: SINGLE_CONTACT,
        payload: data
    };
};

export const loading = () => {
    return {
        type: "loading",
        isloading: true
    };
};

const addContactsSuccess = (data) => {
    return {
        type: 'ADDCONTACTSUC',
        payload: data
    };
};

export const addContactAsync = (contact) => {
    console.log(contact, "jen");
    return (dispatch) => {
        dispatch(loading());
        setTimeout(() => {
            contact.id = generateUniqueId({length: 4, useLetters: false});
            console.log("bindu");

            axios.post('http://localhost:3005/contacts', contact).then((res) => {
                dispatch(getContactsAsync(res.data));
                console.log(res, "ok");
            })
            .catch((err) => {
                console.log("err", err);
            });
        }, 1000);
    };
};

export const getContactsAsync = () => {
    return (dispatch) => {
        dispatch(loading());
        setTimeout(() => {
            axios.get('http://localhost:3005/contacts').then((res) => {
                dispatch(addContactsSuccess(res.data));
                console.log(res, "suc");
            })
            .catch((err) => {
                console.log(err);
            });
        }, 1000);
    };
};

export const deleteContactAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3005/contacts/${id}`).then((res) => {
            dispatch(getContactsAsync());
            console.log(res, "suc");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const singleContactAsync = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3005/contacts/${id}`).then((res) => {
            dispatch(singleContact(res.data));
            console.log(res.data, "bulbosour");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const editContactAsync = (contact) => {
    return (dispatch) => {
        axios.put(`http://localhost:3005/contacts/${contact.id}`, contact)
        .then((res) => {
            dispatch(getContactsAsync(res.data));
            console.log(res.data, "oggey");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};


export const uploadImg = (file) => {
    return (dispatch) => {
        const storageRef = ref(storage, `img/${file.name}`);

        return uploadBytes(storageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                console.log('Uploaded file and got URL!', url);
                return url;
            })
            .catch(err => {
                console.error("Error uploading file: ", err);
                throw err;
            });
    };
};
