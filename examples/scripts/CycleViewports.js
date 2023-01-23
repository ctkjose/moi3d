script: /* Cycle through view modes */ var names = ['split','3d','top','front','right']; 
var vp = moi.ui.mainWindow.viewpanel; 
var current = 0; 
for ( var i = 0; i < names.length; ++i ) { 
		if ( vp.mode == names[i] ) { current = i; break; } 
} 

var next = (current+1) % names.length; vp.mode = names[next];