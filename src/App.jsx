import React from 'react';
import Board from './Components/Board';
import './styles/App.css';
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  // Add this inside the Board component if you want initial data
  const initialLists = [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        {
          id: 'card-1',
          title: 'Design the UI',
          description: 'Create wireframes for all screens',
          dueDate: '2023-06-15',
        },
        {
          id: 'card-2',
          title: 'Set up project',
          description: 'Initialize React app and install dependencies',
          dueDate: '2023-06-10',
        },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [
        {
          id: 'card-3',
          title: 'Implement drag and drop',
          description: 'Use react-beautiful-dnd for card movement',
          dueDate: '2023-06-20',
        },
      ],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [
        {
          id: 'card-4',
          title: 'Project planning',
          description: 'Define requirements and create roadmap',
          dueDate: '2023-06-05',
        },
      ],
    },
  ];

  const [lists, setLists] = useLocalStorage('trello-lists', initialLists);
  return (
    <div className="app">
      <Board />
    </div>
  );
}

export default App;