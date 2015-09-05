/**
 * @author mrdoob / http://mrdoob.com/
 */

var Toolbar = function ( editor ) {

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setId( 'toolbar' );

	var buttons = new UI.Panel();
	container.add( buttons );

	// toggle left sidebar

	var toggleLeftSidebar = new UI.Button( '<<' ).setTitle('Toggle visibility of right sidebar')
	toggleLeftSidebar.onClick( function () {
		var domElement = document.querySelector('#leftSidebar')
		var isVisible = domElement.style.display !== 'none' ? true : false
		
		if( isVisible ){

			 document.querySelector('#leftSidebar').style.display = 'none'
			 document.querySelector('#viewport').style.left = '0px'
			 document.querySelector('#toolbar').style.left = '0px'
			 toggleLeftSidebar.setLabel('>>')
		}else{

			 document.querySelector('#leftSidebar').style.display = ''
			 document.querySelector('#viewport').style.left = '300px'
			 document.querySelector('#toolbar').style.left = '300px'			
			 toggleLeftSidebar.setLabel('<<')

		}
		
		editor.signals.windowResize.dispatch();
	} );
	buttons.add( toggleLeftSidebar );


	// toggle right sidebar

	var toggleRightSidebar = new UI.Button( '>>' ).setTitle('Toggle visibility of right sidebar')
	toggleRightSidebar.onClick( function () {
		var domElement = document.querySelector('#sidebar')
		var isVisible = domElement.style.display !== 'none' ? true : false
		
		if( isVisible ){

			 document.querySelector('#sidebar').style.display = 'none'
			 document.querySelector('#viewport').style.right = '0px'
			 document.querySelector('#toolbar').style.right = '0px'
			 toggleRightSidebar.setLabel('<<')
		}else{

			 document.querySelector('#sidebar').style.display = ''
			 document.querySelector('#viewport').style.right = '300px'
			 document.querySelector('#toolbar').style.right = '300px'			
			 toggleRightSidebar.setLabel('>>')

		}
		
		editor.signals.windowResize.dispatch();
	} );
	toggleRightSidebar.dom.style.cssFloat = 'right'
	buttons.add( toggleRightSidebar );


	// translate / rotate / scale

	var translate = new UI.Button( 'translate' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'translate' );

	} );
	buttons.add( translate );

	var rotate = new UI.Button( 'rotate' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'rotate' );

	} );
	buttons.add( rotate );

	var scale = new UI.Button( 'scale' ).onClick( function () {

		signals.transformModeChanged.dispatch( 'scale' );

	} );
	buttons.add( scale );

	// grid

	var grid = new UI.Number( 25 ).onChange( update );
	grid.dom.style.width = '42px';
	buttons.add( new UI.Text( 'Grid: ' ) );
	buttons.add( grid );

	var snap = new UI.Checkbox( false ).onChange( update );
	buttons.add( snap );
	buttons.add( new UI.Text( 'snap' ) );

	var local = new UI.Checkbox( false ).onChange( update );
	buttons.add( local );
	buttons.add( new UI.Text( 'local' ) );

	var showGrid = new UI.Checkbox().onChange( update ).setValue( true );
	buttons.add( showGrid );
	buttons.add( new UI.Text( 'show' ) );

	function update() {

		signals.snapChanged.dispatch( snap.getValue() === true ? grid.getValue() : null );
		signals.spaceChanged.dispatch( local.getValue() === true ? "local" : "world" );
		signals.showGridChanged.dispatch( showGrid.getValue() );

	}

	return container;

}
