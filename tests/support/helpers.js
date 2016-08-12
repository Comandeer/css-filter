function normalizeWhiteSpace( html ) {
	return html.replace( /[\t\n]/g, '' );
}

export { normalizeWhiteSpace };
