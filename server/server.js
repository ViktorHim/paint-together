const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
    ws.on("message", (msg) => {
        msg = JSON.parse(msg);
        switch(msg.method) {
            case "connect":
                onConnectionHandler(ws, msg);
                break;
            case "disconnect":
                brodcastConnection(ws, msg);
                break;
            case "draw":
                brodcastConnection(ws, msg);
                break;
            case "finish":
                brodcastConnection(ws, msg);
                break;
            case "clear":
                brodcastConnection(ws, msg);
                break;
            case "cursor":
                brodcastConnection(ws, msg);
                break;
        }
    })

    
});

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

const onConnectionHandler = (ws, msg) => {
    ws.id = msg.id;
    brodcastConnection(ws, msg);
}

const brodcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if( client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
}