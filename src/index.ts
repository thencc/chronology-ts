export * from './utils'; // for lib users

import { Conversation } from './Conversation';

export class Chronology {
	// hello = 'world';
	apiKey: string;
	convos = {} as Record<number, Conversation>; // arr or obj?

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	createConversation(): Conversation {
		const convo = new Conversation(this.apiKey);
		this.convos[new Date().getTime()] = convo;
		return convo;
	}
}
export default Chronology;
