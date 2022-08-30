// String
String.random = function (length, characters) {
	let result = '';
	const finalLength = length || 10;
	const chars = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const dicLen = chars.length;
	for (var i = 0; i < finalLength; i++) {
		result += chars.charAt(Math.floor(Math.random() * dicLen));
	}
	return result;
}

// Math
Math.lerp = function(start, end, by){ return start * (1 - by) + end * by }