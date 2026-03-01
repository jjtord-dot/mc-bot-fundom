const bedrock = require('bedrock-protocol');
const http = require('http');

// Gagawa tayo ng mini-website para hindi patayin ng Render ang bot
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(8080);

function createBot() {
    const client = bedrock.createClient({
        host: 'fundom.playerserver.pro', 
        port: 41059,                    
        username: 'AFK_Bot_247',
        version: '1.21.11',               
        offline: true             
    });

    client.on('spawn', () => {
        console.log('Nasa loob na ang bot! FunDom is ALIVE.');
        setInterval(() => {
            if (client.status === 'active') {
                client.queue('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0, z: 0 }, head_yaw: 0, input_data: { jumping: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch'
                });
            }
        }, 30000);
    });

    client.on('error', (err) => {
        console.log('Error: ' + err + '. Reconnecting...');
        setTimeout(createBot, 15000);
    });

    client.on('close', () => {
        console.log('Disconnected. Reconnecting...');
        setTimeout(createBot, 15000);
    });
}

createBot();
