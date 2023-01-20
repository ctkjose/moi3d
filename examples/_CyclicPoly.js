// cyclicPoly 0.5 - Max Smirnov. 2015

function findR(ln, minD, maxD)
{
	var l = ln.length, tolerance = 1e-12;	
	for ( var t=0; t<100; t++ )
	{
		var D = (minD+maxD)/2, a=0;
		if ( maxD-minD < tolerance ) break;
		for (var f=0; f<l; f++) a += Math.asin(ln[f]/D);
		if ( a < Math.PI ) { maxD = D } else { minD = D }
	}
	return D/2;
}

function cPoint (R, alpha) { return moi.VectorMath.createPoint(R*Math.sin(alpha*2), R*Math.cos(alpha*2), 0); }
function createCircle(p0, p1, p2) { var f = moi.command.createFactory( "circle3pt" ); f.setInput( 0, p0 ); f.setInput( 1, p1 ); f.setInput( 2, p2 ); var obj = f.calculate(); f.cancel(); return obj; }
function createPolyline (points) { var f = moi.command.createFactory( "polyline" ); for (var i=0; i<points.length; i++) { f.createInput( 'point' ); f.setInput( i, points[i]); } var obj = f.calculate(); f.cancel(); return obj; }

function cyclicPoly() 
{ 
	var polyline = moi.geometryDatabase.getSelectedObjects().getCurves();
	if ( polyline.length !== 1 ) { moi.ui.alert("Select polyline"); return; }
	var sub = polyline.item(0).getSubObjects();
	if ( sub.length <3 ) { moi.ui.alert("Error: Need more segments"); return; }
	var ln=[], maxN=0, tLen = 0;
	for (var f=0; f<sub.length; f++)
	{
		ln[f] = moi.VectorMath.distance(sub.item(f).getStartPt(), sub.item(f).getEndPt());
		tLen += ln[f];
		if ( ln[f] > ln[maxN] ) maxN = f;
	}
	if (ln[maxN]*2 > tLen) { moi.ui.alert("Error: Segment too long"); return; }
	
	var T = 0;	
	for (var f=0; f<ln.length; f++) T += Math.asin(ln[f]/ln[maxN]);
	if (T<Math.PI) { moi.ui.alert("Error: Unsupported type"); return; }
	
	var R = findR (ln, ln[maxN], tLen/2 );
	var circle = createCircle ( moi.VectorMath.createPoint(0, R, 0), moi.VectorMath.createPoint(R, 0, 0), moi.VectorMath.createPoint(0, -R, 0));
	var pts = [], A=0; pts.push(cPoint(R, A));
	for (var f=0; f<ln.length; f++) { A += Math.asin(ln[f]/R/2);  pts.push(cPoint(R, A)); }
	var pl = createPolyline (pts);
	circle.setProperty( 'displayMode',1);
	moi.geometryDatabase.addObjects(circle);
	moi.geometryDatabase.addObjects(pl);
}
cyclicPoly();