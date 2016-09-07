'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TouchView = function (_Component) {
  _inherits(TouchView, _Component);

  function TouchView(props) {
    _classCallCheck(this, TouchView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TouchView).call(this, props));

    _this.initGestureEvent();

    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onTouchEnd = _this.onTouchEnd.bind(_this);
    _this.onTouchMove = _this.onTouchMove.bind(_this);
    return _this;
  }

  _createClass(TouchView, [{
    key: 'initGestureEvent',
    value: function initGestureEvent() {
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
  }, {
    key: 'setGestureEvent',
    value: function setGestureEvent(detail) {
      for (var k in detail) {
        this.gestureEvent[k] = detail[k];
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      if (e.touches.length !== 1) return;

      this.setGestureEvent({
        touchStartTime: Date.now(),
        touchStartPageX: e.touches[0].pageX,
        touchStartPageY: e.touches[0].pageY
      });
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      if (e.changedTouches.length !== 1) return;

      this.setGestureEvent({
        touchEndTime: Date.now(),
        touchEndPageX: e.changedTouches[0].pageX,
        touchEndPageY: e.changedTouches[0].pageY
      });

      if (!this.gestureEvent.isMoved) {
        var _props = this.props;
        var longTapThreshold = _props.longTapThreshold;
        var onTap = _props.onTap;
        var onLongTap = _props.onLongTap;
        var _gestureEvent = this.gestureEvent;
        var touchStartTime = _gestureEvent.touchStartTime;
        var touchEndTime = _gestureEvent.touchEndTime;

        if (touchEndTime - touchStartTime >= longTapThreshold) {
          if (onLongTap) onLongTap(e);
        } else {
          if (onTap) onTap(e);
        }
      }

      this.initGestureEvent();
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      if (e.touches.length !== 1) return;

      var moveThreshold = this.props.moveThreshold;
      var _gestureEvent2 = this.gestureEvent;
      var touchStartPageX = _gestureEvent2.touchStartPageX;
      var touchStartPageY = _gestureEvent2.touchStartPageY;
      var touchMovePageX = _gestureEvent2.touchMovePageX;
      var touchMovePageY = _gestureEvent2.touchMovePageY;
      var isMoved = _gestureEvent2.isMoved;


      if (isMoved === false) {
        var disX = Math.abs(touchMovePageX - touchStartPageX);
        var disY = Math.abs(touchMovePageY - touchStartPageY);
        isMoved = disX > moveThreshold || disY > moveThreshold;
      }

      this.setGestureEvent({
        isMoved: isMoved,
        touchMovePageX: e.touches[0].pageX,
        touchMovePageY: e.touches[0].pageY
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return (0, _react.cloneElement)(children, {
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        onTouchMove: this.onTouchMove
      });
    }
  }]);

  return TouchView;
}(_react.Component);

TouchView.propTypes = {
  onTap: _react.PropTypes.func,
  onLongTap: _react.PropTypes.func,
  children: _react.PropTypes.element.isRequired,
  moveThreshold: _react.PropTypes.number,
  longTapThreshold: _react.PropTypes.number
};

TouchView.defaultProps = {
  moveThreshold: 10,
  longTapThreshold: 600
};

exports.default = TouchView;