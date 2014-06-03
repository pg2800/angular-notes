describe("Local Storage Module", function() {
	describe("Declared", function() {
		it("should find the module", function() {
			var $injector = angular.injector(['localStorage']);
			expect($injector).toBeDefined();
		});
		it("should find the localStorage Service", function() {
			
		});
	});

	beforeEach(module("localStorage"));


});