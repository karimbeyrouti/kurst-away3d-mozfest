//------------------------------
// Compile String
//------------------------------
// tsc src/ComplierTest.ts --target ES5 --sourcemap --out demo/js/CompilerTest.js
//------------------------------

module typescript.test
{
	export class CompilerTest
	{
		constructor()
		{
		}
		public tsAlert() : void
		{
			var message : string = 'TypeScript';
			alert( message );
		}
	}
}
window.onload = function ()
{
	var test : typescript.test.CompilerTest = new typescript.test.CompilerTest();
	test.tsAlert();
}
