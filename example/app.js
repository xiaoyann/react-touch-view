import React from 'react';
import { render } from 'react/lib/ReactDOM';
import TouchView from '../src/index';

function animation(node) {
  node.className = 'animation';
  setTimeout(() => {
    node.className = '';
  }, 150);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onTap = this.onTap.bind(this);
    this.onLongTap = this.onLongTap.bind(this);
  }

  onTap(e) {
    animation(this.refs.tapFont);
  }

  onLongTap(e) {
    animation(this.refs.longTapFont);
  }

  render() {
    return (
      <div>
        <p>
          try to <span ref="tapFont">tap</span> or <span ref="longTapFont">long-tap</span>
        </p>
        <TouchView 
          onTap={this.onTap}
          onLongTap={this.onLongTap}
        >
          <div className="touch-view">Touch View</div>
        </TouchView>
      </div>  
    );
  }
}

render(<App />, document.getElementById('app'));

