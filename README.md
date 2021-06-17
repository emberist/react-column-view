![React Column View Cover](https://github.com/riccardocaranfil/react-column-view/raw/main/media/cover.gif)

Hooks for **easily** creating column views / file system trees in React

## Getting started

### Demo

Check out the main [demo](https://reactcolumnviewexample.netlify.app/) and the [development demo](https://reactcolumnviewexample-dev.netlify.app)

### Installing

Install using `yarn` running

    yarn add react-column-view

Or with `npm` running

    npm install react-column-view

### Usage

In order to use the library you will need to install redux as follow
  
 yarn add redux react-redux

Then add the library reducer in your `redux store`

    import { combineReducers, createStore } from "redux";
    import { reducer as column } from "react-column-view";

    const reducers = {
        column,
        // ... Other reducers
    };

    const rootReducer = combineReducers(reducers);

    const store = createStore(rootReducer);

Use the main hook in this way

    const { insert, root, path } = useColumnView();

## :warning: Contributing

The library is currently under development, so feel free to join the project.

**Let's code!**
