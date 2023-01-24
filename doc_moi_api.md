
# Geometry Factories

See [GeometryFactory](#GeometryFactory) for an explanation of factories.

<table>
  <tr>
	<td class="toc"><a href="#factory-(.*)">addpoint</a></td>
	<td class="toc"><a href="#factory-(.*)">booleanunion</a></td>
	<td class="toc"><a href="#factory-(.*)">ellipsediameter</a></td>
	<td class="toc"><a href="#factory-(.*)">planarsrf</a></td>
	<td class="toc"><a href="#factory-(.*)">rotateaxis</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">align</a></td>
	<td class="toc"><a href="#factory-(.*)">box</a></td>
	<td class="toc"><a href="#factory-(.*)">extend</a></td>
	<td class="toc"><a href="#factory-(.*)">plane</a></td>
	<td class="toc"><a href="#factory-(.*)">scale</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">alignbackgroundimage</a></td>
	<td class="toc"><a href="#factory-(.*)">box3pts</a></td>
	<td class="toc"><a href="#factory-(.*)">extrude</a></td>
	<td class="toc"><a href="#factory-(.*)">plane3pts</a></td>
	<td class="toc"><a href="#factory-(.*)">scale1d</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arc3pt</a></td>
	<td class="toc"><a href="#factory-(.*)">boxcenter</a></td>
	<td class="toc"><a href="#factory-(.*)">fillet</a></td>
	<td class="toc"><a href="#factory-(.*)">planecenter</a></td>
	<td class="toc"><a href="#factory-(.*)">scale2d</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arccenter</a></td>
	<td class="toc"><a href="#factory-(.*)">chamfer</a></td>
	<td class="toc"><a href="#factory-(.*)">flip</a></td>
	<td class="toc"><a href="#factory-(.*)">point</a></td>
	<td class="toc"><a href="#factory-(.*)">separate</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arccontinue</a></td>
	<td class="toc"><a href="#factory-(.*)">circle</a></td>
	<td class="toc"><a href="#factory-(.*)">helix</a></td>
	<td class="toc"><a href="#factory-(.*)">polygon</a></td>
	<td class="toc"><a href="#factory-(.*)">shell</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arctangent</a></td>
	<td class="toc"><a href="#factory-(.*)">circle3pt</a></td>
	<td class="toc"><a href="#factory-(.*)">interpcurve</a></td>
	<td class="toc"><a href="#factory-(.*)">polygonedge</a></td>
	<td class="toc"><a href="#factory-(.*)">shrinktrimmedsrf</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arraycircular</a></td>
	<td class="toc"><a href="#factory-(.*)">circlediameter</a></td>
	<td class="toc"><a href="#factory-(.*)">intersect</a></td>
	<td class="toc"><a href="#factory-(.*)">polygonstar</a></td>
	<td class="toc"><a href="#factory-(.*)">sketchcurve</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arraycurve</a></td>
	<td class="toc"><a href="#factory-(.*)">circletangent</a></td>
	<td class="toc"><a href="#factory-(.*)">join</a></td>
	<td class="toc"><a href="#factory-(.*)">polyline</a></td>
	<td class="toc"><a href="#factory-(.*)">sphere</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arraydir</a></td>
	<td class="toc"><a href="#factory-(.*)">cone</a></td>
	<td class="toc"><a href="#factory-(.*)">line</a></td>
	<td class="toc"><a href="#factory-(.*)">project</a></td>
	<td class="toc"><a href="#factory-(.*)">sweep</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">arraygrid</a></td>
	<td class="toc"><a href="#factory-(.*)">copy</a></td>
	<td class="toc"><a href="#factory-(.*)">loft</a></td>
	<td class="toc"><a href="#factory-(.*)">railrevolve</a></td>
	<td class="toc"><a href="#factory-(.*)">text</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">backgroundimage</a></td>
	<td class="toc"><a href="#factory-(.*)">curve</a></td>
	<td class="toc"><a href="#factory-(.*)">merge</a></td>
	<td class="toc"><a href="#factory-(.*)">rect3pts</a></td>
	<td class="toc"><a href="#factory-(.*)">trim</a></td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">blend</a></td>
	<td class="toc"><a href="#factory-(.*)">cylinder</a></td>
	<td class="toc"><a href="#factory-(.*)">mirror</a></td>
	<td class="toc"><a href="#factory-(.*)">rectangle</a></td>
	<td class="toc">&nbsp;</td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">booleandifference</a></td>
	<td class="toc"><a href="#factory-(.*)">delete</a></td>
	<td class="toc"><a href="#factory-(.*)">move</a></td>
	<td class="toc"><a href="#factory-(.*)">rectcenter</a></td>
	<td class="toc">&nbsp;</td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">booleanintersection</a></td>
	<td class="toc"><a href="#factory-(.*)">ellipse</a></td>
	<td class="toc"><a href="#factory-(.*)">network</a></td>
	<td class="toc"><a href="#factory-(.*)">revolve</a></td>
	<td class="toc">&nbsp;</td>
  </tr>
  <tr>
	<td class="toc"><a href="#factory-(.*)">booleanmerge</a></td>
	<td class="toc"><a href="#factory-(.*)">ellipsecorner</a></td>
	<td class="toc"><a href="#factory-(.*)">offset</a></td>
	<td class="toc"><a href="#factory-(.*)">rotate</a></td>
	<td class="toc">&nbsp;</td>
  </tr>
</table>

# Factory addpoint
```js
var factory = moi.command.createFactory( "addpoint" );
```

<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is corner</td>
			<td>boolean</td>
		</tr>
						
</table>


# Factory align
```js
var factory = moi.command.createFactory( "align" );
```


<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Alignment pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Align mode</td>
			<td>string</td>
		</tr>
							
</table>


# Factory alignbackgroundimage
```js
var factory = moi.command.createFactory( "alignbackgroundimage" );
```
<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>P1</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>P2</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>P3</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>P4</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
								
</table>


# Factory arc3pt
```js
var factory = moi.command.createFactory( "arc3pt" );
```


<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Style</td>
			<td>string</td>
		</tr>
									
</table>


# Factory arccenter
```js
var factory = moi.command.createFactory( "arccenter" );
```


<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>End</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Elliptical</td>
			<td>boolean</td>
		</tr>
										
</table>


# Factory arccontinue
```js
var factory = moi.command.createFactory( "arccontinue" );
```


<table>
		<tr>
			<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Start pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>End pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
											
</table>


# Factory arctangent
```js
var factory = moi.command.createFactory( "arctangent" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
														<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>a
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Side pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
												
</table>


# Factory arraycircular
```js
var factory = moi.command.createFactory( "arraycircular" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
															<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Center pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Num items</td>
			<td>int</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Vertical step</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Radial step</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Angle mode</td>
			<td>string</td>
		</tr>
													
</table>


# Factory arraycurve
```js
var factory = moi.command.createFactory( "arraycurve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Path</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Mode</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Num items</td>
			<td>int</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Distance</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Rotation mode</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Orientation</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Alignment surface</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
														
</table>


# Factory arraydir
```js
var factory = moi.command.createFactory( "arraydir" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																	<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Num items</td>
			<td>int</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>BasePt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>OffsetPt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>ExtentPt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Mode</td>
			<td>string</td>
		</tr>
															
</table>


# Factory arraygrid
```js
var factory = moi.command.createFactory( "arraygrid" );
```


<table>
		<tr>
		<td class="caption" colspan="3"><b>Inputs</b></td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Extrusion</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Extrusion pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>NumCopies X</td>
			<td>int</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>NumCopies Y</td>
			<td>int</td>
		</tr>
		<tr style="">
			<td>8</td>
			<td>NumCopies Z</td>
			<td>int</td>
		</tr>
		<tr class="even">
			<td>9</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																
</table>


# Factory backgroundimage
```js
var factory = moi.command.createFactory( "backgroundimage" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																			<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>FileName</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Corner</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																	
</table>


# Factory blend
```js
var factory = moi.command.createFactory( "blend" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																				<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Orientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Continuity</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Bulge</td>
			<td>float</td>
		</tr>
																		
</table>


# Factory booleandifference
```js
var factory = moi.command.createFactory( "booleandifference" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																					<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Cutting objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Keep cutting objects</td>
			<td>boolean</td>
		</tr>
																			
</table>


# Factory booleanintersection
```js
var factory = moi.command.createFactory( "booleanintersection" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																						<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Intersectors</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																				
</table>


# Factory booleanmerge
```js
var factory = moi.command.createFactory( "booleanmerge" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																							<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																					
</table>


# Factory booleanunion
```js
var factory = moi.command.createFactory( "booleanunion" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																								<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																						
</table>


# Factory box
```js
var factory = moi.command.createFactory( "box" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																									<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Extrusion</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Extrusion pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																							
</table>


# Factory box3pts
```js
var factory = moi.command.createFactory( "box3pts" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																										<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Extrusion</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Extrusion pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																								
</table>


# Factory boxcenter
```js
var factory = moi.command.createFactory( "boxcenter" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																											<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Extrusion</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Extrusion pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																									
</table>


# Factory chamfer
```js
var factory = moi.command.createFactory( "chamfer" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																												<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Straight corners</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Corners</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Dist A</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Dist B</td>
			<td>float</td>
		</tr>
																										
</table>


# Factory circle
```js
var factory = moi.command.createFactory( "circle" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																													<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Radius pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Vertical</td>
			<td>boolean</td>
		</tr>
																											
</table>


# Factory circle3pt
```js
var factory = moi.command.createFactory( "circle3pt" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																														<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																												
</table>


# Factory circlediameter
```js
var factory = moi.command.createFactory( "circlediameter" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																															<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Vertical</td>
			<td>boolean</td>
		</tr>
																													
</table>


# Factory circletangent
```js
var factory = moi.command.createFactory( "circletangent" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
																														
</table>


# Factory cone
```js
var factory = moi.command.createFactory( "cone" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																	<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Radius pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>End pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																															
</table>


# Factory copy
```js
var factory = moi.command.createFactory( "copy" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																		<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Offset pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Distance from edge</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>From edge cplane</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
																																
</table>


# Factory curve
```js
var factory = moi.command.createFactory( "curve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																			<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
																																	
</table>


# Factory cylinder
```js
var factory = moi.command.createFactory( "cylinder" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																				<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Radius pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>End pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																		
</table>


# Factory delete
```js
var factory = moi.command.createFactory( "delete" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																					<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																			
</table>


# Factory ellipse
```js
var factory = moi.command.createFactory( "ellipse" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																						<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Center pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>First axis pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Second axis pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																				
</table>


# Factory ellipsecorner
```js
var factory = moi.command.createFactory( "ellipsecorner" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																							<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base corner</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Other corner</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																					
</table>


# Factory ellipsediameter
```js
var factory = moi.command.createFactory( "ellipsediameter" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																								<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>First axis start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>First axis end</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Second axis pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																																						
</table>


# Factory extend
```js
var factory = moi.command.createFactory( "extend" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																									<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Boundaries</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																							
</table>


# Factory extrude
```js
var factory = moi.command.createFactory( "extrude" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																										<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Distance pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Distance</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Dir A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Dir B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Both sides</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Path</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
		<tr style="">
			<td>8</td>
			<td>Path reversed</td>
			<td>boolean</td>
		</tr>
																																								
</table>


# Factory fillet
```js
var factory = moi.command.createFactory( "fillet" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																											<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Straight corners</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Corners</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Shape</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>BlendScale</td>
			<td>float</td>
		</tr>
																																									
</table>


# Factory flip
```js
var factory = moi.command.createFactory( "flip" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																												<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																										
</table>


# Factory helix
```js
var factory = moi.command.createFactory( "helix" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																													<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base point</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>End point</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Helix start point</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Start radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>End radius point</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>End radius</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Num turns</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Pitch</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>8</td>
			<td>Mode</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>9</td>
			<td>Reverse twist</td>
			<td>boolean</td>
		</tr>
																																											
</table>


# Factory interpcurve
```js
var factory = moi.command.createFactory( "interpcurve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																														<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
																																												
</table>


# Factory intersect
```js
var factory = moi.command.createFactory( "intersect" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																															<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																													
</table>


# Factory join
```js
var factory = moi.command.createFactory( "join" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																														
</table>


# Factory line
```js
var factory = moi.command.createFactory( "line" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																	<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>End</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																																															
</table>


# Factory loft
```js
var factory = moi.command.createFactory( "loft" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																		<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Sections</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Orientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Style</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Closed</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Profile synch type</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Num Profile Points</td>
			<td>int</td>
		</tr>
																																																
</table>


# Factory merge
```js
var factory = moi.command.createFactory( "merge" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																			<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																																	
</table>


# Factory mirror
```js
var factory = moi.command.createFactory( "mirror" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																				<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>End pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Delete inputs</td>
			<td>boolean</td>
		</tr>
																																																		
</table>


# Factory move
```js
var factory = moi.command.createFactory( "move" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																					<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Base pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Offset pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Distance from edge</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>From edge cplane</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
																																																			
</table>


# Factory network
```js
var factory = moi.command.createFactory( "network" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																						<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>U curves</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>V curves</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>U orientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>V orientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
																																																				
</table>


# Factory offset
```js
var factory = moi.command.createFactory( "offset" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																							<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Distance</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Offset pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Corner type</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Trim</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Flip</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Both sides</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
																																																					
</table>


# Factory planarsrf
```js
var factory = moi.command.createFactory( "planarsrf" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																								<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																																						
</table>


# Factory plane
```js
var factory = moi.command.createFactory( "plane" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																									<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																																							
</table>


# Factory plane3pts
```js
var factory = moi.command.createFactory( "plane3pts" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																										<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																																								
</table>


# Factory planecenter
```js
var factory = moi.command.createFactory( "planecenter" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																											<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
																																																									
</table>


# Factory point
```js
var factory = moi.command.createFactory( "point" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																												<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																																																										
</table>


# Factory polygon
```js
var factory = moi.command.createFactory( "polygon" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																													<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Radius</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Num sides</td>
			<td>int</td>
		</tr>
																																																											
</table>


# Factory polygonedge
```js
var factory = moi.command.createFactory( "polygonedge" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																														<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Num sides</td>
			<td>int</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Flip</td>
			<td>boolean</td>
		</tr>
																																																												
</table>


# Factory polygonstar
```js
var factory = moi.command.createFactory( "polygonstar" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																															<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Radius</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Num sides</td>
			<td>int</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Second radius</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																																																													
</table>


# Factory polyline
```js
var factory = moi.command.createFactory( "polyline" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
																																																														
</table>


# Factory project
```js
var factory = moi.command.createFactory( "project" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																	<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>BaseObjects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>TargetObjects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Mode</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Direction start pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Direction end pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
																																																															
</table>


# Factory railrevolve
```js
var factory = moi.command.createFactory( "railrevolve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																		<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Profile</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Rail</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Axis start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Axis end</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
																																																																
</table>


# Factory rect3pts
```js
var factory = moi.command.createFactory( "rect3pts" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																			<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Pt A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Pt B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Pt C</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Rounded</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Round pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Round radius</td>
			<td>float</td>
		</tr>
																																																																	
</table>


# Factory rectangle
```js
var factory = moi.command.createFactory( "rectangle" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																				<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Rounded</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Round pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Round radius</td>
			<td>float</td>
		</tr>
																																																																		
</table>


# Factory rectcenter
```js
var factory = moi.command.createFactory( "rectcenter" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																					<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base pt</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Corner pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Width</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Rounded</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Round pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Round radius</td>
			<td>float</td>
		</tr>
																																																																			
</table>


# Factory revolve
```js
var factory = moi.command.createFactory( "revolve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																						<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Axis start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Axis end</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
																																																																				
</table>


# Factory rotate
```js
var factory = moi.command.createFactory( "rotate" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																							<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Ref A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Ref B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
																																																																					
</table>


# Factory rotateaxis
```js
var factory = moi.command.createFactory( "rotateaxis" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																								<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Axis start</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Axis end</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Angle</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Ref A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Ref B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
																																																																						
</table>


# Factory scale
```js
var factory = moi.command.createFactory( "scale" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																									<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Origin</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Scale factor</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Ref A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Ref B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
																																																																							
</table>


# Factory scale1d
```js
var factory = moi.command.createFactory( "scale1d" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																										<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Origin</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Scale factor</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Ref A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Ref B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
																																																																								
</table>


# Factory scale2d
```js
var factory = moi.command.createFactory( "scale2d" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																											<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Origin</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Scale factor</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Ref A</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Ref B</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Make copies</td>
			<td>boolean</td>
		</tr>
																																																																									
</table>


# Factory separate
```js
var factory = moi.command.createFactory( "separate" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																												<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																																																										
</table>


# Factory shell
```js
var factory = moi.command.createFactory( "shell" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																													<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Distance</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Direction</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Flip</td>
			<td>boolean</td>
		</tr>
																																																																											
</table>


# Factory shrinktrimmedsrf
```js
var factory = moi.command.createFactory( "shrinktrimmedsrf" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																														<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
																																																																												
</table>


# Factory sketchcurve
```js
var factory = moi.command.createFactory( "sketchcurve" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																															<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
																																																																													
</table>


# Factory sphere
```js
var factory = moi.command.createFactory( "sphere" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																																<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Is radius</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Center</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Radius pt</td>
			<td>
				<a href="#_Point">Point</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Radius</td>
			<td>float</td>
		</tr>
																																																																														
</table>


# Factory sweep
```js
var factory = moi.command.createFactory( "sweep" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																																	<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Profiles</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Rails</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Orientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>RailOrientations</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Pointy ends</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Twist</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Maintain height</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Cap ends</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>8</td>
			<td>Maintain tangent</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>9</td>
			<td>Scaling rail</td>
			<td>
				<a href="#_GeomObject">GeomObject</a>
			</td>
		</tr>
		<tr style="">
			<td>10</td>
			<td>Profile synch type</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>11</td>
			<td>Num Profile Points</td>
			<td>int</td>
		</tr>
																																																																															
</table>


# Factory text
```js
var factory = moi.command.createFactory( "text" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																																		<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Base point</td>
			<td>
				<a href="#_CoordinateFrame">CoordinateFrame</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Text</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Font</td>
			<td>string</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Bold</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Italic</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Type</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Height</td>
			<td>float</td>
		</tr>
		<tr class="even">
			<td>7</td>
			<td>Extrusion</td>
			<td>float</td>
		</tr>
		<tr style="">
			<td>8</td>
			<td>PreviewMode</td>
			<td>boolean</td>
		</tr>
																																																																																
</table>


# Factory trim
```js
var factory = moi.command.createFactory( "trim" );
```


<table>
	<tr>
			<td class="caption" colspan="3">
																																																																																			<b>Inputs</b>
			</td>
		</tr>
		<tr style="font-weight: bold">
			<td width="30">Index</td>
			<td width="250">Name</td>
			<td>Type</td>
		</tr>
		<tr style="">
			<td>0</td>
			<td>Objects</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>1</td>
			<td>Cutters</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr style="">
			<td>2</td>
			<td>Fragments</td>
			<td>
				<a href="#_ObjectList">ObjectList</a>
			</td>
		</tr>
		<tr class="even">
			<td>3</td>
			<td>Mode</td>
			<td>string</td>
		</tr>
		<tr style="">
			<td>4</td>
			<td>Extend lines</td>
			<td>boolean</td>
		</tr>
		<tr class="even">
			<td>5</td>
			<td>Use proj intersections</td>
			<td>boolean</td>
		</tr>
		<tr style="">
			<td>6</td>
			<td>Trim pts</td>
			<td>
				<a href="#_List">List</a>
			</td>
		</tr>																	
</table>
		