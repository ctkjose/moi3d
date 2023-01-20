
#include "DoCurve.js"

var start_revision = moi.geometryDatabase.revision;

DoCurve( 'polyline', false );

// Find the curve which has been created, it will have a created revision number
// later than the original starting geometry database revision number.

var crv = null;

var objects = moi.geometryDatabase.getObjects();

for ( var i = 0; i < objects.length; ++i )
{
	var obj = objects.item(i);
	if ( obj.databaseRevision > start_revision )
	{
		crv = obj;
		break;
	}
}

if ( crv != null )
{
	var planarfactory = moi.command.createFactory( 'planarsrf' );

	var list = moi.geometryDatabase.createObjectList();
	list.addObject( crv );
	planarfactory.setInput( 0, list );
	planarfactory.commit();

	moi.geometryDatabase.removeObject( crv );
}
