How to use redux

1) After installation, import redux into application
    import { createStore, combineReducers } from 'redux';

2) Create a store where data is kept
    const store = createStore(
      combineReducers({
        // reducers in here
      })
    );

3) create reducers:
    const NameReducer = (state, action) => {
      switch (action.type) {
        default:
          return state;
      }
    };
