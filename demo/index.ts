/*
	demo:
	install `ts-node` and run `ts-node index.ts` or built this file and run in js
*/

// import lib
import { inject, Chronology } from '../src';

import * as fs from 'fs'; // needs "@types/node": "^14.14.37",
import * as path from 'path';

// playground
const f = fs.readFileSync(path.join(__dirname, '../demo/prompts/artist.txt'), 'utf8');
// console.log('f', f);
const f2 = inject(f, '123', '456');
// console.log('f2', f2);


(async () => {
	const openai_apiKey = '';


	const c = new Chronology(openai_apiKey);
	// console.log('c', c);

	// const s = await c.listEngines();

	// const s = await c.createCompletion('ada', {
	// 	prompt: 'whats for lunch?'
	// });

	// const s = await c.createSearch('ada', {
	// 	documents: ['mango', 'apple', 'pear'],
	// 	query: 'sweetest'
	// });

	// const s = await c.createClassification('ada', {
	// 	'examples': [
	// 		['A happy moment', 'Positive'],
	// 		['I am sad.', 'Negative'],
	// 		['I am feeling awesome', 'Positive']
	// 	],
	// 	query: 'It is a raining day: (',
	// });

	// const s = await c.createAnswer('ada', {
	// 	'examples': [
	// 		['A happy moment', 'Positive'],
	// 		['I am sad.', 'Negative'],
	// 		['I am feeling awesome', 'Positive']
	// 	],
	// 	question: 'What is the meaning of life?',
	// 	'examples_context': 'In 2017, U.S. life expectancy was 78.6 years.',
	// 	'documents': ['Puppy A is happy.', 'Puppy B is sad.'],
	// });

	const cc = c.createConversation();
	cc
		.addTemplate('../demo/prompts/artist.txt')
		.inject('Spencer', 'Axl Rose', 'Rock', 'Sweet Child O\' Mine', 'his family', 'Where is the best place to live?');
	// .append('\nappended text');

	console.log(cc.text);

	const replyText = await cc.reply(
		() => cc.createCompletion('ada', {
			prompt: cc.text
		})
	);
	// console.log('replyText:', replyText);

	cc.append(` ${replyText}`);
	console.log(cc.text);

	// const s = await cc.createCompletion('ada', {
	// 	prompt: cc.text
	// });
	// // console.log('s', s);
	// const ss = await s.json();
	// console.log('ss', ss);

})();
