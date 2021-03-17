import { LightningElement, api } from 'lwc';

export default class LobbyMember extends LightningElement {
    @api
    memberInfo;

    @api
    userInfo;

    @api
    index;

    show = false;
    connectedCallback() {
        let fadeInDelay = this.index * 150;
        setTimeout(() => {
            this.show = true;
        }, fadeInDelay);
    }

    get isOwner() {
        return this.memberInfo.role == 'owner';
    }

    get isDisconnected() {
        return this.memberInfo.status == 'disconnected';
    }

    removeUser() { }
}
