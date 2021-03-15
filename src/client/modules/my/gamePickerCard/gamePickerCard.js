import { LightningElement, api } from 'lwc';

export default class GamePickerCard extends LightningElement {

	@api
	game


	selectGame(event) {
		const selectedGame = new CustomEvent('selectedgame', {
			bubbles: true,
			detail: this.game
		});
		this.dispatchEvent(selectedGame);
	}
}