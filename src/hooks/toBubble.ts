function toBubble(rawData: tokenSubscription): bubbleData[] {
  return Object.keys(rawData).map((t) => {
    return {
      id: 0,
      name: t,
      size: rawData[t].price,
      fillColor: "#D3D3D3",
    };
  });
}

export default toBubble;
