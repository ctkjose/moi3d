// config: norepeat

// Doyle flower script, by Brian McMillin, July 2019.

// Traditional Doyle flower begins with 3 externally mutually tangent circles:
// Circle C with radius R0.  Circle C centered at (x,y) = (1,0).  
// Circle A with radius R1.  Radii are nonzero.
// Circle B with radius R2.
// A and B also are complex numbers in the Argand plane, and A and B are the centers of circles A and B.
// New Circle C3 will be tangent to C and B, and R3 = R0*R2/R1.
// With attractor point w0 located at the origin, R0 will be less than 1 unit.

// General form for a new circle petal in "cheek" of two adjoining circles:
// Let 3 externally mutually tangent circles C0, C1, and C2, have radii of R0, R1, and R2, respectively.  There is a "cheek" areas formed by the pair of adjacent circles, C0 and C1, where a tan/tan circle C3, of radius R3, may be added.  Let the circle opposite the cheek of adjCircle1 (C0), and adjCircle2 (C1), be labelled oppCircle (C2).  Then for new tan/tan circle C3, its radius = R3.
// R3 = radius_adjCircle1 * radius_adjCircle2 / radius_oppCircle.
//(There are two more "cheek" areas, where circles C4 and C5 may be created, with differently defined combinations of adjacent and opposite circles.)

// To avoid eventual overlapping/crossing non-disjoint circles, to insure coherent Doyle spirals, the spiral arm counts "p" and "q" must be used to calculate with numeric methods the complex number center values for the centerpoints of A and B, as well as the radius of the center circle of the flower.

#include "GetPoint.js"
#include "GetObjects.js"
#include "GetObject.js"
#include "GetPointOsnappedOnCurve.js"

function DoyleFlower()
{
	//var gd = moi.geometryDatabase;
	var ui = moi.ui;
// New circle will be a MoI tantanCircle.
	var circlefactory = moi.command.createFactory( 'circletangent' );	
	var objectpicker = ui.createObjectPicker();
	var pointpicker = ui.createPointPicker();	
	pointpicker.disableStraightSnap = true;
	pointpicker.enableOnObjectSnap = true;	

// Select point on first circle, near newCircle tangent site.
// This can be a double click, which will satisfy Second Prompt.	
	if ( !GetPointOsnappedOnCurve( pointpicker ) )
		return;
	circlefactory.setInput( 1, pointpicker.pt );
	
// Select first circle C0, that will be tangent to new circle.
// If first prompt was a double click, the second click satisfies this prompt.
	ui.beginUIUpdate();
	ui.hideUI( 'FirstPrompt' );
	ui.showUI( 'SecondPrompt' );
	ui.endUIUpdate();
	
	objectpicker.allowCurves();	
	//objectpicker.autoFaceDrillDown = true;
	objectpicker.min = objectpicker.max = 1;
	if ( !GetObject( objectpicker ) )
		return;
	var adjCircle1 = objectpicker.objects.item(0);	
	
// Select point on second circle C1, near newCircle tangent site.
// This can be a double click, which will satisfy Fourth Prompt.
	ui.beginUIUpdate();
	ui.hideUI( 'SecondPrompt' );
	ui.showUI( 'ThirdPrompt' );
	ui.endUIUpdate()

	if ( !GetPointOsnappedOnCurve( pointpicker ) )
		return;
	circlefactory.setInput( 2, pointpicker.pt );	

// Select second circle C1, adjacent to first circle C0, that will be tangent to new circle.
// If third prompt was a double click, the second click satisfies this prompt.
	ui.beginUIUpdate();
	ui.hideUI( 'ThirdPrompt' );
	ui.showUI( 'FourthPrompt' );
	ui.endUIUpdate();	

	if ( !GetObject( objectpicker ) )
		return;

	var adjCircle2 = objectpicker.objects.item(0);
	
	var frame = circlefactory.frame;
	if ( frame == null )
		return;
	pointpicker.restrictToPlane( frame, true );		
	pointpicker.disableBasePt = true;

	// Select third circle C2, opposite to site of the new tangent circle.  	
	ui.beginUIUpdate();
	ui.hideUI( 'FourthPrompt' );
	ui.showUI( 'FifthPrompt' );
	ui.endUIUpdate();
	
	if ( !GetObject( objectpicker ) )
		return;

	var oppCircle = objectpicker.objects.item(0);
	
	//Create newCircle tangent to adjCircle1 and adjCircle2.
	if ( adjCircle1.isCircle && adjCircle2.isCircle && oppCircle.isCircle )
	{	
		var R0 = adjCircle1.conicRadius;
		var R2 = adjCircle2.conicRadius;	
		var R1 = oppCircle.conicRadius;
		var R3 = R0 * R2 / R1;
		var Val = R3;
		circlefactory.setInput( 0, true );
		circlefactory.setInput( 4, Val );
	}
		circlefactory.commit();	

	
	
	// moi.geometryDatabase.removeObject( newedge0 );
}

DoyleFlower();
