import { useState } from 'react';
import './App.css';
import HistoryBox, { HistoryItem } from './HistoryBox';

const historyData: HistoryItem[] = [];

let redoData: HistoryItem | null = null;

function App() {
  const [count, setCount] = useState<number>(0);

  function changeCounter(changeAmounts: number) {
    setCount((prevCount) => {
      const newCount = prevCount + changeAmounts;
      historyData.push({
        change: changeAmounts,
        from: prevCount,
        to: newCount,
      });
      if (historyData.length > 50) {
        historyData.shift();
      }
      return newCount;
    });
  }

  function undoAction() {
    if (!historyData.length) return;
    redoData = historyData.pop()!;
    setCount(redoData.from);
  }

  function redoAction() {
    if (redoData) {
      historyData.push({ ...redoData });
      setCount(redoData.to);
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Undoable Counter</h1>

      <div className="control-panel">
        <div className="button-group">
          <button className="action-button" onClick={undoAction}>
            Undo
          </button>
          <button className="action-button" onClick={redoAction}>
            Redo
          </button>
        </div>

        <div className="counter-group">
          <button
            className="counter-button"
            onClick={() => changeCounter(-100)}
          >
            -100
          </button>
          <button className="counter-button" onClick={() => changeCounter(-10)}>
            -10
          </button>
          <button className="counter-button" onClick={() => changeCounter(-1)}>
            -1
          </button>
          <span className="counter-display">{count}</span>
          <button className="counter-button" onClick={() => changeCounter(1)}>
            +1
          </button>
          <button className="counter-button" onClick={() => changeCounter(10)}>
            +10
          </button>
          <button className="counter-button" onClick={() => changeCounter(100)}>
            +100
          </button>
        </div>
      </div>

      <HistoryBox items={historyData} />
    </div>
  );
}

export default App;
