script: /* Separate object name */ var Objects = moi.geometryDatabase.getObjects(); var Names = new Object(); for ( var i = 0; i < Objects.length; ++i ) { var Obj = Objects.item(i); if ( Obj.name == '' ) { continue; } if ( !Names[Obj.name] ) { Names[Obj.name] = new Array(); } Names[Obj.name].push( Obj ); } for ( var Name in Names ) { if ( Names[Name].length == 1 ) { continue; } for ( var i = 0; i < Names[Name].length; ++i ) { Names[Name][i].name = Name + '_' + (i+1); } }