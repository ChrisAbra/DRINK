import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
	@api
	label;
	
	@api
	value

	isClicked;

	get styleClasses(){
		return this.isClicked ? 'button clicked' : 'button';
	}


	clicked(event){
		this.isClicked = true;
        const selectedEvent = new CustomEvent('selected', { detail: this.value });
		this.dispatchEvent(selectedEvent);
	}
}
