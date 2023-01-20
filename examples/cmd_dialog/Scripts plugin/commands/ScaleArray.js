
// ScaleArray is a command that will produce a progressive scale on the result of an array
// command. A point object must be included in the array, the point is used as the
// center of the scale operation.

function Lerp( t, low, high )
{
	// Linear interpolate between low (t == 0.0) to high (t == 1.0)
	return low + ((high - low) * t);
}

function Update( Factories, StartScale, EndScale )
{
	for ( var i = 0; i < Factories.length; ++i )
	{
		var t = i / (Factories.length - 1);

		// Set the scale factor on the factory.
		Factories[i].setInput( 2, Lerp( t, StartScale, EndScale ) );
		
		// Update the factory to make it recalculate the scaled result.
		Factories[i].update();
	}
}

function DoScaleArray()
{
	// Get all selected objects.
	var Objects = moi.geometryDatabase.getSelectedObjects();
	
	// Get all the point objects out of the selected objects.
	var Points = Objects.getPoints();
	
	var NumPoints = Points.length;
	if ( NumPoints == 0 )
		return;
		
	// Calculate the number of objects in one single array instance, expecting
	// this to be a multiple of the number of point objects.
	var ObjectSetSize = Math.floor( Objects.length / NumPoints );
	if ( NumPoints * ObjectSetSize != Objects.length )
		return;
		
	// Create an array of scaling factories, one per object set.
	var NumSets = Objects.length / ObjectSetSize;
	var Factories = new Array( NumSets );
	
	var Counter = 0;
	
	for ( var i = 0; i < NumSets; ++i )
	{
		var ObjectSet = moi.geometryDatabase.createObjectList();
		var OriginPt = null;
		
		for ( j = 0; j < ObjectSetSize; ++j )
		{
			var Obj = Objects.item(Counter);
			++Counter;
			
			if ( Obj['pt'] != undefined )
			{
				// Point objects have a "pt" property that gets the x,y,z point. Get that
				// as the scaling origin.
				OriginPt = Obj.pt;
			}
			else
			{
				// Not a point object, add it to the object list to be scaled.
				ObjectSet.addObject( Obj );
			}
		}
		
		if ( ObjectSet.length == 0 || OriginPt == null )
			return;
			
		// We've now got the objects to be scaled and the origin point for this set,
		// create the factory and fill these in.
		var Factory = moi.command.createFactory( 'scale' );
		Factory.setInput( 0, ObjectSet );
		Factory.setInput( 1, OriginPt );
		Factories[i] = Factory;
	}
	
	// Get the values from the UI controls.
	var StartScale = moi.ui.commandUI.startscale.numericValue;
	var EndScale = moi.ui.commandUI.endscale.numericValue;
	
	// Show the initial result.
	Update( Factories, StartScale, EndScale );
	
	// Wait for any changes to the UI or cancel or done.
	var dialog = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
			return; // Canceled.
			
		if ( dialog.event == 'done' )
			break; // "Done" pushed.
			
		if ( dialog.event == 'startscale' )
		{
			// startscale control changed.
			StartScale = moi.ui.commandUI.startscale.numericValue;
			Update( Factories, StartScale, EndScale );
		}
		else if ( dialog.event == 'endscale' )
		{
			// endscale control changed.
			EndScale = moi.ui.commandUI.endscale.numericValue;
			Update( Factories, StartScale, EndScale );
		}
	}
	
	// All done, commit the factories.
	for ( var i = 0; i < Factories.length; ++i )
		Factories[i].commit();
		
	// Remove the point objects.
	moi.geometryDatabase.removeObjects( Points );
	
}

DoScaleArray();
