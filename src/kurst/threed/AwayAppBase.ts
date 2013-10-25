///<reference path="../../../libs/Away3D.next.d.ts" />

module kurst.threed {

    export class AwayAppBase
    {

        //------------------------------------------------------------------------------------------------------------------------------------------------------------

        public view                 : away.containers.View3D;
        public cameraController     : away.controllers.HoverController;

        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Camera Controller

        private _mouseWheelHandler  : a///;ny;
        private _lastPanAngle       : number;
        private _lastTiltAngle      : number;
        private _lastMouseX         : number;
        private _lastMouseY         : number;
        private _panAngle           : number = 45;
        private _tiltAngle          : number = 20;
        private _minTiltAngle       : number = 5;
        private _minDistance        : number = 100;
        private _maxDistance        : number = 2000;
        private _move               : boolean = false;

        //------------------------------------------------------------------------------------------------------------------------------------------------------------

        constructor()
        {

            window.onresize         = () => this.resize(); // setup the window resize handler

            this.view               = new away.containers.View3D(); // create the Away3D TypeScript View
            this._mouseWheelHandler = (event) => this.onMouseWheel(event); // Mouse Wheel handler reference ( so we can remove event handler )

        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-PUBLIC-----------------------------------------------------------------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * Resize the view
         */
        public resize( )
        {
            this.view.y         = 0; // Set view X position
            this.view.x         = 0; // Set view Y position
            this.view.width     = window.innerWidth; // Set view Width
            this.view.height    = window.innerHeight; // Set view Height
        }

        /**
         * Render
         * @param dt
         */
        public render( dt : number )
        {
            this.view.render(); // Render the Away3D View
        }

        /**
         *
         * @param flag
         * @param target
         */
        public enableCameraController( flag : boolean , target : away.entities.Entity = null ) : void
        {

            if ( flag )
            {

                // Create the camera controller if it's not already done
                if ( ! this.cameraController )
                {
                    target = ( target == null ) ? this.view.camera : target;
                    this.cameraController   = new away.controllers.HoverController( target , null, this._panAngle, this._tiltAngle, this._maxDistance, this._minTiltAngle );
                }

                // Set up event handlers for camera controller
                document.onmousedown    = (event) => this.onMouseDown(event);
                document.onmouseup      = (event) => this.onMouseUp(event);
                document.onmousemove    = (event) => this.onMouseMove(event);
                document.onmousewheel   = (event) => this.onMouseWheel(event);
                window.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false); // Firefox

            }
            else
            {
                // Remove event handlers for camera controller
                document.onmousedown    = null;
                document.onmouseup      = null;
                document.onmousemove    = null;
                document.onmousewheel   = null;
                window.removeEventListener('DOMMouseScroll', this._mouseWheelHandler ); // Firefox
            }
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-GET / SET -----------------------------------------------------------------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * get minimum distance for HoverController
         * @returns {number}
         */
        public get minDistance() : number
        {
            return this._minDistance;
        }
        /**
         * set minimum distance for HoverController
         * @param v
         */
        public set minDistance( v : number )
        {
            this._minDistance = v;
        }
        /**
         * get maximum distance for HoverController
         * @returns {number}
         */
        public get maxDistance() : number
        {
            return this._maxDistance;
        }
        /**
         * set maximum distance for HoverController
         * @param v
         */
        public set maxDistance( v : number )
        {
            this._maxDistance = v;
        }
        /**
         * set pan angle for camera controller
         * @param v
         */
        public set panAngle( v : number )
        {
            this._panAngle = v;

            if ( this.cameraController )
            {
                this.cameraController.panAngle = this._panAngle;
            }
        }
        /**
         * get pan angle for camera controller
         * @returns {number}
         */
        public get panAngle() : number
        {
            return this._panAngle;
        }
        /**
         * set tilt angle for camera controller
         * @param v
         */
        public set tiltAngle( v : number )
        {
            this._tiltAngle = v;

            if ( this.cameraController )
            {
                this.cameraController.tiltAngle = this._tiltAngle;
            }
        }
        /**
         * get tilt angle for camera controller
         * @returns {number}
         */
        public get tiltAngle() : number
        {
            return this._tiltAngle;
        }
        /**
         * set minimum tilt angle for camera controller
         * @param v
         */
        public set minTiltAngle( v : number )
        {
            this._minTiltAngle = v;

            if ( this.cameraController )
            {
                this.cameraController.minTiltAngle = this._minTiltAngle;
            }
        }
        /**
         * get minimum tilt angle for camera controller
         * @returns {number}
         */
        public get minTiltAngle() : number
        {
            return this._minTiltAngle
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-EVENT HANDLERS-----------------------------------------------------------------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------------------------------------------------------------------------

        /**
         * Mouse down listener for navigation
         */
        private onMouseDown(event):void
        {
            this._lastPanAngle  = this.cameraController.panAngle;
            this._lastTiltAngle = this.cameraController.tiltAngle;
            this._lastMouseX    = event.clientX;
            this._lastMouseY    = event.clientY;
            this._move          = true;
        }
        /**
         * Mouse up listener for navigation
         */
        private onMouseUp(event):void
        {
            this._move = false;
        }
        /**
         * Mouse move listener for navigation
         */
        private onMouseMove(event)
        {
            if (this._move)
            {
                this.cameraController.panAngle = 0.3*(event.clientX - this._lastMouseX) + this._lastPanAngle;
                this.cameraController.tiltAngle = 0.3*(event.clientY - this._lastMouseY) + this._lastTiltAngle;
            }
        }
        /**
         * Mouse wheel listener for navigation
         */
        private onMouseWheel(event):void
        {

            // Mouse Wheel
            if ( event.wheelDelta )
            {
                this.cameraController.distance -= event.wheelDelta * 3;
            }
            else ( event.detail )
            {
                this.cameraController.distance -= -event.detail * 10; // Firefox
            }

            // Set min / max distance
            if (this.cameraController.distance < this._minDistance)
            {
                this.cameraController.distance = this._minDistance;
            }
            else if (this.cameraController.distance > this._maxDistance)
            {
                this.cameraController.distance = this._maxDistance;
            }
        }

    }

}