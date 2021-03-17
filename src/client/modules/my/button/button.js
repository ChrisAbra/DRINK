import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
	@api
	label;

	@api
	value

	@api
	color;

	isClicked;

	get styleClasses() {
		return this.isClicked ? 'button clicked ' + this.color : 'button clickable ' + this.color;
	}


	clicked(event) {
		this.isClicked = true;
		const selectedEvent = new CustomEvent('selected', { detail: this.value });
		this.dispatchEvent(selectedEvent);
	}
}
