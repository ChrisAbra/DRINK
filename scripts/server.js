// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const { AsyncNedb } = require('nedb-async');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use(helmet());
app.use(bodyParser.json());

app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

const generateRandomId = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const DATABASE_DIR = './data';

const ROOM_STATES = {
    HOME: 1,
    GAME_SELECT: 2,
    JOIN_ROOM: 3,
    LOBBY: 4,
    IN_GAME: 5,
    LOADING: 6,
    NOT_FOUND: 7
}


const database = {


    rooms: new AsyncNedb(
        {
            filename: path.resolve(DATABASE_DIR, 'rooms'),
            autoload: true
        })
    ,

    clearHistoric: async function () {
        let twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        let searchString = twoDaysAgo.toISOString().substring(0, 10);
        database.rooms.asyncRemove({ createdDate: { $lt: searchString } });
    },

    joinToRoom: async function (socket, data) {
        let roomCode = data.roomCode;
        let userInfo = data.userInfo;

        let roomInfo = await database.rooms.asyncFindOne({ _id: roomCode });
        if (roomInfo) {
            let members = roomInfo.members;
            let alreadyRegistered = false;
            members.forEach(member => {
                if (member.id == userInfo.id) {
                    alreadyRegistered = true;
                }
            })
            if (!alreadyRegistered) {
                await database.rooms.asyncUpdate({ _id: roomCode }, { $push: { members: userInfo } });
                roomInfo = await database.rooms.asyncFindOne({ _id: roomCode });
                socket.to(roomCode).emit('new-member', userInfo);
            }
            socket.join(roomCode);
            return roomInfo;
        }
        else {
            return null;
        }
    },

    createRoom: async function (userInfo) {
        let roomCode = generateRandomId(4);
        userInfo.role = 'owner';
        let roomInfo = {
            _id: roomCode,
            roomCode: roomCode,
            state: ROOM_STATES.LOBBY,
            members: [userInfo],
            createdDate: new Date().toISOString().substring(0, 10)
        }
        socket.join(roomCode);
        await database.rooms.asyncInsert(roomInfo);
        return roomInfo;

    },

}


app.use(express.static(DIST_DIR));

io.on('connection', (socket) => {

    socket.on('create', async (userInfo) => {
        let roomInfo = await database.createRoom(userInfo);
        socket.emit('joinsuccess', roomInfo);

    });
    socket.on('join', async (data) => {
        let roomInfo = await database.joinToRoom(socket, data);
        socket.emit('joinsuccess', roomInfo);
    });
    socket.on('move', async (data) => {

    });
    socket.on('select-game', async (data) => {

    });

});

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

server.listen(PORT, () => {
    database.clearHistoric();
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
});
