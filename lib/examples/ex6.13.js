// In Example 6-13, the PUT endpoint updates a product and returns JSON. Parameters
// are passed in the querystring (the ":id" in the route string tells Express to add and id
// property to req.params).

// API that updates a tour and returns JSON: params are passed using querystring
app.put('/api/tour/:id', function(req, res){
	var p = tours.some(function(p){ return p.id == req.params.id; }); 
	// var p = tours.some(function(p){ return p.id == req.params.id });
	if( p ) {
		if( req.query.name ) p.name = req.query.name;
		if( req.query.price ) p.price = req.query.price;
		res.json({success: true});
	} else {
		res.json({error: 'No such tour exists.'});
	}
}); 