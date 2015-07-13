// ładujemy express 
var express = require('express');

// deklarujemy zmienną przypisaną do express
var app = express();

// ładujemy MongoJS
var mongojs = require('mongojs');

// deklarujemy zmienną MongoDB i przypisujemy jej konkretną bazę,
// którą wcześniej utworzyliśmy w bashu
var db = mongojs('contactlist', ['contactlist']);

// deklarujemy zmienną przypisaną do body parsera
// body-parser  
var bodyParser = require('body-parser');

//ustawiamy folder publiczny w naszym projekcie
//to jest root na html, skrypty itp.
app.use(express.static(__dirname + '/public'));

// podłaczamy body parsera do działania
// chyba deklarujemy w tym miejscu żeby parser
// parsował pliki do jsona
app.use(bodyParser.json());

//ustawiamy odpowiedź serwera na request get wysłany
//z controllera, który żąda podania /contactlist
app.get('/contactlist', function (req,res) {

	// testowa wiadomość w momencie gdy serwer
	// faktycznie otrzyma żądanie ze strony
	console.log('I received a GET request');

	//skontaktuj się z bazą, znajdź wszystkie wpisy
	db.contactlist.find(function(err, docs) {
		
		// testowa wiadomość zawierająca wszystkie wpisy
		// jeśli uda się je znaleźć i pobrać
		console.log(docs);
		// wyślij odpowiedź do kontrolera na to żądanie
		// w postaci wpisów z bazy
		res.json(docs);
	});

});

// obsługa requesta POST, który wysyła wpisany przez usera contact
// ze strony
app.post('/contactlist', function (req,res) {
	// testowa informacja, pokazująca w konsoli jak wygląda 
	// sparsowany przez body-parser odebrany obiekt
	console.log(req.body);

	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	});	
});

app.put('/contactlist/:id', function (req,res){
	var id = req.params.id;
	
	console.log(req.body.name);

	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		}
	);
});

// zdefiniowanie portu, na którym mamy prowadzić nasłuch
app.listen(3000);

// komunikat powiadamiający o tym, że serwer działa
console.log('Server running on port 3000');