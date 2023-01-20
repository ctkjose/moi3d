#include "WaitForDialogDone.js"

// From:  https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v){
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

function Lerp( t, low, high )
{
	return low + ((high - low) * t);
}

function MakeRGB32( rgb )
{
	return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}

function GetObject( objectpicker )
{
	objectpicker.min = objectpicker.max = 1;
	objectpicker.disableWindowing();

	while ( 1 )
	{
		if ( !objectpicker.waitForEvent() )
			return null;
			
		if ( objectpicker.event == 'finished' )
		{
			objectpicker.objects.lockSelection();
			break;
		}

		if ( objectpicker.event == 'done' && objectpicker.done() )
		{
			objectpicker.objects.lockSelection();
			break;
		}
	}

	if ( objectpicker.objects.length != 1 )
		return null;

	return objectpicker.objects.item(0);
}



function CreateGradientStyles()
{
	moi.ui.beginUIUpdate();
	moi.ui.endUIUpdate();

	var objectpicker = moi.ui.createObjectPicker();

	StartObj = GetObject( objectpicker );
	if ( !StartObj )
		return;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'StartPrompt' );
	moi.ui.showUI( 'EndPrompt' );
	moi.ui.endUIUpdate();

	EndObj = GetObject( objectpicker );
	if ( !EndObj )
		return;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'EndPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();

	if ( !WaitForDialogDone() )
		return;

	var StartColor = [ moi.ui.commandUI.start_h.value, moi.ui.commandUI.start_s.value, moi.ui.commandUI.start_v.value ];
	var EndColor = [ moi.ui.commandUI.end_h.value, moi.ui.commandUI.end_s.value, moi.ui.commandUI.end_v.value ];

	if ( !StartObj.name || !EndObj.name )
	{
		moi.ui.alert( 'Error - start or end object not named' );
		return;
	}

	// If startobj higher in alpha sort order than endobj, swap start/end.
	if ( StartObj.name > EndObj.name )
	{
		var tmpcolor = StartColor;
		StartColor = EndColor;
		EndColor = tmpcolor;

		var tmpobj = StartObj;
		StartObj = EndObj;
		EndObj = tmpobj;
	}

	// Get all named objects into an array and sort them by name.

	var objlist = moi.geometryDatabase.getObjects();

	var sorted_objs = [];
	for ( var i = 0; i < objlist.length; ++i )
	{
		var obj = objlist.item(i);
		if ( obj.name )
			sorted_objs.push( obj );
	}

	function sortfunc( a, b )
	{
		if ( a.name < b.name )
			return -1;
		else if ( a.name > b.name )
			return 1;
		else
			return 0;
	}

	sorted_objs.sort( sortfunc );
	
	var total = 0;
	for ( var i = 0; i < sorted_objs.length; ++i )
	{
		var obj = sorted_objs[i];
		if ( obj.name >= StartObj.name && obj.name <= EndObj.name )
			++total;
	}

	var count = 0;
	for ( var i = 0; i < sorted_objs.length; ++i )
	{
		var obj = sorted_objs[i];
		if ( obj.name >= StartObj.name && obj.name <= EndObj.name )
		{
			var t = count / (total-1);
			++count;

			var h = Lerp( t, StartColor[0], EndColor[0] ) / 360;
			var s = Lerp( t, StartColor[1], EndColor[1] ) / 100;
			var v = Lerp( t, StartColor[2], EndColor[2] ) / 100;

			var rgb = hsvToRgb( h, s, v );

			var style = moi.geometryDatabase.addStyle();
			style.color = MakeRGB32( rgb );
			style.name = obj.name;

			obj.styleIndex = style.index;			
		}
	}
}

CreateGradientStyles();
