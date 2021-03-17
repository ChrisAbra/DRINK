import { LightningElement, track } from 'lwc';
import { io } from 'imports/io';

const states = {
    HOME: 1,
    GAME_SELECT: 2,
    JOIN_ROOM: 3,
    LOBBY: 4,
    IN_GAME: 5,
    LOADING: 6,
    NOT_FOUND: 7
};

export default class App extends LightningElement {
    currentRoomCode;
    currentGame;

    socket;

    state = states.HOME;

    userInfo;
    userName;
    pageError;

    @track
    roomInfo;

    get showHomeScreen() {
        return this.state == states.HOME;
    }

    get showGameSelector() {
        return this.state == states.GAME_SELECT;
    }
    get showRoomJoin() {
        return this.state == states.JOIN_ROOM;
    }
    get showLobby() {
        return this.state == states.LOBBY;
    }
    get showLoading() {
        return this.state == states.LOADING;
    }
    get show404() {
        return this.state == states.NOT_FOUND;
    }
    get showFooter() {
        return this.state != states.IN_GAME;
    }

    get showGame() {
        return this.state == states.IN_GAME;
    }


    connectedCallback() {
        // read URL

        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            this.connectToSocket(JSON.parse(userInfo));
        }
    }

    connectToSocket(userInfo) {
        this.userInfo = userInfo;
        this.userName = userInfo.name;

        let socket = io(window.location.origin);
        socket.on('connect', () => {
            this.socket = socket;
            this.setupSocketListeners();
            let url = new URL(document.URL);
            if (url.pathname.startsWith('/join')) {
                this.attemptRoomJoin(url.searchParams.get('roomCode'));
            }
        })

    }

    setupSocketListeners() {
        let socket = this.socket;
        console.log(socket);
        socket.on('joinsuccess', (roomInfo) => { //create room and join room
            if (roomInfo) {
                console.log(roomInfo);
                this.setHistory('Room : ' + roomInfo.roomCode, '/join?roomCode=' + roomInfo.roomCode)
                this.currentRoomCode = roomInfo.roomCode;
                this.roomInfo = roomInfo;
                if (roomInfo.state == states.LOBBY) {
                    this.state = states.LOBBY;
                }
                else if (roomInfo.state == states.IN_GAME) {
                    this.currentGame = roomInfo.game;
                    this.state = states.IN_GAME;
                }
            }
            else {
                this.pageError = 'This room doesnt exist...'
            }
        })

        socket.on('new-member', (newMemberInfo) => {
            let members = this.roomInfo.members;
            let alreadyRegistered = false;
            members.forEach(member => {
                if (member.id == newMemberInfo.id) {
                    alreadyRegistered = true;
                }
            })
            if (!alreadyRegistered) {
                this.roomInfo.members.push(newMemberInfo);
            }
        })

    }

    createRoom() {
        this.state = states.LOADING;
        this.socket.emit('create', this.userInfo)
    }
    showRoomSelector() {
        history.pushState({}, "Join Room", "/join")
        this.setHistory('Join Room', "/join/");

        this.state = states.JOIN_ROOM;
    }

    handleRoomJoinEvent(event) {
        this.attemptRoomJoin(event.detail);
    }

    attemptRoomJoin(roomCode) {
        this.state = states.LOADING;
        this.socket.emit('join', {
            userInfo: this.userInfo,
            roomCode: roomCode
        })
    }

    alertMessage;

    handleAlertMessage(event) {
        this.alertMessage = event.detail;
        setTimeout(() => {
            this.alertMessage = null;
        }, 2000);
    }


    setHistory(title, url) {
        history.pushState({}, title, url);

    }

    handleSelectedGame(event) {
        this.state = states.LOADING;
        this.currentGame = event.detail;
        this.state = states.IN_GAME;

    }

    nameChanged(event) {
        console.log(event.detail);
        this.userName = event.detail;
    }

    goToHome() {
        window.location.href = '/';
    }

    clearUserInfo(event) {
        this.userInfo = null;
        localStorage.clear('userInfo');
    }

    nameConfrimed(event) {
        let userInfo = {
            id: this.generateRandomId(10),
            name: this.userName
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.connectToSocket(userInfo);
    }

    generateRandomId = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
