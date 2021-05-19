module.export={
    port: process.env.PORT,
    files:["./**/*.{html,css,js}"],
    server:{
        baseDir:["./webapp", "./build/contracts"]
    }
}