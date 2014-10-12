// Rendering a view without a layout.
//The following layout doesn't have a layout file, so views/no-layout.handlesbars will be used
app.get('/no-layout', function(req, res){
	res.render('no-layout', { layout: null });
});