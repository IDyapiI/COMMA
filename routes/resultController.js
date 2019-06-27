const Result = require('../models/result');

function create(req, res) {
	console.log(req.body);
	const result = new Result();
	result.grade = req.body.grade;
	result.groupeId = req.body.groupeId;
	result.userId = req.body.userId;
	result.save(err => {
		if (err) {
			debug('Error during creating user: %s', err.message);
			res.status(400).end();
		} else {
			res.json(result);
			res.status(200).end();
		}
	});
}

function readOne(req, res) {
	Result.findOne({ _id: req.params.id }, (err, result) => {
		if (err) {
			debug('finding problem: %s', err.message);
			res.json({});
		} else {
			res.json(result);
			res.status(200).end();
		}
	});
}

function updateOne(req, res) {
	Result.findById(req.params.id, (err, result) => {
		if (err) {
			debug('Error during fetching series: %s', err.message);
			res.status(400).end();
		} else {
			result.grade = req.body.grade || result.grade;

			result.save(saveErr => {
				if (saveErr) {
					res.json('error during update, error is: ', saveErr);
					res.status(500).end();
				} else {
					res.json(result);
					res.status(200).end();
				}
			});
		}
	});
}

module.exports = {
	create,
	readOne,
	updateOne
};
