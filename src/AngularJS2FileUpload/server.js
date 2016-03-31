var express = require( 'express' );
var multer = require( 'multer' );
var fs = require( 'fs' );
var app = express();

var DIR = './uploads/';
var storage = multer.diskStorage( {
	destination: DIR,
	filename: function ( req, file, cb ) {
		var name = file.originalname.substring( 0, file.originalname.lastIndexOf( '.' ) );
		name += '-' + Date.now() + file.originalname.substring( file.originalname.lastIndexOf( '.' ) );
		cb( null, name );
	}
} );
//var upload = multer( { dest: DIR } );
var upload = multer( { storage: storage } );
//var upload = multer( {
//	dest: DIR,
//	rename: function ( fieldname, filename ) {
//		return filename + Date.now();
//	},
//	onFileUploadStart: function ( file ) {
//		console.log( file.originalname + ' is starting ...' );
//	},
//	onFileUploadComplete: function ( file ) {
//		console.log( file.fieldname + ' uploaded to  ' + file.path );
//	}
//} );

app.use( express.static( 'demo/dist' ) );
app.use( function ( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000' );
	res.setHeader( 'Access-Control-Allow-Methods', 'POST' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' );
	res.setHeader( 'Access-Control-Allow-Credentials', true );
	next();
} );

//app.use( multer( {
//	dest: DIR,
//	rename: function ( fieldname, filename ) {
//		return filename + Date.now();
//	},
//	onFileUploadStart: function ( file ) {
//		console.log( file.originalname + ' is starting ...' );
//	},
//	onFileUploadComplete: function ( file ) {
//		console.log( file.fieldname + ' uploaded to  ' + file.path );
//	}
//} ) );

//app.all( '*', function ( req, res, next ) {
//	console.log( 'incoming' );
//	console.log( req.url );
//	next();
//} );

app.get( '/', function ( req, res ) {
	res.sendFile( __dirname + "/demo/dist/index.html" );
} );

app.post( '/Home/Upload', upload.single('file'), function ( req, res, next ) {

} );

var PORT = process.env.PORT || 3000;
app.listen( PORT, function () {
	console.log( 'Working on port ' + PORT );
} );