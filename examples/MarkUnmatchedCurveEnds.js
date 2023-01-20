#include "GetObjects.js"
#include "WaitForDialogDone.js"

function MakePointObject( pt )
{
	var factory = moi.command.createFactory( 'point' );
	factory.setInput( 0, pt );
	factory.commit();	
}

function DoMarkUnmatchedCurveEnds()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObjects( objectpicker ) )
		return;

	var curves = objectpicker.objects;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();

	if ( !WaitForDialogDone() )
		return;

	var tol = moi.ui.commandUI.tolerance.value;

	for ( var i = 0; i < curves.length; ++i )
	{
		var CrvA = curves.item(i);
		if ( CrvA.isClosed )
			continue;

		var StartA = CrvA.getStartPt();
		var EndA = CrvA.getEndPt();

		var FoundMatchStart = false;
		var FoundMatchEnd = false;

		for ( var j = 0; j < curves.length; ++j )
		{
			if ( i == j )
				continue;

			var CrvB = curves.item(j);
			if ( CrvB.isClosed )
				continue;

			var StartB = CrvB.getStartPt();
			var EndB = CrvB.getEndPt();

			if ( moi.vectorMath.distance( StartA, StartB ) < tol || moi.vectorMath.distance( StartA, EndB ) < tol )
				FoundMatchStart = true;

			if ( moi.vectorMath.distance( EndA, StartB ) < tol || moi.vectorMath.distance( EndA, EndB ) < tol )
				FoundMatchEnd = true;
		}

		if ( !FoundMatchStart )
			MakePointObject( StartA );

		if ( !FoundMatchEnd )
			MakePointObject( EndA );
	}
}

DoMarkUnmatchedCurveEnds();
