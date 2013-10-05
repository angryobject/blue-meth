THREE.SpectratorControls = function ( camera, opts ) {

    this.moveSpeed = (opts && opts.moveSpeed) || 5;
    this.lookSpeed = (opts && opts.lookSpeed) || 1;

    this.enabled = false;

    this.update = update;
    this.getObject = getObject;

    var scope = this;

    var object = new THREE.Object3D();
    object.rotation.order = 'YXZ';
    object.position.copy( camera.position );
    camera.position.set( 0, 0, 0 );
    object.add( camera );

    var movementX = 0;
    var movementY = 0;

    var moveForward = false;
    var moveLeft = false;
    var moveBackward = false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;

    var PI_2 = Math.PI / 2;

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    function onMouseMove( event ) {

        movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    }

    function onKeyDown( event ) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: //space
                moveUp = true;
                break;

            case 16: //shift
                moveDown = true;
                break;

        }

    }

    function onKeyUp( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

            case 32: //space
                moveUp = false;
                break;

            case 16: //shift
                moveDown = false;
                break;

        }

    }

    function update() {

        if ( ! scope.enabled ) return;

        if ( movementX !== 0 ) {

            object.rotation.y -= movementX * 0.002 * scope.lookSpeed;
            movementX = 0;

        }

        if ( movementY !== 0 ) {

            object.rotation.x -= movementY * 0.002 * scope.lookSpeed;
            object.rotation.x = Math.max( - PI_2, Math.min( PI_2, object.rotation.x ) );
            movementY = 0;

        }

        if ( moveForward ) {

            object.translateZ( - scope.moveSpeed );

        }

        if ( moveBackward ) {

            object.translateZ( scope.moveSpeed );

        }

        if ( moveLeft ) {

            object.translateX( - scope.moveSpeed);

        }

        if ( moveRight ) {

            object.translateX( scope.moveSpeed );

        }

        if ( moveDown ) {

            object.translateY( - scope.moveSpeed );

        }

        if ( moveUp ) {

            object.translateY( scope.moveSpeed );

        }

    }

    function getObject() {

        return object;

    }
};
