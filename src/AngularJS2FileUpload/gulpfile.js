/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require( 'gulp' );
var del = require( 'del' );
var webpack = require( 'webpack' );
var webpackDemoConfig = require( './webpack.demo.js' );
var gutil = require( 'gulp-util' );
var runSequence = require( 'run-sequence' );
var ghPages = require( 'gulp-gh-pages' );

var PATHS = {src: 'src/**/*.ts', specs: 'src/**/*.spec.ts', demo: 'demo/**/*.ts', demoDist: 'demo/dist/**/*'};

function webpackCallBack( taskName, gulpDone ) {
	return function ( err, stats ) {
		if ( err ) throw new gutil.PluginError( taskName, err );
		gutil.log( "[" + taskName + "]", stats.toString() );
		gulpDone();
	}
}

gulp.task( 'clean:demo', function () {
	return del( 'demo/dist' );
} );

gulp.task( 'clean:demo-cache', function () {
	return del( '.publish/' );
} );

gulp.task( 'copy:polyfills-demo', function () {
	gulp.src( './node_modules/angular2/bundles/angular2-polyfills.js' ).pipe( gulp.dest( './demo/dist/lib/' ) );
} );

gulp.task( 'build:demo', function ( done ) {
	var config = Object.create( webpackDemoConfig );
	config.plugins = config.plugins.concat( new webpack.optimize.UglifyJsPlugin() );

	webpack( config, webpackCallBack( 'build:demo', done ) );
} );

gulp.task( 'demo-push', function () {
	return gulp.src( PATHS.demoDist ).pipe( ghPages() );
} );

gulp.task( 'deploy-demo', function ( done ) {
	runSequence( 'clean:demo', 'copy:polyfills-demo', 'build:demo', 'clean:demo-cache', done );	//'demo-push',
} );

gulp.task('default', function () {
		// place code for your default task here
});