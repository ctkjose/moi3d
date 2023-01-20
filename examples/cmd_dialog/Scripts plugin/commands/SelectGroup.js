// config: norepeat

#include "GetObjects.js"

function DoSelectGroup()
{
	var objs = moi.geometryDatabase.getSelectedObjects(); 
	
	for ( var i = 0; i < objs.length; ++i ) 
	{ 
		var obj = objs.item(i);

		var selectedObjName = obj.name;

		var objs2 = moi.geometryDatabase.selectNamed(selectedObjName); 
		
	}
	
}

DoSelectGroup();
