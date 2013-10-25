var kurst;
(function (kurst) {
    ///<reference path="../../../libs/Away3D.next.d.ts" />
    (function (threed) {
        var AwayAppBase = (function () {
            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            function AwayAppBase() {
                var _this = this;
                this._panAngle = 45;
                this._tiltAngle = 20;
                this._minTiltAngle = 5;
                this._minDistance = 100;
                this._maxDistance = 2000;
                this._move = false;
                window.onresize = function () {
                    return _this.resize();
                };

                this.view = new away.containers.View3D();
                this._mouseWheelHandler = function (event) {
                    return _this.onMouseWheel(event);
                };
            }
            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            //-PUBLIC-----------------------------------------------------------------------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            /**
            * Resize the view
            */
            AwayAppBase.prototype.resize = function () {
                this.view.y = 0;
                this.view.x = 0;
                this.view.width = window.innerWidth;
                this.view.height = window.innerHeight;
            };

            /**
            * Render
            * @param dt
            */
            AwayAppBase.prototype.render = function (dt) {
                this.view.render();
            };

            /**
            *
            * @param flag
            * @param target
            */
            AwayAppBase.prototype.enableCameraController = function (flag, target) {
                if (typeof target === "undefined") { target = null; }
                var _this = this;
                if (flag) {
                    if (!this.cameraController) {
                        target = (target == null) ? this.view.camera : target;
                        this.cameraController = new away.controllers.HoverController(target, null, this._panAngle, this._tiltAngle, this._maxDistance, this._minTiltAngle);
                    }

                    // Set up event handlers for camera controller
                    document.onmousedown = function (event) {
                        return _this.onMouseDown(event);
                    };
                    document.onmouseup = function (event) {
                        return _this.onMouseUp(event);
                    };
                    document.onmousemove = function (event) {
                        return _this.onMouseMove(event);
                    };
                    document.onmousewheel = function (event) {
                        return _this.onMouseWheel(event);
                    };
                    window.addEventListener('DOMMouseScroll', this._mouseWheelHandler, false);
                } else {
                    // Remove event handlers for camera controller
                    document.onmousedown = null;
                    document.onmouseup = null;
                    document.onmousemove = null;
                    document.onmousewheel = null;
                    window.removeEventListener('DOMMouseScroll', this._mouseWheelHandler);
                }
            };

            Object.defineProperty(AwayAppBase.prototype, "minDistance", {
                get: //------------------------------------------------------------------------------------------------------------------------------------------------------------
                //-GET / SET -----------------------------------------------------------------------------------------------------------------------------------------------------
                //------------------------------------------------------------------------------------------------------------------------------------------------------------
                /**
                * get minimum distance for HoverController
                * @returns {number}
                */
                function () {
                    return this._minDistance;
                },
                set: /**
                * set minimum distance for HoverController
                * @param v
                */
                function (v) {
                    this._minDistance = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AwayAppBase.prototype, "maxDistance", {
                get: /**
                * get maximum distance for HoverController
                * @returns {number}
                */
                function () {
                    return this._maxDistance;
                },
                set: /**
                * set maximum distance for HoverController
                * @param v
                */
                function (v) {
                    this._maxDistance = v;
                },
                enumerable: true,
                configurable: true
            });



            Object.defineProperty(AwayAppBase.prototype, "panAngle", {
                get: /**
                * get pan angle for camera controller
                * @returns {number}
                */
                function () {
                    return this._panAngle;
                },
                set: /**
                * set pan angle for camera controller
                * @param v
                */
                function (v) {
                    this._panAngle = v;

                    if (this.cameraController) {
                        this.cameraController.panAngle = this._panAngle;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AwayAppBase.prototype, "tiltAngle", {
                get: /**
                * get tilt angle for camera controller
                * @returns {number}
                */
                function () {
                    return this._tiltAngle;
                },
                set: /**
                * set tilt angle for camera controller
                * @param v
                */
                function (v) {
                    this._tiltAngle = v;

                    if (this.cameraController) {
                        this.cameraController.tiltAngle = this._tiltAngle;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(AwayAppBase.prototype, "minTiltAngle", {
                get: /**
                * get minimum tilt angle for camera controller
                * @returns {number}
                */
                function () {
                    return this._minTiltAngle;
                },
                set: /**
                * set minimum tilt angle for camera controller
                * @param v
                */
                function (v) {
                    this._minTiltAngle = v;

                    if (this.cameraController) {
                        this.cameraController.minTiltAngle = this._minTiltAngle;
                    }
                },
                enumerable: true,
                configurable: true
            });

            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            //-EVENT HANDLERS-----------------------------------------------------------------------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------------------------------------------------------------------------
            /**
            * Mouse down listener for navigation
            */
            AwayAppBase.prototype.onMouseDown = function (event) {
                this._lastPanAngle = this.cameraController.panAngle;
                this._lastTiltAngle = this.cameraController.tiltAngle;
                this._lastMouseX = event.clientX;
                this._lastMouseY = event.clientY;
                this._move = true;
            };

            /**
            * Mouse up listener for navigation
            */
            AwayAppBase.prototype.onMouseUp = function (event) {
                this._move = false;
            };

            /**
            * Mouse move listener for navigation
            */
            AwayAppBase.prototype.onMouseMove = function (event) {
                if (this._move) {
                    this.cameraController.panAngle = 0.3 * (event.clientX - this._lastMouseX) + this._lastPanAngle;
                    this.cameraController.tiltAngle = 0.3 * (event.clientY - this._lastMouseY) + this._lastTiltAngle;
                }
            };

            /**
            * Mouse wheel listener for navigation
            */
            AwayAppBase.prototype.onMouseWheel = function (event) {
                if (event.wheelDelta) {
                    this.cameraController.distance -= event.wheelDelta * 3;
                } else
                    (event.detail);
                 {
                    this.cameraController.distance -= -event.detail * 10;
                }

                if (this.cameraController.distance < this._minDistance) {
                    this.cameraController.distance = this._minDistance;
                } else if (this.cameraController.distance > this._maxDistance) {
                    this.cameraController.distance = this._maxDistance;
                }
            };
            return AwayAppBase;
        })();
        threed.AwayAppBase = AwayAppBase;
    })(kurst.threed || (kurst.threed = {}));
    var threed = kurst.threed;
})(kurst || (kurst = {}));
///<reference path="kurst/threed/AwayAppBase.ts" />
///<reference path="../libs/Away3D.next.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//------------------------------
// Compile String
//------------------------------
// tsc src/Away3DAWD.ts --target ES5 --sourcemap --out demo/js/Away3DAWD.js
//------------------------------
var demo;
(function (demo) {
    var Away3DAWD = (function (_super) {
        __extends(Away3DAWD, _super);
        function Away3DAWD() {
            _super.call(this);
        }
        return Away3DAWD;
    })(kurst.threed.AwayAppBase);
    demo.Away3DAWD = Away3DAWD;
})(demo || (demo = {}));
//# sourceMappingURL=Away3DAWD.js.map
