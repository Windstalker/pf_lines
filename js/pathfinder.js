var PathFinder = (function () {
	var PF = function (arr) {
		this.const = {
			BLANK: -2,
			BUSY: -1
		};
		this.area = [];
		this.areaCompiled = [];
		this.startPoint = {x: 0, y: 0};
		this.endPoint = {x: 0, y: 0};
		this.neighborsOffsets = [[1,0],[-1,0],[0,1],[0,-1]];
		this.pathFound = [];

		this.setArea(arr);
	};
	PF.prototype.checkArea = function (arr) {
		// check 2d array
		return arr instanceof Array2D;
	};
	PF.prototype.setArea = function (arr) {
		if (this.checkArea(arr)) {
			this.area = arr;
		}
	};
	PF.prototype.compileArea = function () {
		var pf = this;
		this.areaCompiled = this.area.map(function (row) {
			return row.map(function (el) {
				return el === null && pf.const.BLANK || pf.const.BUSY;
			});
		});
	};
	PF.prototype.findPath = function (x0, y0, x1, y1) {
		var path = [],
			isReachable;
		this.compileArea();
//		try {
			this.startPoint.x = x0;
			this.startPoint.y = y0;
			this.endPoint.x = x1;
			this.endPoint.y = y1;
			isReachable = this.checkReachability();
			if (isReachable) {
				path = this.restorePath();
			}
//
//		} catch (e) {
//			console.error('Coords doesn\'t exist in area');
//		}
		this.pathFound = path;
		return path;
	};
	PF.prototype.markNeighbors = function (x, y, val) {
		var pf = this;
		var map = this.areaCompiled;
		var deltas = this.neighborsOffsets;
		var blankNeighbors = 0;
		deltas.forEach(function (shift) {
			var neighbor = map[y + shift[1]][x + shift[0]];
			if (neighbor === pf.const.BLANK) {
				map[y + shift[1]][x + shift[0]] = val;
				blankNeighbors++;
			}
		});
		return blankNeighbors;
	};
	PF.prototype.getNearestNeighbor = function (x, y) {
		var map = this.areaCompiled;
		var deltas = this.neighborsOffsets;
		var d0 = map[y][x];
		var closest = undefined;
		deltas.some(function (shift) {
			var x1 = x + shift[0];
			var y1 = y + shift[1];
			var d1 = map[y1][x1];
			if (d0 - d1 === 1) {
				closest = [x1, y1];
				return true;
			}
			return false;
		});
		return closest;
	};
	PF.prototype.checkReachability = function () {
		var map = this.areaCompiled;
		var start = this.startPoint;
		var end = this.endPoint;
		var pathLength = 0;
		var hasNonMarked;

		map[start.y][start.x] = pathLength;

		do {
			hasNonMarked = false;
			for (var i = 0; i < map.length; i++) {
				var row = map[i];
				for (var j = 0; j < row.length; j++) {
					var el = row[j];
					if (el === pathLength) {
						var blank = this.markNeighbors(j, i, pathLength + 1);
						if (blank > 0) {
							hasNonMarked = true;
						}
					}
				}
			}
			pathLength += 1;
		} while (map[end.y][end.x] === this.const.BLANK && hasNonMarked);

		return map[end.y][end.x] !== this.const.BLANK;
	};
	PF.prototype.restorePath = function () {
		var map = this.areaCompiled;
		var start = this.startPoint;
		var end = this.endPoint;
		var pathLength = map[end.y][end.x];
		var x = end.x,
			y = end.y,
			path = [],
			closest;
		path.push([x, y]);
		while (pathLength >= 0) {
			closest = this.getNearestNeighbor(x, y);
			if (closest) {
				path.push([x, y]);
				x = closest[0];
				y = closest[1];
			}
			pathLength -= 1;
		}
		path.reverse();
		return path;
	};

	return PF;
})();