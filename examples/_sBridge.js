// Bridge v.0.7 - Max Smirnov. 2015
function factory( factoryname ) { var f = moi.command.createFactory( factoryname ); for ( var i = 1; i < arguments.length; i++ ) f.setInput( i - 1, arguments[i] ); var obj = f.calculate(); f.cancel(); return obj; }
function getParents(faces)
{
	var parents = [], parentsOut = { del:moi.geometryDatabase.createObjectList(), add:moi.geometryDatabase.createObjectList(), srf:moi.geometryDatabase.createObjectList() };
	for ( var f=0; f<faces.length; f++)
	{
		var p = faces.item(f).getParentBRep();
		if (parents[p.id] === undefined) { if (p.getSubObjects().getFaces().length === 1) parentsOut.srf.addObject(p); parentsOut.del.addObject(p); parents[p.id]= moi.geometryDatabase.createObjectList() };
		parents[p.id].addObject(faces.item(f));
	}
	for ( p in parents )
	{
		var separated = factory ('separate', parents[p]);
		var cn = 0;
		for ( var f=0; f<separated.length; f++) {	cn +=separated.item(f).getSubObjects().getFaces().length;	if ( cn == parents[p].length ) break; }
		for ( var a=f+1; a<separated.length; a++ ) parentsOut.add.addObject(separated.item(a));
	}
	return parentsOut;
}
function loft(s1, s2)
{
	var loftObj = moi.geometryDatabase.createObjectList();
	loftObj.addObject(s1.item(0));
	loftObj.addObject(s2.item(0));
	return factory ('loft', loftObj, '', "straight", 0, 1 );
}
function bridge()
{
	var faces = moi.geometryDatabase.getSelectedObjects().getFaces();
	var objects = getParents (faces);

	if ( faces.length!==2 ) { moi.ui.alert ("Select two faces"); return; }
	var loftObj = loft(factory ('join', faces.item(0).getEdges()), factory ('join', faces.item(1).getEdges()));
	if (loftObj.length ===0) return;
	objects.add.addObject(loftObj.item(0));
	for ( var s = 0; s<objects.srf.length; s++) objects.add.addObject(objects.srf.item(s));
	objects.add = factory ('join', objects.add);
	if ( objects.add.length !== 1 ) return;

	moi.geometryDatabase.addObjects(objects.add);
	moi.geometryDatabase.removeObjects(objects.del);
}
bridge();

















