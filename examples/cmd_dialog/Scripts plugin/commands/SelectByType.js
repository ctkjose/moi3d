// config: norepeat

function GetObject( objectpicker )
{
	objectpicker.min = objectpicker.max = 1;
	objectpicker.disableWindowing();

	var done = true;

	while ( 1 )
	{
		if ( !objectpicker.waitForEvent() )
			return false;

		if ( objectpicker.event == 'finished' && done )
		{
			if ( objectpicker.objects.numBReps && moi.ui.commandUI.subtype.value )
			{
				done = false;

				objectpicker.resetAllow();
				objectpicker.allowBReps();
				objectpicker.allowFaces();
				objectpicker.allowEdgeCurves();

				objectpicker.min = objectpicker.max = 0;

				moi.ui.beginUIUpdate();
				moi.ui.hideUI( 'CancelContainer' );
				moi.ui.showUI( 'DoneCancelContainer' );
				moi.ui.endUIUpdate();
			}
			else
				break;
		}
		else if ( objectpicker.event == 'done' || !done )
		{
			if ( objectpicker.done() )
				break;

			return false;
		}
	}

	objectpicker.objects.lockSelection();

	return true;
}


function SelectObjectsByType()
{
	var preselection = moi.geometryDatabase.getSelectedObjects();

	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	objectpicker.allowBReps();
	objectpicker.allowFaces();
	objectpicker.allowPointObjects();

	if ( !GetObject( objectpicker ) )
	{
		preselection.setProperty( 'selected', true );
		return;
	}

	var objects = moi.geometryDatabase.getObjects();
	var picked = objectpicker.objects;
	var objectType = picked.item(0).type;

	var Subtype = moi.ui.commandUI.subtype.value;
	var ObjectList = moi.geometryDatabase.createObjectList();

	if ( objectType == 2 )	// curve or edge
	{
		// edge
		if ( !picked.numStandaloneCurves )
		{
			breps = objects.getBReps();
			for ( var i = 0; i < breps.length; ++i )
			{
				var edges = breps.item(i).getEdges();
				for ( var j = 0; j < edges.length; ++j )
					ObjectList.addObject( edges.item(j) );
			}
		}
		// open and closed curve
		else
		{
			var curves = objects.getCurves();

			if ( Subtype )
			{
				// closed curve
				if ( picked.item(0).isClosed )
				{
					for ( var i = 0; i < curves.length; ++i )
					{
						var curve = curves.item(i);
						if ( curve.isClosed )
							ObjectList.addObject( curve );
					}
				}
				// open curve
				else
				{
					for ( var i = 0; i < curves.length; ++i )
					{
						var curve = curves.item(i);
						if ( !curve.isClosed )
							ObjectList.addObject( curve );
					}
				}
			}
			// open and closed curve
			else
				ObjectList = curves;
		}
	}
	else if ( objectType == 3 )	// BRep
		if ( Subtype )
		{
			if ( picked.numSolids )
				ObjectList = objects.getSolids();
			else
				ObjectList = objects.getOpenBReps();
		}
		else
			ObjectList = objects.getBReps();

	else if ( objectType == 4 )	// Face
	{
		breps = objects.getBReps();
		for ( var i = 0; i < breps.length; ++i )
		{
			var faces = breps.item(i).getFaces();
			for ( var j = 0; j < faces.length; ++j )
				ObjectList.addObject( faces.item(j) );
		}
	}
	else if ( objectType == 6 )	// Point
		ObjectList = objects.getPoints();

	if ( ObjectList.length > 0 )
		ObjectList.setProperty( 'selected', true );

	preselection.setProperty( 'selected', true );
}

SelectObjectsByType();
