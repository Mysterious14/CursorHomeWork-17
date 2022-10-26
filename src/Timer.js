import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      minutes: props.time,
      autostart: props.autostart,
      step: props.step,
      seconds: 0,
      isStarted: false,
      widthLine: 300,
      widthFromTime: (300 / (props.time * 60)) * (props.step / 1000),
      onTick: props.onTick,
      TimerStarted: props.TimerStarted,
      TimerPaused: props.TimerPaused,
      TimerEnded: props.TimerEnded,
    };
  }
  /*
  componentDidMount() {
    if (this.autostart === true) {
      this.startTimer();
    }
  }
*/
  componentDidMount() {
    const { autostart } = this.state;
    if (autostart === true) {
      this.startTimer();
    }
  }

  componentDidUpdate() {
    this.state.onTick(this.state.minutes, this.state.seconds);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    const { autostart } = this.state;
    if (autostart === true) {
      this.isStarted = !this.isStarted;
    }
  }

  startTimer = () => {
    this.isStarted = !this.isStarted;

    if (this.isStarted) {
      this.state.TimerStarted();
      this.myInterval = setInterval(() => {
        const { seconds, minutes, step, widthLine, widthFromTime, id } = this.state;

        this.setState(({ widthLine }) => ({
          widthLine: widthLine - widthFromTime,
        }));
        document.querySelector(`#${id} .line`).style.width = widthLine - widthFromTime + 'px';

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - step / 1000,
          }));
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval);
            this.state.TimerEnded();
            this.isStarted = !this.isStarted;
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 60 - step / 1000,
            }));
          }
        }
      }, this.state.step);
    } else {
      clearInterval(this.myInterval);
      this.state.TimerPaused();
    }
  };

  render() {
    const { minutes, seconds, id } = this.state;
    return (
      <div className="timer" id={id}>
        <h1>
          {minutes} : {seconds}
        </h1>
        <div className="wrapper_line">
          <div className="line"></div>
        </div>
        <button onClick={this.startTimer}>Start / pause</button>
      </div>
    );
  }
}
