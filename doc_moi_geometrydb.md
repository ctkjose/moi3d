**TOPICS** - [API](doc_moi_api.md) - [GeometryObjList](#GeometryObjList) - [Object Selection](#object-selection)


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

| Member | Description |
| --- | --- |
| `ObjectList.length` | **Property** **Integer** The number of items in the list. |
| `ObjectList.item(idx)` | Returns an object at the given integer index. The first item is at index 0. |
| `ObjectList.clear()` | Removes objects on the list. |
| `ObjectList.setProperty(propName, aValue)` | Change a given property for all items in the `ObjectList`. |
| `ObjectList.addObject(anObj)` | Insert an object into the object list. |
| `ObjectList.removeObject(anObj)` | Removes the given object from the object list. |
| `ObjectList.removeObjectAt(idx)` | Removes the object at the given index from the object list. |
| `ObjectList.getBReps()` | Returns a new <a href="#_ObjectList">ObjectList</a> containing only the [BRep](https://en.wikipedia.org/wiki/Boundary_representation) objects contained in the list. |
| `ObjectList.getBoundingBox()` | Returns the smallest <a href="#_BoundingBox">BoundingBox</a> containing all of the objects in the list. |
| `ObjectList.getConstructionLines()` | Returns a new <a href="#_ObjectList">ObjectList</a> containing only the <a href="#_ConstructionLine">ConstructionLine</a> objects contained in the list. |
| `ObjectList.getCurves()` | Returns a new <a href="#_ObjectList">ObjectList</a> containing only the <a href="#_Curve">Curve</a> objects contained in the list.</p>
| `ObjectList.numCurves` | **Property** **Integer** |
| `ObjectList.numBReps` | **Property** **Integer** |
| `ObjectList.numConstructionLines` | **Property** **Integer** |
| `ObjectList.numEdges` | **Property** **Integer** |
| `ObjectList.numSolids` | **Property** **Integer** |
| `ObjectList.numStandaloneCurves` | **Property** **Integer** |
| `ObjectList.numFaces` | **Property** **Integer** |
| `ObjectList.numOpenBReps` | **Property** **Integer** |
| `ObjectList.numPoints` | **Property** **Integer** |



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

