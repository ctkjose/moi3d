
function DoCutList()
{
	var solids = moi.geometryDatabase.getSelectedObjects().getSolids();
	if ( solids.length == 0 )
	{
		moi.ui.alert( 'no solid objects selected' );
		return;
	}
	
	var styles = moi.geometryDatabase.getObjectStyles();

	var filename = moi.filesystem.getSaveFileName( 'Cut list file name', 'CSV files (*.csv)|*.csv' );
	if ( filename == '' )
		return;
		
	var cutlist = new Array();
	
	// Object name, Style name, Quantity, X, Y, Z
	
	for ( var i = 0; i < solids.length; ++i )
	{
		var solid = solids.item(i);
	
		var cutobj = {};
		cutobj.name = solid.name;
		cutobj.stylename = styles.item( solid.styleIndex ).name;
		cutobj.quantity = 1;
		
		var bbox = solid.getBoundingBox( true );
		cutobj.x = moi.ui.formatCoordinate( bbox.xLength, 6 );
		cutobj.y = moi.ui.formatCoordinate( bbox.yLength, 6 );
		cutobj.z = moi.ui.formatCoordinate( bbox.zLength, 6 );
		
		// If there's already an existing cutobj that matches this, bump up the existing one's quantity
		// instead of making a new entry.
		
		var found_match = false;
		
		for ( var j = 0; j < cutlist.length; ++j )
		{
			var othercutobj = cutlist[j];
			
			if ( othercutobj.name == cutobj.name
				&& othercutobj.stylename == cutobj.stylename
				&& othercutobj.x == cutobj.x
				&& othercutobj.y == cutobj.y
				&& othercutobj.z == cutobj.z )
			{
				found_match = true;
				++othercutobj.quantity;
				break;
			}
		}
		
		if ( found_match )
			continue;
			
		cutlist.push( cutobj );
	}
	
	var fs = moi.filesystem.openFileStream( filename, 'w' );
	
	fs.writeLine( 'ObjName,StyleName,Quantity,X,Y,Z' );
	fs.writeLine( ',,,,,' );
	fs.writeLine( ',,,,,' );
	
	for ( var i = 0; i < cutlist.length; ++i )
	{
		var cutobj = cutlist[i];
	
		var text = cutobj.name + ',' + cutobj.stylename + ',' + cutobj.quantity + ',' + cutobj.x + ',' + cutobj.y + ',' + cutobj.z;
		fs.writeLine( text );
	}
	
	fs.writeLine( ',,,,,' );
	
	fs.close();
	
	moi.ui.alert( 'Wrote ' + cutlist.length + ' entries' );
}

DoCutList();
