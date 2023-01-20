// config: norepeat

#include "GetObjects.js"

function DoCircumcenter()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var lines = objectpicker.objects;

	var vm = moi.vectorMath;
	var circlefactory = moi.command.createFactory( 'circle3pt' );

	for ( var i = 0; i < lines.length; ++i )
	{
		var LineA = lines.item(i);
		var A0 = LineA.getStartPt();
		var A1 = LineA.getEndPt();
		
		for ( var j = i+1; j < lines.length; ++j )
		{
			var LineB = lines.item(j);
			var B0 = LineB.getStartPt();
			var B1 = LineB.getEndPt();
			var HaveTri = false;
			var A, B, C;
			
			if ( vm.pointsWithinTolerance( A0, B0 ) )
			{
				A = A1;
				B = A0;
				C = B1;
				HaveTri = true;
			}
			else if ( vm.pointsWithinTolerance( A1, B0 ) )
			{
				A = A0;
				B = A1;
				C = B1;
				HaveTri = true;
			}
			else if ( vm.pointsWithinTolerance( A0, B1 ) )
			{
				A = A1;
				B = A0;
				C = B0;
				HaveTri = true;
			}
			else if ( vm.pointsWithinTolerance( A1, B1 ) )
			{
				A = A0;
				B = A1;
				C = B0;
				HaveTri = true;
			}
			
			if ( HaveTri )
			{
				// Got 2 legs of the triangle, making 3 points but look for a 3rd line to
				// complete it before making anything.
				
				for ( var k = j+1; k < lines.length; ++k )
				{
					var LineC = lines.item(k);
					var C0 = LineC.getStartPt();
					var C1 = LineC.getEndPt();
					
					if ( ( vm.pointsWithinTolerance( C0, A ) && vm.pointsWithinTolerance( C1, C ) )
						|| ( vm.pointsWithinTolerance( C0, C ) && vm.pointsWithinTolerance( C1, A ) ) )
					{
						circlefactory.setInput( 0, A );
						circlefactory.setInput( 1, B );
						circlefactory.setInput( 2, C );
						var circlelist = circlefactory.calculate();
						
						if ( circlelist.length == 1 )
						{
							var circle = circlelist.item(0);
							var pt = circle.getBoundingBox(true).center;
							
							var ptfactory = moi.command.createFactory( 'point' );
							ptfactory.setInput( 0, pt );
							ptfactory.commit();						
						}
					}
				}			
			}
		}
	}
}

DoCircumcenter();
