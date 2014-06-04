angular.module('Notes')
.factory('$notes', ['$localStorage', function ($localStorage) {
	$localStorage.set("angularNotes");
	function set(name){

	}
	return {
		set:set
	};
}]);