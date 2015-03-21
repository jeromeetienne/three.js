THREE.TextGeometry2	= function ( text, parameters ) {

	parameters = parameters || {}

	parameters.text	= text
	this.parameters	= parameters;

	var textShapes = THREE.FontUtils.generateShapes( text, parameters );

	// translate parameters to ExtrudeGeometry API

	parameters.amount = parameters.height !== undefined ? parameters.height : 50;

	// defaults

	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	THREE.ExtrudeGeometry.call( this, textShapes, parameters );

	this.type = 'TextGeometry';

	// center the geometry
	// - THREE.TextGeometry isnt centered for unknown reasons. all other geometries are centered
	this.computeBoundingBox();
	var center	= new THREE.Vector3();
	center.x	= (this.boundingBox.max.x - this.boundingBox.min.x) / 2
	center.z	= (this.boundingBox.max.z - this.boundingBox.min.z) / 2
	this.vertices.forEach(function(vertex){
		vertex.sub(center)
	})
	this.computeBoundingBox();

	this.computeVertexNormals();
}

THREE.TextGeometry2.prototype = Object.create( THREE.ExtrudeGeometry.prototype );
