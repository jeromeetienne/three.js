/**
 * @author mrdoob / http://mrdoob.com/
 */

var LeftSidebar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'leftSidebar' );

	container.add( new Sidebar.Project( editor ) );
	container.add( new Sidebar.History( editor ) );
	container.add( new Sidebar.Scene( editor ) );
	
	return container;

};
