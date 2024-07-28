import './App.css';
import { useState, useEffect } from 'react';
import plus from './assets/plus.svg';
import Timer from './components/TimerElement/TimerElement';
import TimePicker from './components/TimePicker/TimePicker';
import { motion } from 'framer-motion';

function App() {
  const [page, setPage] = useState('main');
  const [timers, setTimers] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [isEditTimers, setIsEditTimers] = useState(false);

  useEffect(() => {
    const activeTimers = timers.filter(
      (timer) => timer.current > 0 && !timer.isStopped
    );
    if (activeTimers.length > 0) {
      const timer = setTimeout(() => {
        setTimers((prevTimers) =>
          prevTimers.map((timer) =>
            timer.current > 0 && !timer.isStopped
              ? { ...timer, current: timer.current - 1 }
              : timer
          )
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timers]);

  const togglePause = (index) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer, i) =>
        i === index ? { ...timer, isStopped: !timer.isStopped } : timer
      )
    );
  };

  const deleteTimer = (index) => {
    setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
  };

  return (
    <div className="main">
      {page === 'main' && (
        <div className="main__header">
          <p onClick={() => setIsEditTimers(!isEditTimers)}>
            {isEditTimers ? 'Готово' : 'Править'}
          </p>
          <img alt="" src={plus} onClick={() => setPage('create')} />
        </div>
      )}
      {page === 'main' && <div className="main__title">Таймеры</div>}
      {page === 'main' &&
        timers.map((timer, index) => {
          if (timer.current > 0) {
            return (
              <Timer
                key={index}
                current={timer.current}
                allTime={timer.allTime}
                isStopped={timer.isStopped}
                isEdit={isEditTimers}
                onTogglePause={() => togglePause(index)}
                onDelete={() => deleteTimer(index)}
                goToEdit={() => {
                  setPage('edit');
                  setCurrentId(index);
                }}
              />
            );
          }
        })}

      {page === 'create' && (
        <div onClick={() => setPage('main')} className="main__header">
          <p>Отменить</p>
        </div>
      )}
      {page === 'create' && <div className="main__title">Таймер</div>}
      {page === 'create' && (
        <TimePicker
          onTimeSet={(min, sec) => {
            setTimers((prev) => [
              ...prev,
              {
                current: min * 60 + sec,
                allTime: min * 60 + sec,
                isStopped: false,
              },
            ]);
            setPage('edit');
            setCurrentId(timers.length);
          }}
        />
      )}

      {page === 'edit' && (
        <div onClick={() => setPage('main')} className="main__header">
          <p>Таймеры</p>
        </div>
      )}

      {page === 'edit' && (
        <div className="timer-container">
          <motion.div
            className="timer-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {Math.floor(timers[currentId].current / 60) < 10
              ? `0${Math.floor(timers[currentId].current / 60)}`
              : Math.floor(timers[currentId].current / 60)}
            :
            {timers[currentId].current -
              Math.floor(timers[currentId].current / 60) * 60 <
            10
              ? `0${
                  timers[currentId].current -
                  Math.floor(timers[currentId].current / 60) * 60
                }`
              : timers[currentId].current -
                Math.floor(timers[currentId].current / 60) * 60}
          </motion.div>
          <motion.div
            className="circle-animation"
            animate={{ rotate: 360 }}
            transition={{ ease: 'linear', duration: 10, repeat: Infinity }}
          />
        </div>
      )}
      {page === 'edit' && (
        <div className="btn__row">
          <button
            onClick={() => togglePause(currentId)}
            className="btn btn-yellow"
          >
            {timers[currentId].isStopped ? 'Возобновить' : 'Пауза'}
          </button>
          <button onClick={() => setPage('main')} className="btn btn-gray">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
