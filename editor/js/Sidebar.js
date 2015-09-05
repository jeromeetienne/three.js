/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sidebar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'sidebar' );

	// container.add( new Sidebar.Project( editor ) );
	// container.add( new Sidebar.Scene( editor ) );
	// container.add( new Sidebar.Object3D( editor ) );
	// container.add( new Sidebar.Geometry( editor ) );
	// container.add( new Sidebar.Material( editor ) );
	// container.add( new Sidebar.Animation( editor ) );
	// container.add( new Sidebar.Script( editor ) );
// return container


	container.add( new Sidebar.Project( editor ) );
	container.add( new Sidebar.Scene( editor ) );

	var tabContainer	= new UI.TabsHelper.createTabContainer('object3dTabs', 0).setPadding('0px')
	container.add(tabContainer)

	var object3dTab	= new UI.TabsHelper.createTab()
	object3dTab.add( new Sidebar.Object3D( editor ).setPadding('10px') );
	object3dTab.add( new Sidebar.NoObject3D( editor ).setPadding('10px') );
	object3dTab.add( new Sidebar.Animation( editor ).setPadding('10px') );
	object3dTab.add( new Sidebar.Script( editor ).setPadding('10px') );
	tabContainer.addTab('OBJECT3D', object3dTab)
	
	var geometryTab	= new UI.TabsHelper.createTab()
	geometryTab.add( new Sidebar.Geometry( editor ).setPadding('10px') );
	geometryTab.add( new Sidebar.NoGeometry( editor ).setPadding('10px') );
	tabContainer.addTab('GEOMETRY', geometryTab)
	
	var materialTab	= new UI.TabsHelper.createTab()
	materialTab.add( new Sidebar.Material( editor ).setPadding('10px') );
	materialTab.add( new Sidebar.NoMaterial( editor ).setPadding('10px') );
	tabContainer.addTab('MATERIAL', materialTab)
	
	return container;

};
