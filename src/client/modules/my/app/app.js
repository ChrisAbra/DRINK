import { LightningElement } from 'lwc';


const states = {
	HOME: 'home',
	GAME_SELECT: 'GameSelect',
	JOIN_ROOM: 'JoinRoom',
	WAITING_ROOM: 'WaitingRoom',
	IN_GAME: 'InGame',
	LOADING : 'Loading',
	NOT_FOUND : '404'
}


export default class App extends LightningElement {

	currentRoom;
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
	get showWaitingRoom() {
		return this.state == states.WAITING_ROOM;
	}
	get showLoading() {
		return this.state == states.LOADING;
	}
	get show404() {
		return this.state == states.NOT_FOUND;
	}



	connectedCallback(){
		// read URL	
	}


	createRoom() {
		this.state = states.LOADING;
		//this.state = states.WAITING_ROOM;
		attemptRoomJoin()

	}
	showRoomSelector() {
		//history.pushState({}, "Join Room", "/join")
		this.state = states.JOIN_ROOM;
		console.log(this.state);
	}


	handleRoomJoinEvent(event){
		this.attemptRoomJoin(event.detail);
	}


	attemptRoomJoin(roomCode){
		this.state = states.LOADING;

		// check server
		
		
		
		//join room
		//history.pushState({}, "Join Room", "/join/"  + roomCode)
		//this.state = states.WAITING_ROOM;


	}




}
