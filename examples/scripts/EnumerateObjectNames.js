script: /* Enumerate object names */
var selected_objects = moi.geometryDatabase.getSelectedObjects();
var all_objects = moi.geometryDatabase.getObjects();
var matched_names = new Object();
var selected_names = new Object ();
// if no objects are selected then update all objects
if (selected_objects.length == 0)
{ 
    for ( var i = 0; i < all_objects.length; i++ )
    {
        var obj = all_objects.item(i);
        if ( obj.name == '' ) { continue; }
        if ( !matched_names[obj.name] )
        {
            matched_names[obj.name] = new Array();
        }
        matched_names[obj.name].push( obj );
    }
}
// if there is a selection then use that to dictate which names to search for and update
else
{
    for ( var j = 0; j < selected_objects.length; j++ )
    {
        var name = selected_objects.item(j).name;
        if ( name == '') { continue; }
        if (! selected_names[name] )
        {
            selected_names[name] = 0
        }
        selected_names[name]++;
    }
    for ( var name in selected_names)
    {
        var search_objects;
        if (selected_names[name] == 1)
        {
            // if there is only one name selected then update all objects with this name
            search_objects = all_objects;
        }
        else
        {
            // if there are multiple of the same name selected then only update those in the selection
            search_objects = selected_objects;
        }
        matched_names[name] = new Array ();
        for ( var i = 0; i < search_objects.length; i++ )
        {
            var obj = search_objects.item(i);
            if ( obj.name == '' ) { continue; }
            if ( obj.name == name )
            {
                matched_names[obj.name].push( obj );
            }
        }
    }
}
// update the matched objects
for ( var name in matched_names )
{
    if ( matched_names[name].length == 1 ) { continue; }
    var num_names = matched_names[name].length;
    var digits = Math.floor (Math.log(num_names)/Math.log(10))+1;
    var zeros = "0000000000000000";
    for ( var i = 0; i < num_names; i++ )
    {
        var padded_num = zeros + (i+1).toString ();
        matched_names[name][i].name = name + ' ' + padded_num.slice (-digits);
    }
}