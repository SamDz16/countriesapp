const express = require('express');
const app = express();
const path = require('path');
const wcc = require('world-countries-capitals');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/countries', (req, res) => {
	const countries = wcc
		.getAllCountries()
		.filter((country) => country !== 'israel');
	res.render('countries', { countries });
});

app.get('/countries/:country', (req, res) => {
	let { country } = req.params;
	country = country.toLowerCase();
	if (country !== 'israel') {
		const countries = wcc.getAllCountries();
		if (countries.indexOf(country) !== -1) {
			countryDetails = wcc.getCountryDetailsByName(country);
			res.render('country', { ...countryDetails[0] });
		} else res.render('error', { url: req.url });
	} else res.render('error', { url: req.url });
});

app.get('*', (req, res) => {
	res.render('error', { url: req.url });
});

const port = 3000;
app.listen(port, () =>
	console.log(`App is listening at http://localhost:${port}`)
);
