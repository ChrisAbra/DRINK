import { LightningElement, api } from 'lwc';

export default class Input extends LightningElement {

	@api
	value;
	@api
	label;
	@api
	placeholder;
	@api
	classList;
	@api
	maxLength
	@api
	errorMessage;


	get cssClasses(){
		return this.errorMessage ? 'error ' + this.classList : this.classList;
	}

	checkForEnter(e) {
		this.sendNewValue();
		if (!e) e = window.event;
		var keyCode = e.code || e.key;
		if (keyCode == 'Enter') {
			setTimeout((e) => {
				const selectedEvent = new CustomEvent('enterpressed');
				this.dispatchEvent(selectedEvent);
			}, 100)
		}

	}

	sendNewValue() {
		this.value = this.template.querySelector('input[name="input"]').value;
		const changeEvent = new CustomEvent('newvalue', { detail: this.value });
		this.dispatchEvent(changeEvent);
	}

}
