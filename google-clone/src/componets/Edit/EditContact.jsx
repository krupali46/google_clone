import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editContactAsync, updateItem, uploadImg } from '../../services/action/action';

function EditContact() {
    const { id } = useParams();
    console.log("Id", id);
    const { contact } = useSelector(state => state.Reducer);
    const [inputState, setInputState] = useState({
        id: 'id',
        avtar: '',
        name: '',
        email: '',
        ph: '',
        Add: '',
        nots: ''
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputState, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello", inputState);
        dispatch(editContactAsync(inputState));
        // setIsSubmit(true);
        // navigate('/');
    }

    useEffect(() => {
        if (contact) {
            setInputState(contact);
        } else {
            navigate('/')
        }
    }, [contact, navigate]);


    const handleImg = (e) => {
        const file = e.target.files[0];
        dispatch(uploadImg(file))
            .then(url => {
                setInputState(prevContact => ({ ...prevContact, avatar: url }));
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            })
           
    }

    return (
        <>
            <Container className=' justify-content-center d-flex mt-5'>
                <div className="form-card1 mt-5">
                    <div className="form-card2">
                        <form className="form" onSubmit={handleSubmit}>
                            <p className="form-heading">Edit Contact</p>
                            <input type="hidden" value={inputState.id} name='id' />
                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input type="file" className="form-control" id="avatar" aria-describedby="avatarHelp" onChange={handleImg} />
                                <div id="avatarHelp" className="form-text">Upload an image for your avatar.</div>
                            </div>
                            <div className="form-field">
                                <input placeholder="Name" className="input-field" value={inputState.name}
                                    onChange={handleInput} type="text" name="name" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Email" className="input-field" value={inputState.email}
                                    onChange={handleInput} type="email" name="email" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Phone" className="input-field" value={inputState.ph}
                                    onChange={handleInput} type="number" name="ph" />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Address" className="input-field" type="text" name="Add"
                                    value={inputState.Add} onChange={handleInput} />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Notes" className="input-field" type="text" name="nots"
                                    value={inputState.nots} onChange={handleInput} />
                            </div>

                            <button className="sendMessage-btn mt-2" type='submit'>Edit</button>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default EditContact;
