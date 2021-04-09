/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run in js
*/
import { Chronology } from '../src';

(async () => {
	const openai_apiKey = '';

	const chrono = new Chronology(openai_apiKey);
	// console.log('chrono', chrono);

	const convo = chrono.createConversation();
	convo
		.addTemplate('../demo/prompts/artist.txt')
		.inject(
			'Spencer', 				// {0}
			'Axl Rose', 			// {1}
			'Rock', 				// {2}
			'Sweet Child O\' Mine', // {3}
			'his family', 			// {4}
			'Where is the best place to live?' // {5} // 1st convo question is last arg
		);
	// console.log(convo.text);

	// --------

	const replyObj = await convo.createCompletion('ada', {
		prompt: convo.text,
		stop: '\nSpencer: ',
		max_tokens: 24
	});
	const replyText = replyObj.choices[0].text;
	convo.append(`${replyText}`);
	// console.log(convo.text);

	// --------

	// next Q
	convo.append('\nSpencer: And where was the last gig you played?\nAxl Rose:');
	(await convo.genCompletion('ada', {
		prompt: convo.text,
		stop: '\nSpencer: ',
		max_tokens: 24
		// n: 1 // 1 is the default
	}))
		.append(convo.responses.completion.choices[0].text);

	// --------

	// next Q
	convo.append('\nSpencer: Why did you start playing music?\nAxl Rose:');
	await convo.genCompletion('ada', {
		prompt: convo.text,
		stop: '\nSpencer: ',
		max_tokens: 24
		// n: 1 // 1 is the default
	});
	convo.saveCompletionToNotes(0)
		.appendNotes();

	// --------

	// next Q
	convo.append('\nSpencer: What do you recommend a new musician learns first?\nAxl Rose:');
	await convo.genCompletion('ada', {
		prompt: convo.text,
		stop: '\nSpencer: ',
		max_tokens: 24
	});
	const sentence = convo.getCompletionChoice(0);
	convo.append(sentence);

	// results:
	console.log(convo.text);

})();
