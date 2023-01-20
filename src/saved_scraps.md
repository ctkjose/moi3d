var spMoiWnd = moi.ui.getUIPanel('moi://ui/SidePane.htm');

var spDoc = spMoiWnd.document;
var spWindow = spMoiWnd.HTMLWindow;
var b = spDoc.querySelector(".SidePaneBody");
if(b){
	/*moi.ui.alert("found SidePaneBody...");*/
	spWindow = spDoc.parentWindow;
	moiApp = b.moiAppInstance;
}

/*
var spWindow, spDoc, moiApp;
var panels = moi.ui.getUIPanels();
for ( var i = 0; i < panels.length; ++i ){
	var b = panels.item(i).document.querySelector(".SidePaneBody");
	if(b){
		moi.ui.alert("found SidePaneBody...");
		spDoc = panels.item(i).document;
		spWindow = spDoc.parentWindow;
		moiApp = b.moiAppInstance;
		break;
	}
}
*/

if(moiApp){
	moiApp.showAlert("is alive=" + moiApp.joe);
	moiApp.joe +=1;
}else{
	moi.ui.alert("is NOT working...");
}










function watcherFactory(d){
	var defaultObserver;
	var handlersAdditions = [];
	var handlersRemovals = [];

	var watcher = {
		observers: [],

		onElementAdded: function(fn){
			handlersAdditions.push(fn);

			return {remove:function(){
				handlersAdditions = handlersAdditions.filter(function(v){
					return (v !== fn);
				});
			}};
		},
		onElementRemoved: function(fn){
			handlersRemovals.push(fn);

			return {remove:function(){
				handlersRemovals = handlersRemovals.filter(function(v){
					return (v !== fn);
				});
			}};
		},
		remove: function(h){
			this.observers = this.observers.filter(function(v){
				if(v === h){
					h.disconnect();
					return false;
				}
				return true;
			});
		},
		watchChildren: function(target, onAddition, onRemoval){
			var observer;
			var handler = {target: target,
				fn: function(mutations){
					mutations.forEach(function( mutation ) {
						if(onAddition && isCallable(onAddition)) watcher.handleNodesAdded(mutation, onAddition);
						if(onRemoval && isCallable(onRemoval)) watcher.handleNodesRemoved(mutation, onRemoval);
					});
				},
				disconnect: function(){
					if(observer) return observer.disconnect();
					return undefined;
				},
				remove: function(){
					watcher.remove(handler);
				}
			};


			observer = new MutationObserver(handler.fn);
			observer.observe(d, { childList: true,subtree:true });

			return handler;
		},
		handleNodesAdded: function(mutation, onAddition){
			if (mutation.type !== 'childList') return;
			var nodes = mutation.addedNodes;
			if( nodes === null ) return;
			nodes = Array.from(nodes);
			if(!nodes.length) return;
			nodes.forEach(function(n){ if(n.nodeType != 1) return; onAddition(n); });
		},
		handleNodesRemoved: function(mutation, onRemoval){
			if (mutation.type !== 'childList') return;
			var nodes = mutation.removedNodes;
			if( nodes === null ) return;
			nodes = Array.from(nodes);
			if(!nodes.length) return;
			nodes.forEach(function(n){ if(n.nodeType != 1) return; onRemoval(n); });
		}
	};

	watcher.defaultObserver = defaultObserver;

	function installWatcher(){
		defaultObserver = watcher.watchChildren(d,
			function(n){
				handlersAdditions.forEach(function(fn){
					fn.call(fn, n);
				});
			},
			function(n){
				handlersRemovals.forEach(function(fn){
					fn.call(fn, n);
				});
			},
		);
	}
	if(d.readyState != "loading"){
		installWatcher();
	}else{
		d.addEventListener("DOMContentLoaded", function(e){
			installWatcher();
		});
	}

	return watcher;
}

