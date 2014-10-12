// GET endpoint that returns JSON, XML, or text
app.get('/api/tours', function(req, res){
	var toursXml = '<?xml verion="1.0"?>' + 
		products.map(function(p){
			return '<tour price="' + p.price + '" id="' + p.id + '  ">' + p.name + '</tour>';
		}).join('')+ '</tours>'; // }).join('')+ '</tours>'';
	var toursText = tours.map(function(p){
		return p.id + ': ' + p.name + '( ' + p.price + ')';
	}).join('/n');
	res.format({
		'application/json': function(){
			res.json(tours);
		},
		'application/xml': function(){
			res.type('applications/xml');
		},
		'text/xml': function(){
			res.type('text/xml');
			res.send(toursXml);
		},
		'text/plain': function(){
			res.type('text/plain');
			res.send(toursXml);
		}
	});
});