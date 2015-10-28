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
				editor.execute( new SetPositionCommand( object, new THREE.Vector3( 0, 0, 0 ) ) );
				break;

			case 'Reset Rotation':
				editor.execute( new SetRotationCommand( object, new THREE.Euler( 0, 0, 0 ) ) );
				break;

			case 'Reset Scale':
				editor.execute( new SetScaleCommand( object, new THREE.Vector3( 1, 1, 1 ) ) );
				break;

		}

		this.setValue( 'Actions' );

	} );
	container.addStatic( objectActions );

	container.add( new UI.Break() );

	// uuid

	var objectUUIDRow = new UI.Panel();
	var objectUUID = new UI.Input().setWidth( '115px' ).setFontSize( '12px' ).setDisabled( true );
	var objectUUIDRenew = new UI.Button( '⟳' ).setMarginLeft( '7px' ).onClick( function () {

		objectUUID.setValue( THREE.Math.generateUUID() );

		editor.execute( new SetUuidCommand( editor.selected, objectUUID.getValue() ) );

	} );

	objectUUIDRow.add( new UI.Text( 'UUID' ).setWidth( '90px' ) );
	objectUUIDRow.add( objectUUID );
	objectUUIDRow.add( objectUUIDRenew );

	container.add( objectUUIDRow );

	// name

	var objectNameRow = new UI.Panel();
	var objectName = new UI.Input().setWidth( '150px' ).setFontSize( '12px' ).onChange( function () {

		editor.execute( new SetValueCommand( editor.selected, 'name', objectName.getValue() ) );

	} );

	objectNameRow.add( new UI.Text( 'Name' ).setWidth( '90px' ) );
	objectNameRow.add( objectName );

	container.add( objectNameRow );

	/*
	// parent

	var objectParentRow = new UI.Panel();
	var objectParent = new UI.Select().setWidth( '150px' ).setFontSize( '12px' ).onChange( update );

	objectParentRow.add( new UI.Text( 'Parent' ).setWidth( '90px' ) );
	objectParentRow.add( objectParent );

	container.add( objectParentRow );
	*/

	// position

	var objectPositionRow = new UI.Vector3Row().setLabel('Position').onChange( update );
	container.add( objectPositionRow );

	// rotation

	var objectRotationRow = new UI.Vector3Row().setLabel('Rotation').onChange( update );
	container.add( objectRotationRow );

	// scale

<<<<<<< HEAD
	var objectScaleRow	= new UI.LockableVector3Row().setLabel('Scale').onChange(update)
=======
	var objectScaleRow = new UI.Panel();
	var objectScaleLock = new UI.Checkbox( true ).setPosition( 'absolute' ).setLeft( '75px' );
	var objectScaleX = new UI.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleX );
	var objectScaleY = new UI.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleY );
	var objectScaleZ = new UI.Number( 1 ).setRange( 0.01, Infinity ).setWidth( '50px' ).onChange( updateScaleZ );

	objectScaleRow.add( new UI.Text( 'Scale' ).setWidth( '90px' ) );
	objectScaleRow.add( objectScaleLock );
	objectScaleRow.add( objectScaleX, objectScaleY, objectScaleZ );

>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472
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

	var objectExponentRow	= new UI.NumberRow().setLabel('Exponent').onChange(update)
	container.add( objectExponentRow );

	// decay

	var objectDecayRow	= new UI.NumberRow().setLabel('Decay').onChange(update)
	container.add( objectDecayRow );

	// shadow

	var objectShadowRow = new UI.Panel();

	objectShadowRow.add( new UI.Text( 'Shadow' ).setWidth( '90px' ) );

	var objectCastShadow = new UI.THREE.Boolean( false, 'cast' ).onChange( update );
	objectShadowRow.add( objectCastShadow );

	var objectReceiveShadow = new UI.THREE.Boolean( false, 'receive' ).onChange( update );
	objectShadowRow.add( objectReceiveShadow );

	container.add( objectShadowRow );

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

			/*
			if ( object.parent !== null ) {

				var newParentId = parseInt( objectParent.getValue() );

				if ( object.parent.id !== newParentId && object.id !== newParentId ) {

					editor.execute( new MoveObjectCommand( object, editor.scene.getObjectById( newParentId ) ) );

				}

			}
<<<<<<< HEAD
			
			objectPositionRow.update(object.position)
			objectRotationRow.update(object.rotation)
			objectScaleRow.update(object.scale)

			objectFovRow.update(object, 'fov')
=======
			*/

			var newPosition = new THREE.Vector3( objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue() );
			if ( object.position.distanceTo( newPosition ) >= 0.01 ) {

				editor.execute( new SetPositionCommand( object, newPosition ) );

			}

			var newRotation = new THREE.Euler( objectRotationX.getValue(), objectRotationY.getValue(), objectRotationZ.getValue() );
			if ( object.rotation.toVector3().distanceTo( newRotation.toVector3() ) >= 0.01 ) {

				editor.execute( new SetRotationCommand( object, newRotation ) );

			}

			var newScale = new THREE.Vector3( objectScaleX.getValue(), objectScaleY.getValue(), objectScaleZ.getValue() );
			if ( object.scale.distanceTo( newScale ) >= 0.01 ) {
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

				editor.execute( new SetScaleCommand( object, newScale ) );

<<<<<<< HEAD
=======
			}

			if ( object.fov !== undefined && Math.abs( object.fov - objectFov.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'fov', objectFov.getValue() ) );
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472
				object.updateProjectionMatrix();

			}

