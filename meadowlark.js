var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

// For stringent security, hide "x-powered-by: Express" in the headers
app.disable('x-powered-by');

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');



// Specify port
app.set('port', process.env.PORT || 3000);

// Where to serve public client side stuff
app.use(express.static(__dirname + '/public'));

// Parse Forms
app.use(require('body-parser')());

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test === '1';
	next();
});

// Dummy function to get current weather data
function getWeatherData(){
	return {
		locations: [
		{
			name: 'Portland',
			forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
			iconUrl: 'http:icons-ak.wxug.com/i/c/k/cloudy.gif',
			weather: 'Partly Cloudy',
			temp: '54.1 F (12.3 C)',
		},
		{
			name: 'Bend',
			forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
			iconUrl: 'http:icons-ak.wxug.com/i/c/k/partlycloudy.gif',
			weather: 'Partly Cloudy',
			temp: '55.0 F (12.8 C)',
		},
		{
			name: 'Manzanita',
			forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
			iconUrl: 'http:icons-ak.wxug.com/i/c/k/rain.gif',
			weather: 'Light Rain',
			temp: '55.0 F (12.8 C)',
		},

		],
	};
}

// Middleware injection
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});


// routes go here...
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { 
		fortune: fortune.getFortune(), 
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/contact', function(req, res){
	res.render('contact', {
	});
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/nursery-rhyme', function(req, res){
	res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

app.get('/newsletter', function(req, res){
	// we will learn about CSRF later ..for now, we provide dummy value
	res.render('newsletter', {csrf: "CSRF token goes here"});
});

app.post('/process', function(req, res){
	console.log('Form (From querystring): ' + req.query.form);
	console.log('CSRF token (from hidden form field): ' + req.body._csrf);
	console.log('Name (from visible form field): ' + req.body.name);
	console.log('Email (from visible form field): ' + req.body.email);
	res.render(303, '/thank-you');
});

app.post('/process', function(req, res){
	if(reg.xhr || req.accepts('json.html') === 'json'){
		// if there were an error, we would send {error: 'error description'}
		res.send({ success: true });
	} else {
		// if there were an error , we would redirect to an error page
		res.redirect(303, '/thank-you');
	}
});

app.get('/jquery-test', function(req, res){
	res.render('jquery-test');
});

// app.get('/foo', function(req, res){
// 	res.render('foo', {
// 		layout: 'microsite'
// 	});
// });
// Browser Request Headers Info
app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
		res.send(s);
});


// 404 catch-all handler (middleware)
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


