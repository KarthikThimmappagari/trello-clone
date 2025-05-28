import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { FiX, FiTrash2 } from 'react-icons/fi';
import '../styles/Modal.css';

const CardModal = ({ card, listId, onClose, onUpdateCard, onDeleteCard }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [dueDate, setDueDate] = useState(card.dueDate || '');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSave = () => {
        onUpdateCard(listId, card.id, {
            title,
            description,
            dueDate: dueDate || null,
        });
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            onDeleteCard(listId, card.id);
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Edit Card</h3>
                    <button className="close-btn" onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="modal-input"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="modal-textarea"
                            rows="5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="modal-input"
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="delete-btn" onClick={handleDelete}>
                        <FiTrash2 /> Delete Card
                    </button>
                    <div>
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardModal;