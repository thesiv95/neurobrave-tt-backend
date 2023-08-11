const WebSocket = require('ws');
const fs = require('fs');
const cpuAverage = require('./cpu');
const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('new user');

    wsClient.on('close', function() {
        console.log('disconnected');
    });

    wsClient.on('message', function(message) {
        console.log(message);
        try {
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'COORD':
                    fs.writeFileSync('coords.txt', jsonMessage.data + '\n', { flag: 'a+' });
                    break;
                case 'CPU':
                    cpuAverage();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log('Error', error);
        }
    });
}

console.log('ws server is on 9000');