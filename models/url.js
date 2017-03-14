var mongoose = require("mongoose");

var CounterSchema = new mongoose.Schema({
	_id: {type: String, required: true},
	seq: {type: Number, default: 0}
});

var Counter = mongoose.model("Counter", CounterSchema);

var UrlSchema = new mongoose.Schema({
	_id: {type: Number, required: true},
	long_url: String,
	created: Date
});

UrlSchema.pre('validate', function(next) {
	var data = this;
	Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(err, counter) {
		if (err) {
			console.log(err);
			return next(err);
		}
		
		data._id = counter.seq;
		data.created = new Date();
		next();
	});
});

var Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
