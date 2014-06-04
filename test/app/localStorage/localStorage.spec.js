describe("Local Storage Module", function() {
	
	describe("Module Declared", function() {
		it("should find the module", function() {
			var $injector = angular.injector(['LocalStorage']);
			expect($injector).toBeDefined();
		});

		it("should find the localStorage Service", inject (function(_$localStorage_) {
			expect(_$localStorage_).toBeDefined();
			expect(_$localStorage_.set).toBeDefined();
			expect(_$localStorage_.clean).toBeDefined();
		}));
	});

	beforeEach(module("LocalStorage"));

	var $scope, $localStorage;
	beforeEach(inject(function (_$rootScope_, _$localStorage_){
		$scope = _$rootScope_.$new();
		$localStorage = _$localStorage_;
	}));
	beforeEach(function (){
		$localStorage.set("testLocalStorage");
	});
	afterEach(function (){
		$localStorage.clean("testLocalStorage");
	});

	it("should not find the testing storage", function() {
		if(window.hasOwnProperty("testLocalStorage")) $localStorage.clean("testLocalStorage");
		expect(window.localStorage.getItem("testLocalStorage")).toBeNull();
		expect(window.testLocalStorage).toBeUndefined();
	});
	it("should find the variable in the global scope", function (){
		// beforeEach --> $localStorage.set("testLocalStorage");
		expect(testLocalStorage).toBeDefined();
	});
	it("contains the right properties", function() {
		expect(testLocalStorage.name).toBeDefined();
		expect(testLocalStorage.storage).toBeDefined();
		expect(testLocalStorage.saveChanges).toBeDefined();
		expect(testLocalStorage.add).toBeDefined();
		expect(testLocalStorage.put).toBeDefined();
		expect(testLocalStorage.remove).toBeDefined();
	});
	it("doesn't allow to remove properties", function() {
		delete testLocalStorage.name
		,testLocalStorage.storage
		,testLocalStorage.saveChanges
		,testLocalStorage.add
		,testLocalStorage.put
		,testLocalStorage.remove;

		delete testLocalStorage.__proto__.saveChanges
		,testLocalStorage.__proto__.add
		,testLocalStorage.__proto__.put
		,testLocalStorage.__proto__.remove;

		expect(testLocalStorage.name).not.toBeUndefined();
		expect(testLocalStorage.storage).not.toBeUndefined();
		expect(testLocalStorage.saveChanges).not.toBeUndefined();
		expect(testLocalStorage.add).not.toBeUndefined();
		expect(testLocalStorage.put).not.toBeUndefined();
		expect(testLocalStorage.remove).not.toBeUndefined();
	});
	it("adds objects into the storage correctly", function() {
		testLocalStorage.add("key", {value:true});
		var item = testLocalStorage.storage["key"];
		expect(item).toBeDefined();
		expect(item).toEqual({value:true});
		expect(item.value).toBeTruthy();
	});
	it("gets objects by key", function() {
		testLocalStorage.add("key", {value:true});
		var item = testLocalStorage.get("key");
		expect(item).toBeDefined();
		expect(item).toEqual({value:true});
		expect(item.value).toBeTruthy();
		expect(item).toEqual(testLocalStorage.storage["key"]);
	});
	it("does not add key if it exists already", function() {
		testLocalStorage.add("key", {value:true});
		testLocalStorage.add("key", {value:false});
		var item = testLocalStorage.get("key");
		expect(item).toBeDefined();
		expect(item).toEqual({value:true});
		expect(item.value).toBeTruthy();
	});
	it("puts objects into the storage correctly", function() {
		testLocalStorage.put("key", {value:true});
		var item = testLocalStorage.get("key");
		expect(item).toBeDefined();
		expect(item).toEqual({value:true});
		expect(item.value).toBeTruthy();
	});
	it("puts objects even if key existed", function() {
		testLocalStorage.put("key", {value:true});
		testLocalStorage.put("key", {value:false});
		var item = testLocalStorage.get("key");
		expect(item).toBeDefined();
		expect(item).not.toEqual({value:true});
		expect(item.value).not.toBeTruthy();
	});
});