/*
 * @Author: GQK
 * @Date: 2022-08-19 14:24:21
 * @LastEditTime: 2022-08-19 16:16:18
 * @Description:  app.tsx
 * @FilePath: /canvas-grid/src/App.tsx
 */
import React from 'react';
import { CanvasGrid } from './modules/canvas-grid';
import { KonvasCanvas } from './modules/konva-canvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <CanvasGrid />
      <KonvasCanvas />
    </div>
  );
}

export default App;
