/** Class parsing rules' syntax into proper CSS syntax. */
class RuleParser {
	/**
	 * Converts given rule into syntactically valid CSS selector.
	 *
	 * @param {String} rule Filter's rule.
	 * @return {String} CSS selector.
	 */
	parse( rule ) {
		return rule.replace( /\{(.+?)\}/g, '[style*="$1" i]' );
	}

	/**
	 * Joins given rules to form syntactically valid CSS selector.
	 *
	 * @param {String[]} rules Filter's rules.
	 * @return {String} CSS selector.
	 */
	join( rules ) {
		return rules.join( ', ' );
	}
}

export default RuleParser;
