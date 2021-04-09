export * from './utils'; // for lib users

import { Conversation } from './Conversation';

export class Chronology {
	// hello = 'world';
	apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	createConversation(): Conversation {
		return new Conversation(this.apiKey);
	}

}
export default Chronology;
