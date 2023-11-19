//CSS Y SASS

// const { src, dest, watch, series } = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const sourcemaps = require('gulp-sourcemaps');
// const webp = require('gulp-webp');

// function css() {
//   return src("src/scss/app.scss").pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write('.')).pipe(dest("src/styles"));
// }
// async function versionWebp(){

//   const gulpWebp = await import('gulp-webp');

//   return src("src/assets/Imagenes/**/*.{png, jpg}")
//     .pipe(gulpWebp.default())
//     .pipe(dest('src/assets/imgWebp'))
// }

// function dev() {
//   watch("src/scss/**/*.scss", css);
// }

// exports.css = css;
// exports.dev = dev;
// exports.default = series(versionWebp, css, dev)

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
  return src("src/assets/Imagenes/**/*.{png, jpg}")
    .pipe(webp())
    .pipe(dest('src/assets/imgWebp'));
}

function versionAvif() {
  return src("src/assets/Imagenes/**/*.{png, jpg}")
    .pipe(avif())
    .pipe(dest('src/assets/imgAvif'))
}

function dev() {
  watch("src/scss/**/*.scss", css);
}

export default series(versionWebp, versionAvif, css, dev)