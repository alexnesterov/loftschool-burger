const gulp = require('gulp');
const sass = require('gulp-sass');
const bourbon = require('node-bourbon');
const prefix = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const reload = browserSync.reload;
const zip = require('gulp-zip');
const ghPages = require('gulp-gh-pages');


// Пути проекта
var path = {
  app: {
    html: 'app/*.pug',
    css: 'app/assets/styles/*.sass',
    js: 'app/assets/scripts/*.js',
    img: 'app/assets/images/**/*',
    fonts: 'app/assets/fonts/**/*',
    rootfiles: [
      'app/*.*',
      '!app/*.pug'
    ]
  },
  dist: {
    html: 'dist',
    css: 'dist/assets/styles',
    js: 'dist/assets/scripts',
    img: 'dist/assets/images',
    fonts: 'dist/assets/fonts',
    rootfiles: 'dist'
  },
  watch: {
    html: 'app/**/*.pug',
    css: 'app/assets/styles/**/*',
    js: 'app/assets/scripts/**/*',
    img: 'app/assets/images/**/*',
    fonts: 'app/assets/fonts/**/*',
    rootfiles: [
      'app/*',
      '!app/*.pug'
    ]
  },
  clean: 'dist/*'
}

// Создает архив собранного проекта
gulp.task('zip', function () {
  return gulp.src('dist/**/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./'))
});

// Очистка папки дистрибутива dist
gulp.task('clean', ['clear'], function() {
  return del(path.clean);
});

// Очистка кэша
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Копирует все файлы из корня папки app
gulp.task('copy-rootfiles', function() {
  return gulp.src(path.app.rootfiles)
    .pipe(gulp.dest(path.dist.rootfiles));
});

// Компилирует pug файлы
gulp.task('build-html', function() {
  return gulp.src(path.app.html)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('jade-watch', ['build-html'], reload);

// Компилирует sass файлы
gulp.task('build-styles', function() {
  return gulp.src(path.app.css)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: bourbon.includePaths
    }))
    .pipe(prefix({
      browsers: ['last 15 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}));
});

// Копирует скрипты
gulp.task('build-scripts', function() {
  return gulp.src(path.app.js)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('scripts-watch', ['build-scripts'], reload);

// Сжимает и копирует изображения
gulp.task('build-images', function() {
  return gulp.src(path.app.img)
    .pipe(plumber())
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(path.dist.img));
});

// Копирует шрифты
gulp.task('build-fonts', function() {
  return gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

// Собирает проект
gulp.task('build', ['clean'], function(callback) {
  runSequence(
    'build-fonts',
    'build-images',
    'build-styles',
    'build-scripts',
    ['build-html', 'copy-rootfiles'],
    callback);
});

// Запускает сервер Browsersync и слежку за файлами
gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 1508,
    notify: false
  });

  gulp.watch(path.watch.html, ['jade-watch']);
  gulp.watch(path.watch.rootfiles, ['copy-rootfiles']);
  gulp.watch(path.watch.css, ['build-styles']);
  gulp.watch(path.watch.js, ['scripts-watch']);
  gulp.watch(path.watch.img, ['build-images']);
  gulp.watch(path.watch.fonts, ['build-fonts']);

});

// Deploy gh-pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Задача по-умолчанию
// Запускает окружение для разработки
gulp.task('default', ['serve']);
