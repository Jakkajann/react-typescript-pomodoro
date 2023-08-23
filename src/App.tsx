import React from 'react';
import { PomodoTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoTimer 
        defaultPomodoTimer={1500} 
        shortRestTime={300} 
        longRestTime={900} 
        cycles={4}
      />
    </div>
  );
}

export default App;
