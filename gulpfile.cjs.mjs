import pkg from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import webp from 'gulp-webp';
import avif from 'gulp-avif'

const compileSass = gulpSass(sass)
const { src, dest, watch, series } = pkg

function css() {
  return src("src/scss/app.scss").pipe(sourcemaps.init()).pipe(compileSass()).pipe(sourcemaps.write('.')).pipe(dest("src/styles"));
}

function versionWebp() {
  return src("src/assets/Imagenes/**/*.{jpg,jpeg,png}")
    .pipe(webp())
    .pipe(dest('src/assets/imgWebp'));
}

function versionAvif() {
  return src("src/assets/Imagenes/**/*.{jpg,jpeg,png}")
    .pipe(avif())
    .pipe(dest('src/assets/imgAvif'))
}

function dev() {
  watch("src/scss/**/*.scss", css);
}

export default series(versionWebp, versionAvif, css, dev)