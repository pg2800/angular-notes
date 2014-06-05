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

	var $scope, $compile;
	beforeEach(inject(function (_$rootScope_, _$compile_){
		$scope = _$rootScope_.$new();
		$compile = _$compile_;
	}));

	describe("Directives", function (){
		describe("notes-directive", function() {
			it("should find the directive", inject(function(notesDirective) {
				expect(notesDirective).toBeDefined();
			}));
			it("should compile the directive correctly", inject(function ($timeout){
				var elem = $compile("<notes in='variable' class='class1 class2'><div ng-bind='note.name'></div><div ng-bind='note.content'></div></notes>")($scope);
				$scope.$digest();
				console.log($("<div>").append(elem).html());
				expect(elem).not.toBeFalsy();
				expect($scope.variable).toBeDefined();
				expect($scope.$parent.variable).not.toBeDefined();
			}));
		});
		describe("newNote-directive", function() {
			it("should find the newNote directive");
		});
	});
});