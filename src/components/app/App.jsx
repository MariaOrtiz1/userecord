/* eslint-disable max-len */
import React from 'react';
import { useRecord } from '../../custom-hooks/useRecord';

export default function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <div>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <br />
      <input type="color" value={current} onChange={({ target }) => record(target.value)} role="colorbox" aria-label="color-picker" />
      <div style={{ backgroundColor: current, width: '10rem', height: '10rem', borderRadius: '80px' }} role="display" aria-label="color-wheel"></div>
    </div>
  );
}
