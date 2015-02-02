var Array2D = (function () {
	var rows, columns;
	var Arr2D = function (w, h, elements) {
		columns = w || 2;
		rows = h || 2;
		var arr = new Array(columns * rows);
		var l = arr.length;
		if (Array.isArray(elements)) {
			var args = [0, elements.length].concat(elements.slice(0,l));
			arr.splice.apply(arr, args);
		}
		this._array = arr;
	};
	Arr2D.prototype._getIndex = function (x, y) {
		return (y % rows) * rows + (x % columns);
	};
	Arr2D.prototype._getCoords = function (i) {
		return {x: i % columns, y: (i / rows) >> 0};
	};
	Arr2D.prototype.get = function (x, y) {
		var i = this._getIndex(x,y);
		return this._array[i];
	};
	Arr2D.prototype.set = function (x, y, val) {
		var i = this._getIndex(x,y);
		this._array[i] = val;
		return this._array[i];
	};
	Arr2D.prototype.each = function (fn) {
		for (var i = 0; i < this._array.length; i++) {

		}
	};
	return Arr2D;
})();

