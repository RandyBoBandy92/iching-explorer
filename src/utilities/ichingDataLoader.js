async function getAllHexagramText() {
  const fetchPromises = [];
  for (let index = 1; index < 65; index++) {
    const fetchPromise = fetch(`./hexagramJSONS/hexagram${index}.json`)
      .then((response) => response.json())
      .then((hexObj) => ({ ...hexObj, number: index }))
      .catch((error) => {
        console.log(error);
        return null; // Return null in case of an error
      });
    fetchPromises.push(fetchPromise);
  }

  const dekorneTexts = await Promise.all(fetchPromises);
  // Filter out any null responses due to fetch errors
  return dekorneTexts.filter((text) => text !== null);
}

export { getAllHexagramText };
