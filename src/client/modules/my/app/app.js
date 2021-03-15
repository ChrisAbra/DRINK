import { LightningElement } from 'lwc';

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

    enteredRoomCode = '';

    state = states.HOME;

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
        let url = new URL(document.URL);
        if (url.pathname.startsWith('/join')) {
            this.attemptRoomJoin(url.searchParams.get('roomCode'));
        }
    }

    createRoom() {
        this.attemptRoomJoin('8NE9');
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

        // room connect ui dev:
        this.currentRoomCode = roomCode;
        setTimeout(() => {
            this.setHistory('Join Room:' + this.currentRoomCode, "/join?roomCode=" + this.currentRoomCode);
            this.state = states.LOBBY;
        }, 1500);
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
}
