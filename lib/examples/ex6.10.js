// body-parser middlewar must be linked in
app.post('/process-contact', function(req, res){
	console.log('Recieved contact from ' + req.body.name + ' <' + req.bodyemail + '>');
	try {
			// save to database....
			return res.xhr ?
			res.render({ success: true}) :
			res.redirect(303, '/thank-you');
	} catch(ex) {
		return res.xhr ?
			res.json({ error: 'Database error.' }) :
			res.redirect(303, '/database-error');
	}
});