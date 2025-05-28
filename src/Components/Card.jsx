import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import CardModal from './CardModal';
import '../styles/Card.css';

const Card = ({ card, index, listId, onUpdateCard, onDeleteCard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="card-content">
                            <h4>{card.title}</h4>
                            {card.dueDate && (
                                <div className={`due-date ${new Date(card.dueDate) < new Date() ? 'overdue' : ''}`}>
                                    {format(new Date(card.dueDate), 'MMM dd')}
                                </div>
                            )}
                            {card.description && (
                                <div className="card-description-preview">
                                    {card.description.length > 100
                                        ? `${card.description.substring(0, 200)}...`
                                        : card.description}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Draggable>

            {isModalOpen && (
                <CardModal
                    card={card}
                    listId={listId}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateCard={onUpdateCard}
                    onDeleteCard={onDeleteCard}
                />
            )}
        </>
    );
};

export default Card;
