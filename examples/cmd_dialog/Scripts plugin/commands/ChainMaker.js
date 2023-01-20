// config: norepeat

#include "GetObjects.js"
#include "GetObject.js"

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function Cancel( ArrayArgument )
{
	for ( var i = 0; i < ArrayArgument.length; ++i )
		ArrayArgument[i].cancel();
	ArrayArgument.length = 0;
}

function Commit( ArrayArgument )
{
	for ( var i = 0; i < ArrayArgument.length; ++i )
		ArrayArgument[i].commit();
}

function TwistLink( linktoTwist, twistStartPt, twistEndPt )
{
	/* Note that sweeplist works for Input "0", link1 does not*/
	var rotateangle = 90.0 ;
	var twistfactory = moi.command.createFactory( 'twist' );
	twistfactory.setInput( 0, linktoTwist );
	twistfactory.setInput( 1, twistStartPt );
	twistfactory.setInput( 2, twistEndPt );
	twistfactory.setInput( 3, rotateangle );
//	twistfactory.disableUpdate( true );	
	twistfactory.setInput( 4, true );	
//	twistfactory.setInput( 5, easein );
//	twistfactory.setInput( 6, easeout );
//	twistfactory.disableUpdate( false );
	var link1Twisted = twistfactory.calculate();
//	var link1T = link1Twisted.item(0);  //This line causes an exception.
	moi.geometryDatabase.addObjects( link1Twisted );
//	moi.geometryDatabase.addObject( link1Twisted );	// no s, type mismatch.
	return link1Twisted;	
}

// From pipe script
function WrapWithObjectList( obj )
{
	// Create an object list and fill it with the given object. Some things require an object
	// list for input and can't handle a single object instead right now.
	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );
	return list;
}

// The chainList = Update(...) function creates the final chain profile along a curve.
// If preflowChain, arrayed chain or baseline have been previously formed by Update,
// they are removed from the moi geometry database, to avoid duplicate versions.
// The center rail of a chain link is created with the (rounded) rectangle factory.
// The profile of the chain link is created with the circle factory.
// Chain link one is created by the sweep factory.
// For a twisted chain link, the link is twisted with the twist factory, with a certain center axis. 
// A second chain link is created by the copy factory.
// The second chain link is still created for a twisted chainlink,
// even though it could be done without if programming were modified.
// For a non-twisted second chain link, it is rotated by 90 degrees.
// The flow base line is created in such a way that the two initial chain links will be re-created by the array factory.
// (LineWeb script just adds the initial point with the array factory output.)
// The flow base line is the same length as the target curve.
// The two chain links are combined into one object list, for the array factory.
// The preflowChain is created with the array factory, along the flow base line.
// The initial two chain links are removed from the geometry database.
// The rail and the profile circle are removed from the geometry database.
// The preflowChain is flowed onto the target curve with the Flow factory,
// with option to keep links rigid or let them bend a little.
// The flowedChain is returned to chainList to permit the removal of the flowedChain in
// the event of additional Updates, or Cancel button pushed.  (Many attempts to remove
// the flowedChain elsewhere were unsuccessful.)

