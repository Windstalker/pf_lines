var LinesGame = (function (win, doc) {
	var ROWS = 9,
		COLUMNS = 9,
		DEFAULT_COLORS_COUNT = 7,
		DEFAULT_COLORS = ['red', 'green', 'blue', 'yellow', 'lightblue', 'orange', 'purple'];

	var Game = function (cnv) {
		var gameOptions = {};

		gameOptions.rows = ROWS;
		gameOptions.columns = COLUMNS;
		gameOptions.colors = DEFAULT_COLORS;
		gameOptions.colorsCount = DEFAULT_COLORS_COUNT;

		this.cnv = cnv;
		this.ctx = cnv.getContext('2d');
		this.grid = [];
		this.options = gameOptions;

		this.init();
	};

	Game.prototype.init = function () {
		this.resetGrid();
		this.initPathFinder();

	};

	Game.prototype.resetGrid = function () {
		var arrSize = this.options.rows * this.options.columns;
		for (var i = 0; i < arrSize; i++) {
			this.grid[i] = null;
		}
	};

	Game.prototype.getCellIndex = function (x, y) {
		var r = this.options.rows;
		var c = this.options.columns;
		return (y % r) * r + (x % c);
	};

	Game.prototype.getCell = function (x, y) {
		var i = this.getCellIndex(x, y);
		return this.grid[i];
	};

	Game.prototype.setCell = function (x, y, obj) {
		var i = this.getCellIndex(x, y);
		this.grid[i] = obj;
		return this.grid[i];
	};

	Game.prototype.placeBall = function (x,y) {
		var color = this.colors[(Math.random() * this.colors.length) >> 0];
		var ball = new Ball(x, y, color);
		this.setCell(x, y, ball);
	};

	Game.prototype.moveBall = function (x0, y0, x1, y1) {
		var origin = this.getCell(x0, y0);
		var destination = this.getCell(x1, y1);
		var path = [];
		if (origin !== null && destination === null) {
			path = this.pathfinder.getPath(x0, y0, x1, y1);
			if (path.length > 0) {
				// move ball
			}
		}
	};

	Game.prototype.deleteBall = function (x,y) {
		this.setCell(x, y, null);
	};
})(window, document);