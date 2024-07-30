import { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useAppHooks({ forceChangeHexagram, setDesiredHexagram }) {
  const { hexagram } = useContext(GlobalContext);

  const [newHexagramNumber, setNewHexagramNumber] = useState(hexagram.number);
  const [desiredHexagramNumber, setDesiredHexagramNumber] = useState(0);
  const [loadingReading, setLoadingReading] = useState();
  const [readingToShow, setReadingToShow] = useState("primary");

  useEffect(() => {
    if (loadingReading) {
      setDesiredHexagram(loadingReading);
      setDesiredHexagramNumber(loadingReading);
      setLoadingReading();
    }
  }, [loadingReading]);

  function handleSearch(urlSearchparams) {
    const searchParams = urlSearchparams.get("search");
    if (!searchParams || searchParams === "undefined") return;
    const type = searchParams.includes("=>") ? "multi" : "single";
    if (type === "single") {
      // if it's a single hexagram
      // change the hexagram
      forceChangeHexagram(+searchParams);
      setNewHexagramNumber(+searchParams);
    } else {
      // if it's a multi hexagram
      // split the search query into start and end
      const [start, end] = searchParams.split("=>");
      setLoadingReading(+end);
      forceChangeHexagram(+start);
      setNewHexagramNumber(+start);
    }
  }

  return {
    handleSearch,
    newHexagramNumber,
    setNewHexagramNumber,
    desiredHexagramNumber,
    setDesiredHexagramNumber,
    loadingReading,
    setLoadingReading,
    readingToShow,
    setReadingToShow,
  };
}
