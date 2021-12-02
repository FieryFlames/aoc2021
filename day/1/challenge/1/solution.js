const fs = require('fs');
const path = require('path');

// Read the data
fs.readFile(path.join(__dirname, "data.txt"), 'utf8', function(err, data) {
	if (err) throw err;

	// Split the lines
	partially_parsed = data.split(/[\n\u0085\u2028\u2029]|\r\n?/g);

	// Parse lines into ints
	let fully_parsed = [];
	for (const line of partially_parsed) {
		fully_parsed.push(parseInt(line, 10));
	};

	// Find how many times the depth increases compared to last depth
	let depth_increased_count = 0;
	let last_depth = null;
	for (const depth of fully_parsed) {
		// Check if depth increases
		if (depth > last_depth && last_depth != null) {
			// Increase depth increased count
			depth_increased_count++;
		};
		// Set last depth to this depth
		last_depth = depth;
	};

	console.log(depth_increased_count);
});