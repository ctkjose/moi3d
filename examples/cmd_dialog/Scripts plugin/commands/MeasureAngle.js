#include "GetLine.js"
#include "WaitForDialogDone.js"

function LengthSq( vec )
{
	return (vec.x * vec.x) + (vec.y * vec.y) + (vec.z * vec.z);
}

function Length( vec )
{
	return Math.sqrt( LengthSq(vec) );
}

function Normalize( vec )
{
	vec.scale( 1.0 / Length(vec) );
}

function DotProduct( vecA, vecB )
{
	return (vecA.x * vecB.x) + (vecA.y * vecB.y) + (vecA.z * vecB.z);
}

function Clamp( val, low, high )
{
	if ( val < low )
		return low;
		
	if ( val > high )
		return high;
		
	return val;
}

function AngleBetween( vecA, vecB )
{
	Normalize( vecA );
	Normalize( vecB );
	
	var costheta = DotProduct( vecA, vecB );
	costheta = Clamp( costheta, -1.0, 1.0 );
	
	return Math.acos( costheta );
}

function AngleBetweenDegrees( vecA, vecB )
{
	return AngleBetween( vecA, vecB ) * 180.0 / Math.PI;
}

function DoAngle()
{
	var pointsA = new Array();
	var pointsB = new Array();

	if ( !GetLine( pointsA, 'FirstStartPrompt', 'FirstEndPrompt' ) )
		return;
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'FirstEndPrompt' );
	moi.ui.showUI( 'SecondStartPrompt' );
	moi.ui.endUIUpdate();
	
	if ( !GetLine( pointsB, 'SecondStartPrompt', 'SecondEndPrompt' ) )
		return;

	var vecA = moi.vectorMath.makeVector( pointsA[0], pointsA[1] );
	var vecB = moi.vectorMath.makeVector( pointsB[0], pointsB[1] );
	moi.ui.commandUI.Angle.value = AngleBetweenDegrees( vecA, vecB );
	
	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'AngleTable' );
	moi.ui.showUI( 'done' );
	moi.ui.hideUI( 'SecondEndPrompt' );
	moi.ui.endUIUpdate();
	
	WaitForDialogDone();
}

DoAngle();
