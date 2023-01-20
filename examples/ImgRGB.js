// ImgRGB by Wayne Hill, Mar 2020
//
// Credits:
//
// https://github.com/zogs/Pointiller
// https://github.com/leeoniya/RgbQuant.js/ 
// Max Smirnov's many Node frameworks
// This extension node is for nodeeditor v1_rc3 by - Max Smirnov
// litegraph.js library (c) Javi Agenjo http://tamats.com

(function () {

	// RgbQuant options with defaults (not required)
	var opts = {
		colors: 25,
		method: 2,
		initColors: 256,
		minHueCols: 0,
		dithKern: null,
		dithSerp: false,
	};

	if (typeof (Image) != "undefined") //not existing inside workers
	{
		Image.prototype.onResize = function (img, g_width, g_height) {
			var canvas = document.createElement('canvas');
			canvas.width = g_width;
			canvas.height = g_height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);
			canvas.getContext('2d').drawImage(img, 0, 0, g_width, g_height);
			return ctx.getImageData(0, 0, this.width, this.height).data;
		}
	}

	var LOCAL_NODE_SLOT_HEIGHT = 6.5;

	function WidgetImgRGB() {

		this.minsize = [50, 200];
		this.properties = {
			maskcolor: "#FFFFFF",
			maskmode: ["On", "On", "Off"],
			Colors: ["24", "24", "20", "18", "16", "14", "12", "10", "8", "4", "2"],
			colortolerance: "4000",
			fittolerance: "1",

			mode: ["Fixed", "Fixed", "Pointillism"],
		}

		this.addInput("w", 'numarray');
		this.addInput("h", 'numarray');
		this.addInput("minSize", 'numarray');
		this.addInput("maxSize", 'numarray');
		this.addInput("masktolerance", 'numarray');
		this.addInput("scale", 'numarray');

		this.addOutput("Ctr", "pointarray");
		this.addOutput("rad", "numarray");
		this.addOutput("R", "numarray");
		this.addOutput("G", "numarray");
		this.addOutput("B", "numarray");

		this.local = {
			g_width: 100,
			g_height: 100,
			shiftLeft: 10.0,
			shiftRight: 10.0,
			shiftBottom: 10.0,
			imagesrc: '',
			imageWidth: 0,
			pixels: 0

		}

		this.internal = {
			posL: 0.8,
			posH: 0.2,
			posLy: 0.8,
			posHy: 0.2
		}
	}

	WidgetImgRGB.title = "ImgRGB";

/*
	// Code for Info menu, ImgRGB.html:
	WidgetImgRGB.prototype.getExtraMenuOptions = function () {
		var that = this;
		return [
			{
				content: lang.getTranslation("Info"),
				callback: function () {
					moi.UI.createDialog(docupath + "ImgRGB.html");
				}
			}
        ];
	};
*/

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onExecute = function () {
		if (this.local.imagesrc == '') return;

		var g_width = parseInt(this.getInputData(0, this.properties.g_width));
		var g_height = parseInt(this.getInputData(1, this.properties.g_height));
		var minSize = parseInt(this.getInputData(2, this.properties.maxSize));
		var maxSize = parseInt(this.getInputData(3, this.properties.maxSize));
		var masktolerance = parseInt(this.getInputData(4, this.properties.masktolerance));
		var iscale = parseInt(this.getInputData(5, this.properties.iscale));

		var Img1 = new Image();
		Img1.src = this.local.imagesrc;
		var iw = Img1.width;
		var ih = Img1.height;

		if (g_width > iw) g_width = iw;
		if (g_height > ih) g_height = ih;
		if (g_width < 1) return;

		var rp = Img1.onResize(Img1, g_width, g_height);

		var q = new RgbQuant(opts);
		q.colors = parseInt(this.properties.Colors);
		q.sample(rp, g_width);
		var pal = q.palette(true);
		this.local.pixels = q.reduce(rp); //pixels

		var pt = 0;
		// New layers can be created from 'pal'
		var i = 0,
			len = 0,
			pallength = pal.length;

		for (i = 0, len = pallength; i < len; i++) {
			pt = pal[i];
			r = pt[0];
			g = pt[1];
			b = pt[2];
			var style = moi.geometryDatabase.addStyle()
			style.color = (r) << 16 | (g) << 8 | (b)
			style.name = style.hexColor
		}

		var ctxpts = [];
		var step = 1;
		var colortolerance = this.properties.colortolerance;
		var maskcolor = this.properties.maskcolor;

		if (this.properties.mode[0] == 'Fixed') {
			ctxPts = this.toPoints(this.local.pixels, maxSize, this.local.imageWidth, maskcolor, masktolerance);
		}

		if (this.properties.mode[0] == 'Pointillism') {
			ctxPts = this.toAdaptivePoints(this.local.pixels, minSize, maxSize, step, colortolerance, maskcolor, masktolerance);
		}
		var xx = 0,
			yy = 0,
			zz = 0,
			rr = 0,
			radAr = [],
			cAr = new pointArray(false),
			// RGB
			rAr = [],
			gAr = [],
			bAr = [];

		var gwd2 = Math.floor(g_width / 2);
		var ghd2 = Math.floor(g_height / 2);

		var ctxptslen = ctxPts.length;
		var i = 0;
		var len = 0;
		iscale = iscale / 100;

		for (i = 0, len = ctxptslen; i < len; i++) {
			var pt = ctxPts[i];
			xx = Math.floor(pt.x - gwd2);
			yy = Math.floor(ghd2 - pt.y - 1);
			rr = pt.w;
			xx = xx * iscale;
			yy = yy * iscale;
			rr = rr * iscale;
			radAr.push(rr);
			r = pt.r;
			g = pt.g;
			b = pt.b;
			zz = 0;
			cAr.push(xx, yy, zz, 0, 0, 0, 1);
			rAr.push(r);
			gAr.push(g);
			bAr.push(b);
		};

		// Send RGB data out first to create layers before adding objects...
		this.setOutputData(2, rAr);
		this.setOutputData(3, gAr);
		this.setOutputData(4, bAr);
		this.setOutputData(0, cAr);
		this.setOutputData(1, radAr);
	}

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onAdded = function () {
		this.internal.position = (this.internal.value - this.internal.min) / (this.internal.max - this.internal.min);
		this.onMouseMove();
	}

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onDrawForeground = function (ctx) { // render custom node content on canvas (only visible in Live mode) 
		var fr = 5, //Frame
			stx = fr, // Top X
			sty = LiteGraph.NODE_SLOT_HEIGHT * LOCAL_NODE_SLOT_HEIGHT, // Top Y
			sbx = this.size[0] - (fr * 2), // Bottom X
			sby = this.size[1] - fr - sty; // Bottom Y

		ctx.fillStyle = "#EEE"; //  this.bgcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
		ctx.beginPath();
		ctx.roundRect(stx, sty, sbx, sby, 0);
		ctx.fill();

		var Img1 = new Image();
		Img1.src = this.local.imagesrc;
		var iw = Img1.width;
		var ih = Img1.height;

		if (iw < 1) return true;
		this.local.imageWidth = iw;


		var hRatio = sbx / iw;
		var vRatio = sby / ih;
		var ratio = Math.min(hRatio, vRatio);
		var iwr = Math.floor(iw * ratio);
		var ihr = Math.floor(ih * ratio);
		var cx = Math.floor(((sbx - iw * ratio) / 2) + stx);
		var cy = Math.floor(((sby - ih * ratio) / 2) + sty);
		ctx.drawImage(Img1, 0, 0, iw, ih, cx, cy, iwr, ihr);

		ctx.textAlign = "center";
		ctx.font = "16px Arial";
		ctx.fillStyle = "#000000";
		ctx.fillText(iw + " x " + ih, this.size[0] / 2, this.size[1] + 16);

	}

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onMouseDown = function (e) {

		//  Do not change this code!!!!
		var x = (e.canvasX - this.pos[0] - this.local.shiftLeft) / (this.size[0] - this.local.shiftRight - this.local.shiftLeft);
		var y = (e.canvasY - this.pos[1] - LiteGraph.NODE_SLOT_HEIGHT * LOCAL_NODE_SLOT_HEIGHT) / (this.size[1] - this.local.shiftBottom - LiteGraph.NODE_SLOT_HEIGHT * LOCAL_NODE_SLOT_HEIGHT);
		if (x > 1.03 || x < -0.03 || y > 1.03 || y < -0.03) return false;

		var Ldist = Math.sqrt((x - this.internal.posL) * (x - this.internal.posL) + (y - this.internal.posLy) * (y - this.internal.posLy));
		var Hdist = Math.sqrt((x - this.internal.posH) * (x - this.internal.posH) + (y - this.internal.posHy) * (y - this.internal.posHy));
		this.captureH = (Hdist < Ldist);
		this.captureL = !this.captureH;
		this.captureInput(true);
		return true;
	}

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onMouseMove = function (e) {
		if (!this.oldmouse) return;
	}

	///////////////////////////////////////////////////////
	WidgetImgRGB.prototype.onMouseUp = function () {

		this.local.imagesrc = '';

		var imgPath = moi.filesystem.getOpenFileName('Open heightmap', 'Image files (jpeg, png, gif, bmp)|*.jpg;*.jpeg;*.png;*.gif;*.bmp');
		if (!imgPath) return false;

		var dlm = "\\";
		var filename = "heightmap_tmp_" + Math.round(Math.random() * 100000000) + "_" + imgPath.substring(imgPath.lastIndexOf(dlm) + 1);
		var tmpPath = moi.filesystem.getAppDataDir() + filename;

		moi.filesystem.copyFile(imgPath, tmpPath);
		var img = new Image();
		img.src = dlm + filename;
		this.local.imagesrc = img.src;
		moi.filesystem.deleteFile(tmpPath);
		this.graph.setisChangedFlag(this.id);
		this.setDirtyCanvas(true, true);
		this.captureInput(false);
		return true;

	}

	/**
	 * Convert canvas pixels into fixed sized points
	 * @param  {Number} weight Size of the points
	 * @return {array} Array of points
	 */
	WidgetImgRGB.prototype.toPoints = function (data, maxSize, cwidth, maskcolor, masktolerance) {

		if (this.properties.maskmode[0] == 'On') {
			data = this.excludeColor(data, maskcolor, masktolerance);
		}

		//var weight = 1;
		const pts = [];
		const width = cwidth;
		var posx = 0;
		var cmaxSize = maxSize / 2;
		var maxSizeX4 = 4 * maxSize;
		var cwidthX4XcweightM1 = (width * 4) * (maxSize - 1);

		var i = 0,
			len = 0,
			dlen = data.length;

		var xx = 0,
			yy = 0,
			r = 0,
			g = 0,
			b = 0,
			a = 0,
			pt = 0;





		for (i = 0, len = dlen; i < len; i += (maxSizeX4)) {
			posx += maxSize;
			if (posx >= width) {
				posx = 0;
				if (maxSize > 1) i += cwidthX4XcweightM1;
				continue;
			}
			if (data[i + 3] === 0) continue;
			xx = Math.floor((i / 4) % width);
			yy = Math.floor((i / 4) / width);
			r = data[i + 0]; // Red
			g = data[i + 1]; // Green
			b = data[i + 2]; // Blue
			a = data[i + 3];
			pt = {
				r: r,
				g: g,
				b: b,
				a: a,
				x: xx,
				y: yy,
				w: cmaxSize
			};
			pts.push(pt);
		}

		return pts;
	}

	/**
	 * Convert canvas pixels into adaptive sized points
	 *
	 * (try to fit big points first, then reduce the size to fit all the pixels )
	 * 
	 * @param  {int} minSize   minimum size of fittable points
	 * @param  {int} maxSize   maximum size of fittable points
	 * @param  {int} step      reducing step
	 * @param  {int} tolerance color tolerance to ajust for better result
	 * @return {points} array of points           
	 */

	WidgetImgRGB.prototype.toAdaptivePoints = function (data, minSize, maxSize, step, colorTolerance, maskcolor, masktolerance) {
		//		file = moi.filesystem.openFileStream('c:\\temp\\toAdaptive Points.txt', 'w');

		if (this.properties.maskmode[0] == 'On') {
			data = this.excludeColor(data, maskcolor, masktolerance);
		}

		var pts = [];
		var size = maxSize;
		while (size >= minSize) {
			pts = pts.concat(this.toSizablePoints(data, colorTolerance, size, true));
			size -= step;
		}

		//		pts = pts.concat(this.convertTo Points(1));
		return pts;
	}



	WidgetImgRGB.prototype.toSizablePoints = function (data, colorTolerance, size, extrude) {

		const pts = [];
		const width = this.local.imageWidth;
		var posx = 0,
			w = 0,
			i = 0,
			len = 0,
			dlen = data.length;

		for (i = 0, len = dlen; i < len; i += 4) {

			if (data[i + 3] === 0) continue;
			var xx = Math.floor((i / 4) % width);
			var yy = Math.floor((i / 4) / width);
			var r = data[i + 0]; // Red
			var g = data[i + 1]; // Green
			var b = data[i + 2]; // Blue
			var a = data[i + 3];
			var radius = size;

			if (true === this.samePixelsColorArroundRadius(data, colorTolerance, xx, yy, radius)) {
				var pt = {
					r: r,
					g: g,
					b: b,
					a: a,
					x: xx,
					y: yy,
					w: size
				};

				pts.push(pt);
				if (extrude === true) this.makePixelsTransparentArroundRadius(data, xx, yy, radius);
			}
		}
		return pts;
	}


	WidgetImgRGB.prototype.samePixelsColorArroundRadius = function (data, colorTolerance, x0, y0, r) {

		var fittolerance = parseInt(this.properties.fittolerance);
		var xx = r + fittolerance;
		var yy = 0;
		var decisionOver2 = 1 - xx;
		while (xx >= yy) {
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, xx + x0, yy + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, yy + x0, xx + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, -xx + x0, yy + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, -yy + x0, xx + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, -xx + x0, -yy + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, -yy + x0, -xx + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, xx + x0, -yy + y0)) return false;
			if (false === this.samePixelColor(data, colorTolerance, x0, y0, yy + x0, -xx + y0)) return false;
			yy++;
			if (decisionOver2 <= 0) {
				decisionOver2 += 2 * yy + 2; // Change in decision criterion for y -> y+1
			} else {
				xx--;
				decisionOver2 += 2 * (yy - xx) + 2; // Change for y -> y+1, x -> x-1
			}
		}
		return true;
	}

	WidgetImgRGB.prototype.samePixelColor = function (data, colorTolerance, x0, y0, x1, y1) {
		const width = this.local.imageWidth;

		function pixelIndexer(width, ii, jj) {
			return 4 * (jj * width + ii);
		}

		//	var data = imageData.data;
		function colorDifference(c1, c2) {
			return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2));
		}

		const idx0 = pixelIndexer(width, x0, y0);
		const idx1 = pixelIndexer(width, x1, y1);
		const c0 = [data[idx0], data[idx0 + 1], data[idx0 + 2]];
		const c1 = [data[idx1], data[idx1 + 1], data[idx1 + 2]];
		if (data[idx0 + 3] === 0 || data[idx1 + 3] === 0) return false;
		if (colorDifference(c0, c1) <= colorTolerance) return true;
		return false;
	}

	WidgetImgRGB.prototype.makePixelsTransparentArroundRadius = function (data, x0, y0, r) {

		function pixelIndexer(width, ii, jj) {
			return 4 * (jj * width + ii);
		}

		function makeTransparentPixel(data, width, xx, yy) {
			const idx = pixelIndexer(width, xx, yy);
			data[idx + 3] = 0;
		}

		const width = this.local.imageWidth;
		var xmin = x0 - r,
			xmax = x0 + r,
			ymin = y0 - r,
			ymax = y0 + r;
		var idxmin = pixelIndexer(width, xmin, ymin);
		var idxmax = pixelIndexer(width, xmax, ymax);

		var i = 0;
		for (i = idxmin; i <= idxmax; i += 4) {

			var xx = Math.floor((i / 4) % width);
			var yy = Math.floor((i / 4) / width);
			var dist = Math.sqrt(Math.pow(xx - x0, 2) + Math.pow(yy - y0, 2));
			if (dist > r) continue;
			makeTransparentPixel(data, width, xx, yy);
		}
	}

	WidgetImgRGB.prototype.excludeColor = function (data, color, masktolerance) {

		function colorDifference(c1, c2) {
			return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2));
		}

		function hexToRgb(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		}

		color = hexToRgb(color);
		color = [color.r, color.g, color.b];

		var count = 0,
			diff = 0,
			i = 0,
			dlen = data.length,
			len = 0;

		for (i = 0, len = dlen; i < len; i += 4) {
			//discart transparent pixel
			if (data[i + 3] === 0) continue;
			// calcul color difference
			diff = colorDifference(color, [data[i + 0], data[i + 1], data[i + 2]]);
			if (diff <= masktolerance) {
				count++;
				data[i + 3] = 0; // set alpha to zero
			}
		}
		return data;
	}

	LiteGraph.registerNodeType("Objects2/ImgRGB", WidgetImgRGB);

})();
