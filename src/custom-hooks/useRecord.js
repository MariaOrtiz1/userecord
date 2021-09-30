import { useEffect, useState } from 'react';

export const useRecord = (startingColor = '#00FF00') => {
  const [current, setCurrent] = useState(startingColor);
  const [history, setHistory] = useState([startingColor]);
  const [currentPlacement, setPlacement] = useState(0);

  const record = (newColor) => {
    const startingPlacement = currentPlacement + 1;
    history.splice(startingPlacement, 0, newColor);
    setCurrent(startingPlacement);
    setCurrent(newColor);
    setHistory(history);
  };

  const undo = () => {
    if(currentPlacement > 0) {
      const previous = history[currentPlacement - 1];
      setCurrent(previous);
      setPlacement(prevPlacement => prevPlacement - 1);
    }
  };

  const redo = () => { 
    const previousHistory = history.slice();
    if(currentPlacement < (previousHistory.length - 1)) {
      const target = history[currentPlacement + 1];
      setCurrent(target);
      setPlacement(prevPlacement => prevPlacement + 1);
    }
  };

  useEffect(() => {
    history.push(current);
  }, []);

  return { current, undo, redo, record };
};
