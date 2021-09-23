import { useEffect, useState } from 'react';

export const useRecord = (startingColor = '#00FF00') => {
  const [current, setCurrent] = useState(startingColor);
  const [history, setHistory] = useState([startingColor]);
  const [currentStartingPlacement, setStartingPlacement] = useState(0);

  const record = (newColor) => {
    const startingPlacement = currentStartingPlacement + 1;
    history.splice(startingPlacement, 0, newColor);
    setCurrent(startingPlacement);
    setCurrent(newColor);
    setHistory(history);
  };
  const undo = () => { };
  const redo = () => { };

  useEffect(() => {
    history.push(current);
  }, []);

  return { current, undo, redo, record };
};
