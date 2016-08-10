import React, { Component, PropTypes, cloneElement } from 'react';


class TouchView extends Component {
  constructor(props) {
    super(props);

    this.initGestureEvent();

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  initGestureEvent() {
    this.gestureEvent = {
      touchStartTime: 0,
      touchEndTime: 0,
      touchStartPageX: 0,
      touchStartPageY: 0,
      touchEndPageX: 0,
      touchEndPageY: 0,
      touchMovePageX: 0,
      touchMovePageY: 0,
      isMoved: false
    };
  }

  setGestureEvent(detail) {
    for (let k in detail) {
      this.gestureEvent[k] = detail[k];
    }
  }

  onTouchStart(e) {
    if (e.touches.length !== 1) return;
    
    this.setGestureEvent({
      touchStartTime: Date.now(),
      touchStartPageX: e.touches[0].pageX,
      touchStartPageY: e.touches[0].pageY,
    });
  }

  onTouchEnd(e) {
    if (e.changedTouches.length !== 1) return;
    
    this.setGestureEvent({
      touchEndTime: Date.now(),
      touchEndPageX: e.changedTouches[0].pageX,
      touchEndPageY: e.changedTouches[0].pageY
    });

    if (!this.gestureEvent.isMoved) {
      let { longTapDuration, onTap, onLongTap } = this.props;
      let { touchStartTime, touchEndTime } = this.gestureEvent;
      if (touchEndTime - touchStartTime >= longTapDuration) {
        if (onLongTap) onLongTap(e);
      } else {
        if (onTap) onTap(e);
      }
    }
    
    this.initGestureEvent();
  }

  onTouchMove(e) {
    if (e.touches.length !== 1) return;

    let { moveThreshold } = this.props;
    let { 
      touchStartPageX, touchStartPageY,
      touchMovePageX, touchMovePageY, isMoved
    } = this.gestureEvent;

    if (isMoved === false) {
      let disX = Math.abs(touchMovePageX - touchStartPageX);
      let disY = Math.abs(touchMovePageY - touchStartPageY);
      isMoved = disX > moveThreshold || disY > moveThreshold;
    }

    this.setGestureEvent({
      isMoved: isMoved,
      touchMovePageX: e.touches[0].pageX,
      touchMovePageY: e.touches[0].pageY
    });
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
  onTap: PropTypes.func,
  onLongTap: PropTypes.func,
  children: PropTypes.element.isRequired,
  moveThreshold: PropTypes.number
};

TouchView.defaultProps = {
  moveThreshold: 10,
  longTapDuration: 600
};

export default TouchView;

