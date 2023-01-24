Feature Requests

Creating tools and panels:

I would like to see a `moi.ui.createWindow([url|html], windowOptions)` similar to js `window.open()`.

The `moi.ui.createDialog()` has some limitations. It add behaviors and make assumptions about its use. For example:

- The `esc` key closes the window. 
- Mouse events like scrolls and other are stolen by the main viewport regardless of any attempts to force focus on the HTML element. 
- The window opens centered relative to the main window.
- Handling of keys is limited. Copy/Paste, Command Keys are stolen by Moi.


# MoI internals

QMoiApplication
MoiScriptableBase
PropertiesPanelObjectModel
MoiScriptable
MoiScriptable18
MakeFunctionObjectEMS_F10
MoiVariantR10
MethodArgsEE24
ScriptableFunctionObject

ShortcutKeyObjectModel

WaitableObject
	WaitForEventWorkerEvE
		WaitableObjectEventLoop

# Paste Board
This a a temporary repository of random information, to be used somewhere else, and sorted out...



# OBJ support
http://moi3d.com/forum/
https://moi3d.com/faq#Q:_Why_can_I_export_to_.obj_format.2C_but_cannot_read_.obj_format_into_MoI.3F
Usually .obj files contain polygon mesh data which is a different kind of model data than the CAD solids and surfaces that MoI is designed to work with.

_importObj by Max Smirnov (keeps at the download the original form) but better if the OBJ file is "Quadrangulated"
http://moi3d.com/forum/index.php?webtag=MOI&msg=7841.6

Obj23dmWireframe by Michael Gibson : Only the wire Frame
http://moi3d.com/resources

Or directly by the SubDivision Free Modeler Rocket3F (<---> Moi3D )
https://www.rocket3f.com

# To Sort

Object Type

2 = curve


Special URL:
moi://appdata/nodeeditor/


For a cylinder there are 6 inputs:

0 = boolean value true = distance input is radius, false = distance input is diameter
1 = frame for cylinder bottom base point and axis directions
2 = point that defines the radius, this can be left out if a numeric radius is supplied instead
3 = numeric radius (or diameter) value.
4 = top point of the cylinder, this is required and also the orientation of the cylinder will be modified to point towards this point
5 = optional numeric height input, if this is supplied the cylinder will point towards the top point but will be this specific height instead of touching the top point





http://moi3d.com/wiki/MaxScriptArchive

Sidepane.htm
```html
<td><vcenter><moi:CommandButton icon="icons/dmorril.png" onbuttonclick="moi.filesystem.shellExecute( moi.filesystem.getAppDataDir() + 'moi_ref\\index.htm' );">JavaScript ref</moi:CommandButton>
  </vcenter>      </td>
  ```

```js
moi.selection.setFilter( 'Types', 'Curves', true );
var objects = moi.geometryDatabase.selectAll();
moi.selection.clearSelectionFilters();

moi.geometryDatabase.deselectAll();

//returns an ObjectList
var objects = moi.geometryDatabase.getSelectedObjects();
var objCurves = moi.geometryDatabase.getSelectedObjects().getCurves();

```


```js

var crvs = moi.geometryDatabase.getSelectedObjects().getCurves();

if ( crvs.length == 0 ){
	moi.ui.alert( 'No curves were selected.' );
	return;
}

 crv.getStartPt()
crv.getEndPt() 

moi.geometryDatabase.deselectAll();

```

```js
moi.ui.addPickedPoint( basept );
moi.ui.removeLastPickedPoint();
moi.ui.clearPickedPoints();
```

```js

var selection = moi.geometryDatabase.getSelectedObjects();

if(selection.length == 0){
	plugin.showAlert("You must select a point.");
	return;
}


for ( var i = 0; i < selection.length; ++i ){
	var o = selection.item(0);
	plugin.showAlert("type = " + o.type);
}
```

```js
function CreatePoint( xValue, yValue, zValue, ptName )
{
	var pt = moi.vectorMath.createPoint( xValue, yValue, zValue );
	var factory = moi.command.createFactory( 'point' );
	factory.setInput( 0, pt );
	var ptObj = factory.calculate();
	if ( !ptObj )
		return false;
	ptObj.setProperty( 'name', ptName ); // Name the point.	
	var point = ptObj.item(0);

var g_style_index = 1;// This Style MAY be red.	
point.styleIndex = g_style_index;
// All the points created ended up Style RED.  	
	
	return point;
}

	// Create pointA
	var xValue = 1;
	var yValue = 2;
	var zValue = 0;
	var ptName = 'pointA';
	var pointA = CreatePoint( xValue, yValue, zValue, ptName );
	moi.geometryDatabase.addObject( pointA );
```


