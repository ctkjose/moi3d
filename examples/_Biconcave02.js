/*
Biconcave script by Brian McMillin, May 21, 2014.		
The Biconcave script is a 2d curve generator, which creates a curve in one quadrant of the xy plane.
Revolve about the y axis yields a solid resembling an erythrocyte, (red blood cell), for the default parameters in the .htm file.
From "Modeling Human Erythrocyte Shape and Size Abnormalities"
http://arxiv.org/ftp/q-bio/papers/0507/0507024.pdf 
The source document also modifies the parameters, resulting in deformations resembling Microcytes, Macrocytes, and Stomatocytes.
The sin, cos, and angle phi in the equations are not needed.
This script uses the three Jacobi elliptic functions, sn, cn, and dn, which were previously used in the SeiffertCurve script. q.v.
The parameter "m" is equal to the modulus k squared.  (k may also equal the eccentricity of some ellipse.)
Repeat the script with the same, or different parameters, to create a closed curve.  The bottom curve can be different.
The parameter "m" is limited to the interval [0,1), which excludes 1.0.
A trial of values of "m" between 1 and 10 yielded "pseudo ellipses", so they are excluded also.
The parameter u ranges in value in the interval of [0,U] inclusive, and is used to plot points on the curve.
*/

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

//	Define cosh sinh and tanh.
function cosh(x)
{
	return (Math.exp(x) + Math.exp(-x))/2.0
}

function sinh(x)
{
	return (Math.exp(x) - Math.exp(-x))/2.0
}

function tanh(x)
{
	return (Math.exp(x) - Math.exp(-x))/(Math.exp(x) + Math.exp(-x))
}

/*
Evaluate the Jacobi Ellipic functions SN,CN, and DN
The Jacobi elliptic functions sn(u|m), cn(u|m), and dn(u|m) are calculated by using AGM plus recurrence relation.
Source Boost and Abramowitz and Stegun, Page 571. http://www.math.hkbu.edu.hk/support/aands/toc.htm
*/
function EvalJacobi( tval, m, U, cHeight, Lradius )
{
	var u;
	u = tval * U;
	var asave = new Array();
	var csave = new Array();
	var k = Math.sqrt(m);
	var tol = 10.0e-11;
	divisor = 1;
	var mBIGflag = false;
	var sn;
	var cn;
	var dn;
	var t;
	
/*Set up two arrays and AGM values*/
var asav = [];
var csav = [];
asav[0] = 1.0;
var b = Math.sqrt(1.0 - m);
csav[0] = k; 
var n2 = 1.0;
var i = 0;

while( Math.abs( (csav[i]/asav[i]) ) > tol )
	{
	if( i > 10 )
		{
/*		mtherr( "ellpjf", OVERFLOW );*/
		break;
		}
	var a = asav[i];
	++i;
	csav[i] = 0.5 * ( a - b );
	var t = Math.sqrt( a * b );
	asav[i] = 0.5 * ( a + b );
	b = t;
	n2 += n2;
	}

/* backward recurrence */
// Find phi_subzero, starting at a[n] and c[n], and decrementing to n=0.
// See paragraph 22.20.2 and .3 and .4 of nist website.
var phi = n2 * asav[i] * u;
do
	{
	t = csav[i] * Math.sin(phi) / asav[i];
	b = phi;
	phi = 0.5 * (Math.asin(t) + phi);
	}
while( --i );

	sn = Math.sin(phi);
	t = Math.cos(phi);
	cn = t;
	dn = t/Math.cos(phi-b);
//	ph = phi;

//	var ku = k * u;
	var x = Lradius * cn;
	var y = cHeight * sn * dn / Math.sqrt(1 - m);
	var z = 0.0;	
	
	return moi.vectorMath.createPoint( x, y, z );
}

/*
This function calculates the value of U = IK = K(k). Some papers call it K(m)
K(k) is the Complete elliptic integral of first kind.
U will limit the curve to the first quadrant of the xy plane, for positive height and length.
http://en.wikipedia.org/wiki/Quarter_period
k is the modulus, but m = k*k is used here.
Uses arithmetic geometric mean, Landen's_transformation.
http://www.robertobigoni.eu/Matematica/Integrali/IntegraliEllittici/Elliptic.html    (e = k)
http://en.wikipedia.org/wiki/Landen's_transformation
IE is the Complete elliptic integral of second kind. (Not used) 
*/
function ellipticInt( mValue )
{
  var a, b, a1, b1, amb, E, i, IK, IE;
  var kk = mValue; 	
  a = 1.0;
  b = Math.sqrt(1.0-kk);
//  E = 1-kk/2;
  i = 1;
  do
    {
      a1 = (a+b)/2;
      b1 = Math.sqrt(a*b);
      amb = a-b;
//    E -= i*amb*amb/4;
      i *= 2;
      a = a1;
      b = b1;
    } while (Math.abs(a-b)>1e-6);
  IK = Math.PI/(2.0*a);
	return IK;  // var U = IK 
// IE = E*IK;
}

function Update()
{
	var curvefactory = moi.command.createFactory( 'interpcurve' );

	var mValue = moi.ui.commandUI.mValue.numericValue;
	mValue = Math.abs(mValue);
	
	if (mValue == 0.0)
	{
		mValue = 0.001;
		alert ( " mValue must not = zero, mValue set to 0.001 " ); 
	}	

	if (mValue >= 1.0)
	{
		mValue = 0.9999;
		alert ( " mValue must be less than 1, mValue set to 0.9999 " ); 
	}	
		
	var cHeight = moi.ui.commandUI.cHeight.numericValue;
	var Lradius = moi.ui.commandUI.Lradius.numericValue;	
	var numpoints = moi.ui.commandUI.numpoints.integerValue;
	var Bottom = ui.BottomCurve.value;
	var Left = ui.LeftCurve.value;
	if (Bottom)
		cHeight *= -1.0;
	if (Left)
		Lradius *= -1.0;
	
	var U = ellipticInt( mValue );
	
	for ( var i = 0; i < numpoints; ++i )
	{
		var tval = i / (numpoints - 1);
		
		var pt = EvalJacobi( tval, mValue, U, cHeight, Lradius );
		
		//Add point to the interpcurve factory.
		curvefactory.createInput( 'point' );
		curvefactory.setInput( curvefactory.numInputs - 1, pt );
	}
	curvefactory.update();
	return curvefactory;
}

function DoBiconcave()
{
	ui = moi.ui.commandUI;	
// Note that "prefix" moi.ui.commandUI. is needed for code split between .htm and .js
	var curvefactory = Update();
//	var curvefactory = moi.ui.commandUI.Update(); //code is in .htm file.

// Revolve NOT implemented;
//	var Biconcaveobj = curvefactory.getCreatedObjects();//make objlist	
//	var BiconcaveCurve = Biconcaveobj.item(0);
	
	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			curvefactory.cancel();
			return; // Canceled.
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'mValue' || dlg.event == 'mLower' || dlg.event == 'cHeight' || dlg.event == 'hLower' ||  dlg.event == 'Lradius' || dlg.event == 'numpoints' || dlg.event == 'BottomCurve' || dlg.event == 'LeftCurve' )
		{
			curvefactory.cancel();
			var curvefactory = Update();
//			curvefactory = moi.ui.commandUI.Update(); // for code in .htm
		}
	}
	curvefactory.commit();
}
DoBiconcave();







