class RuleParser {
	constructor() {
		this.parseCount = this.joinCount = 0;

		this.parse = ( rule ) => {
			++this.parseCount;

			return rule;
		};

		this.join = ( rules ) => {
			++this.joinCount;

			return rules.join( '' );
		};
	}
}

export default RuleParser;
