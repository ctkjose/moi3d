// config: norepeat

#include "GetObjects.js"

function DoGroup()
{
	
	var ID = Math.round(Math.random() * 10000);

	var objs = moi.geometryDatabase.getSelectedObjects(); 
	var styles = moi.geometryDatabase.getObjectStyles(); 
	for ( var i = 0; i < objs.length; ++i ) { 
		
		var obj = objs.item(i); 
		obj.name = 'GROUP_' + ID ; 
		
	}
	
}

DoGroup();
