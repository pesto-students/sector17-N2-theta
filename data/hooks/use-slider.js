import { useQuery } from "react-query";
import { getSlider } from "../firestore/slider";

const useSlider = () =>
  useQuery(["slider"], () =>
    getSlider()
  );

export default useSlider;
