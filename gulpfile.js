const gulp = require('gulp');
const sassModule = require('gulp-sass');
const sassCompiler = require('sass');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const gifsicle = require('imagemin-gifsicle');


const sass = sassModule(sassCompiler);



// Task to compile SCSS to CSS
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss') // Source folder for SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
        .pipe(gulp.dest('dist/css')); // Destination folder for compiled CSS
});

// Task to optimize images
gulp.task('images', () => {
  console.log('🚀 Iniciando compressão de imagens...\n');
  
  return gulp
    .src('src/images/**/*.{jpg,jpeg,png,svg,gif,ico}')
    .pipe(
      imagemin([
        gifsicle({
          interlaced: true,
          optimizationLevel: 3,
        }),
        mozjpeg({
          quality: 75,
          progressive: true,
        }),
        pngquant({
          quality: [0.6, 0.8],
          speed: 4,
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: true }
          ]
        })
      ], {
        verbose: true,
      })
    )
    .pipe(gulp.dest('dist/images'))
    .on('end', () => {
      console.log('\n✅ Compressão concluída com sucesso!');
    });
});
const defaultTask = gulp.parallel('styles', 'images'); // Default task to run both tasks in series

const watchTask = function() {
    gulp.watch('src/styles/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/images/**/*', gulp.parallel('images')); // Watch images and subfolders for changes
}; // Watch SCSS files and images for changes

exports.default = defaultTask;
exports.watch = watchTask;