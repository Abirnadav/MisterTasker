import React from 'react';
import './App.css';
import TaskApp from './pages/TaskApp'
import './styles/global.scss';
import SocketService from './services/socketService.js'


function App() {
  SocketService.setup()
  return (
    <div className="App">
      <header>

        <h2>
          MisterTasker
        </h2>
        <span>

        </span>
      </header>
      <TaskApp />
    </div>
  );
}
export default App;
