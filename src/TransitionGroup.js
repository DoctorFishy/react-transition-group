<<<<<<< HEAD
import chain from 'chain-function';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { polyfill } from 'react-lifecycles-compat';
=======
import PropTypes from 'prop-types'
import React from 'react'
import TransitionGroupContext from './TransitionGroupContext'
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7

import {
  getChildMapping,
  getInitialChildMapping,
  getNextChildMapping,
} from './utils/ChildMapping'

const values = Object.values || (obj => Object.keys(obj).map(k => obj[k]))

const defaultProps = {
  component: 'div',
  childFactory: child => child,
}

/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */
class TransitionGroup extends React.Component {
  constructor(props, context) {
    super(props, context)

<<<<<<< HEAD
    this.childRefs = Object.create(null);
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
=======
    const handleExited = this.handleExited.bind(this)
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7

    // Initial children should all be entering, dependent on appear
    this.state = {
<<<<<<< HEAD
      children: getChildMapping(props.children),
    };
  }

  componentDidMount() {
    let initialChildMapping = this.state.children;
    for (let key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    let nextChildMapping = getChildMapping(props.children);
    let prevChildMapping = state.children;

    return {
      children: mergeChildMappings(
        prevChildMapping,
        nextChildMapping,
      ),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let nextChildMapping = getChildMapping(this.props.children);
    let prevChildMapping = prevState.children;

    for (let key in nextChildMapping) {
      let hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev &&
        !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (let key in prevChildMapping) {
      let hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
      if (prevChildMapping[key] && !hasNext &&
        !this.currentlyTransitioningKeys[key]) {
        this.keysToLeave.push(key);
      }
    }

    // If we want to someday check for reordering, we could do it here.

    let keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(key => this.performEnter(key, this.childRefs[key]));

    let keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(key => this.performLeave(key, this.childRefs[key]));
  }

  performAppear = (key, component) => {
    this.currentlyTransitioningKeys[key] = true;

    if (component.componentWillAppear) {
      component.componentWillAppear(
        this._handleDoneAppearing.bind(this, key, component),
      );
    } else {
      this._handleDoneAppearing(key, component);
    }
  };

  _handleDoneAppearing = (key, component) => {
    if (component && component.componentDidAppear) {
      component.componentDidAppear();
=======
      contextValue: { isMounting: true },
      handleExited,
      firstRender: true,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.setState({
      contextValue: { isMounting: false },
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  static getDerivedStateFromProps(
    nextProps,
    { children: prevChildMapping, handleExited, firstRender }
  ) {
    return {
      children: firstRender
        ? getInitialChildMapping(nextProps, handleExited)
        : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false,
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7
    }
  }

<<<<<<< HEAD
    delete this.currentlyTransitioningKeys[key];

    let currentChildMapping = getChildMapping(this.props.children);

    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully appeared. Remove it.
      this.performLeave(key, component);
    }
  };

  performEnter = (key, component) => {
    this.currentlyTransitioningKeys[key] = true;

    if (component.componentWillEnter) {
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key, component),
      );
    } else {
      this._handleDoneEntering(key, component);
    }
  };

  _handleDoneEntering = (key, component) => {
    if (component && component.componentDidEnter) {
      component.componentDidEnter();
    }

    delete this.currentlyTransitioningKeys[key];

    let currentChildMapping = getChildMapping(this.props.children);

    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully entered. Remove it.
      this.performLeave(key, component);
    }
  };

  performLeave = (key, component) => {
    this.currentlyTransitioningKeys[key] = true;

    if (component && component.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key, component));
    } else {
      // Note that this is somewhat dangerous b/c it calls setState()
      // again, effectively mutating the component before all the work
      // is done.
      this._handleDoneLeaving(key, component);
    }
  };

  _handleDoneLeaving = (key, component) => {
    if (component && component.componentDidLeave) {
      component.componentDidLeave();
=======
  handleExited(child, node) {
    let currentChildMapping = getChildMapping(this.props.children)

    if (child.key in currentChildMapping) return

    if (child.props.onExited) {
      child.props.onExited(node)
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7
    }

    if (this.mounted) {
      this.setState(state => {
        let children = { ...state.children }

        delete children[child.key]
        return { children }
      })
    }
  }

  render() {
    const { component: Component, childFactory, ...props } = this.props
    const { contextValue } = this.state
    const children = values(this.state.children).map(childFactory)

    delete props.appear
    delete props.enter
    delete props.exit

    if (Component === null) {
      return (
        <TransitionGroupContext.Provider value={contextValue}>
          {children}
        </TransitionGroupContext.Provider>
      )
    }
    return (
      <TransitionGroupContext.Provider value={contextValue}>
        <Component {...props}>{children}</Component>
      </TransitionGroupContext.Provider>
    )
  }
}

TransitionGroup.propTypes = {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: PropTypes.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: PropTypes.node,

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: PropTypes.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: PropTypes.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: PropTypes.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: PropTypes.func,
}

TransitionGroup.defaultProps = defaultProps

<<<<<<< HEAD
export default polyfill(TransitionGroup);
=======
export default TransitionGroup
>>>>>>> 318db104c7ba4f279392111c11397d2f053594e7
