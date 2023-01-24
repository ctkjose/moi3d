
# MoI Javascript Scripting API

**Disclaimer:** This is a personal compendium of information on [MoI](http://moi3d.com) Javascript Scripting API. The site and contents are not affiliated with [MoI](http://moi3d.com). The community contributors make no claim of veracity or fitness of this content. The information is based on David C. Morrill's api documentation, forum posts, and my own scraping from the [forum](http://moi3d.com/forum/), studying scripts from MoI, observations from scripts, and community contributions. The content is created in good faith, but errors, some guessing, and biased observations may occur.


This page is dedicated to the vanilla JavaScript API in MoI and it complements the documentation on the PluginSDK. The PluginSDK is not an official part of MoI it's just a user contributed an additional javascript layer to help plugin development.

# Understanding Objects and Documents

A sketch is made up of objects. Objects represent geometry (shapes, curves, surfaces, etc ) and other assets like text, construction lines, images, etc.

The [`moi.geometryDatabase`](#GeometryDatabase) is the interface used to obtain and manipulate objects in a sketch, you can think of it as the actual document.

We add and remove objects from the `moi.geometryDatabase` using methods like `addObject()`, `addObjects()`, `removeObject()` and `removeObjects()`. 

See section [GeometryDatabase](#GeometryDatabase) for more details.

We use [factories](#GeometryFactory) to create objects in the `geometryDatabase`. 

Manipulating objects from the `moi.geometryDatabase` is mainly done in a collection known as a [`GeometryObjList`](#GeometryObjList). As the name implies it is a native object (MoiObject) that holds objects.

The property `ObjectList.length` indicates the number of items in the list and we use `ObjectList.item(idx)` to access an object in the list. The first item in the collection is at index 0. 

See [ObjectList](#GeometryObjList) for more details.



# Object Selection

## Obtain a GeometryObjList of all selected objects.

```js
var objects = moi.geometryDatabase.getSelectedObjects();
```

This function returns a [`GeometryObjList`](#GeometryObjList).

## Filter a GeometryObjList.

Filter a `GeometryObjList` by object types using one of the following `getConstructionLines()`, `getCurves()`, `getSolids()`, `getBReps()`, `getFaces()`, `getPoints()`, `getEdges()`, `getOpenBReps()`, `getStandaloneCurves()`, `getTopLevelObjects()`. These functions returns a [`GeometryObjList`](#GeometryObjList).

```js
var selectedObjects = moi.geometryDatabase.getSelectedObjects();
var objects = selectedObjects.getCurves();
```


## Deselect items.

```js
moi.geometryDatabase.deselectAll();
```

## Select a given type of items.

```js
moi.selection.setFilter( 'Types', 'Curves', true );
var objects = moi.geometryDatabase.selectAll();
moi.selection.clearSelectionFilters();
```


# Point 

The coordinates of the `Point` are accessed with the float properties `Point.x`, `Point.y` and `Point.z`  

`Point.set(x, y , z)`
<p>Changes the points coordinates</p>

`Point.scale(factor)`
<p>Scales the point by the given factor.</p>

`Point.toString(numDecimals = -1)`
<p>Returns the string representation of a point.</p>

`Point.add(aPoint)`
<p>Adds a point?</p>




# GeometryDatabase

The `moi.geometryDatabase` is the interface used to obtain and manipulate objects in a sketch, you can think of it as the actual document.


## Adding and removing objects to the document.

Add or remove a single object using `addObject` and `removeObject`:

`moi.geometryDatabase.addObject(GeometryObj)`<br>
`moi.geometryDatabase.removeObject(GeometryObj)`<br>


Add or remove a group of objects using `addObjects` and `removeObjects`:

`moi.geometryDatabase.addObjects(GeometryObjList)`<br>
`moi.geometryDatabase.removeObjects(GeometryObjList)`<br>

## Exporting the document

```js
// Different possible semi-colon delimited options:
// NoUI=true
// Angle=12.0
// Output=ngons | quads | triangles
// MaxLength=0.0
// MaxLengthApplyTo=curved | planes | all
// MinLength=0.0
// AspectRatio=0.0
// Weld=true
// Display=shadedwithedges | shadednoedges | wireframe
// ExpandedDialog=false

var options = 'NoUI=true;Angle=6';

moi.geometryDatabase.fileExport( g_Directory + filename + '.stl', options );
```

## Importing a file into the document.

```js
moi.geometryDatabase.fileImport( strFilePath, true );
```

# GeometryObjList

A collection of objects.

`ObjectList.length`
<p>**Property** **Integer** The number of items in the list.</p>

`ObjectList.item(idx)`
<p>Returns an object at the given integer index. The first item is at index 0.</p>

`ObjectList.clear()`
<p>Removes objects on the list.</p>

`ObjectList.setProperty(propName, aValue)`
<p>Change a given property for all items in the `ObjectList`.</p>

`ObjectList.addObject(anObj)`
<p>Insert an object into the object list.</p>

`ObjectList.removeObject(anObj)`
<p>Removes the given object from the object list.</p>

`ObjectList.removeObjectAt(idx)`
<p>Removes the object at the given index from the object list.</p>


`ObjectList.getBReps()`

Returns a new <a href="#_ObjectList">ObjectList</a> containing only the [BRep](https://en.wikipedia.org/wiki/Boundary_representation) objects contained in the list.


`ObjectList.getBoundingBox()`

<p> Returns the smallest <a href="#_BoundingBox">BoundingBox</a> containing all of the objects in the
list.
</p>

`ObjectList.getConstructionLines()`

<p> Returns a new <a href="#_ObjectList">ObjectList</a> containing only the <a href="#_ConstructionLine">ConstructionLine</a> objects
contained in the list.
</p>

`ObjectList.getCurves()`

<p> Returns a new <a href="#_ObjectList">ObjectList</a> containing only the <a href="#_Curve">Curve</a> objects contained in the list.</p>



| Property | Description |
| --- | --- |
| `ObjectList.numCurves` | |
| `ObjectList.numBReps` | |
| `ObjectList.numConstructionLines` | |
| `ObjectList.numEdges` | |
| `ObjectList.numSolids` | |
| `ObjectList.numStandaloneCurves` | |
| `ObjectList.numFaces` | |
| `ObjectList.numOpenBReps` | |
| `ObjectList.numPoints` | |


# GeometryFactory

The `GeometryFactory` is a generic object that provides a common and abstracted api to create geometry objects in MoI.

## Managing input parameters

Parameters used by the factory are represented as enumerated inputs. The first input is at index 0 and the last one is `GeometryFactory.numInputs - 1`.


Set the value of an input with:<br>
`GeometryFactory.setInput(inputIdx, anyValue)`

Unsets the value of a given input with:<br>
`GeometryFactory.clearInput(inputIdx)`


Remove last input! Useful when multiple optional inputs are required, for example in "DoCurve.js" it is used to remove points from the input.

`GeometryFactory.removeLastInput()`


When the input parameter is a list we use `addToListInput` instead of `setInput`.

`GeometryFactory.addToListInput(inputIdx, anyValue)`
 
 For example:

```js
var isoinfo = moi.createList();
isoinfo.add( pointpicker.pt );
isoinfo.add( moi.ui.commandUI.isodir.value );
factory.addToListInput( 6, isoinfo );		
```

### Input proxies

`GeometryFactoryInput inputProxy = GeometryFactory.getInput(inputIdx)`

Returns null or `GeometryFactoryInput` proxy object, which implements the methods `GeometryFactoryInput.setValue(anyValue)` and `GeometryFactoryInput.getValue(anyValue)`.

We use input proxies to bind a factory input to a picker or others.


## Getting the factory output

```js
var createdObjList = GeometryFactory.calculate();
```

Updates the factory based on its inputs and return an ObjectList with the objects created.

## Add factory object to the moi.geometryDatabase

```js
GeometryFactory.update();
GeometryFactory.commit();
```

To add the objects created directly to `moi.geometryDatabase` you must call `GeometryFactory.update()` before producing the actual objects with `GeometryFactory.commit()`.

## Cancel the factory 

`GeometryFactory.cancel()`

Cancels the object creation and disposes the factory.

## Misc methods and properties

`GeometryFactory.disableUpdate(boolState)`
No idea, used in Sweep.js. It seems to be associated with disabling updates from when inputs are binded to ui widgets.



## Properties

| Property | Description |
| --- | --- |
| `GeometryFactory.name` | string, read-only |
| `GeometryFactory.numInputs` | int, read-only |

Methods
Name	Result	Arguments
addToListInput		
int whichInput,
any value
calculate	ObjectList	
cancel		

commit		
createInput		
string inputType
createInputType		
FactoryInputEnum type
disableUIGeometry		
disableUpdate		
boolean varSuppress
getInput	GeometryFactoryInput	
int whichInput
removeLastInput		
reset		
setInput		
int whichInput,
any value
update		


# Command #



We can pass parameters after a command name:

```js
moi.command.execCommand( 'importpart ' + file);
```

The command can read the parameter string using `getCommandLineParams`:

```js
var params = moi.command.getCommandLineParams();
```

> **Trick:** MoI will take the value of any parameter that matches the Id of an HTML control and set the control value to that value.<br><br>`"mycomand param1=value" `



## Storing and getting options:

```js

var myOptions = { size: 13, color: "red" };

moi.command.setOption('myOptions', JSON.stringify(myOptions), true);

try  { 
	strData = moi.command.getOption('myOptions', true); 
	if(strData){
		myOptions = JSON.parse(strData);
	}
} catch (e) {};
```

To document:

```js
moi.command.setCommandSpecificUndo( true );
var params = moi.command.getCommandLineParams();
```

# FileSystem #

> **WARNING** All paths returned by MoI's API are Windows paths, to write crossplatform code you have to pass those by `moi.filesystem.toNativePath()`.

.readLine() - reads a line of text from the stream, the text is the return value of the function.

.writeLine( text ) - writes a line of text to the stream.

.atEOF property - returns true if the stream is at the end with nothing more to read from it.

.close() - closes the stream.

.setWriteBOM( ) - sets whether to write the byte order mark at the front of the text file, default is no BOM.

.setCodec( name ) - controls the encoding to use for reading or writing. Supported codecs are listed here: http://doc.qt.io/qt-5/qtextcodec.html#details .


moi.filesystem.shellExecute(), added wait for finished parameter.

```js
var res = moi.filesystem.shellExecute( path, params, wait );
```
If wait is true the function will wait for execution to finish, else it will return immediately. Use the integer property `res.exitCode` of the result to check the exit code of the process. Use the string property `res.output` of the result to get process output.



```js
var currFile = moi.geometryDatabase.currentFileName;
var filePath = moi.filesystem.toNativePath(currFile);
var fileShortPath = moi.filesystem.getCompactPath( currFile, 29 );
var fileName = moi.filesystem.getFileNameFromPath(filePath);

var aPath = moi.filesystem.getProcessDir();
var aPath = moi.filesystem.getCommandsDir();

var aBool = moi.filesystem.dirExists(aPath);
var aBool = moi.filesystem.fileExists(filePath);


//In MacOs getAppDataDir() produces a Windows path like "z:\Users\ctk\Library\Application Support\Moi\".
var appDataPath = moi.filesystem.getAppDataDir(); //Incorrect
var appDataPath = moi.filesystem.toNativePath(moi.filesystem.getAppDataDir()); //Incorrect

moi.filesystem.copyFile(aPathSrc, aPathDest);
moi.filesystem.deleteFile(aPath);

var files = moi.filesystem.getFiles(aPath, '*.js' );
for ( var i = 0; i < files.length; ++i ){
	var file files.item(i);
}

var filename = moi.filesystem.getSaveFileName( 'Text file name', 'Text files (*.txt)|*.txt' );

var outfile = moi.filesystem.openFileStream( filename, 'w' );
outfile.writeLine( sOut );
outfile.close();

var fHndl = moi.filesystem.openFileStream( filename, 'r' );
var sText = '';
while ( !fHndl.AtEOF ){
	sText += fHndl.readLine();
}
fHndl.close();


```

# PointPicker

The **PointPicker** allows you to prompt the user to select a point or points.

```js
var pointpicker = moi.ui.createPointPicker();

pointpicker.disableStraightSnap = true;
pointpicker.disableObjectSnap = true;
pointpicker.enableOnObjectSnap = true;
pointpicker.allowMidObjectSnap = true;
pointpicker.disableTanPerpObjectSnap = true;
pointpicker.resetOnMouseLeave = true;




//pointpicker.restrictToObject( face );

if ( pointpicker.controlDown ){
	//ctrl was pressed
}
```

# Snaps

```js
var pointpicker = moi.ui.createPointPicker();

pointpicker.clearSnapPoints();
pointpicker.clearCurrentSnaps();

pointpicker.addSnapPoint( aPoint , strALabel );

```

# PointPicker Callbacks

```js
pointpicker.bindFunc(fnCallback);
```
The signature of the callback function is:

```js
function myCallback( pointpicker ){
 	//My code...
}
```

```js
pointpicker.bindFuncPostUpdate(fnCallback);

pointpicker.bindResultPt( factory.getInput(2) );

```

## Select a point

```js
var pointpicker = moi.ui.createPointPicker();
if ( !GetPoint( pointpicker ) ) return;
var aPoint = pointpicker.pt;	


function GetPoint( pointpicker ){
	while ( 1 ){
		if ( !pointpicker.waitForEvent() ) return false;
			
		if ( pointpicker.event == 'finished' ) break;
	}
	
	return true;
}
```

## Select multiple points

```js
var pointpicker = moi.ui.createPointPicker();
var points = GetPoints( pointpicker );
if(!points.length) return;

var aPoint = points[0]; //first point...

function GetPoints( pointpicker ){
	out = [];
	while ( 1 ){	
		if ( !pointpicker.waitForEvent() ) return out;
	
		if ( pointpicker.event == 'finished' ){
			out.push(pointpicker.pt);
			continue;
		}
		
		if ( pointpicker.event == 'cancel' ){
			return [];
		}
		if( pointpicker.event == 'done' ){
			break
		}
		
	}
	
	return out;
}
```

to sort out...

Update PointPicker script properties so a script can tell if there is a straight snap currently active.

Added pointpicker.hasBasePt , pointpicker.hasStraightSnap , pointpicker.straightSnapDir read only properties.
This makes it possible to do a "direction lock" shortcut key:
var pp = moi.ui.getActivePointPicker(); if ( pp && pp.hasStraightSnap ) { pp.restrictToLinePtDir( pp.basePt, pp.straightSnapDir, true ); }



# UI #

The underlying UI in MoI is provided by QT. If your are curious here are some good references for more advanced QT topics relating to MoI:

- Styling QT Widgets with [Fusion Styles](https://doc.qt.io/qt-5/qtquickcontrols2-fusion.html).
- Documentation on [QT WebView](https://qtwebkit.github.io/doc/qtwebkit/qwebpage.html).
- Javascript and C++ [bridging](https://qtwebkit.github.io/doc/qtwebkit/qtwebkit-bridge.html) in Qt.


## Opening a new Window ##


> In order to set the size of a window we have to set the option `resizeable`.




# Sketch Views

MoI UI displays a view in different modes. A view can have one of these modes "3D", "Right", "Left", "Top", "Bottom", "Front", "Back" or "Split".


The active view is referenced by `moi.ui.mainWindow.viewpanel`.


We change the mode using the string property `moi.ui.mainWindow.viewpanel.mode`.

Each mode becomes a ViewPort and MoI can display up to 4 views when the "Split" mode is active.

```js
var strMode = moi.ui.mainWindow.viewpanel.mode;

var objViewPort = moi.ui.mainWindow.viewpanel.getViewport('3D');

var objViewPort = moi.ui.getViewportUnderMouse(); 
if ( viewport ){
	//do something...
}

var strName = moi.ui.mainWindow.viewpanel.getViewport('Right').name;

```

## Change and update the viewports

```js

var viewPanel = moi.ui.mainWindow.viewpanel;
var vname = "Top";

viewPanel.mode = vname;

//Found this in some script not sure what is reverseView()?
//Probably due to the duality of this view ie "Front/Back", "Top/Bottom"?
if ( viewPanel.getViewport(vname).name != vname ) viewPanel.reverseView( vname );


moi.ui.redrawViewports();
```

## Viewport manipulation:

```js
//Move the camera...
var objViewPort = moi.ui.mainWindow.viewpanel.getViewport('3D'); 
objViewPort.cameraPt = moi.vectorMath.createPoint(50.2, 30.5, 10.1);


//Get current frames
var frame = objViewPort.cameraFrame;
var frame objViewPort.targetFrame;

var a = objViewPort.tiltAngle; //writable property

objViewPort.reset(); 

objViewPort.zoom(2); //1,2,..? whats the range

//View front
objViewPort.setAngles( 90, 0 );


//Change Projection
var isPerspective = (objViewPort.projection == 'Perspective');
var isParallel = (objViewPort.projection == 'Parallel');

objViewPort.projection = 'Perspective';

```

## Setup temporary hotkeys

```js
var hotkeys = ["1", "2", "3", "4", "5", "6"];
for ( var i in hotkeys ){
	moi.command.registerCommandSpecificShortcutKey(hotkeys[i]);
}

while ( true ){
	moi.ui.commandDialog.waitForEvent();
	var e  = moi.ui.commandDialog.event;
	if( e == "1" ){
		moi.ui.alert("A local hotkey was pressed!");
	}

	if ( e == 'cancel' ) { 
		moi.ui.commandUI.cancel(); 
		return; 
	}else if ( e == 'done' ) { 
		moi.ui.commandUI.done(); 
		return; 
	}
}
```

> Note: `registerCommandSpecificShortcutKey` only works if we have a UI.


## CommandUI


> IMPORTANT: `moi.ui.commandUI` only exists if we have an HTML UI for our command.


Access the [HTMLDocument](http://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) of your UI:

```js
var htmlDocument = moi.ui.commandUI.document;

```

Global variables in the UI's HTML are accessed in your javascript with the object  `moi.ui.commandUI`. For example, if in your html you have something like:

```html
<script>
	var g_size = 10;
</script>
```

Then in your javascript, you can access `g_size` as `moi.ui.commandUI.g_size`.



# MoiWindow


Inside your HTML the global variable `moiWindow` is MoI's object with the API to manipulate the window.

> Do not confuse `moiWindow` with javascript's `window`. `moiWindow` is an exposed QT object meant to handle the window created in QT.

## Manage the window state

```js
moiWindow.close();
```

```js

moiWindow.maximize();

//Need more research? Note these only seem to work for content in `commandUI`
//will revert to the original window size if `isMaximized`.
moiWindow.minimize(); 

moiWindow.restore(); ???
```

```js
var aBool = moiWindow.isMaximized;
var aBool = moiWindow.isMinimized;
var aBool = moiWindow.isClosed;
var aBool = moiWindow.isRestored;
```

## MoiHTMLWindow

HTML can be presented in a `MoiHTMLWindow` as a dialog (`moi.ui.createDialog()`), as a menu (`moi.ui.showMenu()`), or from the html file of a command (`moi.ui.commandDialog`).


The [HTMLDocument](http://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument) is exposed by the property `MoiHTMLWindow.htmlDocument`. The [DOM Window](http://developer.mozilla.org/en-US/docs/Web/API/Window) is exposed by the property `MoiHTMLWindow.htmlWindow`. Both of this properties are homolugus to the javascript `document` and `window`.

The property `MoiHTMLWindow.window` is your instance of the [`moiWindow`](#MoiWindow).

## Modal Dialog

You can present your HTML content and wait for the content to be dismissed using `moiWindow.doModal()`.

The function `doModal()` will block the execution of the code until a corresponding call to `moiWindow.endDialog(anyReturnValue)` is called.

Use `moiWindow.endDialog(anyReturnValue)` to close the current MoiHTMLWindow. Pass the return value in anyReturnValue (use -1 to indicate dialog was canceled).

The return value will be returned by `aValue = moiWindow.doModal()`.


To research...

```js
var aBool = moiWindow.canChangeMaximizedSize();
```

To sort....


## moi.ui.createDialog()

| Parameter | Description |
| --- | --- |
| resizeable | |
| fixedHeight | |
| defaultWidth | Numeric, initial width of window. |
| defaultHeight | Numeric, initial height of window. |



v5 beta work by Michael Gibson to manipulate edit points:


```
Edit points scripting - Add scripting interface on objects for:
    obj.hasEditPoints - read-only property true if object has edit points, false if not.
    obj.hasSelectedEditPoints - read-only property true if object has any selected edit points.
    obj.numEditPoints - read-only property for number of edit points.
    obj.getEditPoint( index ) - method that returns an x,y,z point for the given edit point index.
    obj.getEditPointSelected( index ) - method that returns true if the given edit point is selected.

There may not be enough stuff in there yet for editing the points though, you would need to select it and then use the Move factory to create a new object with a moved point. Although you can read selection currently there isn't a set selection yet.
```


canvas does work though, but I have SVG disabled.

Perhaps I've found a bug, If I use this script - script: /* Toggle browser pane on/off */ moi.ui.showBrowserPane = !moi.ui.showBrowserPane; or this- script: /* Toggle between opposite and inline browser modes */ moi.ui.browserPosition = (moi.ui.browserPosition == 'Inside' ? 'Opposite' : 'Inside');





moi.ui.findElement( 'id' ) looks through all UIPanels for any element with the given id. Returns the element or null if not found.


moiWindow.contentChanged();
/Volumes/Macintosh HD/Applications/MoI v4.app/Contents/Resources/commands/Fillet.htm
```js
var html = '<html>\
	<style>\
		.leftspan { width:2em; margin-left:0.75em; display:inline-block; }\
		.removebtn { padding: 0.15em; width:1.1em; height:1.1em; visibility:hidden; }\
		.removebtn > img { width:100%; height:100%; vertical-align:top; }\
		.linetr:hover .removebtn { visibility:visible; }\
	</style>\
	<body class="MenuBody">\
		<moi:FlyoutHeader/>\
		<moi:MenuItem style="color:inherit; border-bottom:1px solid #ccc" oninit="this.disabled = true;">\
			<span class="leftspan">#</span><span><moi:Text textid="Radius button"/></span>\
		</moi:MenuItem>\
		<table style="width:100%;" cellpadding="0" cellspacing="0"><col><col width="10">';

for ( var i = 0; i < FilletSets.length; ++i )
	html += '<tr class="linetr"><td><moi:MenuItem' + (i == CurrentIndex ? ' oninit="this.checked = true;"' : '') + ' onclick="moiWindow.endDialog(' + i + ');"' + '><span class="leftspan">' + (i+1) + '</span><span>' + (FilletSets[i] >= 0.0 ? moi.ui.formatCoordinate(FilletSets[i]) : '') + '</span></moi:MenuItem></td><td style="vertical-align:middle;">' + (i != 0 ? '<moi:SmallCloseWindowButton class="removebtn" onclick="moiWindow.endDialog(' + (-1 - i) + ');"/></td></tr>' : '');

html += '</table></body></html>';
				
var menu = moi.ui.showMenu( html, currentset, 0, 0 );

return menu.window.doModal();
```

Search all children and return an item with that name or null if none present.

sceneBrowser.objects, sceneBrowser.types, and sceneBrowser.styles
 
```js
var item = moi.ui.sceneBrowser.styles.find('Blue');
```

Modify an item.
```js
var item = moi.ui.sceneBrowser.styles.find('Blue');
if(item){
	//alter the selection dot of an item.
	item.select("toggle"); //Mode can be one of 'toggle','select','deselect','filteron','filteroff'.
	
	//alter the status area of an item, that's the one with the eye icon.
	item.alterStatus(show);  //Mode can be one of 'show','hide','lock','unlock'.
	
	
	//select() and alterStatus() both have a second boolean argument. When passed with true, the change is treated as if triggered by an actual click
}
```


Scene browser scripting - Added script access to scene browser items so it is possible to make a startup script that expands sections on program startup. To do that put the following in a .js file in your Moi appdata
```js

 //sceneBrowser.objects, sceneBrowser.types, and sceneBrowser.styles

var items = moi.ui.sceneBrowser.rootItems;
for ( var i = 0; i < items.length; ++i )
	items[i].expanded = true;
	
```



win.getPosition()

var rc = moi.ui.getScreenRect(moi.ui.sidePane);
options.moiWindow.move(rc.right,rc.top);

Update scripting - window moving and sizing methods.
Add window positioning methods:
win.move( x, y ); - move the window to the given x,y screen coordinates. Can be given either one argument of an object with x,y properties, or 2 numeric arguments.
win.resize( width, height ) - resize the client area of a window to the given width and height. Can be given either one argument with x,y or width,height properties, or 2 numeric arguments.
win.getPosition() - returns an object with .x and .y properties for the window's screen coordinates.
win.getSize() - returns an object with .width and .height properties for the window's client area width and height.
win.getFrameSize() - returns an object with .width and .height properties for the window frame's width and height.
Also added moi.ui.getScreenRect( element ) which will give the screen coordinates of the given element or UIPanel. Returns an object with .left, .top, .right, .bottom, .width, and .height properties.
Example - increase the Options dialog width by 10 pixels:
var uipanel = moi.ui.getUIPanel( 'moi://ui/options.htm' );
if ( uipanel )
{
	var dlg = uipanel.moiWindow;
var pos = dlg.getSize(); pos.width += 10; dlg.resize( pos );
}
Example - position the Options dialog to the right of the side pane:
var options = moi.ui.getUIPanel( 'moi://ui/options.htm' );
if ( options )
{
	var rc = moi.ui.getScreenRect(moi.ui.sidePane);
	options.moiWindow.move(rc.right,rc.top);
}

```js
/* Set property panel units display */ 
var sp = moi.ui.sidePane; 
sp.g_PropPanelUnits = (sp.g_PropPanelUnits == 'Inches' ? '' : 'Inches'); 
sp.UpdatePropertiesPanel();
```

