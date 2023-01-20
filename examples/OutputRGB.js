(function () {
	// MoI Output

	function WidgetOutputRGB() {
	
		this.boxcolor = "#F05";
		this.addInput("", "objectlist");
		this.addInput("R", "numarray");
		this.addInput("G", "numarray");
		this.addInput("B", "numarray");

		this.flags = {
			isOutput: true
		};
		this.properties = {
			edges: ["On", "Off", "On"],
			style: ["--", "--"]

		};
		this.sIndex = -1;
		this.tempobjects = moi.geometryDatabase.createObjectList();
		var RGBinput = [];
		}

	WidgetOutputRGB.title = "OutputRGB";
	WidgetOutputRGB.desc = "OutputRGB";

	WidgetOutputRGB.prototype.onClear = function () {
		moi.geometryDatabase.removeObjects(this.tempobjects);
		this.tempobjects = moi.geometryDatabase.createObjectList();
	}
	//////////////////////////////////////////////
	WidgetOutputRGB.prototype.onAdded = function () {
		if (!this.properties) {
			this.properties = {
				style: ["--", "--"]
			}
		} else {
			if (!this.properties.style) this.properties.style = ["--", "--"]
		}
		this.properties.style = this.properties.style.slice(0, 2);
			var styles = moi.geometryDatabase.getObjectStyles();
				for (var n = 0; n < styles.length; n++) this.properties.style.push(styles.item(n).name);
				this.updateStyles();
	}

	//////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onRemoved = function () {
		this.onClear();
	}

	//////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.updateStyles = function () {

				var styles = moi.geometryDatabase.getObjectStyles();
				for (var n = 0; n < styles.length; n++) this.properties.style.push(styles.item(n).name);

				var styles = moi.geometryDatabase.getObjectStyles();
				this.sIndex = -1;
				for (var x = 0; x < styles.length; x++)
					if (this.properties.style[0] === styles.item(x).name) {
						this.sIndex = x;
						break;
					}
	}
	
	////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.updateObjects = function () {
		this.updateStyles();

		function rgbToHex(r, g, b) {
			var temp = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			return temp.toUpperCase();
		}

		function ColorToStyleIndex(colr) {
			
			var findstyles = moi.geometryDatabase.getObjectStyles();
			for (n = 0; n < styles.length; n++) {
				var fs = findstyles.item(n).name;
				//					file.writeLine(n+" fs "+ fs);
				if (fs == colr) return n;
			}
			return n;
		}

		this.onClear();
		var changeStyle = (this.properties.style[0] !== this.properties.style[1] && this.sIndex !== -1);

		var rr = this.getInputData(1, this.properties.rr);
		var gg = this.getInputData(2, this.properties.gg);
		var bb = this.getInputData(3, this.properties.bb);
		
		RGBinput = [];
		
		for (i = 0; i < rr.length; i++) {
			RGBinput.push(rgbToHex(rr[i], gg[i], bb[i]));
		}
		
		var styles = moi.geometryDatabase.getObjectStyles();
		var inObj = this.getInputData(0, moi.geometryDatabase.createObjectList());
		for (var i = 0; i < inObj.length; i++) {
			this.tempobjects.addObject(changeStyle ? inObj.item(i).clone() : inObj.item(i));
			var styleindex = ColorToStyleIndex(RGBinput[i]);
			this.tempobjects.item(i).styleIndex = styleindex; //RGBinput.findIndex(RGBinput[i]);
		}
		for (var i = this.tempobjects.length; i > 0;) this.tempobjects.item(--i).setHitTest(0);
		if (this.properties.edges[0] === "Off")
			for (var breps = this.tempobjects.getBReps(), i = breps.length; i > 0;) {
				breps.item(--i).getEdges().setProperty('hidden', true);
			}
		moi.geometryDatabase.addObjects(this.tempobjects);
	}

	//////////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onPropertyChange = function (property) {
		this.updateStyles();
		this.updateObjects();
		if (property === "edges")
			if (this.properties.edges[0] === "On")
				for (var breps = this.tempobjects.getBReps(), i = breps.length; i > 0;) {
					breps.item(--i).getEdges().setProperty('hidden', false);
				}
	}

	///////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onApply = function () {
		var newobjects = moi.geometryDatabase.createObjectList();
		for (var i = 0; i < this.tempobjects.length; i++) {
			newobjects.addObject(this.tempobjects.item(i).clone());
			newobjects.item(i).styleIndex = this.tempobjects.item(i).styleIndex;
		}
		moi.geometryDatabase.addObjects(newobjects);
		moi.geometryDatabase.removeObjects(this.tempobjects);
		this.tempobjects = moi.geometryDatabase.createObjectList();
	}

	/////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onExecute = function () {
		
		this.updateStyles();
		this.updateObjects();

		if (this.inputs[0].link !== null) {
			if (this.tempobjects.length === 0) {
				this.boxcolor = "#F80"
			} else {
				this.boxcolor = "#0F5"
			}
		} else {
			this.boxcolor = "#F05"
		}
		this.updateThisNodeGraph();
	
				/////
		var gd = moi.geometryDatabase;
		var styles = gd.getObjectStyles();
		var counts = new Array(styles.length);
		for (var i = 0; i < counts.length; ++i) {
			counts[i] = 0;
		}
		var objs = gd.getObjects();
		for (var i = 0; i < objs.length; ++i) {
			var obj = objs.item(i);
			if (obj.styleIndex < counts.length) ++counts[obj.styleIndex];
			var subobjs = obj.getSubObjects();
			for (var j = 0; j < subobjs.length; ++j) {
				var subobj = subobjs.item(j);
				if (subobj.styleIndex < counts.length) ++counts[subobj.styleIndex];
			}
		}
		for (var i = 0; i < styles.length; ++i) {

			if (counts[i] == 0) styles.item(i).remove();
		}
		moi.geometryDatabase.addDefaultStyles();
		////
		
	}
	
	
	///////////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onGetCreatedObjects = function () {
		var list = [];
		for (var i = 0; i < this.tempobjects.length; i++) list.push(this.tempobjects.item(i).id);
		return list;
	}

	/////////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.getExtraMenuOptions = function (graphcanvas) {
		var that = this,
			thatgraph = this.graph;
		return [{
			content: lang.getTranslation("Clear"),
			callback: function () {
				that.onAdded();
				that.onClear();
				that.graph.setisChangedFlag(that.id);
			}
		}];
	}
	
	
	//////////////////////////////////////////////////////////////////////////
	WidgetOutputRGB.prototype.onDrawForeground = function (ctx) {
		var title_height = LiteGraph.NODE_TITLE_HEIGHT;
		var old_alpha = ctx.globalAlpha;

		ctx.fillStyle = this.bgcolor || LiteGraph.NODE_DEFAULT_BGCOLOR;
		ctx.fillRect(2, -title_height + 2, title_height - 4, title_height - 4);
		if (!this.flags.collapsed) ctx.fillRect(5, 2, this.size[0] - 10, this.size[1] - 4);

		ctx.fillStyle = this.color || LiteGraph.NODE_DEFAULT_COLOR;
		ctx.globalAlpha = 0.5 * old_alpha;
		ctx.fillRect(2, -title_height + 2, title_height - 4, title_height - 4);
		ctx.globalAlpha = old_alpha;

		ctx.fillStyle = this.color || LiteGraph.NODE_DEFAULT_COLOR;
		ctx.fillStyle = this.boxcolor || LiteGraph.NODE_DEFAULT_BOXCOLOR;
		ctx.roundRect(3, -title_height + 3, title_height - 6, title_height - 6, 3);
		ctx.fill();

		if (!this.flags.collapsed) {
			var text = (this.tempobjects.length > 0) ? this.tempobjects.length.toFixed(0) : "--";
			ctx.font = "12px Arial";
			ctx.fillStyle = "#AAA";
			ctx.textAlign = "center";
			ctx.fillText(text, this.size[0] / 2, this.size[1] / 2 + 4);
			ctx.textAlign = "left";
		}
	}

	LiteGraph.registerNodeType("Basic2/OutputRGB", WidgetOutputRGB);

})();
