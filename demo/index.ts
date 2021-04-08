/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run in js
*/
import { Chronology } from '../src';

(async () => {
	const openai_apiKey = '';


	const c = new Chronology(openai_apiKey);
	// console.log('c', c);

	const cc = c.createConversation();
	cc
		.addTemplate('../demo/prompts/artist.txt')
		.inject('Spencer', 'Axl Rose', 'Rock', 'Sweet Child O\' Mine', 'his family', 'Where is the best place to live?'); // 1st question is last arg
	// .append('\nappended text');

	// console.log(cc.text);

	// --------

	const replyObj = await cc.createCompletion('ada', {
		prompt: cc.text,
		stop: '\nSpencer: ',
		max_tokens: 24
	});
	const replyText = replyObj.choices[0].text;
	cc.append(`${replyText}`);
	// console.log(cc.text);

	// --------

	// next Q
	cc.append('\nSpencer: And where was the last gig you played?\nAxl Rose:');
	(await cc.genCompletion('ada', {
		prompt: cc.text,
		stop: '\nSpencer: ',
		max_tokens: 24
		// n: 1 // 1 is the default
	}))
		.append(cc.lastResponses.completion.choices[0].text);

	// --------

	// next Q
	cc.append('\nSpencer: Why did you start playing music?\nAxl Rose:');
	await cc.genCompletion('ada', {
		prompt: cc.text,
		stop: '\nSpencer: ',
		max_tokens: 24
		// n: 1 // 1 is the default
	});
	cc.saveCompletionToNotes(0)
		.appendNotes();

	// results:
	console.log(cc.text);

})();
