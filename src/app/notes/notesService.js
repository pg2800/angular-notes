angular.module('Notes')
.factory('$notes', ['$localStorage', '$parse', function ($localStorage, $parse) {
	$localStorage.set("localNotes");
	var name;
	function set(_name){
		localNotes.add(_name, []);
		name = _name;
	}
	function watch(expression, scope){
		var getter = $parse(expression)
		,setter = getter.assign;
		setter(scope, localNotes.get(name));

		scope.$watch(getter, function (newVal){
			localNotes.put(name, newVal);
		});
	}
	return {
		set: set
		,watch: watch
	};
}]);