import { useEffect } from "react";

const useDebugState = (label, state) => {
  useEffect(() => {
    console.log(`${label} changed:`, state);
  }, [label, state]);
};

export default useDebugState;
