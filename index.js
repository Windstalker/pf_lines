(function (win, doc) {
	var mainCanvas = doc.createElement('canvas');
	var CANVAS_WIDTH = 450,
		CANVAS_HEIGHT = 450;
	mainCanvas.width = CANVAS_WIDTH;
	mainCanvas.height = CANVAS_HEIGHT;
	var map = [];
	var values = [0, 0, 'b'];
	for (var i = 0; i < 4; i++) {
		map.push([]);
		for (var j = 0; j < 4; j++) {
			map[i].push(values[Math.random()*values.length >> 0]);
		}
		console.log(JSON.stringify(map[i]));
	}
//	window.pf = new PathFinder(map);
})(window, document);