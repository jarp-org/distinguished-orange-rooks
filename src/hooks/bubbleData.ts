function bubbleData(subscription: tokenSubscription): clusterData[] {
  return [
    {
      name: "crypto-coins",
      data: Object.keys(subscription).map((token) => {
        return { name: token, value: subscription[token].price };
      }),
    },
  ];
}

export default bubbleData;
