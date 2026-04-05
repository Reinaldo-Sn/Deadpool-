const { src, dest, series, parallel, watch } = require("gulp");
const fileInclude = require("gulp-file-include");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const { deleteAsync } = require("del");
const path = require("path");

const paths = {
  html: {
    src: "src/*.html",
    dest: "dist",
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/styles",
  },
  scripts: {
    src: "src/*.js",
    dest: "dist",
  },
  images: {
    src: "src/images/**/*",
    dest: "dist/images",
  },
};

function clean() {
  return deleteAsync(["dist"]);
}

function html() {
  return src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src",
      }),
    )
    .pipe(dest(paths.html.dest));
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src).pipe(uglify()).pipe(dest(paths.scripts.dest));
}

function images() {
  return src(paths.images.src, { encoding: false }).pipe(dest(paths.images.dest));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, "dist"),
    },
  });

  watch(["src/**/*.html", "src/components/**/*.html"], html).on(
    "change",
    browserSync.reload,
  );
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, series(scripts, browserSync.reload));
  watch(paths.images.src, series(images, browserSync.reload));
}

const build = series(clean, parallel(html, styles, scripts, images));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.default = series(build, serve);
