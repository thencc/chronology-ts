import { GpTs } from 'gpt-ts';
export * from './utils'; // for lib users

// import { AnswerRequest, ClassificationRequest, CompletionRequest, EngineId, SearchRequest } from './typings';

import { Conversation } from './Conversation';

export class Chronology extends GpTs {
	// hello = 'world';

	constructor(apiKey: string) {
		super(apiKey);
	}

	createConversation(): Conversation {
		// console.log('createConversation');
		const convo = new Conversation(this.apiKey);
		return convo;
	}

}
export default Chronology;
