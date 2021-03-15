import { LightningElement, api } from 'lwc';

export default class GamePicker extends LightningElement {

	@api
	userInfo


	games = {}


	connectedCallback() {
		this.games.RING_OF_FIRE = {
			name: 'Ring of fire 🔥',
			gameId: 'ring-of-fire',
			description: 'The game of kings!'
		}
		this.games.OBLONG_OF_DEATH = {
			name: 'Oblong of death 🔚',
			gameId: 'oblong-of-death',
			description: 'Higher'
		}

	}

	get isOwner() {
		return this.userInfo.role == 'owner';
	}


	selectGame(event) {
		const selectedGame = new CustomEvent('selectedgame', {
			bubbles: true,
			detail: event.detail
		});
		this.dispatchEvent(selectedGame);
	}

}