/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Object3D = function ( editor ) {

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();
	container.setCollapsed( editor.config.getKey( 'ui/sidebar/object3d/collapsed' ) );
	container.onCollapsedChange( function ( boolean ) {

		editor.config.setKey( 'ui/sidebar/object3d/collapsed', boolean );

	} );
	container.setDisplay( 'none' );

	var objectType = new UI.Text().setTextTransform( 'uppercase' );
	container.addStatic( objectType );

	// Actions

	var objectActions = new UI.Select().setPosition('absolute').setRight( '8px' ).setFontSize( '11px' );
	objectActions.setOptions( {

		'Actions': 'Actions',
		'Reset Position': 'Reset Position',
		'Reset Rotation': 'Reset Rotation',
		'Reset Scale': 'Reset Scale'

	} );
	objectActions.onClick( function ( event ) {

		event.stopPropagation(); // Avoid panel collapsing

	} );
	objectActions.onChange( function ( event ) {

		var object = editor.selected;

		switch ( this.getValue() ) {

			case 'Reset Position':
				object.position.set( 0, 0, 0 );
				break;

			case 'Reset Rotation':
				object.rotation.set( 0, 0, 0 );
				break;

			case 'Reset Scale':
				object.scale.set( 1, 1, 1 );
				break;

		}

		this.setValue( 'Actions' );

		signals.objectChanged.dispatch( object );

	} );
	container.addStatic( objectActions );

	container.add( new UI.Break() );

	// uuid

	var objectUUIDRow = new UI.Panel();
	var objectUUID = new UI.Input().setWidth( '115px' ).setFontSize( '12px' ).setDisabled( true );
	var objectUUIDRenew = new UI.Button( '⟳' ).setMarginLeft( '7px' ).onClick( function () {

		objectUUID.setValue( THREE.Math.generateUUID() );

		editor.selected.uuid = objectUUID.getValue();

	} );

	objectUUIDRow.add( new UI.Text( 'UUID' ).setWidth( '90px' ) );
	objectUUIDRow.add( objectUUID );
	objectUUIDRow.add( objectUUIDRenew );

	container.add( objectUUIDRow );

	// name

	var objectNameRow = new UI.Panel();
	var objectName = new UI.Input().setWidth( '150px' ).setFontSize( '12px' ).onChange( function () {

		editor.nameObject( editor.selected, objectName.getValue() );

	} );

	objectNameRow.add( new UI.Text( 'Name' ).setWidth( '90px' ) );
	objectNameRow.add( objectName );

	container.add( objectNameRow );

	// parent

	var objectParentRow = new UI.Panel();
	var objectParent = new UI.Select().setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	objectParentRow.add( new UI.Text( 'Parent' ).setWidth( '90px' ) );
	objectParentRow.add( objectParent );

	container.add( objectParentRow );

	// position

	var objectPositionRow = new UI.Vector3Row().setLabel('Position').onChange( update );
	container.add( objectPositionRow );

	// rotation

	var objectRotationRow = new UI.Vector3Row().setLabel('Rotation').onChange( update );
	container.add( objectRotationRow );

	// scale

	var objectScaleRow	= new UI.LockableVector3Row().setLabel('Scale').onChange(update)
	container.add( objectScaleRow );
	objectScaleRow.setLocked(true)
	objectScaleRow.valueX.setRange(0.01, Infinity).setPrecision(2)
	objectScaleRow.valueY.setRange(0.01, Infinity).setPrecision(2)
	objectScaleRow.valueZ.setRange(0.01, Infinity).setPrecision(2)

	// fov

	var objectFovRow	= new UI.NumberRow().setLabel('Fov').onChange(update)
	container.add( objectFovRow );

	// near

	var objectNearRow	= new UI.NumberRow().setLabel('Near').onChange(update)
	container.add( objectNearRow );

	// far

	var objectFarRow	= new UI.NumberRow().setLabel('Far').onChange(update)
	container.add( objectFarRow );

	// intensity

	var objectIntensityRow	= new UI.NumberRow().setLabel('Intensity').onChange(update)
	container.add( objectIntensityRow );

	// color

	var objectColorRow = new UI.ColorRow().setLabel('Color').onChange( update )
	container.add( objectColorRow )

	// ground color

	var objectGroundColorRow = new UI.ColorRow().setLabel('Ground Color').onChange( update )
	container.add( objectGroundColorRow )

	// distance

	var objectDistanceRow	= new UI.NumberRow().setLabel('Distance').onChange(update)
	container.add( objectDistanceRow );

	// angle

	var objectAngleRow	= new UI.NumberRow().setLabel('Angle').onChange(update)
	container.add( objectAngleRow );

	// exponent

	var objectExponentRow = new UI.Panel();
	var objectExponent = new UI.Number().setRange( 0, Infinity ).onChange( update );

	objectExponentRow.add( new UI.Text( 'Exponent' ).setWidth( '90px' ) );
	objectExponentRow.add( objectExponent );

	container.add( objectExponentRow );

	// decay

	var objectDecayRow = new UI.Panel();
	var objectDecay = new UI.Number().setRange( 0, Infinity ).onChange( update );

	objectDecayRow.add( new UI.Text( 'Decay' ).setWidth( '90px' ) );
	objectDecayRow.add( objectDecay );

	container.add( objectDecayRow );

	// visible

	var objectVisibleRow	= new UI.CheckboxRow().setLabel('Visible').onChange( update )
	container.add( objectVisibleRow );

	// user data

	var timeout;

	var objectUserDataRow = new UI.Panel();
	var objectUserData = new UI.TextArea().setWidth( '150px' ).setHeight( '40px' ).setFontSize( '12px' ).onChange( update );
	objectUserData.onKeyUp( function () {

		try {

			JSON.parse( objectUserData.getValue() );

			objectUserData.dom.classList.add( 'success' );
			objectUserData.dom.classList.remove( 'fail' );

		} catch ( error ) {

			objectUserData.dom.classList.remove( 'success' );
			objectUserData.dom.classList.add( 'fail' );

		}

	} );

	objectUserDataRow.add( new UI.Text( 'User data' ).setWidth( '90px' ) );
	objectUserDataRow.add( objectUserData );

	container.add( objectUserDataRow );


	function update() {

		var object = editor.selected;

		if ( object !== null ) {

			if ( object.parent !== undefined ) {

				var newParentId = parseInt( objectParent.getValue() );

				if ( object.parent.id !== newParentId && object.id !== newParentId ) {

					editor.moveObject( object, editor.scene.getObjectById( newParentId ) );

				}

			}
			
			objectPositionRow.update(object.position)
			objectRotationRow.update(object.rotation)
			objectScaleRow.update(object.scale)

			if ( object.fov !== undefined ) {

				objectFovRow.update(object, 'fov')
				object.updateProjectionMatrix();

			}

			objectNearRow.update(object, 'near')
			objectFarRow.update(object, 'far')

			objectIntensityRow.update(object, 'intensity')

			if( object.color !== undefined ){

				object.color.setHex( objectColorRow.getHexValue() )

			}

			if ( object.groundColor !== undefined ) {

				object.groundColor.setHex( objectGroundColorRow.getHexValue() )

			}

			objectDistanceRow.update(object, 'distance')
			objectAngleRow.update(object, 'angle')

			if ( object.exponent !== undefined ) {

				object.exponent = objectExponent.getValue(); 

			}

			if ( object.decay !== undefined ) {

				object.decay = objectDecay.getValue();

			}

			objectVisibleRow.update(object, 'visible')

			try {

				object.userData = JSON.parse( objectUserData.getValue() );

			} catch ( exception ) {

				console.warn( exception );

			}

			signals.objectChanged.dispatch( object );

		}

	}

	function updateRows( object ) {

		var properties = {
			'parent': objectParentRow,
			// 'fov': objectFovRow,
			// 'near': objectNearRow,
			// 'far': objectFarRow,
			// 'intensity': objectIntensityRow,
			// 'color': objectColorRow,
			// 'groundColor': objectGroundColorRow,
			// 'distance' : objectDistanceRow,
			// 'angle' : objectAngleRow,
			'exponent' : objectExponentRow,
			'decay' : objectDecayRow
		};

		for ( var property in properties ) {

			properties[ property ].setDisplay( object[ property ] !== undefined ? '' : 'none' );

		}

	}

	function updateTransformRows( object ) {

		if ( object instanceof THREE.Light ||
		   ( object instanceof THREE.Object3D && object.userData.targetInverse ) ) {

			objectRotationRow.setDisplay( 'none' );
			objectScaleRow.setDisplay( 'none' );

		} else {

			objectRotationRow.setDisplay( '' );
			objectScaleRow.setDisplay( '' );

		}

	}

	// events

	signals.objectSelected.add( function ( object ) {

		if ( object !== null ) {

			container.setDisplay( 'block' );

			updateRows( object );
			updateUI( object );

		} else {

			container.setDisplay( 'none' );

		}

	} );

	signals.sceneGraphChanged.add( function () {

		var scene = editor.scene;
		var options = {};

		scene.traverse( function ( object ) {

			options[ object.id ] = object.name;

		} );

		objectParent.setOptions( options );

	} );

	signals.objectChanged.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	function updateUI( object ) {

		objectType.setValue( object.type );

		objectUUID.setValue( object.uuid );
		objectName.setValue( object.name );

		if ( object.parent !== undefined ) {

			objectParent.setValue( object.parent.id );

		}
		
		objectPositionRow.updateUI( object.position )
		objectRotationRow.updateUI( object.rotation )
		objectScaleRow.updateUI( object.scale )

		objectFovRow.updateUI( object.fov );
		objectNearRow.updateUI( object.near );
		objectFarRow.updateUI( object.far );

		objectIntensityRow.updateUI( object.intensity );
		
		if( object.color !== undefined ){

			objectColorRow.updateUI(object.color.getHex())
	
		}
		
		if( object.groundColor !== undefined ){
			
			objectGroundColorRow.updateUI(object.groundColor.getHex())

		}

		objectDistanceRow.updateUI( object.distance );
		objectAngleRow.updateUI( object.angle );

		if ( object.exponent !== undefined ) {

			objectExponent.setValue( object.exponent );

		}

		if ( object.decay !== undefined ) {

			objectDecay.setValue( object.decay );

		}

		objectVisibleRow.updateUI( object.visible );

		try {

			objectUserData.setValue( JSON.stringify( object.userData, null, '  ' ) );

		} catch ( error ) {

			console.log( error );

		}

		objectUserData.setBorderColor( 'transparent' );
		objectUserData.setBackgroundColor( '' );

		updateTransformRows( object );

	}

	return container;

}
