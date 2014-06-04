angular.module('Notes')
.directive('notes', [function () {
	return {
		priority: 0
		,restrict: 'E'
		,scope: {}
		,controller: function($scope, $element, $attrs, $transclude, $notes) {
			return {

			};
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return function postLink(scope, iElement, iAttrs, controller) {

			};
		}
	};
}])
.directive('newNote', [function () {
	return {
		priority: 0
		,templateUrl: 'partials/newNote.tpl.html'
		,replace: true
		,restrict: 'E'
		,scope: {}
		,require: '^notes'
		,controller: function($scope, $element, $attrs, $transclude, otherInjectables) {

		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return function postLink(scope, iElement, iAttrs, controller) {

			}
		}
	};
}]);