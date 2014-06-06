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
				this.scope[this.expression].push({
					date:date
					,name:name
					,content:content
					,lastUpdate:lastUpdate||date
				});
				this.scope.$apply();
			};
			this.deleteNote = function (key){

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
					// var elem;
					// transclude(function (clone){
					// 	elem = "<div ng-repeat='note in "+instanceAttrs.in+"'>"+clone.appendTo("<div>").parent().html()+"</div>";
					// });
					// elem = $compile(elem)(scope);
					// instanceElement.append(elem);
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
		,transclude: true
		,controller: function($scope, $element, $attrs, $transclude) {
		}
		,compile: function compile(tElement, tAttrs, transclude) {
			return { 
				pre: function preLink(scope, instanceElement, instanceAttrs, notesController) {
					scope.name="";
					scope.content="";
				}
				,post: function postLink(scope, instanceElement, instanceAttrs, notesController) {
					console.log(notesController);
					scope.save = function (){
						notesController.addNote(Date.now(), scope.name, scope.content);
					}
				}
			};
		}
	};
}]);