<<<<<<< HEAD
			objectNearRow.update(object, 'near')
			objectFarRow.update(object, 'far')
=======
			if ( object.near !== undefined && Math.abs( object.near - objectNear.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'near', objectNear.getValue() ) );

			}

			if ( object.far !== undefined && Math.abs( object.far - objectFar.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'far', objectFar.getValue() ) );

			}

			if ( object.intensity !== undefined && Math.abs( object.intensity - objectIntensity.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'intensity', objectIntensity.getValue() ) );

			}

			if ( object.color !== undefined && object.color.getHex() !== objectColor.getHexValue() ) {

				editor.execute( new SetColorCommand( object, 'color', objectColor.getHexValue() ) );

			}

			if ( object.groundColor !== undefined && object.groundColor.getHex() !== objectGroundColor.getHexValue() ) {

				editor.execute( new SetColorCommand( object, 'groundColor', objectGroundColor.getHexValue() ) );
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

			objectIntensityRow.update(object, 'intensity')

<<<<<<< HEAD
			if( object.color !== undefined ){

				object.color.setHex( objectColorRow.getHexValue() )
=======
			if ( object.distance !== undefined && Math.abs( object.distance - objectDistance.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'distance', objectDistance.getValue() ) );
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

			}

			if ( object.angle !== undefined && Math.abs( object.angle - objectAngle.getValue() ) >= 0.01 ) {

<<<<<<< HEAD
				object.groundColor.setHex( objectGroundColorRow.getHexValue() )

			}

			objectDistanceRow.update(object, 'distance')
			objectAngleRow.update(object, 'angle')
			objectExponentRow.update(object, 'exponent')
			objectDecayRow.update(object, 'decay')

			objectVisibleRow.update(object, 'visible')
=======
				editor.execute( new SetValueCommand( object, 'angle', objectAngle.getValue() ) );

			}

			if ( object.exponent !== undefined && Math.abs( object.exponent - objectExponent.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'exponent', objectExponent.getValue() ) );

			}

			if ( object.decay !== undefined && Math.abs( object.decay - objectDecay.getValue() ) >= 0.01 ) {

				editor.execute( new SetValueCommand( object, 'decay', objectDecay.getValue() ) );

			}

			if ( object.visible !== objectVisible.getValue() ) {

				editor.execute( new SetValueCommand( object, 'visible', objectVisible.getValue() ) );

			}

			if ( object.castShadow !== objectCastShadow.getValue() ) {

				editor.execute( new SetValueCommand( object, 'castShadow', objectCastShadow.getValue() ) );

			}

			if ( object.receiveShadow !== undefined ) {

				if ( object.receiveShadow !== objectReceiveShadow.getValue() ) {

					editor.execute( new SetValueCommand( object, 'receiveShadow', objectReceiveShadow.getValue() ) );
					object.material.needsUpdate = true;

				}

			}
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

			try {

				var userData = JSON.parse( objectUserData.getValue() );
				if ( JSON.stringify( object.userData ) != JSON.stringify( userData ) ) {

					editor.execute( new SetValueCommand( object, 'userData', userData ) );

				}

			} catch ( exception ) {

				console.warn( exception );

			}

		}

	}

	function updateRows( object ) {

		var properties = {
<<<<<<< HEAD
			'parent': objectParentRow,
=======
			// 'parent': objectParentRow,
			'fov': objectFovRow,
			'near': objectNearRow,
			'far': objectFarRow,
			'intensity': objectIntensityRow,
			'color': objectColorRow,
			'groundColor': objectGroundColorRow,
			'distance' : objectDistanceRow,
			'angle' : objectAngleRow,
			'exponent' : objectExponentRow,
			'decay' : objectDecayRow,
			'castShadow' : objectShadowRow,
			'receiveShadow' : objectReceiveShadow
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472
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

	/*
	signals.sceneGraphChanged.add( function () {

		var scene = editor.scene;
		var options = {};

		scene.traverse( function ( object ) {

			options[ object.id ] = object.name;

		} );

		objectParent.setOptions( options );

	} );
	*/

	signals.objectChanged.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	signals.refreshSidebarObject3D.add( function ( object ) {

		if ( object !== editor.selected ) return;

		updateUI( object );

	} );

	function updateUI( object ) {

		objectType.setValue( object.type );

		objectUUID.setValue( object.uuid );
		objectName.setValue( object.name );

		/*
		if ( object.parent !== null ) {

			objectParent.setValue( object.parent.id );

		}
<<<<<<< HEAD
		
		objectPositionRow.updateUI( object.position )
		objectRotationRow.updateUI( object.rotation )
		objectScaleRow.updateUI( object.scale )
=======
		*/
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

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
		objectExponentRow.updateUI( object.exponent );
		objectDecayRow.updateUI( object.decay );

<<<<<<< HEAD
		objectVisibleRow.updateUI( object.visible );
=======
		if ( object.castShadow !== undefined ) {

			objectCastShadow.setValue( object.castShadow );

		}

		if ( object.receiveShadow !== undefined ) {

			objectReceiveShadow.setValue( object.receiveShadow );

		}

		objectVisible.setValue( object.visible );
>>>>>>> d8dba4bff84d57620bf581c4d80f958ecb9eb472

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
