

const {src, dest, watch, series, parallel} = require('gulp');

// depedencias de CSS y SSASS 
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// depedencias de imagenes
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const webp= require('gulp-webp');
const avif= require('gulp-avif');

function css (done) {
   
    src ('./src/scss/app.scss') // origen
        .pipe(sass())
        .pipe( postcss ([autoprefixer()])) // que quiero hacer
        .pipe(dest('build/css')) // destino
    done()    
}

function imagenes () {
    return src ('./src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))    
}

function versionWebp () {
    const opciones = {
        quality: 50
    }
    return src ('./src/img/**/*{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif () {
    const opciones = {
        quality: 50
    }
    return src ('./src/img/**/*{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function dev (done) {
    watch('./src/scss/**/*.scss', css);
    watch('./src/img/**/*', imagenes);    
    done()
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = dev;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);