//Constantes
const data = {
  sidebarOpen: false,
  alert: {
    msg: "",
    show: false,
    type: "",
  },
};
//Types

const OPEN_SIDEBAR = "OPEN_SIDEBAR";
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";

//Reducers
export default function generalReducer(state = data, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case "CLOSE_SIDEBAR":
      return {
        ...data,
      };
    default:
      return state;
  }
}
//Actions

export const openSidebar = () => (dispatch, getState) => {
  try {
    dispatch({
      type: OPEN_SIDEBAR,
      payload: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const closeSidebar = () => (dispatch, getState) => {
  try {
    dispatch({
      type: CLOSE_SIDEBAR,
    });
  } catch (error) {
    console.log(error);
  }
};
