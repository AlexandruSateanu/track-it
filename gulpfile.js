var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    /*karma = require('gulp-karma'),*/
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    /*spritesmith = require('gulp.spritesmith'),*/
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate'),
    ngHtml2Js = require("gulp-ng-html2js"),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    sassLint = require('gulp-sass-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
  del([
    'production'
  ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function () {
  var install = require("gulp-install");

  return gulp.src(['./bower.json'])
    .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass with lint and autoprefixer, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

/*gulp.task('build-css', ['clean'], function () {
  return gulp.src('./public/scss\/**\/*')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./production/css'));
});*/

gulp.task('build-css', function() {
	return gulp.src('./public/scss/**/*.scss')
		.pipe(sassLint({
			options: {
				formatter: 'stylish',
				'merge-default-rules': true
      },
			rules: {
				'indentation': [1, {'size': '2'}],
				'property-sort-order': [1, {'order': 'smacss'}],
				'mixins-before-declarations': 1,
				'nesting-depth': 0,
				'no-ids': 0,
				'no-url-domains': 0,
        'no-url-protocols': 0,
        'no-color-literals': 0
      }
		}))
		.pipe(sassLint.format())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./production/css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./production/css'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', function () {
  return gulp.src(["./app_client/**/*.view.html", "./app_client/**/*.template.html"])
    .pipe(ngHtml2Js({
      moduleName: "trackitPartials"
    }))
    .pipe(concat("templateCachePartials.js"))
    .pipe(gulp.dest("./production/templates"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint for JavaScript files in client app and in API
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function () {
  gulp.src(['./app_client/*.js', './app_api/*js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs karma tests
//
/////////////////////////////////////////////////////////////////////////////////////
/*
gulp.task('test', ['build-js'], function () {
  var testFiles = [
    './test/unit/*.js'
  ];

  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      console.log('karma tests failed: ' + err);
      throw err;
    });
});*/

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function () {
  var b = browserify({
    entries: './app_client/app.js',
    debug: true,
    paths: ['./app_client/common', './app_client/home'],
    transform: [ngAnnotate]
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./production/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launches browsersync
//
/////////////////////////////////////////////////////////////////////////////////////

/*
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",
    port: 5000,
    notify: true,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        }
      }
    }
  });
});*/

/////////////////////////////////////////////////////////////////////////////////////
//
// launches nodemon
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('nodemon', function (cb) {
  var called = false;
  
  return nodemon({
    script: './bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'production/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

/////////////////////////////////////////////////////////////////////////////////////
//
// reload browsersync
//
/////////////////////////////////////////////////////////////////////////////////////
/*
gulp.task('bs-reload', function() {
  browserSync.reload();
});*/

/////////////////////////////////////////////////////////////////////////////////////
//
// full build
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['build-template-cache', 'build-css', 'jshint', 'build-js']);

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers tasks when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function () {
  gulp.watch(['./app_client/**/*.view.html', './app_client/**/*.template.html', './public/scss/**/*.scss', './public/scss/*.scss', './app_client/**/*.js', './app_api/**/*js'], ['build']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build', 'watch', 'nodemon']);
