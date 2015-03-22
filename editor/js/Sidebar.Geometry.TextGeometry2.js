/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.TextGeometry2 = function ( signals, object ) {

	var container = new UI.Panel();

	var parameters = object.geometry.parameters;

	// text
	var textRow = new UI.Panel();
	var text = new UI.Input(parameters.text).setWidth( '150px' ).setFontSize( '12px' ).onChange(update);
	textRow.add( new UI.Text( 'Text' ).setWidth( '90px' ) );
	textRow.add( text );
	container.add( textRow );

	// font
	var options = {};

	for ( var face in _typeface_js.faces ) {

		options[ face ] = face;

	}

	var fontRow = new UI.Panel();
	var font = new UI.Select().setOptions( options ).setWidth( '150px' ).onChange(update)
				.setValue(parameters.font)
	fontRow.add( new UI.Text( 'Font' ).setWidth( '90px' ) );
	fontRow.add( font );
	container.add( fontRow );
	
	// weight
	var options = {
		'normal' : 'normal',
		'bold' : 'bold',
	};
	var weightRow = new UI.Panel();
	var weight = new UI.Select().setOptions( options ).setWidth( '150px' ).onChange(update)
				.setValue(parameters.weight)
	weightRow.add( new UI.Text( 'Weight' ).setWidth( '90px' ) );
	weightRow.add( weight );
	container.add( weightRow );

	// amount

	var amountRow = new UI.Panel();
	var amount = new UI.Number( parameters.amount ).onChange( update );

	amountRow.add( new UI.Text( 'amount' ).setWidth( '90px' ) );
	amountRow.add( amount );

	container.add( amountRow );


	// bevelEnabled

	var bevelEnabledRow = new UI.Panel();
	var bevelEnabled = new UI.Checkbox( parameters.bevelEnabled ).onChange( update );

	bevelEnabledRow.add( new UI.Text( 'bevel sEnabled' ).setWidth( '90px' ) );
	bevelEnabledRow.add( bevelEnabled );

	container.add( bevelEnabledRow );
	
	// bevelThickness

	var bevelThicknessRow = new UI.Panel();
	var bevelThickness = new UI.Number( parameters.bevelThickness ).onChange( update );

	bevelThicknessRow.add( new UI.Text( 'bevelThickness' ).setWidth( '90px' ) );
	bevelThicknessRow.add( bevelThickness );

	container.add( bevelThicknessRow );


	// bevelSize

	var bevelSizeRow = new UI.Panel();
	var bevelSize = new UI.Number( parameters.bevelSize ).onChange( update );

	bevelSizeRow.add( new UI.Text( 'bevelSize' ).setWidth( '90px' ) );
	bevelSizeRow.add( bevelSize );

	container.add( bevelSizeRow );


	//

	function update() {

		object.geometry.dispose();

		object.geometry = new THREE.TextGeometry2(
			text.getValue(),
			{
				font : font.getValue(),
				weight: weight.getValue(),

				amount : amount.getValue(),

				bevelSize : bevelSize.getValue(),
				bevelThickness : bevelThickness.getValue(),
				bevelEnabled : bevelEnabled.getValue(),
			}
		);

		object.geometry.computeBoundingSphere();

		signals.geometryChanged.dispatch( object );

	}

	return container;

}
