const INITIAL_STATE = {
    USER: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        USER: action.data
      };
    default:
      return state;
  }
};
