angular.module('Notes')
.directive('notes', ['$compile', function ($compile) {
	return {
		priority: 0
		,restrict: 'E'
		,scope: true
		,transclude: false//'element'
		,controller: function($scope, $element, $attrs, $transclude, $notes) {
			this.$bind = function (expression){
				this.expression = expression;
				$notes.set(expression);
				return this;
			}
			this.$from = function (specifiedScope){
				this.scope = specifiedScope;
				return this;
			};
			this.toLocalStorage = function (){
				$notes.watch(this.expression, this.scope);
			};
			this.addNote = function (date, name, content, lastUpdate){
				var self = {
					date:date
					,name:name
					,content:content
					,lastUpdate:lastUpdate||date
					,remove: function (){
						this.scope[this.expression].splice(this.scope[this.expression].indexOf(self), 1);
						this.scope.$apply();
					}
				};
				this.scope[this.expression].push(self);
				this.scope.$apply();
			};
			this.deleteNote = function (key){

			};
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function preLink(scope, instanceElement, instanceAttrs, controller) {
					// scope[instanceAttrs.in] = [{name:"bla", content:'ble'},{name:"bli", content:'blo'}];
					var specifiedVariable = instanceAttrs.in;

					if(!specifiedVariable || specifiedVariable.length === 0) specifiedVariable = "notes";

					controller.$bind(specifiedVariable).$from(scope).toLocalStorage();
				}
			};
		}
	};
}])
.directive('new', [function () {
	return {
		priority: 0
		,restrict: 'E'
		,scope: {}
		,require: '^notes'
		// ,transclude: true
		,controller: function($scope, $element, $attrs, $transclude) {
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return { 
				pre: function preLink(scope, instanceElement, instanceAttrs, notesController) {
					scope.name="Pablo";
					scope.content="Garcia";
					scope.$apply();
				}
				,post: function postLink(scope, instanceElement, instanceAttrs, notesController) {
					scope.save = function (){
						notesController.addNote(Date.now(), scope.name, scope.content);
					};
				}
			};
		}
	};
}])
.directive('note', ["$compile", function ($compile) {
	return {
		priority: 0
		,transclude: 'element'
		,restrict: 'E'
		,scope: false
		,require: '^notes'
		,controller: function($scope, $element, $attrs, $transclude) {

		}
		,link: function postLink(scope, instanceElement, instanceAttrs, notesController, transclude) {
			var elem;
			transclude(function (clone){
				console.log(clone);
				elem = "<div ng-repeat='note in "+notesController.expression+"'>"+clone.html()+"</div>";
			});
			elem = $compile(elem)(scope);
			instanceElement.parent().append(elem);
		}
	};
}]);