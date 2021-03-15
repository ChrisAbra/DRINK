import { LightningElement, api } from 'lwc';

export default class Lobby extends LightningElement {
    @api
    roomCode;

    userInfo;
    lobbyMembers;

    copiedCode = false;

    connectedCallback() {
        let lobbyMembers = [];
        this.userInfo = {
            name: 'Chris',
            color: '#ffc34d',
            self: true,
            id: '987uaiejkmfaef',
            role: 'owner'
        };
        lobbyMembers.push(this.userInfo);
        lobbyMembers.push({
            name: 'Joseph',
            color: '#99bbff',
            status: 'connected',
            id: '7yubaefaefm'
        });
        lobbyMembers.push({
            name: 'Zara',
            color: '#ffcccc',
            status: 'connected',
            id: '435erfcvyuainef'
        });
        lobbyMembers.push({
            name: 'Sean',
            color: '#1affb2',
            status: 'disconnected',
            id: '98aunoefaefa'
        });

        this.lobbyMembers = lobbyMembers;
    }

    copyRoomCode(event) {
        navigator.clipboard.writeText(window.location).then(() => {
            const alertEvent = new CustomEvent('alertmessage', {
                bubbles: true,
                detail: 'Link copied!'
            });
            this.dispatchEvent(alertEvent);
        });
    }
}
