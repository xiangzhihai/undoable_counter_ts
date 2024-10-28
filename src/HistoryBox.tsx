import React from 'react';
import './HistoryBox.css';

export type HistoryItem = {
  change: number;
  from: number;
  to: number;
};

type HistoryBoxProps = {
  items: HistoryItem[];
};

const HistoryBox: React.FC<HistoryBoxProps> = ({ items }) => {
  return (
    <div className="history-container">
      <h2 className="history-title">History</h2>
      <div className="history-box">
        {items.slice().reverse().map((item, index) => (
          <div key={index} className="history-item">
            <span>{item.change > 0 ? `+${item.change}` : item.change}</span>
            <span>{`(${item.from} -> ${item.to})`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryBox;