**TOPICS** - [API](doc_moi_api.md) - [Scripting MoI](doc_scripting.md)


# Understanding Objects and Documents

A sketch is made up of objects. Objects represent geometry (shapes, curves, surfaces, etc ) and other assets like text, construction lines, images, etc.

The [`moi.geometryDatabase`](doc_moi_geometrydb.md#GeometryDatabase) is the interface used to obtain and manipulate objects in a sketch, you can think of it as the actual document.

We add and remove objects from the `moi.geometryDatabase` using methods like `addObject()`, `addObjects()`, `removeObject()` and `removeObjects()`. 

See section [GeometryDatabase](doc_moi_geometrydb.md#GeometryDatabase) for more details.

We use [factories](doc_moi_factories.md#GeometryFactory) to create objects in the `geometryDatabase`. 

Manipulating objects from the `moi.geometryDatabase` is mainly done in a collection known as a [`GeometryObjList`](#GeometryObjList). As the name implies it is a native object (MoiObject) that holds objects.

The property `ObjectList.length` indicates the number of items in the list and we use `ObjectList.item(idx)` to access an object in the list. The first item in the collection is at index 0. 

See [ObjectList](doc_moi_geometrydb.md#GeometryObjList) for more details.


## Sketch objects

See [GeometryDatabase](doc_moi_geometrydb.md#GeometryDatabase).<br>
See [ObjectList](doc_moi_geometrydb.md#GeometryObjList).<br>


## Creating objects with Factories

See [GeometryFactory](doc_moi_factories.md#GeometryFactory).<br>
See [Moi V4 Factories](doc_moi_factories.md#geometry-factories).<br>


<br><br><hr>
# Executing Commands #

We can invoke MoI's commands and user's commands from javascript. Instead of a command name you can also pass a moi url to the javascript file.

```js
moi.command.execCommand( strCommandName );
```

We can pass parameters after a command name:

```js
moi.command.execCommand( 'importpart ' + file);
```

The command can read the parameter string using `getCommandLineParams`:

```js
var params = moi.command.getCommandLineParams();
```

> **Trick:** MoI will take the value of any parameter that matches the Id of an HTML control and set the control value to that value.<br><br>`"mycomand param1=value" `