function Update( targetCurve, linkLength, linkHeight, cornerRadius, profileRadius, TwistedChain, Rigid )
{
	var gd = moi.geometryDatabase;
	targetCurve.selected = false;
	
	//  Create various dimensions for the chain and its links.
	var z = 0.0;	
	//chain length estimate.
	var baseLength = targetCurve.getLength();
	// chain link dimensions:
	var recLength = linkLength - 2.0 * profileRadius;
	var innerLength = recLength - 2.0 * profileRadius;
	var recHeight = linkHeight - 2.0 * profileRadius;
	var halfHeight = 0.5 * recHeight;
	// baseStartPt is used for copy of Link1 to Link2, rotate, and array dir base pt.
	var baseStartPt = moi.vectorMath.createPoint( profileRadius, halfHeight, 0 );
	// innerEndPt is used for copy Link2 to Link2, and for rotate.  
	var innerEndPt = moi.vectorMath.createPoint( (profileRadius + innerLength), halfHeight, 0 );	
	// offsetPt2 is used for a double length array offset.
	var offsetPt2 = moi.vectorMath.createPoint( (profileRadius + 2 * innerLength), halfHeight, 0 );
	// note that offsetPt2 is also used for flow base line start pt, because the result from the 
	// array dir .calculate does not include link1 and link2.  The flow baseline is moved over to the right
	// by two*innerLength.
	// baseExtentEndPt is the end point for the flow base curve, and also for array extent point. 
	var baseExtentEndPt =  moi.vectorMath.createPoint( (profileRadius + baseLength + 2 * innerLength), halfHeight, 0 );
	var twistStartPt = 	moi.vectorMath.createPoint( -profileRadius, halfHeight, 0 );
	var twistEndPt = 	moi.vectorMath.createPoint( (2 * profileRadius + innerLength), halfHeight, 0 ) ;
	
	// The rounded rectangle makes the rail, which is the centerline of the link:	
	var cornerPt = moi.vectorMath.createPoint( recLength,recHeight,z );
	frame = moi.vectorMath.createTopFrame();
	var recfactory = moi.command.createFactory( 'rectangle' );	
	recfactory.setInput( 0, frame );	
	recfactory.setInput( 1, cornerPt );
	recfactory.setInput( 2, recLength );
	recfactory.setInput( 3, recHeight );
	recfactory.setInput( 4, true);
	//	recfactory.setInput( 5,   ???   );
	recfactory.setInput( 6, cornerRadius );
	recfactory.update();
	var rail = recfactory.getCreatedObjects();
	
	// The rail will be swept with a circle profile to create the chainlink.
	var circlefactory = moi.command.createFactory( 'circle' );

	var frame = moi.vectorMath.createFrame(
		moi.vectorMath.createPoint( -20, -20, -20 ),
		moi.vectorMath.createPoint( 1, 0, 0 ),
		moi.vectorMath.createPoint( 0, 1, 0 ) );

		circlefactory.setInput( 0, true );
	circlefactory.setInput( 1, frame );
	circlefactory.setInput( 3, profileRadius );
	var circleobj = circlefactory.calculate();
	if ( !circleobj || circleobj.length != 1 )
		return false;
	var circle = circleobj.item(0);	
//	Next line is needed for sweep to work, per MG.
	moi.geometryDatabase.addObject( circle );	

	/*make the link by sweep of circle around rail*/
	var sweepfactory = moi.command.createFactory( 'sweep' );
	sweepfactory.setInput( 0, WrapWithObjectList(circle) );
	sweepfactory.setInput( 1, rail );	
	sweepfactory.setInput( 5, 'freeform' ); // SweepTwist option.
	sweepfactory.setInput( 7, false );       // Cap ends option.	
	var sweeplist = sweepfactory.calculate();
	if ( !sweeplist || sweeplist.length != 1 )
		return false;
//	moi.geometryDatabase.addObjects( sweeplist );//NOT needed for Twist.

	//	Test for Twist checkbox.
	/* Note that function TwistLink needs sweeplist.  (sweeplist.item(0) does not work*/	
	if ( TwistedChain )
	{
		var link1ToCopy = TwistLink( sweeplist, twistStartPt, twistEndPt );		
		var link1 = link1ToCopy.item(0);
	}
	else
	{
		link1 = sweeplist.item(0); //Non-Twisted link1.
		var link1ToCopy = WrapWithObjectList(link1)
	}	
		
	/*make link2nr, non-rotated, by copy of link1*/
	var copyfactory = moi.command.createFactory( 'copy' );
	copyfactory.setInput( 0, link1ToCopy );	
	copyfactory.setInput( 1, baseStartPt ); 
	copyfactory.setInput( 2, innerEndPt );
	copyfactory.update();
	var link2nr = copyfactory.getCreatedObjects();

	/* If not twisted link, make rotated link2 by rotating link2nr by 90 degrees*/
	if ( !TwistedChain )
	{
	var rotateaxisfactory = moi.command.createFactory( 'rotateaxis' );
	var rotateangle = 90.0 ;
	rotateaxisfactory.setInput( 0, link2nr );	
	rotateaxisfactory.setInput( 1, baseStartPt );
	rotateaxisfactory.setInput( 2, innerEndPt );	
	rotateaxisfactory.setInput( 3, rotateangle );
	rotateaxisfactory.update();
	var link2obj = rotateaxisfactory.getCreatedObjects();
	rotateaxisfactory.commit(); //Delete this line????	
	}
	else
	var link2obj = link2nr

	moi.geometryDatabase.removeObjects( link2nr );
	moi.geometryDatabase.removeObjects( sweeplist );	

	/*make line for the flow base line.  Length = curve target length*/
	var flowbaselinefactory = moi.command.createFactory( 'line' );
	flowbaselinefactory.setInput( 0, offsetPt2 );
	flowbaselinefactory.setInput( 1, baseExtentEndPt );
	flowbaselinefactory.update();
	var baselineobj = flowbaselinefactory.getCreatedObjects();
	var baseline = baselineobj.item(0);//needed for flow
	
	/*Make object list with link1 and link2 (Michaels help used)*/
	var linklist1 = moi.geometryDatabase.createObjectList();
	var list2 = moi.geometryDatabase.createObjectList();	
	linklist1.addObject( link1 );
	var link2 = link2obj.item(0);
//	var link2 = link2obj;//Remove this line, it is only a test.
	list2.addObject( link2 );	
	// Combine list2 into linklist1
	for ( var i = 0; i < list2.length; ++i )
	{
		var obj = list2.item(i);
		linklist1.addObject( obj );
	}
	
	/*array link1 and link2 along the flow base line with Offset, Extent*/
	var arrayfactory = moi.command.createFactory( 'arraydir' );
	arrayfactory.setInput( 0, linklist1 );
//	arrayfactory.setInput( 1, 5 );
	arrayfactory.setInput( 2, baseStartPt );
	arrayfactory.setInput( 3, offsetPt2 );
	arrayfactory.setInput( 4, baseExtentEndPt );
	arrayfactory.setInput( 5, "Offset, Extent" );
	preflowChain = arrayfactory.calculate();
	if ( preflowChain )
	gd.addObjects( preflowChain );
	
	moi.geometryDatabase.removeObjects( link2obj );
	moi.geometryDatabase.removeObject( link1 );// no "s"
	moi.geometryDatabase.removeObjects( rail );
	moi.geometryDatabase.removeObject( circle );// no "s"

	/*(Asynchronous) Flow the array of chain links onto the curve*/
	var flowfactory = moi.command.createFactory( 'flow' );
//	flowfactory.disableUpdate( true );
//	flowfactory.setInput( 0, chainobj ); <<<<<
	flowfactory.setInput( 0, preflowChain );	
	flowfactory.setInput( 1, baseline );
	flowfactory.setInput( 2, targetCurve );
//	flowfactory.setInput( 3, 'deleteinputs' );	
//	flowfactory.setInput( 4, 'stretch' );
//	Rigid is true or false for input 5// <<<<<
	flowfactory.setInput( 5, Rigid );
//	flowfactory.setInput( 10, 'flipnormal' );	
//	flowfactory.setInput( 11, projective );
//	flowfactory.setInput( 12, 'straight' );
	var flowedChain = flowfactory.calculate();
	if ( flowedChain )
	gd.addObjects( flowedChain );
	gd.removeObjects( preflowChain );
	gd.removeObjects( baselineobj );
//	flowfactory.disableUpdate( false );
	return flowedChain;//to chainList
}

