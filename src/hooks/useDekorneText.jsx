import { useEffect } from "react";
import { getAllHexagramText } from "../utilities/ichingDataLoader";
import { useState } from "react";

export function useDekorneText() {
  const [dekorneText, setDekorneText] = useState([]);

  // Chose to cache all JSON data
  // To ensure app is always snappy and responsive

  useEffect(() => {
    async function fetchDekorne() {
      const data = await getAllHexagramText();
      setDekorneText(data);
    }
    fetchDekorne();
  }, []);

  return dekorneText;
}
