export * from './utils'; // for lib users

import { Conversation } from './Conversation';

export class Chronology {
	// hello = 'world';
	apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	createConversation(): Conversation {
		// console.log('createConversation');
		const convo = new Conversation(this.apiKey);
		return convo;
	}

}
export default Chronology;
