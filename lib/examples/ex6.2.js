// Response code other than 200
app.get('error', function(req,res){
	res.staus(500);
	res.render('error');
});
// or on one line...
app.get('/error', function(req,res){
	res.status(500).render('error');	
});