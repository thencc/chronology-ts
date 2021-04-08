import { GpTs } from 'gpt-ts';

export * from './utils';
// import { AnswerRequest, ClassificationRequest, CompletionRequest, EngineId, SearchRequest } from './typings';

// in case this is not the web import fetch
import fetch from 'node-fetch';

export class Chronology extends GpTs {
	// hello = 'world';

	constructor(apiKey: string) {
		super(apiKey);
	}

	async listEngines(): Promise<any> {
		return await fetch('https://api.openai.com/v1/engines', {
			headers: {
				Authorization: `Bearer ${this.apiKey}`
			}
		});
	}

}
export default Chronology;
