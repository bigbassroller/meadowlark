// Adding a 404 handler
// This should appear AFTER all of your routes
app.use(function(req, res){
	res.status(404).render('not-found');
});