function viewFactory(){
	/*
	var view = {
		isDialog: false,
		cookie: {},
		go: function(url){
			this.sendMessage({cmd:'go', url: url});
		},
		sendMessage: function(data){
			if(!window.parent) return;
			window.parent.postMessage(data, "*");
		},
		close: function(){

		},
		listeners: {},
		raiseEvent : function(msg, data){
			var e = new CustomEvent(msg, {detail: data});
			if(!this.listeners[msg]) return;
			for(var k in this.listeners[msg]){
				var fn = this.listeners[msg][k];
				//console.log("calling callback[" + msg + "] %s", fn.toString() );
				fn.call(null, e);
			}
		},
		on : function(events, fn){
			var ev = typeof events === 'string' ? events.split(' ') : events;
			for (var i in ev) {
				var e = ev[i].toLowerCase();
				if(!this.listeners[e]) this.listeners[e] = [];
				this.listeners[e].push( fn );
			}
		}
	};
	*/
	return {}; //view;
}

function moiDecorateWindow(w){
	var view = viewFactory();
	moi.ui.alert("View was created1...");
	w.moiView = view;
	/*
	
	view.moiWindow = moiWindow;
	view.document = document;
	view.root = document.body;
	
	
	view.watcher = watcherFactory(document);
	
	if(document.body.classList.contains("moi-dialog")){
		view.isDialog = true;
		view.close = function(){
			moiWindow.endDialog(this.cookie);
		};
	}else{
		view.close = function(){
			moiWindow.close();
		};
	}*/
	
	moi.ui.alert("View was created2...");
}




function moiBootstrapView(){
	
	moi.ui.alert("@moiBootstrapView");
	if(!window.moiView){
		moiDecorateWindow(w);
	}
	
	window.addEventListener('unload', function(event){
		if(window.moiView){
			//window.moiView.trigger("close", [window, document]);
		}
		if(window.Shutdown && typeof(window.Shutdown) == "function"){
			window.Shutdown();
		}
	});
	
	if(window.Initialize && typeof(window.Initialize) == "function"){
		window.Initialize();
	}
}





document.addEventListener("readystatechange1", function(event){

	if(document.readyState == "complete"){
		if(nType == "info"){
			setTimeout(function() { 
				//window.notClosed(nId, moiWindow);
				moiWindow.endDialog(-1); 
			}, 5000);
		}
		
		
		setTimeout(function(){
			moiWindow.move(0,20);
		}, 10);
	}
});
if(document.readyState != "complete"){
	document.addEventListener("readystatechange", function(event){
		if(document.readyState == "complete"){
			moiBootstrapView();
		}
	});
}else{
	moiBootstrapView();
}




form application


showNotification: function(type, msg, isModal){
	if(this.elNotificationArea){
		this.elNotificationArea = this.getSidePanelDocument().querySelector(".moi-notification-area");
	}
	if(!this.elNotificationArea) return;
	
	
	var icon = '<i class="la la-bell"></i>';
	var props = {NOT_ICON: '<i class="la la-bell"></i>', NOT_TYPE: type, NOT_MSG: msg};
	if(type == "error"){
		icon = '<i class="la la-exclamation-circle"></i>';
	}else if(type == "info"){
		icon = '<i class="la la-comment"></i>';
	}
	var html = this.assetFileContents("tplNotification.html", props);
	
	//delete property doesnt work
	function findInStack(id){
		for(var i = 0; i < application.notStack.length; i++){
			var e = application.notStack[i];
			if(e[0] == id) return e;
		}
		
		return null;
	}
	
	
	var y = 6, wz, i;
	this.notID++;
	
	var notView = moi.ui.createDialog( 'moi://appdata/libs/PluginSDK/tplNotification.html?id=' + this.notID, 'defaultWidth:350,defaultHeight:100', moi.ui.mainWindow );
	if ( notView ){
		notView.htmlWindow.nType = type;
		notView.htmlWindow.nIcon = icon;
		notView.htmlWindow.nMsg = msg;
		notView.htmlWindow.nId = this.notID;
		
		var o = findInStack(this.notID - 1);
		if(o){
			var p1 = o[1].window.getPosition();
			y = p1.y;
			wz = o[1].window.getSize();
			y += wz.height + 2;
		}
	
		y = ((this.notID - 1) * 100) + 1;
		
		this.notStack.push([this.notID, notView]);
		notView.window.move(1, y);
			
		var app = this;
		notView.htmlWindow.notClosed = function(nId, w){
			y = 16;

			app.notStack = app.notStack.filter(function(e1){
				return (e1[0] != nId);
			});
			
			//delete this.notStack['N' + nId];
			
			for(var i = 0; i < app.notStack.length; i++){
				var o = app.notStack[i];
				if(!o) continue;
				
				var vw = o[1].window;
				if(!vw) continue;
				
				//o[1].htmlWindow.moveTo(1,y);
				vw.move(1, y);
				//wz = vw.getSize();
				//y += wz.height + 2;
				y += 102;
			}
		}
		if(isModal){
			var ret = notView.window.doModal();
		}
		
		/*if(moi.ui.mainWindow){
			var mw = moi.ui.mainWindow;
			var rc = mw.getPosition();
			notView.window.move(0, rc.y + 120);
		}else{
			moi.ui.alert("no last");
		}*/
		
	}
		
},

