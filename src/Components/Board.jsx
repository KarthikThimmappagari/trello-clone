import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useLocalStorage from '../hooks/useLocalStorage';
import List from './List';
import AddList from './AddList';
import '../styles/Board.css';
import Header from './Header'
const Board = () => {
    const [lists, setLists] = useLocalStorage('trello-lists', []);

    const addList = (title) => {
        const newList = {
            id: `list-${Date.now()}`,
            title,
            cards: [],
        };
        setLists([...lists, newList]);
    };

    const deleteList = (listId) => {
        setLists(lists.filter(list => list.id !== listId));
    };

    const updateListTitle = (listId, newTitle) => {
        setLists(lists.map(list =>
            list.id === listId ? { ...list, title: newTitle } : list
        ));
    };

    const addCard = (listId, title) => {
        const newCard = {
            id: `card-${Date.now()}`,
            title,
            description: '',
            dueDate: null,
        };
        setLists(lists.map(list =>
            list.id === listId
                ? { ...list, cards: [...list.cards, newCard] }
                : list
        ));
    };

    const updateCard = (listId, cardId, updatedCard) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.map(card =>
                        card.id === cardId ? { ...card, ...updatedCard } : card
                    ),
                };
            }
            return list;
        }));
    };

    const deleteCard = (listId, cardId) => {
        setLists(lists.map(list => {
            if (list.id === listId) {
                return {
                    ...list,
                    cards: list.cards.filter(card => card.id !== cardId),
                };
            }
            return list;
        }));
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Handling list drag
        if (type === 'list') {
            const newLists = [...lists];
            const [removed] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, removed);
            setLists(newLists);
            return;
        }

        // Handling card drag
        const sourceList = lists.find(list => list.id === source.droppableId);
        const destinationList = lists.find(list => list.id === destination.droppableId);
        const draggedCard = sourceList.cards.find(card => card.id === draggableId);

        // Moving within the same list
        if (source.droppableId === destination.droppableId) {
            const newCards = [...sourceList.cards];
            newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, draggedCard);

            setLists(lists.map(list =>
                list.id === sourceList.id ? { ...list, cards: newCards } : list
            ));
        } else {
            // Moving to a different list
            const sourceCards = [...sourceList.cards];
            sourceCards.splice(source.index, 1);

            const destinationCards = [...destinationList.cards];
            destinationCards.splice(destination.index, 0, draggedCard);

            setLists(lists.map(list => {
                if (list.id === sourceList.id) {
                    return { ...list, cards: sourceCards };
                } else if (list.id === destinationList.id) {
                    return { ...list, cards: destinationCards };
                }
                return list;
            }));
        }
    };

    const resetBoard = () => {
        if (window.confirm('Are you sure you want to reset the board? This will delete all lists and cards.')) {
            setLists([]);
        }
    };

    return (
        <div className="board-container">
            <Header onReset={resetBoard} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false} >
                    {(provided) => (
                        <div
                            className="lists-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {lists.map((list, index) => (
                                <List
                                    key={list.id}
                                    list={list}
                                    index={index}
                                    onDeleteList={deleteList}
                                    onUpdateListTitle={updateListTitle}
                                    onAddCard={addCard}
                                    onUpdateCard={updateCard}
                                    onDeleteCard={deleteCard}
                                />
                            ))}
                            {provided.placeholder}
                            <AddList onAdd={addList} />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Board;