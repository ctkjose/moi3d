// config: norepeat

#include "GetObjects.js"
#include "GetObject.js"
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

function UnLerp( t, low, high )
{
	return (t - low)/(high - low);
}

function MakeRGB32( rgb )
{
	return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}

function CreateGradientStylesAlongPath()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )
		return false;

	var objs = objectpicker.objects;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectObjectsPrompt' );
	moi.ui.showUI( 'SelectPathPrompt' );
	moi.ui.endUIUpdate();

	objectpicker.allowCurves();
	if ( !GetObject( objectpicker ) )
		return false;

	var pathcrv = objectpicker.objects.item(0);

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPathPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();

	if ( !WaitForDialogDone() )
		return;

	var StartColor = [ moi.ui.commandUI.start_h.value, moi.ui.commandUI.start_s.value, moi.ui.commandUI.start_v.value ];
	var EndColor = [ moi.ui.commandUI.end_h.value, moi.ui.commandUI.end_s.value, moi.ui.commandUI.end_v.value ];

	for ( var i = 0; i < objs.length; ++i )
	{
		var obj = objs.item(i);

		var cen = obj.getBoundingBox().center;

		var crvparam = pathcrv.dropPoint( cen );

		var t = UnLerp( crvparam, pathcrv.domainMin, pathcrv.domainMax );

		var h = Lerp( t, StartColor[0], EndColor[0] ) / 360;
		var s = Lerp( t, StartColor[1], EndColor[1] ) / 100;
		var v = Lerp( t, StartColor[2], EndColor[2] ) / 100;

		var rgb = hsvToRgb( h, s, v );

		var style = moi.geometryDatabase.addStyle();
		style.color = MakeRGB32( rgb );
		style.name = style.hexColor;

		obj.styleIndex = style.index;
	}
}

CreateGradientStylesAlongPath();
