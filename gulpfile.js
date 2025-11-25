const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

// Task to compile SCSS to CSS
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss') // Source folder for SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(gulp.dest('dist/css')); // Destination folder for compiled CSS
});

// Task to optimize images
gulp.task('images', function() {
    return gulp.src('src/images/*') // Source folder for images
        .pipe(imagemin()) // Optimize images
        .pipe(gulp.dest('dist/images')); // Destination folder for optimized images
});

exports.default = gulp.parallel('styles', 'images'); // Default task to run both tasks in series
exports.watch = function() {
    gulp.watch('src/styles/**/*.scss', gulp.parallel('styles'));}; // Watch SCSS files for changes