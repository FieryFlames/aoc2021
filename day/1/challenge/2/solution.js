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
	let last_depth_window_sum = null;
	let last_depth_1 = null;
	let last_depth_2 = null;
	for (const depth of fully_parsed) {
		depth_window_sum = last_depth_1 + last_depth_2 + depth;
		// Check if depth increases
		if (depth_window_sum > last_depth_window_sum && last_depth_window_sum != null) {
			// Increase depth increased count
			depth_increased_count++;
		};
		
		// !!! Don't update the last window sum until we know that there was no null last depths
		if (last_depth_1 != null) {
			last_depth_window_sum = depth_window_sum;
		};

		last_depth_1 = last_depth_2;
		last_depth_2 = depth;
	};

	console.log(depth_increased_count);
});