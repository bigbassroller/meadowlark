// The layout file views/layouts/custom.handlebars will be used
app.get('/custom-layout', function(req, res){
	res.render('custom-layout', { layout: 'custom'});
});