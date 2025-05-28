import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import '../styles/AddList.css';

const AddList = ({ onAdd }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [listTitle, setListTitle] = useState('');

    const handleAddList = () => {
        if (listTitle.trim()) {
            onAdd(listTitle);
            setListTitle('');
            setIsAdding(false);
        }
    };

    return (
        <div className={`add-list ${isAdding ? 'adding' : ''}`}>
            {isAdding ? (
                <div className="add-list-input-container">
                    <input
                        type="text"
                        placeholder="Enter list title..."
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddList()}
                        autoFocus
                        className="add-list-input"
                    />
                    <div className="add-list-actions">
                        <button onClick={handleAddList} className="add-list-confirm">
                            Add List
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="add-list-cancel"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="add-list-button"
                >
                    <FiPlus /> Add another list
                </button>
            )}
        </div>
    );
};

export default AddList;