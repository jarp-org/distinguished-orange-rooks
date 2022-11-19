import { FC, useEffect, useState } from "react";


const PriceDisplay : FC = () => {
    
    useEffect(()=>{
        console.log("seting up websocket")
        let ws = new WebSocket('wss://stream.binance.com:9443/');
        console.log(ws)
        ws.onmessage = (event) => {
            console.log(event)
            // setPrice(JSON.parse(event.data));
        }
    },[])

    let [price, setPrice] = useState("0")
    return <div>{price}</div>
}

export default PriceDisplay;