```js
//Check if point from PointPicker is on a snap
function HasOsnap( pickedpt ){
	for ( var i = 0; i < pickedpt.numOsnaps; ++i ){
		if ( pickedpt.osnap(i).isOnCurve )
			return true;
	}

	return false;
}
```

```js
//get first object touched by point...

for ( var i = 0; i < pickedpt.numOsnaps; ++i ){
	if ( pickedpt.osnap(i).isOnCurve ) return pickedpt.osnap(i).object;
}	
```



```js
function CreatePoint( pt )
{
	var factory = moi.command.createFactory( 'point' );
	factory.setInput( 0, pt );

	var list = factory.calculate();
	list.setProperty( 'selected', true );
	moi.geometryDatabase.addObjects( list );
}

function DoExtractPolylinePoints()
{
	var crvs = moi.geometryDatabase.getSelectedObjects().getCurves();

	if ( crvs.length == 0 )
	{
		moi.ui.alert( 'No curves were selected.' );
		return;
	}

	moi.geometryDatabase.deselectAll();

	for ( var i = 0; i < crvs.length; ++i )
	{
		var crv = crvs.item(i);

		var segs = crv.getSubObjects();
		for ( var iSeg = 0; iSeg < segs.length; ++iSeg )
		{
			var seg = segs.item( iSeg );
			CreatePoint( seg.getStartPt() );
		}
	}
}

```


for(var k in pObj.points){
	var pt1 = pObj.points[k];
	//plugin.showAlert("OBJPOINT[" + k + "]=" + pt1.toString(3));
	
	if( moi.vectorMath.pointsAreEqual(pt,pt1) ){
		pObj.selPoint = pt1;
		
		ui.commandUI.param_dx.value = pt.x;
		ui.commandUI.param_dy.value = pt.y;
		ui.commandUI.param_dz.value = pt.z;
		
		continue;
	}
	
	
}


```js
#include "GetObjects.js"

//Set vareables 
var i;
i=0;
var linelength;
linelength=50;

var linelist = moi.geometryDatabase.createObjectList();

//Will draw a line with the given coordinates 
function drawLine(x1,x2,y1,y2) {
	   var linefactory = moi.command.createFactory( "line" );
	   linefactory.setInput( 0, moi.vectorMath.createPoint( x1, y1, 0 ) );
	   linefactory.setInput( 1, moi.vectorMath.createPoint( x2, y2, 0 ) );
		
	var objlist = linefactory.calculate();
	   var line = objlist.item(0);
	moi.geometryDatabase.addObject( line );
	   return line;
}


for ( var j=0; j < 17; j++ ){
	linelist.addObject(drawLine(i,i,0,linelength));
	i=i+10;
}
```

```js
//Will do the intersection 
function DoIntersect(){
	var linelist = moi.geometryDatabase.createObjectList();
	var objectpicker = moi.ui.createObjectPicker();
	//objectpicker.min = 2;
	
	if ( !GetObjects( objectpicker ) )
		return;

	var picked_objects = objectpicker.objects;

	for ( var i = 0; i < picked_objects.length; ++i )
		linelist.addObject( picked_objects.item(i) );
	
	var factory = moi.command.createFactory( 'intersect' );
	factory.setInput( 0, linelist );
	
	factory.commit();
}

DoIntersect();
```


http://moi3d.com/forum/lmessages.php?webtag=MOI&msg=8010.14
Hi Marco, yes I think it's possible to use the Fillet factory to get corner points, there is a custom method .generateVertices() on the fillet factory, you can use it like this to get an object list of point objects, one at each sharp corner of the curve:

```js

function GetCorners( crvs )
{
	var factory = moi.command.createFactory( 'fillet' );
	
	factory.setInput( 0, crvs ); // Set an object list with one curve in it.
	factory.generateVertices();

	var corners = factory.getCreatedObjects();
	
	factory.cancel();
	
	return corners;
}

function TestGetCorners()
{
	var crvs = moi.geometryDatabase.getSelectedObjects().getCurves();
	if ( crvs.length != 1 )
	{
		moi.ui.alert( 'Select a curve before running this command.' );
		return;
	}
	
	var corners = GetCorners( crvs );
	
	moi.ui.alert( 'Got ' + corners.length + ' corners' );
}	

TestGetCorners();
```