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
    currentRoomCode = 'C7NE';
    currentGame;

    enteredRoomCode = '';

    state = states.LOBBY;

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

    connectedCallback() {
        // read URL
    }

    createRoom() {
        this.state = states.LOADING;
        //this.state = states.LOBBY;
        attemptRoomJoin();
    }
    showRoomSelector() {
        //history.pushState({}, "Join Room", "/join")
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
            this.state = states.LOBBY;
        }, 1500);

        // check server

        //join room
        //history.pushState({}, "Join Room", "/join/"  + roomCode)
        //this.state = states.LOBBY;
    }

    alertMessage;

    handleAlertMessage(event) {
        console.log('alert message');
        this.alertMessage = event.detail;
        setTimeout(() => {
            this.alertMessage = null;
        }, 2000);
    }
}
