// need to load all 64 JSON files into uhh.. an array I guess.

async function getAllHexagramText() {
  const dekorneTexts = [];
  for (let index = 1; index < 65; index++) {
    try {
      const hexData = await fetch(`/hexagramJSONS/hexagram${index}.json`);
      const hexObj = await hexData.json();
      hexObj.number = index;
      dekorneTexts.push(hexObj);
    } catch (error) {
      console.log(error);
    }
  }
  return dekorneTexts;
}

export { getAllHexagramText };
