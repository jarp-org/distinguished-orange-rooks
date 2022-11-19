interface trade {
  symbol: string;
  direction: string;
  quantity: number;
  price: number;
}

interface tokenSubscription {
  [symbol: string]: trade;
}
