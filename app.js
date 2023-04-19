// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc9Got5jj1EPes-we3Xt_KDgRU278JPSc",
  authDomain: "sergion-icv.firebaseapp.com",
  projectId: "sergion-icv",
  storageBucket: "sergion-icv.appspot.com",
  messagingSenderId: "484001833609",
  appId: "1:484001833609:web:d7b5000c2bc0d826999c58",
  measurementId: "G-F8DMGSS4FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

//////////////////////////////////////Firebase Above/////////////////////////////////////////////////////


// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const path = require('path')

const config = {
	views: 'views', 	// Set views directory
	static: 'public', // Set static assets directory
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
}

//const app = vertex.app(config) // initialize app with config options

// order matters here:
app.use(vertex.fetchGlobal(process.env.TURBO_API_KEY, process.env.TURBO_ENV, turbo)) // fetch global config on every route
app.use(vertex.setConfig(process.env)) // set CDN and global object on 'req.config'

// import routes
const page = require('./routes/page')
const api = require('./routes/api')

// set routes
app.use('/', page)
app.use('/api', api)


module.exports = app
