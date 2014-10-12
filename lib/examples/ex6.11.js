// Simple GET endpoint returning only JSON
app.get('/api/tours', function(req, res){
	res.json(tours);
});