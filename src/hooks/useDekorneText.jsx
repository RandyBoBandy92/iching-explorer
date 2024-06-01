import { useEffect } from "react";
import { getAllHexagramText } from "../utilities/ichingDataLoader";
import { useState } from "react";

export function useDekorneText() {
  const [dekorneText, setDekorneText] = useState([]);

  useEffect(() => {
    async function fetchDekorne() {
      const data = await getAllHexagramText();
      setDekorneText(data);
    }
    fetchDekorne();
  }, []);

  return dekorneText;
}
