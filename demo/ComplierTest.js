var typescript;
(function (typescript) {
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
//# sourceMappingURL=ComplierTest.js.map
