var hatchlineOffset = 1;

var objects = moi.geometryDatabase.getSelectedObjects();
var bbox = objects.getHighAccuracyBoundingBox();
var height = bbox.max.y - bbox.min.y

//Draw first hatch line
var factory = moi.command.createFactory( "line" );
factory.setInput( 0, moi.vectorMath.createPoint( bbox.min.x, bbox.max.y, 0 ) );
factory.setInput( 1, moi.vectorMath.createPoint( bbox.min.x - height, bbox.min.y, 0 ) );
factory.update();
var hatchline = factory.getCreatedObjects();
factory.commit();


//Hatch over object
var factory = moi.command.createFactory( "arraydir" );
factory.setInput( 0, hatchline );
factory.setInput( 2, moi.vectorMath.createPoint( bbox.min.x - height, bbox.min.y, 0 ) ); //BasePt
factory.setInput( 3, moi.vectorMath.createPoint( bbox.min.x - height + hatchlineOffset, bbox.min.y, 0 ) ); //OffsetPt
factory.setInput( 4, moi.vectorMath.createPoint( bbox.max.x, bbox.min.y, 0 ) ); //ExtentPt
factory.setInput( 5, 'Offset, Extent' ); //Mode
factory.update();
var hatchlines = factory.getCreatedObjects();
hatchlines.setProperty( 'name', "hatch lines" );
factory.commit();

//Trim hatch lines
var factory = moi.command.createFactory( 'booleanintersection' );
factory.setInput( 0, hatchlines );
factory.setInput( 1, objects );
factory.commit();

//Delete first hatch line
factory = moi.command.createFactory( 'delete' );
factory.setInput( 0, hatchline );
factory.commit();


//Draw first cross hatch line
var factory = moi.command.createFactory( "line" );
factory.setInput( 0, moi.vectorMath.createPoint( bbox.min.x - height, bbox.max.y, 0 ) );
factory.setInput( 1, moi.vectorMath.createPoint( bbox.min.x, bbox.min.y, 0 ) );
factory.update();
var crosshatchline = factory.getCreatedObjects();
factory.commit();


//Cross hatch over object
var factory = moi.command.createFactory( "arraydir" );
factory.setInput( 0, crosshatchline );
factory.setInput( 2, moi.vectorMath.createPoint( bbox.min.x, bbox.min.y, 0 ) ); //BasePt
factory.setInput( 3, moi.vectorMath.createPoint( bbox.min.x + hatchlineOffset, bbox.min.y, 0 ) ); //OffsetPt
factory.setInput( 4, moi.vectorMath.createPoint( bbox.max.x + height, bbox.min.y, 0 ) ); //ExtentPt
factory.setInput( 5, 'Offset, Extent' ); //Mode
factory.update();
var crosshatchlines = factory.getCreatedObjects();
hatchlines.setProperty( 'name', "hatch lines" );
factory.commit();

//Trim cross hatch lines
var factory = moi.command.createFactory( 'booleanintersection' );
factory.setInput( 0, crosshatchlines );
factory.setInput( 1, objects );
factory.commit();

//Delete first cross hatch line
factory = moi.command.createFactory( 'delete' );
factory.setInput( 0, crosshatchline );
factory.commit();

