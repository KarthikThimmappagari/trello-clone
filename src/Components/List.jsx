import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { FiPlus, FiX } from 'react-icons/fi';
import '../styles/List.css';

const List = ({
    list,
    index,
    onDeleteList,
    onUpdateListTitle,
    onAddCard,
    onUpdateCard,
    onDeleteCard
}) => {
    const [newCardTitle, setNewCardTitle] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [listTitle, setListTitle] = useState(list.title);

    const handleAddCard = () => {
        if (newCardTitle.trim()) {
            onAddCard(list.id, newCardTitle);
            setNewCardTitle('');
        }
    };

    const handleUpdateTitle = () => {
        if (listTitle.trim()) {
            onUpdateListTitle(list.id, listTitle);
            setIsEditingTitle(false);
        }
    };

    return (
        <Draggable draggableId={list.id} index={index} isDropDisabled={false}>
            {(provided) => (
                <div
                    className="list"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="list-header" {...provided.dragHandleProps}>
                        {isEditingTitle ? (
                            <input
                                type="text"
                                value={listTitle}
                                onChange={(e) => setListTitle(e.target.value)}
                                onBlur={handleUpdateTitle}
                                onKeyPress={(e) => e.key === 'Enter' && handleUpdateTitle()}
                                autoFocus
                                className="list-title-input"
                            />
                        ) : (
                            <h3 onClick={() => setIsEditingTitle(true)}>{list.title}</h3>
                        )}
                        <button
                            className="delete-list-btn"
                            onClick={() => onDeleteList(list.id)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <Droppable droppableId={list.id} type="card">
                        {(provided) => (
                            <div
                                className="cards-container"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {list.cards.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        index={index}
                                        listId={list.id}
                                        onUpdateCard={onUpdateCard}
                                        onDeleteCard={onDeleteCard}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="add-card-container">
                        <input
                            type="text"
                            placeholder="Add a card..."
                            value={newCardTitle}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCard()}
                            className="add-card-input"
                        />
                        <button onClick={handleAddCard} className="add-card-btn">
                            <FiPlus />
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default List;