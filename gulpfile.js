const gulp = require('gulp');
const sassModule = require('gulp-sass');
const sassCompiler = require('sass');
const imagemin = require('gulp-imagemin');

const sass = sassModule(sassCompiler);



// Task to compile SCSS to CSS
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss') // Source folder for SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(gulp.dest('dist/css')); // Destination folder for compiled CSS
});

// Task to optimize images
gulp.task('images', function() {
    return gulp.src('src/images/*') // Source folder for images
    .pipe(imagemin()) // Optimize images using gulp-imagemin
        .pipe(gulp.dest('dist/images/*')); // Destination folder for optimized images
});

const defaultTask = gulp.parallel('styles', 'images'); // Default task to run both tasks in series

const watchTask = function() {
    gulp.watch('src/styles/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/images/**/*', gulp.parallel('images')); // Watch images and subfolders for changes
}; // Watch SCSS files and images for changes

exports.default = defaultTask;
exports.watch = watchTask;