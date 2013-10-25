//------------------------------
// Compile String
//------------------------------
// tsc src/CompilerTest.ts --target ES5 --sourcemap --out demo/CompilerTest.js
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
