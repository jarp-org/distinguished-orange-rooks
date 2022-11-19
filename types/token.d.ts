interface trade {
  symbol: string;
  direction: string;
  quantity: number;
  price: number;
  time: number;
}

interface tokenSubscription {
  [symbol: string]: trade;
}
