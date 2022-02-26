const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3001;
const pool = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/admin/access', (req, res) => {
	pool.execute('select * from portfolio;', (err, result) => {
		if (err) res.send(err);
		else res.send({ status: 'success', result: result });
	});
});

app.post(`/api/post`, async(req, res) => {
	const {
		contactName,
		contactEmail,
		contactSubject,
		contactMessage,
		date,
		country,
		state,
		city,
		ip,
	} = req.body;

	const mySqlPost = `
    insert into portfolio 
    (contactName,contactEmail,contactSubject,contactMessage,date,country,state,city,ip) 
    values 
    (
    '${contactName}','${contactEmail}','${contactSubject}','${contactMessage}','${date}','${country}','${state}','${city}','${ip}'
    );`;
	await pool.execute(mySqlPost, (err, result) => {
		if (err) console.log(err);
		else console.log('POST is SUCCESS');
	});
});

app.listen(PORT, () => console.log(' server is listening on PORT: ', PORT));
