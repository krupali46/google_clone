import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../services/action/action';


const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { id: Date.now(), name: itemName };
        dispatch(addProduct(newItem));
        setItemName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                required 
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItem;