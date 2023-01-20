//config: norepeat

//Version from Oct-17-2012

#include "WaitForDialogDone.js"

function round( x, n )
{
	var a = Math.pow( 10, n );
	return Math.round( x * a ) / a;
}

function makeExternalThread() {
		
	var startTime = new Date();
	
	//Get values from the UI input fields	
	var threadDiameter = moi.ui.commandUI['threadSize'].value.split("x")[0] * 1.0; //use part before "x" as diameter
	var threadPitch = moi.ui.commandUI['threadSize'].value.split("x")[1] * 1.0; //use part after "x" as pitch
	var threadLength = moi.ui.commandUI['threadLength'].numericValue * 1.0;
	var LengthWithoutThread = moi.ui.commandUI['LengthWithoutThread'].numericValue * 1.0;
	var reverse = moi.ui.commandUI['reverse'].value;
	var chamfer = moi.ui.commandUI['chamfer'].value;
	var timeIt = moi.ui.commandUI['timeIt'].value;
	
	//http://de.wikipedia.org/wiki/Metrisches_ISO-Gewinde
	var threadDepth = threadPitch * Math.cos( 30 * Math.PI / 180 );
	var offset = threadDepth / 8;
	var tipRadius = threadDepth / 6;
	
	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'TitleContainer' );
	moi.ui.hideUI( 'InputContainer' );
	moi.ui.hideUI( 'done' );
	moi.ui.hideUI( 'cancel' );
	moi.ui.endUIUpdate();
	
	//hide and protect what is already here
	moi.geometryDatabase.selectAll();
	moi.geometryDatabase.hide(); 
	
	//Draw thread cutting profile
	frame = moi.vectorMath.createFrontFrame();
	frame.origin = moi.vectorMath.createPoint( threadDiameter/2 + offset, 0, threadLength );
	factory = moi.command.createFactory( 'polygonedge' );
	factory.setInput( 0, frame );
	factory.setInput( 1, moi.vectorMath.createPoint( threadDiameter/2 + offset, 0, threadLength  + threadPitch ) );
	factory.setInput( 2, 3 );
	factory.commit();
	moi.geometryDatabase.selectAll();
	var profile = moi.geometryDatabase.getSelectedObjects();
	
	//Round off the tip of the thread cutting profile
	factory = moi.command.createFactory( 'fillet' );
	var vertexflags = moi.createList();
	vertexflags.add( false );
	vertexflags.add( false );
	vertexflags.add( true ); //select the third vertex (corner point)
	factory.setInput( 2, vertexflags );
	factory.setInput( 0, moi.geometryDatabase.getSelectedObjects() );
	factory.setInput( 3, tipRadius );
	factory.setInput( 4, 'circular' );
	factory.commit();
	moi.geometryDatabase.selectAll();
	profile = moi.geometryDatabase.getSelectedObjects(); //update profile
	profile.setProperty( 'name', 'profile' );
	
	/* Didn't get the script with rebuild to work
	moi.view.resetAll();
	moi.ui.alert("profile");
	//Rebuild the profile, using [0.0005 mm] in "refit" mode 
	factory = moi.command.createFactory( 'rebuildcurve' );
	factory.setInput( 0, profile );
	factory.setInput( 1, 'refit' ); //mode
	factory.setInput( 2, 0.5 ); //tolerance
	factory.setInput( 4, true ); //delete input objects
	factory.setInput( 5, true ); //keep corners
	factory.commit();
	moi.geometryDatabase.selectAll();
	profile = moi.geometryDatabase.getSelectedObjects(); //update profile
	moi.ui.alert("profile after rebuild");
	*/
	
	//Save profile for later
	moi.geometryDatabase.copyToClipboard(profile); 
	
	//Make thread helix
	moi.geometryDatabase.selectAll();
	var frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( 0, 0, threadLength+threadPitch/2 );
	var factory = moi.command.createFactory( 'helix' );
	factory.setInput( 0, frame ); //Start Point
	factory.setInput( 1, moi.vectorMath.createPoint( 0, 0, -1 * threadPitch/2 ) ); //End point
	factory.setInput( 2, moi.vectorMath.createPoint( threadDiameter/2, 0, 0 ) ); //Radius point
	factory.setInput( 6, threadLength+1 );
	factory.setInput( 7, threadPitch );
	factory.setInput( 8, 'flat' );
	factory.setInput( 9, reverse ); 
	factory.commit();
	moi.geometryDatabase.invertSelection();
	var rail = moi.geometryDatabase.getSelectedObjects();
	
	//Reset viewports
	moi.view.resetAll();
	
	//Make thread cutting object
	moi.geometryDatabase.selectAll();
	var list = moi.createList();
	list.add( moi.vectorMath.createPoint( 0, 0, 0 ) );
	list.add( moi.vectorMath.createPoint( 0, 0, 1 ) );
	factory = moi.command.createFactory( 'sweep' );
	factory.setInput( 0, profile );
	factory.setInput( 1, rail );
	factory.setInput( 2, list );
	factory.setInput( 4, 'Regular' ); //Ends
	factory.setInput( 5, 'Flat' ); //Twist
	factory.setInput( 7, true ); //Cap ends
	factory.setInput( 10, 'Exact' ); //Profiles
	factory.commit();
	
	//Delete profile + rail
	factory = moi.command.createFactory( 'delete' );
	factory.setInput( 0, moi.geometryDatabase.getSelectedObjects() );
	factory.commit();
	
	moi.geometryDatabase.selectAll();
	var cutter = moi.geometryDatabase.getSelectedObjects();
	
	//Make rod
	moi.geometryDatabase.selectAll();
	frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( 0, 0, 0 );
	factory = moi.command.createFactory( 'cylinder' );
	factory.setInput( 1, frame );
	factory.setInput( 3, threadDiameter/2 );
	factory.setInput( 4, moi.vectorMath.createPoint( 0, 0, threadLength + LengthWithoutThread ) );
	factory.commit();
	moi.geometryDatabase.invertSelection();
	var rod = moi.geometryDatabase.getSelectedObjects().item(0);
	moi.geometryDatabase.getSelectedObjects().item(0).name = "rod";
		
	if ( chamfer ) {
		//Chamfer end(s)
		list = moi.geometryDatabase.createObjectList();	
		list.addObject( rod.getEdges().item(0) );
		if ( LengthWithoutThread == 0 ) list.addObject( rod.getEdges().item(2) ); // Chamfer also top end 
		factory = moi.command.createFactory( 'chamfer' );
		factory.setInput( 0, list );
		factory.setInput( 3, threadPitch );
		factory.setInput( 4, threadPitch );
		factory.commit();
	}
	
	//Update rod
	moi.geometryDatabase.selectNamed('rod');
	rod = moi.geometryDatabase.getSelectedObjects();
	
	//Cut thread
	moi.geometryDatabase.deselectAll();
	factory = moi.command.createFactory( 'booleandifference' );
	factory.setInput( 0, rod );
	factory.setInput( 1, cutter );
	factory.setInput( 2, false );
	factory.commit();
	moi.geometryDatabase.selectAll();
	rod = moi.geometryDatabase.getSelectedObjects();
	
	if (LengthWithoutThread > 0) {	
	
		//Draw tapered helix
		moi.geometryDatabase.selectAll();
		frame.origin = moi.vectorMath.createPoint( 0, 0, threadLength + threadPitch / 2);
		factory = moi.command.createFactory( 'helix' );
		factory.setInput( 0, frame );
		factory.setInput( 1, moi.vectorMath.createPoint( 0, 0, threadLength + threadPitch / 2 + threadPitch ) );
		factory.setInput( 2, moi.vectorMath.createPoint( threadDiameter/2, 0, 0 ) );
		factory.setInput( 4, moi.vectorMath.createPoint( threadDiameter/2 + threadDepth, 0, 0 ) );
		factory.setInput( 6, 1 );
		factory.setInput( 7, threadPitch );
		factory.setInput( 8, 'flat' );
		factory.setInput( 9, reverse );
		factory.commit();
		moi.geometryDatabase.invertSelection();
		rail = moi.geometryDatabase.getSelectedObjects();
		
		//Make tapered thread cutting object
		moi.geometryDatabase.selectAll();
		list = moi.createList();
		list.add( moi.vectorMath.createPoint( 0, 0, 0 ) );
		list.add( moi.vectorMath.createPoint( 0, 0, 1 ) );
		factory = moi.command.createFactory( 'sweep' );
		factory.setInput( 0, profile );
		factory.setInput( 1, rail );
		factory.setInput( 2, list );
		factory.setInput( 4, 'Regular' ); //Ends
		factory.setInput( 5, 'Flat' ); //Twist
		factory.setInput( 7, true ); //Cap ends
		factory.setInput( 10, 'Exact' ); //Profiles
		factory.commit();
		
		//Delete profile and rail
		factory = moi.command.createFactory( 'delete' );
		factory.setInput( 0, moi.geometryDatabase.getSelectedObjects() );
		factory.commit();
	
		moi.geometryDatabase.invertSelection();
		cutter = moi.geometryDatabase.getSelectedObjects();
		
		//Cut tapered thread end
		moi.geometryDatabase.deselectAll();
		factory = moi.command.createFactory( 'booleandifference' );
		factory.setInput( 0, rod );
		factory.setInput( 1, cutter );
		factory.setInput( 2, false );
		factory.commit();
			
	}
	
	//Reset viewports
	moi.geometryDatabase.selectAll();
	moi.view.resetAll();
	
	//Unhide what was already here before	
	moi.geometryDatabase.deselectAll();
	moi.geometryDatabase.hide(); 
	moi.geometryDatabase.deselectAll();

	if (timeIt) {
		//Display elapsed time
		var seconds = round( (new Date() - startTime) / 1000 , 0 );
		moi.ui.alert( "Making this took: " + seconds + " s" );	
	}

} 

if (moi.geometryDatabase.Units == "Millimeters") {

	if ( WaitForDialogDone() ) makeExternalThread();
	
} else {
	
	moi.ui.alert( "This scripts only accepts input in Millimeters!\n\nPlease use the Options dialog to switch the Unit system to Millimeters\nand run the script again.", title="Wrong Unit System" );
}