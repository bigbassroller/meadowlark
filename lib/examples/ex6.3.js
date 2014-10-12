// Passing a context to a view, including querystring, cookie, and session values:
app.get('/greeting', function(req, res){
	res.render('about', {
		message: 'welcome',
		style: req.query.style,
		userid: req.cookie.userid,
		username: req.session.username,
	});
});