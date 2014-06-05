angular.module('Notes')
.directive('notes', ['$compile', function ($compile) {
	return {
		priority: 0
		,restrict: 'E'
		,scope: true
		,transclude: true
		,controller: function($scope, $element, $attrs, $transclude, $notes) {
			this.$bind = function (expression){
				this.expression = expression;
				$notes.set(expression);
				return this;
			}
			this.$from = function (specifiedScope){
				this.scope = specifiedScope;/*(function (specifiedScope){
					switch(specifiedScope){
						// Parent Scope
						case "parent": return $scope.$parent;
						// $rootScope
						case "root": return scope.$root;
						// Existing Variable within the Scope or any Parent. Else the rootScope.
						case "actual": 
						return (function(scope, prop){
							do {
								if(scope.hasOwnProperty(prop) || !scope.$parent) return scope;
							} while(scope = scope.$parent);
						})($scope, this.expression);
						// Current Scope
						case "current": default: return $scope;
					};
				})(specifiedScope);*/
				return this;
			};
			this.toLocalStorage = function (){
				$notes.watch(this.expression, this.scope);
			};
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function preLink(scope, instanceElement, instanceAttrs, controller) {
					// scope[instanceAttrs.in] = [{name:"bla", content:'ble'},{name:"bli", content:'blo'}];
					// var specifiedScope = instanceAttrs.scope;
					var specifiedVariable = instanceAttrs.in;

					// if(!specifiedScope || specifiedScope.length === 0) specifiedScope = "current";
					if(!specifiedVariable || specifiedVariable.length === 0) specifiedVariable = "notes";

					controller.$bind(specifiedVariable).$from(scope).toLocalStorage();
				}
				,post: function postLink(scope, instanceElement, instanceAttrs, controller, transclude) {
					var elem;
					transclude(function (clone){
						elem = "<div ng-repeat='note in "+instanceAttrs.in+"'>"+clone.appendTo("<div>").parent().html()+"</div>";
					});
					elem = $compile(elem)(scope);
					instanceElement.append(elem);
				}
			};
		}
	};
}])
.directive('new', [function () {
	return {
		priority: 0
		,replace: 'element'
		,restrict: 'E'
		,scope: false
		,require: '^notes'
		,controller: function($scope, $element, $attrs, $transclude, otherInjectables) {
		}

		,link: function postLink(scope, instanceElement, instanceAttrs, notesController){
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return { 
				pre: function preLink(scope, iElement, iAttrs, notesCtrl) {
					$scope.name="";
					$scope.content="";
				}
				,post: function postLink(scope, iElement, iAttrs, notesCtrl) {

				}
			};
		}
	};
}]);