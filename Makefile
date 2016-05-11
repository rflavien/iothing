start:
	@docker run --rm -v ${PWD}:/srv -w /srv -p 80:8080 node node index.js