<div id="jscode" class="moi-panel padded">
	<div class="moi-panel-header">
		<h1>Test Header</h1>
		<p>This exercises all UI components and acts as a styleguide.</p>
		<div class="moi-panel-header-controls btn-group"><button class="btn">Collapse All</button><button class="btn">Expand All</button></div>
	</div>
	<div class="moi-section">
		<h2>Debug</h2>
		<textarea id="txt_jscode" class="input-textarea" rows="3" cols="60" style="font-size: 11pt; font-family: monospaced;">application.showNotification("info", "Something bad We have a problem");</textarea><br>
	</div>
	<div class="moi-section">
		<h1 class="section-heading">Widgets</h1>
		<h2>Inputs</h2>
		<div class="moi-section-boxed">
			<label class="input-label"><input class="input-radio" type="radio" name="radio" checked=""> Radio</label>
			<label class="input-label"><input class="input-radio" type="radio" name="radio"> Radio</label>
			<label class="input-label"><input class="input-checkbox" type="checkbox" checked=""> Checkbox</label>
			<label class="input-label"><input class="input-toggle" type="checkbox" checked=""> Toggle</label>
			<input class="input-range" type="range">
		</div>
		<div class="moi-section-boxed">
			<input class="input-text" type="text" placeholder="Text">
			<input class="input-search" type="search" placeholder="Search">
			<textarea class="input-textarea" placeholder="Text Area"></textarea>
			
			<input class="input-number" type="number" min="1" max="10" placeholder="1-10">
		</div>
	
		<h2>Buttons</h2>
		<div class="moi-section-boxed">
			<button class="btn">Regular</button><br>
			<button class="btn btn-sm">Small</button><br>
			<button class="btn btn-primary">Primary</button><button class="btn btn-primary selected">Selected</button><br>
			<button class="btn btn-success">Success</button><button class="btn btn-success selected">Success</button><br>
			<button class="btn btn-error">Error</button><button class="btn btn-error selected">Error</button><br>
			<button class="btn btn-default icon la-play"> Play</button><button class="btn btn-success icon la-crow">Crow</button><br>
		</div>
		<div class="moi-section-boxed">
			<div class="btn-group">
				<button class="btn">One</button>
				<button class="btn">Two</button>
				<button class="btn">Three</button>
			</div>
		</div>
	</div>
</div>




<html>
<head>
<link rel="stylesheet" href="moi://appdata/libs/PluginSDK/css/style.css" type="text/css">
<link rel="stylesheet" href="moi://appdata/libs/PluginSDK/css/line-awesome.min.css" type="text/css">
</head>
<body>
<div class="moi-notification">
	<div class="moi-notification-icon">
		
	</div>
	<div class="moi-notification-body">
		<p id="not-msg"></p>
	</div>
	<div class="moi-notification-close"><i class="la la-times"></i></div>
</div>
<script type="text/javascript" >
	
	window.addEventListener('unload', function(event){
		window.notClosed(nId, moiWindow);
	});
	
	document.addEventListener("readystatechange", function(event){
		
		if(document.readyState == "complete"){
			
			document.querySelector("#not-msg").innerHTML = nMsg;
			document.querySelector(".moi-notification-icon").innerHTML = nIcon;
			document.querySelector(".moi-notification").classList.add(nType);
			
			if(nType == "info"){
				setTimeout(function() { 
					//window.notClosed(nId, moiWindow);
					moiWindow.endDialog(-1); 
				}, 5000);
			}
			
			
			setTimeout(function(){
				moiWindow.move(0,20);
			}, 10);
		}
	});
</script>
</body>
</html>