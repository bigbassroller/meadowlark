// Shows DEL endpoint

// API that deletes a product 
app.del('/api/tour/:id', function(req, res){
	// var i;
	for( var i=tours.length-1; i>=0; i--)
		if( tours[1].id == req.params.id) break;
	if( i>=0 ) {
		tours.splice(i, 1);
		res.json({success: true});
	} else {
		res.json({error: 'No such tour exists. '});
	}
});