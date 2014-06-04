/*
	Source:
	van Creij, Maurice (2014). "useful.zoom.js: Pan and Zoom an Image", version 20140528, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	"use strict";

	useful.Zoom_Tile = function (parent, properties) {

		// PROPERTIES

		this.parent = parent;
		this.model = parent.model;

		this.element = null;
		this.name = properties.name;
		this.index = properties.index;
		this.zoom = properties.zoom;
		this.left = properties.left;
		this.top = properties.top;
		this.right = properties.right;
		this.bottom = properties.bottom;

		// METHODS

		this.redraw = function () {
			var area = this.model.area;
			// if the index of the tile is too low
			if (
				this.index < this.parent.index - this.model.tileCache
			) {
				// remove the tile
				this.remove();
			// if it exists within the visible area and at the zoom level
			} else if (
				(this.right >= area.left || this.left <= area.right) &&
				(this.bottom >= area.top || this.top <= area.bottom)
			) {
				// show the tile
				this.show();
			// else
			} else {
				// hide the tile
				this.hide();
			}
		};
		this.add = function () {
			// adjust if the tile is across the right edge and not square
			var rightCor = 1;
			if (this.right > 1) {
				rightCor = 1 - this.left / this.right - this.left;
				this.right = 1;
			}
			// adjust if the tile is across the bottom edge and not square
			var bottomCor = 1;
			if (this.bottom > 1) {
				bottomCor = 1 - this.top / this.bottom - this.top;
				this.bottom = 1;
			}
			// create an image of the specified dimensions
			this.element = document.createElement('div');
			this.element.id = this.name;
			this.element.style.position = 'absolute';
			this.element.style.left = (this.left * 100) + '%';
			this.element.style.top = (this.top * 100) + '%';
			this.element.style.right = (this.right * 100) + '%';
			this.element.style.bottom = (this.bottom * 100) + '%';
			this.element.style.backgroundSize = '100% 100%';
			this.element.style.zIndex = this.zoom;
			// construct the url of the tile
			this.element.style.backgroundImage = 'url(' + this.model.tileSource
				.replace('{src}', this.model.tileUrl)
				.replace('{left}', this.left)
				.replace('{top}', this.top)
				.replace('{right}', 1 - this.right)
				.replace('{bottom}', 1 - this.bottom)
				.replace('{width}', Math.round(this.model.tileSize * rightCor))
				.replace('{height}', Math.round(this.model.tileSize * bottomCor)) + ')';
			// add the tile to the layer
			this.parent.element.appendChild(this.element);
		};
		this.remove = function () {
			// remove the tile
			this.element.parentNode.removeChild(this.element);
			// remove  the reference
			delete this.parent.tiles[this.name];
		};
		this.show = function () {
			// show the tile
			this.element.style.display = 'block';
		};
		this.hide = function () {
			// hide the tile
			this.element.style.display = 'none';
		};

		// STARTUP

		this.add();

	};

}(window.useful = window.useful || {}));
