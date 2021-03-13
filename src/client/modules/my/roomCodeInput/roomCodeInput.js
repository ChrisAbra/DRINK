import { LightningElement, api } from 'lwc';

export default class RoomCodeInput extends LightningElement {


	enteredRoomCode;
	error;
	@api
	errorMessage;


	joinCodeChanged(event) {
		this.enteredRoomCode = event.detail;
		this.error = null;
	}

	joinEnteredRoom() {
		if (!this.enteredRoomCode.match(/^[A-z0-9]{4}$/)) {
			this.error = this.errorMessage;
		}
		else {
			const changeEvent = new CustomEvent('joinroom', { detail: this.enteredRoomCode });
			this.dispatchEvent(changeEvent);
		}
	}

}
