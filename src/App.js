import './App.css';
import React from 'react';
import {NormalizeTitle, useCalculateFinishEvent} from './hooks/useCalculateFinishEvent';


const NormalizePixels = (value) => {
    switch (value) {
        case 15:
            return '25px';
        case 30:
            return '50px'
        case 45:
            return '75px'
        case 60:
            return '100px'
        case 75:
            return '125px'
        case 90:
            return '150px'
        case 105:
            return '175px'
        case 120:
            return '200px'
        case 135:
            return '225px'
        case 150:
            return '250px'
        case 165:
            return '275px'
        case 180:
            return '300px'
        default:
            return
    }
}

function App() {

    const [startHour, setStartHour] = React.useState(null);
    const [startMinutes, setStartMinutes ] = React.useState(null);
    const [duration, setDuration] = React.useState(15);
    const [events, setEvents] = React.useState([]);
    const [selectedDay, setSelectedDay] = React.useState(null);

    const { hours, minutes, finishEvent, calculateFinalResult} = useCalculateFinishEvent(+startHour, +startMinutes, +duration);

  const [time ] = React.useState([
     ['7:00','7:05', '7:10','7:15','7:20','7:25','7:30','7:35','7:40','7:45','7:50','7:55'],
     ['8:00','8:05', '8:10','8:15','8:20','8:25','8:30','8:35','8:40','8:45','8:50','8:55'],
     ['9:00','9:05', '9:10','9:15','9:20','9:25','9:30','9:35','9:40','9:45','9:50','9:55'],
     ['10:00','10:05', '10:10','10:15','10:20','10:25','10:30','10:35','10:40','10:45','10:50','10:55'],
     ['11:00','11:05', '11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45','11:50','11:55'],
  ]);
  const [staticTimes] = React.useState([
      '7:00','7:30',
      '8:00','8:30',
      '9:00','9:30',
      '10:00','10:30',
      '11:00','11:30',
      '12:00','12:30',
      '13:00','13:30',
      '14:00','14:30',
      '15:00','15:30',
  ])
  const [isOpen, setIsOpen ] = React.useState(false);

    React.useEffect(() => {
        calculateFinalResult( startHour, startMinutes, duration );
    }, [ startHour, startMinutes, duration ]);

  const selectedDayHandler = (day) => {

      const time = staticTimes[day.y];
      setStartHour(+time.split(':')[0]);
      setStartMinutes(+time.split(':')[1]);

      setSelectedDay(day);
  }

  const toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  }

  const onClickHandler = (day) => {
    toggleIsOpen();
    selectedDayHandler(day);
    // createEventHandler(day);
  }

  const createEventHandler = (data) => {
      const newEvent = {
          start: `${ NormalizeTitle(startHour) }:${ NormalizeTitle(startMinutes)}`,
          end: finishEvent,
          duration,
          x: data.x,
          y: data.y,
          description: 'New Item',
          // description,
      }

      // const newEvent = {
      //     description: 'New Item',
      //     date: data.x,
      //     start: 'curl',
      //     end: '',
      //     duration: 30,
      //     x: data.x,
      //     y: data.y
      // }
    setEvents(prevState => [...prevState, newEvent]);
    // setStartHour(null);
    // setStartMinutes(null);
    setDuration(15)
    toggleIsOpen();
  }

  const onChangeHandler = (event) => {
      const {name, value} = event.target;
      switch (name) {
          case 'time':
            const firstElement = value.split(':')[0];
            const secondElement = value.split(':')[1];
              ;
            setStartHour(+firstElement);
            setStartMinutes(+secondElement);

          case 'duration':
          setDuration(+value);

          default:
              return
      }
  }

  return (
    <section className="App">
      <div className="date">
        { Array(11).fill('').map((item, index) => {
          return (
              <section className='box' key={index * 1.3 * 1000}>
                { index === 0 ? null : index }
              </section>
          )
        })}
      </div>
      <section className="block">
        <section className="time">
          { staticTimes.map(( time, index) => {
            return(
                <section className='time' key={ index * 4.2 }>
                  { time }
                </section>
            )
          })}
        </section>
        <section className="grid">
          { Array(10).fill('').map(( row, index) => {
            return (
                <section className="row" key={index * 9.2}>
                  { Array(8).fill('').map(( column,colIndex) => {
                    return(
                        <section className='column' onClick={ onClickHandler.bind(this, { x: index , y: colIndex })}>
                          { index  }.{ colIndex }
                        </section>
                    )
                  })}
                </section>
            )
          })}
            {
                events.length !== -1 ?
                    events.map( ( event, index) => {
                        return (
                            <section className="event" style={{
                                left: `${ +event.x}0${event.x }px`,
                                top: `${event.y }0${+event.y + 1}px`,
                                height: `${NormalizePixels(event.duration)}`,
                            }}>
                                { event.description } { event.y }
                            </section>
                        )
                    })
                    :
                    null
            }
        </section>
      </section>
      <footer className="app__footer">
        {
          isOpen ?
              <section className="modal">
                  <section className="modal-content" onChange={(e) => e.stopPropagation()}>
                   <main className="main">
                     <section className="modal-title">
                       Modal Window
                       <section className="modal-actions">
                         <button onClick={toggleIsOpen}>close</button>
                       </section>
                     </section>
                   </main>
                  <footer className="footer">
                    <section className="modal-actions">

                        <section className="field">
                            <select name="startHour" id="" name='time' onChange={onChangeHandler}>
                                {
                                    time[selectedDay.y].map(nested => {
                                        return (
                                            <option value={nested}>{nested}</option>
                                        )
                                    })
                                }
                            </select>
                        </section>

                        <select className='create-event__duration' name='duration' onChange={ onChangeHandler }>
                            <option value='15'>15min</option>
                            <option value='30'>30min</option>
                            <option value='45'>45min</option>
                            <option value='60'>1h</option>
                            <option value='75'>1h15min</option>
                            <option value='90'>1h30min</option>
                            <option value='105'>1h45min</option>
                            <option value='120'>2h</option>
                            <option value='135'>2h15min</option>
                            <option value='150'>2h30min</option>
                            <option value='165'>2h45min</option>
                            <option value='180'>3h</option>
                        </select>

                      <button onClick={createEventHandler.bind(this, selectedDay)}>create</button>
                    </section>
                  </footer>
                  </section>
              </section>
              :
              null
        }
      </footer>
    </section>
  );
}

export default App;
