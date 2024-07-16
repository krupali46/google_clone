import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../services/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsync, uploadImg } from '../../services/action/action';
import './CreateContact.css';

const CreateContact = () => {
    const initialState = {
        id: '',
        avatar: '',
        name: '',
        email: '',
        ph: '',
        Add: '',
        nots: ''
    };

    const [inputState, setInputState] = useState(initialState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [myContacts, setMyContacts] = useState(getData('contacts') || []);
    const isLoading = useSelector(state => state.Reducer.isloading);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({
            ...inputState,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContactAsync(inputState));
        setIsSubmit(true);
        setInputState(initialState);
    };

    useEffect(() => {
        if (isSubmit && !isLoading) {
            navigate('/');
        }
    }, [isSubmit, navigate, isLoading]);

    const handleImg = async (e) => {
        const file = e.target.files[0];
        setUploading(true);
        try {
            const url = await dispatch(uploadImg(file));
            setInputState(prevContact => ({ ...prevContact, avatar: url }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        setUploading(false);
    };

    return (
        <Container className="mt-5 custom-container">
            <Row>
                <div className="form-card1 justify-content-center d-flex mt-5">
                    <div className="form-card2">
                        <form className="form" onSubmit={handleSubmit}>
                            <p className="form-heading">Create Contact</p>

                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input type="file" className="form-control" id="avatar" aria-describedby="avatarHelp" onChange={handleImg} />
                                <div id="avatarHelp" className="form-text">Upload an image for your avatar.</div>
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Name"
                                    className="input-field"
                                    value={inputState.name}
                                    onChange={handleInput}
                                    type="text"
                                    name="name"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Email"
                                    className="input-field"
                                    value={inputState.email}
                                    onChange={handleInput}
                                    type="email"
                                    name="email"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Phone"
                                    className="input-field"
                                    value={inputState.ph}
                                    onChange={handleInput}
                                    type="number"
                                    name="ph"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Address"
                                    className="input-field"
                                    value={inputState.Add}
                                    onChange={handleInput}
                                    type="text"
                                    name="Add"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Notes"
                                    className="input-field"
                                    value={inputState.nots}
                                    onChange={handleInput}
                                    type="text"
                                    name="nots"
                                />
                            </div>

                            <button type="submit" className="sendMessage-btn mt-2">
                                {isLoading ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default CreateContact;
