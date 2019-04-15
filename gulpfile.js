const gulp=require("gulp");
const minCss=require("gulp-clean-css");
const uglify=require("gulp-uglify");
const server=require("gulp-webserver");
const sass=require("gulp-sass");
// let fs=require("fs");
// let path=require("path");
// let url=require("url");
gulp.task("devSass",()=>{
    return gulp.src("./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/css/"))
})


  gulp.task("watching", function () {
    gulp.watch("./src/sass/**/*.scss",gulp.series("devSass"));
  })
    gulp.task("webserver",()=>{
        return gulp.src("./src/")
        .pipe(server({
            port:8080,
            open:true,
            livereload:true,
            proxies:[
                {
                    source:"/home",target:"http://localhost:3000/home"
                }
            ]
          
        }))
    })
    gulp.task("default",gulp.series("devSass","webserver","watching"));


//线上环境
//压缩CSS  
gulp.task("zipCss",()=>{
    return gulp.src("./src/css/style.css")
    .pipe(minCss())
    .pipe(gulp.dest("./dist/css/"))
})
//压缩jS  
gulp.task("zipJs",()=>{
    return gulp.src("./src/js/index.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"))
})
gulp.task("dist",gulp.parallel("zipCss","zipJs"));
