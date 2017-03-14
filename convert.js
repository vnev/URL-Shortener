var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var size = alphabet.length;

function encode(id) {
	var encoded = "";
	while (id) {
		var rem = id % size;
		id = Math.floor(id / size);
		encoded = alphabet[rem].toString() + encoded;
	}

	return encoded;
}

function decode(url) {
	var decoded = 0;
	while (url) {
		var index = alphabet.indexOf(url[0]);
		var pow = url.length - 1;
		decoded += index * (Math.pow(size, pow));
		url = url.substring(1);
	}
	
	return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
