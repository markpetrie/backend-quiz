app.use(bodyParser.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const actors = require('./routes/actors');
const films = require('./routes/films');
const studios = require('./routes/studios');
const reviewers = require('./routes/reviewers');
const reviews = require('./routes/reviews');


app.use('/auth', auth);
app.use('/actors', actors);
app.use('/films', films);
app.use('/studios', studios);
app.use('/reviewers', reviewers);
app.use('/reviews', reviews);

app.use(errorHandler);

module.exports = app;