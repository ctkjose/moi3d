
#include "GetObjects.js"
#include "WaitForDialogDone.js"
#include "GetCircle.js"

function ReplaceObject( obj )
{

    var box = obj.getBoundingBox();
   
	
    

    var center = box.center;
    var dist = box.diagonalLength;
    var list = moi.geometryDatabase.createObjectList();
    var plane = moi.view.getCPlane();
    var circcenter=moi.vectorMath.createFrame(center,plane.xaxis,plane.yaxis);
    //var min = box.min;
    //var max = box.max;
	list.addObject( obj );

	var factory = moi.command.createFactory( 'circle' );
	factory.setInput( 0,true);
	factory.setInput( 1, circcenter );
//	factory.setInput( 2,  center );
	factory.setInput( 3, (Math.sqrt(dist*dist/2)/2));
	factory.setInput( 4,  false );
    factory.update();
	factory.commit();

	var delfactory = moi.command.createFactory( 'delete' );
	delfactory.setInput( 0, list );
	
	delfactory.update();
	delfactory.commit();
}

function ReplaceClosedCurvesWithCircle()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objects = objectpicker.objects;
		
	//moi.ui.beginUIUpdate();
	//moi.ui.hideUI( 'SelectPrompt' );
	//moi.ui.showUI( 'OptionsPrompt' );
	//moi.ui.showUI( 'options' );
	//moi.ui.endUIUpdate();
	
	//if ( !WaitForDialogDone() )
	//	return;
		

	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		ReplaceObject( obj );
	}
}

ReplaceClosedCurvesWithCircle();
