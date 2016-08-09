import React, { Component, PropTypes, cloneElement } from 'react';


class TouchView extends Component {
  constructor(props) {
    super(props);

    // touch start time
    this.startTime = 0;
    // touch end time
    this.endTime = 0;

    // touch start pageX
    this.startPageX = 0;
    // touch start pageY
    this.startPageY = 0;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  onTouchStart(e) {
    if (e.touches.length !== 1) return;
    this.startTime = Date.now();
    this.startPageX = e.touches[0].pageX;
    this.startPageY = e.touches[0].pageY;
  }

  onTouchEnd(e) {
    if (e.changedTouches.length !== 1) return;
    this.endTime = Date.now();
    this.endPageX = e.changedTouches[0].pageX;
    this.endPageY = e.changedTouches[0].pageY;
    // if (true && this.props.onTap) {
    //   this.props.onTap(e);
    // }
  }

  onTouchMove(e) {
    if (e.changedTouches.length !== 1) return;
  }

  render() {
    let { children } = this.props;
    return cloneElement(children, {
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onTouchMove: this.onTouchMove
    });
  }
}

TouchView.propTypes = {
  children: PropTypes.element.isRequired
};

export default TouchView;

