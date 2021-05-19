module.export={
    port: process.env.PORT || 8080,
    files:["./**/*.{html,css,js}"],
    server:{
        baseDir:"./webapp",
        routes: { "/": "./" }
    }
}