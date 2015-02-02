var Ball = function (opts) {
	var options = opts || {};
	this.color = options.color;
	this.x = options.x;
	this.y = options.y;

	return this;
};