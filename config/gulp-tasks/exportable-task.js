const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");
const tsProject = ts.createProject("tsconfig.json");

let isDevelopment = process.env.NODE_ENV == "development";



module.exports = {
  exportableCSS,
};
