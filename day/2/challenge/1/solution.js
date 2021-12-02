const fs = require('fs');
const path = require('path');

// Read the data
fs.readFile(path.join(__dirname, "data.txt"), 'utf8', function(err, data) {
	if (err) throw err;

	// Split the lines
	partially_parsed = data.split(/[\n\u0085\u2028\u2029]|\r\n?/g);

	// Calculate result of commands
	let horizontal = 0; // forward/backward
	let depth = 0; // up/down/depth
	for (const line of partially_parsed) {
		console.log(line);
		switch (line.split(" ")[0]) {
			case "forward": 
				console.log("case triggered");
				cmd_value = parseInt(line.slice(8), 10);
				horizontal += cmd_value;
				break;
			case "up": 
				cmd_value = parseInt(line.slice(3), 10);
				depth -= cmd_value;
				break;
			case "down": 
				cmd_value = parseInt(line.slice(5), 10);
				depth += cmd_value;
				break;
			default:
				console.log('something went seriously wrong');
		};
	};

	result = horizontal * depth;

	console.log(result);
});