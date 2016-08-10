# touch-view

```bash
$ npm i xiaoyann/react-touch-view --save
```

```js
import TouchView from 'react-touch-view';

class Example extends Component {
    ...
    render() {
        return (
            <TouchView
                onTap={...}
                onLongTap={...}
            >
                <div>Touch Me</div>
            </TouchView>    
        );
    }
}
```

## Props

name | type | default
---- | ---- | ------
onTap | function | --
onLongTap | function | --
moveThreshold | number | 10
longTapThreshold | number | 600