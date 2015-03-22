THREE.TextGeometry2	= function ( text, parameters ) {

	parameters = parameters || {}

	parameters.text	= text
	this.parameters	= parameters;

console.log('TextGeometry2 parameters', parameters)
	var textShapes = THREE.FontUtils.generateShapes( text, parameters );

	// translate parameters to ExtrudeGeometry API

	parameters.amount = parameters.height !== undefined ? parameters.height : 50;

	// defaults

	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 2;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	THREE.ExtrudeGeometry.call( this, textShapes, parameters );

	this.type = 'TextGeometry2';
}

THREE.TextGeometry2.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
