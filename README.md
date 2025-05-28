Here's the refined README.md file with all your requested changes incorporated:

```markdown
# Trello Clone - Task Management Board

![Screenshot 2025-05-29 002439](https://github.com/user-attachments/assets/7e43af22-6c0c-4bb9-bb87-5f684ad7026a)

A responsive Trello-like task management board built with React that allows users to organize tasks with drag-and-drop functionality. Data persists in localStorage for a seamless user experience.

## Features

- 🎯 **Drag-and-Drop Interface**: Intuitive card and list rearrangement
- 📝 **Task Management**: Create, edit, and delete cards with details
- 📋 **List Organization**: Add, rename, and remove task lists
- 💾 **Automatic Saving**: All changes persist in localStorage
- 🔄 **Reset Option**: Clear all data with one click
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/            # React components
│   ├── Board.jsx          # Main board container
│   ├── List.jsx           # Individual list component
│   ├── Card.jsx           # Task card component
│   ├── AddList.jsx        # Component for adding new lists
│   ├── CardModal.jsx      # Modal to view/edit card details
│   └── Header.jsx         # Header with reset functionality
├── hooks/
│   └── useLocalStorage.js # Custom hook for localStorage
├── styles/                # Component-specific styles
├── App.jsx                # Root component
└── main.jsx               # Application entry point
```

## Technologies Used

- **Frontend**: React.js
- **State Management**: React Hooks
- **Drag-and-Drop**: react-beautiful-dnd
- **Styling**: CSS Modules
- **Icons**: react-icons
- **Date Handling**: date-fns
- **ID Generation**: uuid

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trello-clone.git
   cd trello-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

## How to Use

### Managing Lists
- **Add List**: Click "+ Add another list" button
- **Edit Title**: Click on any list title to edit
- **Delete List**: Click the ✕ icon in list header

### Managing Cards
- **Add Card**: Type in "Add a card..." input at list bottom
- **Edit Card**: Click any card to open details modal
- **Move Card**: Drag and drop within or between lists
- **Delete Card**: Use delete button in card modal

### Board Controls
- **Reset Board**: Use "Reset Board" button in header to clear all data
