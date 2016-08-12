import Filter from './Filter';
import RuleParser from './RuleParser';

function factory( rules ) {
	const parser = new RuleParser();

	return new Filter( rules, parser );
}

export default factory;
