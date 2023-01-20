// config: norepeat


#include "WaitForDialogDone.js"

/*
 Command line parameters available :
	Back
	TopLevel
	AllOfType
*/

function BuildCurveList(select_list, object_list)
{
	var clist = moi.geometryDatabase.createObjectList();
	var curvelist = object_list.getCurves();
	var i = 0;
	var j = 0;

	if (select_list.numEdges == 1)
	{
		var edgelist = null;
		var breplist = object_list.getBReps();

		for ( i = 0; i < breplist.length; ++i )	// build a list of all edges.
			{	
				edgelist = breplist.item(i).getEdges();
				for ( j = 0; j < edgelist.length; ++j)
					clist.addObject(edgelist.item(j));
			}
	}
	else if ( select_list.item(0).isClosed)		// closed curve
	{
		for ( i = 0; i < curvelist.length; ++i )
		{
			if ( curvelist.item(i).isClosed )
				clist.addObject(curvelist.item(i));
		}
	}
	else if ( !select_list.item(0).isClosed)		// open curve
	{
		for ( i = 0; i < curvelist.length; ++i )
		{
			if ( !curvelist.item(i).isClosed )
				clist.addObject(curvelist.item(i));
		}
	}

	return clist;
}

function BuildBrepList(select_list, object_list)
{
	var blist = moi.geometryDatabase.createObjectList();
	var o_breplist = object_list.getOpenBReps();
	var sf_breplist = object_list.getSingleFaceBReps();

	if (select_list.numSingleFaceBReps == 1)		// single face breps.
		blist = sf_breplist;
	else if (select_list.numOpenBReps == 1)			// open breps.
	{
		for ( k = 0; k < o_breplist.length; ++k )		// filter out the single face breps.
		{	
			for (m = 0; m < sf_breplist.length; ++m )
			{
				if ( sf_breplist.item(m).id == o_breplist.item(k).id )
					o_breplist.removeObjectAt(k);
			}		
		}
		blist = o_breplist;
	}
	else
		blist = object_list.getSolids();						// solids.

	return blist;
}

function BuildFaceList(object_list)
{
	var flist = moi.geometryDatabase.createObjectList();
	var templist = null;
	var breplist =  object_list.getBReps(); 
	var i = 0;
	var j = 0;

	for ( i = 0; i < breplist.length; ++i )
	{	
		templist = breplist.item(i).getFaces();
		for ( j = 0; j < templist.length; ++j)
			flist.addObject(templist.item(j));
	}

	return flist;
}


function DoCycleSelectByType()
{
	var selectlist  = moi.geometryDatabase.getSelectedObjects();
	var objectlist = moi.geometryDatabase.getObjects();
	var objects = null;
	var params = moi.command.getCommandLineParams();

	if  (selectlist.length == 1)
	{
		if ( params.search( /toplevel/i ) != -1 )			// get all top level objects.
			objects = objectlist.getTopLevelObjects();
		else																	// build type lists
		{
			 if ( selectlist.item(0).type == 3)				// breps ~~~~~~
			{
				if ( params.search( /alloftype/i ) != -1 )	
					objects = objectlist.getBReps();
				else
					objects = BuildBrepList(selectlist, objectlist);
			}
			else if ( selectlist.item(0).type == 2)			// curves ~~~~~~
			{
				 if ( params.search( /alloftype/i ) != -1 )	
					objects = objectlist.getCurves(); 
				else
					objects = BuildCurveList(selectlist, objectlist);
			}
			else if ( selectlist.item(0).type == 4)			// faces ~~~~~~
					objects = BuildFaceList(objectlist);
			else if ( selectlist.item(0).type == 6)			// points ~~~~~~
					objects =  objectlist.getPoints();		
		}
	}
	else			  // no selection or more than one made.
	{
		moi.ui.beginUIUpdate();
		moi.ui.showUI( 'TitleContainer');
		moi.ui.showUI( 'Notice');
		if ( params.search( /alloftype/i ) != -1 )	
			moi.ui.showUI( 'AllofTypeList');
		else if (params.search( /toplevel/i ) != -1)
			moi.ui.showUI( 'TopLevelInfo');	
		else
			moi.ui.showUI( 'AllTypesList');
		moi.ui.showUI( 'DoneContainer');
		moi.ui.endUIUpdate();
		WaitForDialogDone();
		return;	
	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// change the selection.

	if (objects != null)
		var len = objects.length;
	else
		return;	

	var obindex = 0;
	var i = 0;

	if (  params.search( /back/i ) != -1 )
	{
		for (i = len -1; i >= 0; i-- )	// select back
		{
			if (objects.item(i).selected)
			{
				objects.item(i).selected = false;
				i == 0 ? obindex = len -1 : obindex = i - 1;
				objects.item(obindex).selected = true;
				break;
			}
		}
	}	
	else
	{
		for (i = 0; i < len; i++ )	// select forward
		{
			if (objects.item(i).selected)
			{
				objects.item(i).selected = false;
				i == len -1 ? obindex = 0 : obindex = i + 1;
				objects.item(obindex).selected = true;
				break;
			}
		}
	}
}

DoCycleSelectByType();
