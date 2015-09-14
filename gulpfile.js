var gulp         = require('gulp');
var jshint       = require('gulp-jshint');
var beep         = require('beepbeep');
var chalk        = require('chalk');

gulp.task('lint', function() {

    console.log(chalk.magenta.bold('[lint]') + ' Linting JavaScript files');

    return gulp.src(['./**/*.js', '!./**/*.min.js', '!./dashboard/static/components/**/*.js', '!./dashboard/static/js/vendor/**/*.js', '!./node_modules/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));

});

// Watch files for changes
gulp.task('watch', function () {

    console.log(chalk.magenta.bold('[watch]') + ' Watching files for changes');

    gulp.watch(['./**/*.js', '!./static/components/**/*.js', '!./static/js/vendor/**/*.js', '!./node_modules/**/*.js'], ['lint']);

});

// Compile Sass and watch for file changes
gulp.task('dev', ['lint', 'watch'], function () {
    return console.log(chalk.magenta.bold('\n[dev]') + chalk.bold.green(' Ready for you to start doing things\n'));
});

// Compile production Sass
gulp.task('build', ['lint']);
