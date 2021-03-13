import { LightningElement } from 'lwc';

export default class RoomPicker extends LightningElement {



	handleClick(event){
        const selectedEvent = new CustomEvent(event.detail);
		this.dispatchEvent(selectedEvent);
	}
}
