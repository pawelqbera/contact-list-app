// deklaracja i przypisanie konkretnegp Angular modułu
// którego hook znajduje się w htmlu w postaci ng-app='myApp'
var myApp = angular.module('myApp', []); 


// definiujemy kontroler odpowiadający za wysyłanie
// requestów i pobieranie responsów z serwera
myApp.controller('AppCtrl', ['$http','$scope', function ($http, $scope) {    

	// funkcja wykonująca GET request do serwera, aby pobrać
	// aktualną bazę kontaktów 
	var refresh = function() {	
		
		// GET request do serwera i obsługa odpowiedzi jeżeli nadejdzie
		// z serwera
		$http.get('/contactlist').success(function (response){
			console.log('I got the data I requested.');
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();

	// wyślij listę kontaktów na serwer
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function (response){
			console.log(response);
			//pobierz nową listę kontaktów z bazy
			refresh();
		});
	};

	// obsługa DELETE rquesta: wyślij żądanie usunięcia wpisu 
	// o konkretnym id, następnie w razie poz odpowiedzi obsłuż
	// responsa przez zaktulizowanie wyświetlanej listy kontaktów 
	$scope.remove = function(id) {
		console.log(id);
		
		$http.delete('/contactlist/' + id).success(function (response) {
			refresh();
		});
	};

	// responsa przez zaktulizowanie wyświetlanej listy kontaktów 
	$scope.edit = function(id) {
		console.log(id);
		

		$http.get('/contactlist/' + id).success(function (response) {
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response){
			refresh();
		});
	};

	$scope.deselect = function() {

		$scope.contact = '';

		
	};

}]);