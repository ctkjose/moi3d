// config: norepeat


function makeThread()
{		

	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'TitleContainer' );
	moi.ui.showUI( 'DiameterContainer' );
	moi.ui.showUI( 'LengthContainer' );
	moi.ui.showUI( 'uLengthContainer' );
	moi.ui.showUI( 'StartContainer');
	moi.ui.endUIUpdate();

	var startstop = false;

	var threadPitch = 1.5;
	var alerts = false;

	while (!moi.ui.commandUI.GetStart()) {		
	}
	
	var startTime = new Date();
	
	var threadDiameter = moi.ui.commandUI['diameterinput'].numericValue;
	var threadLength = moi.ui.commandUI['lengthinput'].numericValue;
	var unthreadedLength = moi.ui.commandUI['ulengthinput'].numericValue;
	
	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'TitleContainer' );
	moi.ui.hideUI( 'DiameterContainer' );
	moi.ui.hideUI( 'LengthContainer' );
	moi.ui.hideUI( 'uLengthContainer' );
	moi.ui.hideUI( 'StartContainer');
	moi.ui.endUIUpdate();
	
	if (threadDiameter==3) threadPitch=0.5;
	if (threadDiameter==4) threadPitch=0.7;
	if (threadDiameter==5) threadPitch=0.8;
	if (threadDiameter==6) threadPitch=1;
	if (threadDiameter==7) threadPitch=1;
	if (threadDiameter==8) threadPitch=1.25;
	if (threadDiameter==9) threadPitch=1.25;
	if (threadDiameter==10) threadPitch=1.5;	
	if (threadDiameter==11) threadPitch=1.5;
	if (threadDiameter==12) threadPitch=1.75;

	/*draw helix*/
	var frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( 0, 0, -1*threadPitch/2 );
	var factory = moi.command.createFactory( 'helix' );
	factory.setInput( 0, frame );
	factory.setInput( 1, moi.vectorMath.createPoint( 0, 0, threadLength+threadPitch/2 ) );
	factory.setInput( 2, moi.vectorMath.createPoint( threadDiameter/2, 0, 0 ) );
	factory.setInput( 6, threadLength+1 );
	factory.setInput( 7, threadPitch );
	factory.setInput( 8, 'flat' );
	factory.commit();
	moi.geometryDatabase.selectAll();
	var rail = moi.geometryDatabase.getSelectedObjects();

/*draw thread cutting profile*/
frame = moi.vectorMath.createFrontFrame();
frame.origin = moi.vectorMath.createPoint( threadDiameter/2+0.05, 0, -1*threadPitch );
factory = moi.command.createFactory( 'polygonedge' );
factory.setInput( 0, frame );
factory.setInput( 1, moi.vectorMath.createPoint( threadDiameter/2+0.05, 0, 0 ) );
factory.setInput( 2, 3 );
factory.commit();
moi.geometryDatabase.invertSelection();
var profile = moi.geometryDatabase.getSelectedObjects();

if (alerts) moi.ui.commandUI.alert( "rail + profile" );

/*sweep profile along rail*/
moi.geometryDatabase.selectAll();
var list = moi.createList();
list.add( moi.vectorMath.createPoint( 0, 0, 0 ) );
list.add( moi.vectorMath.createPoint( 0, 0, 1 ) );
factory = moi.command.createFactory( 'sweep' );
factory.setInput( 0, profile );
factory.setInput( 1, rail );
factory.setInput( 2, list );
/*Ends:*/ factory.setInput( 4, 'Regular' );
/*Twist:*/ factory.setInput( 5, 'Flat' );
/*Cap ends:*/ factory.setInput( 7, true );
/*Profiles:*/ factory.setInput( 10, 'Exact' );
factory.commit();
moi.geometryDatabase.invertSelection();
var cutter = moi.geometryDatabase.getSelectedObjects();

if (alerts) moi.ui.commandUI.alert( "cutter" );

/*delete rail*/
factory = moi.command.createFactory( 'delete' );
factory.setInput( 0, rail );
factory.commit();

/*delete profile*/
factory = moi.command.createFactory( 'delete' );
factory.setInput( 0, profile );
factory.commit();

/*draw cylinder*/
moi.geometryDatabase.selectAll();
frame = moi.vectorMath.createTopFrame();
frame.origin = moi.vectorMath.createPoint( 0, 0, 0 );
factory = moi.command.createFactory( 'cylinder' );
factory.setInput( 1, frame );
factory.setInput( 3, threadDiameter/2 );
factory.setInput( 4, moi.vectorMath.createPoint( 0, 0, threadLength ) );
factory.commit();
moi.geometryDatabase.invertSelection();
cylinder = moi.geometryDatabase.getSelectedObjects();

if (alerts) moi.ui.commandUI.alert( "cylinder" );

/*Boolean difference*/
moi.geometryDatabase.deselectAll();
factory = moi.command.createFactory( 'booleandifference' );
factory.setInput( 0, cylinder );
factory.setInput( 1, cutter );
factory.setInput( 2, false );
factory.commit();

if (unthreadedLength > 0) {
	/*draw connection "dowel"*/
	frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( 0, 0, threadLength - 5 ); 
	factory = moi.command.createFactory( 'cylinder' );
	factory.setInput( 1, frame );
	factory.setInput( 3, threadDiameter/5 );
	factory.setInput( 4, moi.vectorMath.createPoint( 0, 0, threadLength + 5 ) );
	factory.commit();
	
	/*draw unthreaded cylinder*/
	frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( 0, 0, threadLength ); 
	factory = moi.command.createFactory( 'cylinder' );
	factory.setInput( 1, frame );
	factory.setInput( 3, threadDiameter/2 );
	factory.setInput( 4, moi.vectorMath.createPoint( 0, 0, threadLength + unthreadedLength ) );
	factory.commit();
	
	moi.geometryDatabase.selectAll();
	factory = moi.command.createFactory( 'booleanunion' );
	factory.setInput( 0, moi.geometryDatabase.getSelectedObjects() );
	factory.commit();
}

moi.geometryDatabase.selectAll();
moi.view.resetAll();

var endTime = new Date();

// time difference in ms
var timeDiff = endTime - startTime;
// strip the miliseconds
	timeDiff /= 1000;
// get seconds
var seconds = Math.round(timeDiff % 60);

moi.ui.commandUI.alert( "Making this took: " + seconds + " s" );			

}


makeThread();
