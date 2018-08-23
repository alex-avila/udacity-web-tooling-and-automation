const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

function reload(done) {
  browserSync.reload();
  done();
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

function styles() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'))
}

const watch = () => gulp.watch('sass/**/*.scss', gulp.series(styles, reload));

gulp.watch('index.html').on('change', browserSync.reload)

const dev = gulp.series(styles, serve, watch)

gulp.task('default', dev)