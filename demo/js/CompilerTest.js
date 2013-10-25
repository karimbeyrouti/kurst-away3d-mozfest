var typescript;
(function (typescript) {
    //------------------------------
    // Compile String
    //------------------------------
    // tsc src/CompilerTest.ts --target ES5 --sourcemap --out demo/js/CompilerTest.js
    //------------------------------
    (function (test) {
        var CompilerTest = (function () {
            function CompilerTest() {
            }
            CompilerTest.prototype.tsAlert = function () {
                var message = 'TypeScript';
                alert(message);
            };
            return CompilerTest;
        })();
        test.CompilerTest = CompilerTest;
    })(typescript.test || (typescript.test = {}));
    var test = typescript.test;
})(typescript || (typescript = {}));
window.onload = function () {
    var test = new typescript.test.CompilerTest();
    test.tsAlert();
};
//# sourceMappingURL=CompilerTest.js.map
