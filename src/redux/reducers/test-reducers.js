const initialState = {
  loggedIn: false,
  currentUser: null
}

const testReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'login': {
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload
      }
    }

    case 'logout': {
      return {
        ...state,
        loggedIn: false,
        currentUser: action.payload
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export default testReducer;