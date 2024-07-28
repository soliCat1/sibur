import './TimerElement.css';
import start from '../../assets/play.svg';
import pause from '../../assets/pause.svg';
import del from '../../assets/del.svg';
import arrow from '../../assets/arrow.svg';
function Timer({
  current,
  allTime,
  isStopped,
  onTogglePause,
  isEdit,
  onDelete,
  goToEdit,
}) {
  return (
    <div
      onClick={() => {
        if (isEdit) {
          goToEdit();
        }
      }}
      className="timer"
    >
      <div className="timer__row">
        {isEdit && <img alt="" onClick={onDelete} src={del} />}
        <div className="timer__box">
          <p className="timer__current">
            {' '}
            {Math.floor(current / 60) < 10
              ? `0${Math.floor(current / 60)}`
              : Math.floor(current / 60)}
            :
            {current - Math.floor(current / 60) * 60 < 10
              ? `0${current - Math.floor(current / 60) * 60}`
              : current - Math.floor(current / 60) * 60}
          </p>
          <p className="timer__all">
            {Math.floor(allTime / 60) === 0
              ? ``
              : Math.floor(allTime / 60) + ' минут '}

            {allTime - Math.floor(allTime / 60) * 60 === 0
              ? ``
              : `${allTime - Math.floor(allTime / 60) * 60} секунд`}
          </p>
        </div>
      </div>
      {isStopped
        ? !isEdit && <img alt="" onClick={onTogglePause} src={start} />
        : !isEdit && <img alt="" onClick={onTogglePause} src={pause} />}

      {isEdit && <img alt="" src={arrow} />}
    </div>
  );
}

export default Timer;
