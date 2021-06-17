import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './App.css';

function App() {
  const studyState = {
    activityType: "Study Time",
    isPlay: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 1,
    seconds: 0,
    isCounting: false
  }
  const breakState = {
    activityType: "Break Time",
    isPlay: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 2,
    seconds: 0,
    isCounting: false
  }
  const [hasFinished, sethasFinished] = useState(false)
  const [numberOfRounds, setnumberOfRounds] = useState(1)
  const [activityType, setactivityType] = useState(studyState.activityType)
  const [isCounting, setisCounting] = useState(studyState.isCounting)
  const [isPlay, setisPlay] = useState(studyState.isPlay)
  const [buttonColour, setButtonColour] = useState(studyState.buttonColour)
  const [hours, setHours] = useState(studyState.hours)
  const [minutes, setMinutes] = useState(studyState.minutes)
  const [seconds, setSeconds ] = useState(studyState.seconds)

  let secTimer;

  useEffect(() => {
    if(isPlay) {
      if(seconds > 0){
        secTimer = setTimeout(() => setSeconds(seconds - 1), 1000);
      } else if (seconds === 0 && minutes > 0) {
        setTimeout(() => {
          setSeconds(4)
          setMinutes(minutes - 1)
        }, 1000);
      } else if (seconds === 0 && minutes === 0 && hours > 0) {
        setTimeout(() => {
          setSeconds(59)
          setMinutes(59)
          setHours(hours - 1)
        }, 1000);
      } else if (seconds === 0 && minutes === 0 && hours === 0 && numberOfRounds > 0) {
        setisCounting(false); // clock has stopped
        setnumberOfRounds(numberOfRounds - 1);
        changePlayPause() // Pause the clock
        activityType === studyState.activityType ? resetToBreakState() : resetToStudyState()        
      } else if (seconds === 0 && minutes === 0 && hours === 0 && numberOfRounds === 0) {
        console.log("YOU FINISHED")
        sethasFinished(true)
      }
    }
    
  }, [isPlay, hours, minutes, seconds])

  const changeTime = (e) => {
    switch(e.target.name) {
      case "increaseMinute":
        minutes >= 0 ? setMinutes(minutes + 1) : setMinutes(0)
        break;
      case "decreaseMinute":
        minutes > 0 ? setMinutes(minutes - 1) : setMinutes(0)
        break;
      case "increaseHour":
        hours >= 0 ? setHours(hours + 1) : setHours(0)
        break;
      case "decreaseHour":
        hours > 0 ? setHours(hours - 1) : setHours(0)
        break;
      default:
        break;
    }
  }

  const changeNumberOfRounds = (e) => {
    switch(e.target.name) {
      case "increaseRounds":
        setnumberOfRounds(numberOfRounds + 1)
        break;
      case "decreaseRounds":
        numberOfRounds > 0 ? setnumberOfRounds(numberOfRounds - 1) : setnumberOfRounds(0)
        break;
      default:
        break;
    }
  }

  const changePlayPause = () => {
    clearTimeout(secTimer);
    setisPlay(!isPlay)
    setisCounting(true)
    buttonColour.state === "Start" ? setButtonColour({colour: "red", state: "Pause"}) : setButtonColour({colour: "blue", state: "Start"});
  }

  const cleanReset = () => {
    resetToStudyState()
    setnumberOfRounds(1)
    sethasFinished(false)
  }
  const resetToStudyState = () => {
    setactivityType("Study Time")
    setisPlay(studyState.isPlay)
    setButtonColour(studyState.buttonColour)
    setHours(studyState.hours)
    setMinutes(studyState.minutes)
    setSeconds(studyState.seconds)
    setisCounting(studyState.isCounting)
  }
  
  const resetToBreakState = () => {
    setactivityType("Break Time") 
    setisPlay(breakState.isPlay)
    setSeconds(breakState.seconds)
    setMinutes(breakState.minutes)
    setHours(breakState.hours)
    setButtonColour(breakState.buttonColour)
    setisCounting(breakState.isCounting)
  }

  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <br />
      <h2>{activityType}</h2>
      <h2>{hours < 10 ? "0" : ""}{hours} : {minutes < 10 ? "0" : ""}{minutes} : {seconds < 10 ? "0" : ""}{seconds}</h2>
      <Button onClick={changeTime} name="increaseHour" disabled={buttonColour.state === "Pause" || isCounting}>Increase Hour</Button>
      <Button onClick={changeTime} name="decreaseHour" disabled={buttonColour.state === "Pause" || isCounting}>Decrease Hour</Button>
      <Button onClick={changeTime} name="increaseMinute" disabled={buttonColour.state === "Pause" || isCounting}>Increase Minute</Button>
      <Button onClick={changeTime} name="decreaseMinute" disabled={buttonColour.state === "Pause" || isCounting}>Decrease Minute</Button>
      <br />
      <br />
      <Button style={{backgroundColor: buttonColour.colour, borderColor: buttonColour.colour}} onClick={changePlayPause} active>{buttonColour.state} Timer</Button>
      <Button onClick={resetToStudyState} variant="danger" disabled={buttonColour.state === "Pause"}>Reset</Button>
      <br />
      <br />
      <h4>Number of Rounds Left: {numberOfRounds}</h4>
      <Button onClick={changeNumberOfRounds} name="increaseRounds" disabled={isCounting}>Increase Rounds</Button>
      <Button onClick={changeNumberOfRounds} name="decreaseRounds" disabled={isCounting}>Decrease Rounds</Button>
      <Modal show={hasFinished} onHide={cleanReset}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cleanReset}>
            Close
          </Button>
          <Button variant="primary" onClick={cleanReset}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
