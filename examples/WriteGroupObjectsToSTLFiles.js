
// Directory for where to write .stl files out to.
// Note that in JavaScript backslash is an escape character for making special characters like \n is a newline.
// So to make a single backslash in a JavaScript string literal you need to put in \\

var g_Directory = 'c:\\bugs\\test\\';

var g_Counter = 1;

function concat( a, b )
{
	if ( a && b )
		return a + '_' + b;

	if ( a )
		return a;

	return b;
}

function WriteToSTLFile( obj, filename )
{
	moi.geometryDatabase.deselectAll();
	obj.selected = true;

	// Different possible semi-colon delimited options:
	// NoUI=true
	// Angle=12.0
	// Output=ngons | quads | triangles
	// MaxLength=0.0
	// MaxLengthApplyTo=curved | planes | all
	// MinLength=0.0
	// AspectRatio=0.0
	// Weld=true
	// Display=shadedwithedges | shadednoedges | wireframe
	// ExpandedDialog=false

	var options = 'NoUI=true;Angle=6';

	moi.geometryDatabase.fileExport( g_Directory + filename + '.stl', options );	
}

function WriteGroupLeafNodes( group, accum_name )
{
	var this_level_name = concat( accum_name, group.name );

	var objects = group.objects;
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item( i );

		if ( obj.isGroup )
		{
			WriteGroupLeafNodes( obj, this_level_name );
		}
		else if ( obj.isBRep )
		{
			var objname = obj.name;
			if ( !objname )
				objname = "Unnamed" + g_Counter++;

			WriteToSTLFile( obj, concat( this_level_name, objname ) );
		}
	}
}

function WriteGroupObjectsToSTLFiles()
{
	var groups = moi.geometryDatabase.getSelectedObjects(false).getGroups();

	if ( groups.length == 0 )
	{
		moi.ui.alert( 'error - no groups selected' );
		return;
	}

	for ( var i = 0; i < groups.length; ++i )
		WriteGroupLeafNodes( groups.item(i), '' );

	moi.geometryDatabase.deselectAll();
	for ( var i = 0; i < groups.length; ++i )
		groups.item(i).selected = true;
}

WriteGroupObjectsToSTLFiles();

