// config: norepeat

function GetCurve( factory, PointList, CurveEnd )
{
	var curvefactory = moi.command.createFactory( factory );
	
	with ( curvefactory )
	{
		for ( var i = 0; i < PointList.length; ++i )
		{
			createInput( 'point' );
			setInput( numInputs - 1, PointList[i] );
		}

		switch ( CurveEnd )
		{
			case 'closed' :	createInput( 'point' );
					setInput( numInputs - 1, PointList[0] );
					break;
			case 'line' :	createInput( 'bool' );
					setInput( numInputs - 1, true );
			case 'kink' :	createInput( 'point' );
					setInput( numInputs - 1, PointList[0] );
					createInput( 'bool' );
					setInput( numInputs - 1, true );
		}
	}

	var CurveObjectList = curvefactory.calculate();

	curvefactory.cancel();

	return CurveObjectList;
}

function GetPoint( PointList )
{
	var PointObjectList = moi.geometryDatabase.createObjectList();

	var pointfactory = moi.command.createFactory( 'point' );

	for ( var i = 0; i < PointList.length; ++i )
	{
		pointfactory.setInput( 0, PointList[i] );

		PointObjectList.addObject( pointfactory.calculate().item(0) );

		pointfactory.reset();
	}

	pointfactory.cancel();

	return PointObjectList;
}

function ImportPointFile()
{
	var filename = moi.filesystem.getOpenFileName( 'Choose a point file', 'Point files (*.txt, *.xyz, *.csv)|*.txt;*.xyz;*.csv|All files (*.*)|*.*' );
	if ( filename == '' )
		return; // User canceled.

	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'ImportPrompt' );
	moi.ui.showUI( 'ImportOptions' );
	moi.ui.endUIUpdate();

	// Wait for cancel or done.
	var dialog = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
			return; // Canceled.
			
		if ( dialog.event == 'done' )
			break; // "Done" pushed.
	}
	
	var ImportAs = moi.ui.commandUI.importas.value;

	var Delimiter = moi.ui.commandUI.delimiter.value;
	if ( Delimiter == 'user' )
	{
		Delimiter = moi.ui.commandUI.text.value;
		if ( Delimiter == '' )
			return;
	}

	var CurveEnd;
	if ( ImportAs == 'polyline' )
		CurveEnd = moi.ui.commandUI.closedpoly.value ? 'closed' : 'open';
	else
		CurveEnd = moi.ui.commandUI.curveend.value;

	var f = moi.filesystem.openFileStream( filename, 'r' );

	var PointList = new Array();

	while ( !f.AtEOF )
	{
		var split_coord = f.readLine().split( Delimiter );
		
		// Screen out any empty strings from several delimiters in a row like several spaces between coords.
		var coord = new Array();
		for ( var i = 0; i < split_coord.length; ++i )
		{
			if ( split_coord[i] != '' )
				coord.push( split_coord[i] );
		}
		
		if ( coord.length == 2 )
			coord.push( 0.0 ); // Add 0.0 for a z value if given 2d coordinates.
		else if ( coord.length < 3 )
			continue;
		
		try { var point = moi.vectorMath.createPoint( parseFloat(coord[0]), parseFloat(coord[1]), parseFloat(coord[2]) ) }
		catch(e) { continue; }

		PointList.push( point );
	}

	f.close();
	
	if ( PointList.length == 0 )
		return;

	if ( PointList.length > 1 && moi.vectorMath.pointsWithinTolerance( PointList[0], PointList[PointList.length-1] ) )
		PointList.pop();

	var ObjectList;
	if ( ImportAs == 'points' )
  		ObjectList = GetPoint( PointList );
	else
		ObjectList = GetCurve( ImportAs, PointList, CurveEnd );
	
	ObjectList.setProperty( 'selected', true );
	moi.geometryDatabase.addObjects( ObjectList );

//	moi.view.resetAll();
}

ImportPointFile();
