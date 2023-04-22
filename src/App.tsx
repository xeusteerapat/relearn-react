import { useState } from 'react';
// import './App.css';
import { checklist } from './data/checklist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello</h1>
      <code>
        <pre>{JSON.stringify(checklist, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
