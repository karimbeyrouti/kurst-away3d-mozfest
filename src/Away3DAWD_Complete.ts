///<reference path="kurst/threed/AwayAppBase.ts" />
///<reference path="../libs/Away3D.next.d.ts" />


//------------------------------
// Compile String
//------------------------------
// tsc src/Away3DAWD_Complete.ts --target ES5 --sourcemap --out demo/Away3DAWD_Complete.js
//------------------------------

module demo {

    export class Away3DAWD_Complete extends kurst.threed.AwayAppBase
    {

        //---------------------------------------------------------------------------------------------------------

        private _timer              : away.utils.RequestAnimationFrame; // Utility for Request Animation Frame
        private _time               : number = 0 ;                      // Time / Dt for animation
        private _awdMesh            : away.entities.Mesh;               // Reference to loaded mesh
        private _light              : away.lights.DirectionalLight;     // Reference to loaded light
        private _direction          : away.geom.Vector3D;               // Direction of light

        //---------------------------------------------------------------------------------------------------------

        constructor()
        {
            super();
            this.init();
            this.loadAssets();
        }

        //---------------------------------------------------------------------------------------------------------

        /**
         * load the assets
         */
        private loadAssets() : void
        {
            away.library.AssetLibrary.enableParser( away.loaders.AWDParser ) ;
            away.library.AssetLibrary.load(new away.net.URLRequest('assets/ShadowTest.awd') );
            away.library.AssetLibrary.addEventListener(away.events.LoaderEvent.RESOURCE_COMPLETE, this.onResourceComplete, this);
        }
        /**
         * initialise the demo
         */
        private init() : void
        {
            this._direction                = new away.geom.Vector3D(-1, -1, 1);
            this._timer                    = new away.utils.RequestAnimationFrame( this.render, this );

            this.initView();
            this.initCameraController();
        }
        /**
         * initialise the Away3D View
         */
        private initView() : void
        {
            this.view.backgroundColor       = 0xffffff; // Set the background colour
            this.view.camera.lens.far       = 5000;     // Set the len far property ( smaller values work better with shadows )
            this.view.camera.y              = 100;      // Set Camera's Y position
        }
        /**
         * initialise the camera controller
         */
        private initCameraController() : void
        {
            this.maxDistance                = 2000; // set camera controller maximum distance
            this.enableCameraController( true );    // Enable the camera controller
        }

        //---------------------------------------------------------------------------------------------------------

        /**
         * Override the render function to animate light and shadows
         * @param dt
         */
        public render( dt : number ) //animate based on dt for firefox
        {

            this._time += dt;

            if ( this._light )
            {
                // Animate the light
                this._direction.x       = -Math.sin(this._time/2000);
                this._direction.z       = -Math.cos(this._time/2000);
                this._light.direction   = this._direction;
            }

            super.render( dt );

        }
        /**
         * AssetLibrary load complete handler
         * @param e
         */
        public onResourceComplete ( e : away.events.LoaderEvent )
        {

            var assets:away.library.IAsset[] = e.assets; // reference all loaded assets
            var length:number = assets.length;           // number of loaded assets

            for( var i : number = 0; i < length; ++i )
            {
                var asset: away.library.IAsset = assets[ i ]; // reference asset

                switch ( asset.assetType )
                {
                    case away.library.AssetType.MESH:

                        this._awdMesh = <away.entities.Mesh> asset;
                        this.view.scene.addChild( this._awdMesh ); // add our mesh to the scene
                        this.resize();

                        break;

	                case away.library.AssetType.LIGHT:

                        this._light = <away.lights.DirectionalLight> asset;
		                this.view.scene.addChild( this._light  ); // add our light to the scene

		                break;

                    case away.library.AssetType.MATERIAL:

                        break;

                }

            }

	        this._timer.start();

        }

    }

}