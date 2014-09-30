var app = angular.module('directiveWorkshop');

app.directive('pending', function(){
	return {
		restrict: 'AE',
		scope: {
			request: '&'
		},
		link: function(scope, elem, attrs){
			console.log(scope, elem, attrs)
			var loading = angular.element('<img src="images/loading3.gif">').hide();
			elem.after(loading);
			elem.on('click', function(){
				elem.hide();
				loading.show();
				scope.request().then(function(){
					elem.show();
					loading.hide();
				});
			})
		}
	}
})

app.directive('notify', function(){
	return {
		restrict: 'AE',
		scope: {
			title: '=',
			body: '=',
			icon: '='
		},
		link: function(scope, elem, attrs){
			var Notification = window.Notification || window.mozNotification || window.webkitNotification;
			Notification.requestPermission(function (permission) {
                console.log(permission);
            });
			elem.on('click', function(title, body, icon){
				var notification = new Notification(scope.title, {body: scope.body, icon: scope.icon})
			})
		}
	}
})