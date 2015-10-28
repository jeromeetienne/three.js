/**
 * @author mrdoob / http://mrdoob.com/
 */

var LeftSidebar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'leftSidebar' );

	// container.add( new Sidebar.Project( editor ) );
	// container.add( new Sidebar.History( editor ) );
	// container.add( new Sidebar.Scene( editor ) );
	
	var tabContainer	= new UI.TabsHelper.createTabContainer('LeftSidebarTabs', 0).setPadding('0px')
	container.add(tabContainer)

	var sceneTab	= new UI.TabsHelper.createTab()
	sceneTab.add( new Sidebar.Scene( editor ).setPadding('10px') );
	tabContainer.addTab('SCENE', sceneTab)

	var projectTab	= new UI.TabsHelper.createTab()
	projectTab.add( new Sidebar.Project( editor ).setPadding('10px') );
	tabContainer.addTab('PROJECT', projectTab)

	var historyTab	= new UI.TabsHelper.createTab()
	historyTab.add( new Sidebar.History( editor ).setPadding('10px') );
	tabContainer.addTab('HISTORY', historyTab)


	return container;

};
