# react-transition-group [![npm][npm-badge]][npm]

<<<<<<< HEAD
A fork, and "drop in" replacement for the original React TransitionGroup addons. Eventually this package can supercede the original addon, letting the React team focus on other stuff and giving these components a chance to get the attention they deserve out on their own. See: https://github.com/facebook/react/issues/8125 for more context.

A ton of thanks to the React team, and contributors for writing and maintaining these components for so long!

---

The [`TransitionGroup`](#low-level-api-transitiongroup) add-on component is a low-level API for animation, and [`CSSTransitionGroup`](#high-level-api-csstransitiongroup) is an add-on component for easily implementing basic CSS animations and transitions.

## Installation

The recommended installation method is through either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/).

```sh
# npm
npm install react-transition-group@1.x --save

# yarn
yarn add react-transition-group@1.x
```

## CDN / External

Since react-transition-group is fairly small, the overhead of including the library in your application is
negligible. However, in situations where it may be useful to benefit from an external CDN when bundling, link
to the following CDN:

[https://unpkg.com/react-transition-group/dist/react-transition-group.min.js](https://unpkg.com/react-transition-group/dist/react-transition-group.min.js)

## High-level API: CSSTransitionGroup

`CSSTransitionGroup` is a high-level API based on [`TransitionGroup`](#low-level-api-transitiongroup) and is an easy way to perform CSS transitions and animations when a React component enters or leaves the DOM. It's inspired by the excellent [ng-animate](http://www.nganimate.org/) library.

**Importing**

```javascript
import { CSSTransitionGroup } from 'react-transition-group' // ES6

var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup') // ES5 with npm
```

```javascript
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}
```

> Note:
>
> You must provide the `key` attribute for all children of `CSSTransitionGroup`, even when only rendering a single item. This is how React will determine which children have entered, left, or stayed.

In this component, when a new item is added to `CSSTransitionGroup` it will get the `example-enter` CSS class and the `example-enter-active` CSS class added in the next tick. This is a convention based on the `transitionName` prop.

You can use these classes to trigger a CSS animation or transition. For example, try adding this CSS and adding a new list item:

```css
.example-enter {
  opacity: 0.01;
}

.example-enter.example-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.example-leave {
  opacity: 1;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
```

You'll notice that animation durations need to be specified in both the CSS and the render method; this tells React when to remove the animation classes from the element and -- if it's leaving -- when to remove the element from the DOM.

### Animate Initial Mounting

`CSSTransitionGroup` provides the optional prop `transitionAppear`, to add an extra transition phase at the initial mount of the component. There is generally no transition phase at the initial mount as the default value of `transitionAppear` is `false`. The following is an example which passes the prop `transitionAppear` with the value `true`.

```javascript
render() {
  return (
    <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <h1>Fading at Initial Mount</h1>
    </CSSTransitionGroup>
  );
}
```

During the initial mount `CSSTransitionGroup` will get the `example-appear` CSS class and the `example-appear-active` CSS class added in the next tick.

```css
.example-appear {
  opacity: 0.01;
}

.example-appear.example-appear-active {
  opacity: 1;
  transition: opacity .5s ease-in;
}
```

At the initial mount, all children of the `CSSTransitionGroup` will `appear` but not `enter`. However, all children later added to an existing `CSSTransitionGroup` will `enter` but not `appear`.

> Note:
=======
> **ATTENTION!** To address many issues that have come up over the years, the API in v2 and above is not backwards compatible with the original [`React addon (v1-stable)`](https://github.com/reactjs/react-transition-group/tree/v1-stable).
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7
>
> **For a drop-in replacement for `react-addons-transition-group` and `react-addons-css-transition-group`, use the v1 release. Documentation and code for that release are available on the [`v1-stable`](https://github.com/reactjs/react-transition-group/tree/v1-stable) branch.**
>
> We are no longer updating the v1 codebase, please upgrade to the latest version when possible

A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind.

## Documentation

- [**Main documentation**](https://reactcommunity.org/react-transition-group/)
- [Migration guide from v1](/Migration.md)

## TypeScript
TypeScript definitions are published via [**DefinitelyTyped**](https://github.com/DefinitelyTyped/DefinitelyTyped) and can be installed via the following command:

```
npm install @types/react-transition-group
```

## Examples

Clone the repo first:

```
git@github.com:reactjs/react-transition-group.git
```

Then run `npm install` (or `yarn`), and finally `npm run storybook` to start a storybook instance that you can navigate to in your browser to see the examples.

[npm-badge]: https://img.shields.io/npm/v/react-transition-group.svg
[npm]: https://www.npmjs.org/package/react-transition-group