function GetValue( name )
{
	var val = 0.0;
	
	var input = moi.ui.commandUI[name];
	if ( input.value != '' )
	{
		try	{
			val = input.numericValue;
		} catch(e){}
	}
	
	return val;
}

function DoChain()
{
	var ui = moi.ui.commandUI;
	var gd = moi.geometryDatabase;
	// Get targetCurve, the path curve for the flow target.
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObject( objectpicker ) )
		return;
	// Could modify to have several targetCurves).	
	var targetCurve = objectpicker.objects.item(0);
	moi.geometryDatabase.deselectAll();

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectionPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'ChainOptions' );
	moi.ui.endUIUpdate();	
	
	var chainList = moi.geometryDatabase.createObjectList();
	
	var NeedUpdate = true;	
	
	var linkLength = GetValue( 'linkLength' );
	var linkHeight = GetValue( 'linkHeight' );
	var cornerRadius = GetValue( 'cornerRadius' );
	var profileRadius = GetValue( 'profileRadius' );
	var TwistedChain = moi.ui.commandUI.TwistedChain.value;
	var Rigid = moi.ui.commandUI.Rigid.value;

	// Wait for cancel or done.
	var dlg = moi.ui.commandDialog;
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			if ( chainList != null )
				moi.geometryDatabase.removeObjects( chainList );			
			return;
		}
			
		if ( dlg.event == 'done' )
			break; // "Done" pushed.
			
		if ( dlg.event == 'linkLength' )
		{
		linkLength = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'linkHeight' )
		{
			linkHeight = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'cornerRadius' )
		{
			cornerRadius = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'profileRadius' )
		{
			profileRadius = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'TwistedChain' )
		{
			TwistedChain = moi.ui.commandUI.TwistedChain.value;
			NeedUpdate = true;
		}
		else if ( dlg.event == 'Rigid' )
		{
			Rigid = moi.ui.commandUI.Rigid.value;
			NeedUpdate = true;
		}		
		
		else if ( dlg.event == 'Update' )
		{
			if ( chainList != null )
				moi.geometryDatabase.removeObjects( chainList );//Remove prior chain:	
			chainList = Update( targetCurve, linkLength, linkHeight, cornerRadius, profileRadius, TwistedChain, Rigid );
			NeedUpdate = false;
		}
	}

	if ( NeedUpdate )
			chainList = Update( targetCurve, linkLength, linkHeight, cornerRadius, profileRadius, TwistedChain, Rigid );		
}

DoChain();
