script:var a = moi.command.lastCommandRevisionStart; var b = moi.command.lastCommandRevisionEnd; var objects = moi.geometryDatabase.getObjects(); for ( var i = 0; i < objects.length; ++i ) { var obj = objects.item(i); if ( obj.databaseRevision> a && obj.databaseRevision <= b ) obj.selected = true; }