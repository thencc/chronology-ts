export * from './utils'; // for lib users

import { Conversation } from './Conversation';

export class Chronology {
	// hello = 'world';
	apiKey: string;
	origin: string;
	convos = {} as Record<number, Conversation>; // arr or obj?

	constructor(apiKey: string, origin = 'https://api.openai.com/v1') {
		this.apiKey = apiKey;
		this.origin = origin;
	}

	createConversation(): Conversation {
		const convo = new Conversation(this.apiKey, this.origin);
		this.convos[new Date().getTime()] = convo;
		return convo;
	}
}
export default Chronology;
