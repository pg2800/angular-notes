describe("Notes Module", function (){
	describe("Module Declaration", function (){
		it("should find the module", function (){
			var $injector = angular.injector(['Notes']);
			expect($injector).toBeDefined();
		});
	});

	beforeEach(module('Notes'));

	describe("Service", function (){
		var $notes;
		beforeEach(inject(function (_$notes_){
			$notes = _$notes_;
		}));

		it("should find the service", function (){
			expect($notes).toBeDefined();
		});

	});

	describe("Directives", function (){
		it("should find the notes directive");
		it("should find the note directive");
	});
});