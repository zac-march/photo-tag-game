class Timer {
  constructor() {
    this.tens = 0;
    this.interval = null;
  }

  tick() {
    this.tens++;
  }

  getTime() {
    return this.tens;
  }

  start() {
    this.interval = window.setInterval(() => this.tick(), 10);
  }

  stop() {
    window.clearInterval(this.interval);
  }
}

export default Timer;
