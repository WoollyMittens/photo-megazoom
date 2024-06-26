import { PhotoZoomTile } from './photo-zoom-tile.js';

export class PhotoZoomOverlay {
	constructor(context) {
		// store the context
		this.context = context;
		this.config = context.config;
		// create properties
		this.timeout = null;
		this.tiles = {};
		this.index = 0;
		this.updated = 0;
		// reset the area
		this.config.area = {};
		// get the original image
		var image = this.context.element.getElementsByTagName('img')[0];
		// create an overlay
		this.element = document.createElement('div');
		this.element.className = 'useful-zoom-overlay';
		// add the image as a background
		this.element.style.backgroundImage = 'url(' + image.getAttribute('src') + ')';
		// put the overlay into the parent object
		this.context.element.appendChild(this.element);
		// hide the original image
		image.style.visibility = 'hidden';
	}

	redraw() {
		// get the transformation settings from the parent object
		var transformation = this.config.transformation;
		// if the last redraw occurred sufficiently long ago
		var updated = new Date().getTime();
		if (updated - this.updated > 20) {
			// store the time of this redraw
			this.updated = updated;
			// formulate a css transformation
			var styleTransform = 'scale(' + transformation.zoom + ', ' + transformation.zoom + ') rotate(' + transformation.rotate + 'deg)';
			var styleOrigin = (transformation.left * 100) + '% ' + (transformation.top * 100) + '%';
			// re-centre the origin
			this.element.style.transformOrigin = styleOrigin;
			// implement the style
			this.element.style.transform = styleTransform;
		}
		// repopulate the tiles after interaction stops
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.update.bind(this), 300);
	}

	update() {
		// update the parent
		this.context.update();
		// recalculate the visible area
		this.measure();
		// clean out the older tiles
		this.clean();
		// populate with new tile
		this.populate();
	}

	measure() {
		// get the desired transformation
		var transformation = this.config.transformation,
			area = this.config.area;
		// calculate the visible area
		area.size = 1 / transformation.zoom;
		area.left = Math.max(transformation.left - area.size / 2, 0);
		area.top = Math.max(transformation.top - area.size / 2, 0);
		area.right = Math.min(area.left + area.size, 1);
		area.bottom = Math.min(area.top + area.size, 1);
	}

	clean() {
		// for all existing tiles
		for (var name in this.tiles) {
			if (this.tiles.hasOwnProperty(name)) {
				// redraw the tile
				this.tiles[name].redraw();
			}
		}
	}

	populate() {
		// get the component's dimensions
		var dimensions = this.config.dimensions,
			transformation = this.config.transformation,
			area = this.config.area;
		// calculate the grid size at this magnification
		var cols = dimensions.width * transformation.zoom / this.config.tileSize,
			rows = dimensions.height * transformation.zoom / this.config.tileSize,
			zoom = Math.ceil(transformation.zoom),
			startCol = Math.max(Math.floor(area.left * cols) - 1, 0),
			endCol = Math.min(Math.ceil(area.right * cols) + 1, cols),
			startRow = Math.max(Math.floor(area.top * rows) - 1, 0),
			endRow = Math.min(Math.ceil(area.bottom * rows) + 1, rows),
			tileName;
		// for every row of the grid
		for (var row = startRow; row < endRow; row += 1) {
			// for every column in the row
			for (var col = startCol; col < endCol; col += 1) {
				// formulate the name this tile should have (tile_x_y_z)
				tileName = 'tile_' + col + '_' + row + '_' + zoom;
				// if this is a new tile
				if (this.tiles[tileName] === undefined) {
					// create a new tile with the name and dimensions (name,index,zoom,left,top,right,bottom)
					this.tiles[tileName] = new PhotoZoomTile(this, {
						'name': tileName,
						'index': this.index,
						'zoom': zoom,
						'left': col / cols,
						'top': row / rows,
						'right': 1 - (col + 1) / cols,
						'bottom': 1 - (row + 1) / rows
					});
					// increase the tile count
					this.index += 1;
				}
			}
		}
	}

	transitions(status) {
		this.element.className = (status)
			? this.element.className + ' useful-zoom-transition'
			: this.element.className.replace(/useful-zoom-transition| useful-zoom-transition/g, '');
	}

}