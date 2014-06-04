angular.module('LocalStorage', [])
.factory('$localStorage', [function () {
	function Storage(name){
		Object.defineProperty(this, "name", {value: name});
		Object.defineProperty(this, "storage", {value: JSON.parse(window.localStorage.getItem(name)) || {}});
	}
	Object.defineProperties(Storage.prototype, {
		saveChanges: {
			value: function (){
				localStorage.setItem(this.name, JSON.stringify(this.storage));
			}
		},
		add: {
			value: function (key, value){
				if(this.storage[key]) return false;
				this.storage[key] = value;
				this.saveChanges();
				return this;
			}
		},
		put: {
			value: function (key, value){
				this.storage[key] = value;
				this.saveChanges();
				return this;
			}
		},
		remove: {
			value: function (key){
				delete this.storage[key];
				this.saveChanges();
				return this;
			}
		},
		get: {
			value: function (key){
				return this.storage[key];
			}
		}
	});

	return {
		set: function (localStorageName){
			window[localStorageName] = new Storage(localStorageName);
		},
		clean: function (localStorageName){
			delete window[localStorageName];
			window.localStorage.removeItem(localStorageName);
		}
	};
}])