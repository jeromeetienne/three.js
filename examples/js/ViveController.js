THREE.ViveController = function(id) {

    THREE.Object3D.call(this);

    this.matrixAutoUpdate = false;
    this.standingMatrix = new THREE.Matrix4();

    var scope = this;
    scope.lastGamepad = null

    function update() {

        requestAnimationFrame(update);

        var gamepad = navigator.getGamepads()[id];

        if (gamepad !== undefined && gamepad.pose !== null) {

            scope.lastGamepad = gamepad
                //     console.dir(gamepad)

            //     console.log('axis 0:', gamepad.axes[0], '1:', gamepad.axes[1])

            //     gamepad.buttons.forEach(function(button, buttonIdx) {
            //         console.log('button', buttonIdx, ':', 'pressed:', button.pressed, 'touched:', button.touched, 'value:', button.value)
            //     })


            var pose = gamepad.pose;

            scope.position.fromArray(pose.position);
            scope.quaternion.fromArray(pose.orientation);
            scope.matrix.compose(scope.position, scope.quaternion, scope.scale);
            scope.matrix.multiplyMatrices(scope.standingMatrix, scope.matrix);
            scope.matrixWorldNeedsUpdate = true;

            scope.visible = true;

        } else {

            scope.visible = false;

        }

    }

    update();

};

THREE.ViveController.prototype = Object.create(THREE.Object3D.prototype);
THREE.ViveController.prototype.constructor = THREE.ViveController;