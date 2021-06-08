import { useReducer, createContext } from "react";

const initialState = false;

function reducer(state, action) {
  switch (action) {
    case "open":
      return true;
    case "close":
      return false;
    case "toggle":
      return !state;
    default:
      throw new Error("Invalid Open Action");
  }
}

const useSearchReducer = () => {
  const [isOpen, dispatch] = useReducer(reducer, initialState);

  const open = () => dispatch("open");
  const close = () => dispatch("close");
  const toggle = () => dispatch("toggle");

  return { isOpen, open, close, toggle };
};

export const SearchContext = createContext();

export default useSearchReducer;
