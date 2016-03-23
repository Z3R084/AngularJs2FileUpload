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
var ts = require( 'gulp-typescript' );
var merge = require( 'merge2' );
var gulpFormat = require( 'gulp-clang-format' );
var clangFormat = require( 'clang-format' );
var ddescibeIit = require( 'gulp-ddescribe-iit' );

var PATHS = {src: 'src/**/*.ts', specs: 'src/**/*.spec.ts', demo: 'demo/**/*.ts', demoDist: 'demo/dist/**/*'};

function webpackCallBack( taskName, gulpDone ) {
	return function ( err, stats ) {
		if ( err ) throw new gutil.PluginError( taskName, err );
		gutil.log( "[" + taskName + "]", stats.toString() );
		gulpDone();
	}
}

// Transpililng & Building

var buildProject = ts.createProject( 'tsconfig.json', { declaration: true } );

gulp.task( 'clean:build', function () { return del( 'dist/' ) } );

gulp.task( 'cjs', function () {
	var tsResult = gulp.src( [PATHS.src, '!' + PATHS.specs] ).pipe( ts( buildProject ) );
	return merge( [tsResult.dts.pipe( gulp.dest( 'dist/cjs' ) ), tsResult.js.pipe( gulp.dest( 'dist/cjs' ) )] );
} );

gulp.task( 'umd', function ( cb ) {
	function ngExternal( ns ) {
		var ng2Ns = 'angular2/' + ns;
		return { root: ['ng', ns], commonjs: ng2Ns, commonjs2: ng2Ns, amd: ng2Ns };
	}

	webpack( {
		entry: './dist/cjs/core.js',
		output: { filename: 'dist/global/ng-bootstrap.js', library: 'ngb', libraryTarget: 'umd' },
		externals: { 'angular2/core': ngExternal( 'core' ), 'angular2/common': ngExternal( 'common' ) }
	},
	webpackCallBack( 'webpack', cb ) );
} );

// Formatting

gulp.task( 'check-format', function () {
	return doCheckFormat().on( 'warning', function ( e ) { console.log( 'NOTE: this will be promoted to an ERROR in the continuous build' ); } );
} );

gulp.task( 'enforce-format', function () {
	return doCheckFormat().on( 'warning', function ( e ) {
		console.log( 'ERROR: You forgot to run clang-format on your change.' );
		console.log( 'See' );
		process.exit( 1 );
	} );
} );

function doCheckFormat() {
	return gulp.src( ['gulpfile.js', PATHS.src, PATHS.demo] ).pipe( gulpFormat.checkFormat( 'file', clangFormat ) );
}

// Demo

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

gulp.task( 'build', function ( done ) {
	runSequence( 'clean:build', 'cjs', 'umd', done );
} );

gulp.task('default', function () {
		// place code for your default task here
});