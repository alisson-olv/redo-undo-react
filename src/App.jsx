import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [targetLocation, setTargetLocation] = useState([]);
  const [redoItens, setRedoItens] = useState([]);

  const handleClick = (event) => {
    const location = {
      ClientX: event.pageX,
      ClientY: event.pageY
    }
    setTargetLocation([...targetLocation, location]);
  }

  const handleUndo = (event) => {
    event.stopPropagation();
    const newUndo = [...targetLocation];
    const newItem = newUndo.pop()
    setTargetLocation(newUndo);
    setRedoItens([...redoItens, newItem]);
  }

  const handleRedo = (event) => {
    event.stopPropagation();
    const newRedo = [...redoItens]
    const newItem = newRedo.pop()
    setRedoItens(newRedo);
    setTargetLocation([...targetLocation, newItem]);
  }

  return (
    <div className='box' onClick={handleClick}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button className='btn' onClick={handleUndo} disabled={targetLocation.length === 0}>Undo</button>
        <button className='btn' onClick={handleRedo} disabled={redoItens.length === 0}>Redo</button>
      </div>
      {targetLocation.map((item, index) =>
        <span
          key={index}
          className='dot'
          style={{ left: item.ClientX - 13, top: item.ClientY - 13 }}
        />
      )}
    </div>
  )
}

export default App