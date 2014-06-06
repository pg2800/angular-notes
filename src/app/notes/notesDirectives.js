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
				var self = this;
				self.scope[self.expression].push({
					date:date
					,name:name
					,content:content
					,lastUpdate:lastUpdate||date
					,remove: function (){
						self.scope[self.expression].splice(self.scope[self.expression].indexOf(this), 1);
					}
				});
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
		,scope: false
		,require: '^notes'
		,compile: function compile(tElement, tAttrs, transclude) {
			return { 
				pre: function preLink(scope, instanceElement, instanceAttrs, notesController) {
					scope.name="";
					scope.content="";
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
		,transclude: true
		,restrict: 'E'
		,scope: false
		,require: '^notes'
		,link: function postLink(scope, instanceElement, instanceAttrs, notesController, transclude) {
			var elem;
			transclude(function (clone){
				var attributes = instanceElement.outerHTML().match(/<note(.*?)>/)[1];
				elem = "<div "+attributes+" ng-repeat='note in "+notesController.expression+" track by $index'>"+$("<div>").append(clone).html()+"</div>";
			});
			elem = $compile(elem)(scope);
			instanceElement.parent().append(elem);
			instanceElement.remove();
		}
	};
}]);