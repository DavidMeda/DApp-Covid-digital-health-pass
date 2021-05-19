module.export={
    port: process.env.PORT,
    files:["./*.{html, js}"],
    server:{
        baseDir:["./webapp", "./build/contracts"]
    }
}