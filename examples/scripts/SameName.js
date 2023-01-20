var objects = moi.geometryDatabase.getSelectedObjects();
if (objects.length > 0) {
	var name = objects.item(0).name;
	moi.geometryDatabase.selectNamed(name);
}
