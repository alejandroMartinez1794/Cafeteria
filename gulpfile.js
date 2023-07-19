const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css (done) {
   
    src ('./src/scss/app.scss') // origen
        .pipe(sass()) // que quiero hacer
        .pipe(dest('build/css')) // destino
    done()    
}

function dev (done) {
    watch('./src/scss/app.scss', css)
    done()
}

exports.css = css;
exports.dev = dev;