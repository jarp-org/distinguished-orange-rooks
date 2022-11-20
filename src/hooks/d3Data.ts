function d3Data(subscription: tokenSubscription): d3Data[] {
    return Object.keys(subscription).map((token) => {
        return {id: token, value: subscription[token].price};
    })
}

export default d3Data;