import { LightningElement, api } from 'lwc';

export default class GameContainer extends LightningElement {

	@api
	game;

	get ringOfFire() {
		return this.game.gameId = 'ring-of-fire';
	}


	connectedCallback() {

	}
}