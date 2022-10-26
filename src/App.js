import './App.css';
import Timer from './Timer';

function App() {
  return (
    <div className="App">
      <Timer
        id={'timer_1'}
        time={1}
        autostart={false}
        step={1000}
        onTick={(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
        TimerStarted={() => console.log('Таймер запущено!')}
        TimerPaused={() => console.log('Таймер на паузі!')}
        TimerEnded={() => console.log('Час вийшов!')}
      />
      <Timer
        id={'timer_2'}
        time={2}
        autostart={true}
        step={2000}
        onTick={(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
        TimerStarted={() => console.log('Таймер запущено!')}
        TimerPaused={() => console.log('Таймер на паузі!')}
        TimerEnded={() => console.log('Час вийшов!')}
      />
    </div>
  );
}

export default App;
