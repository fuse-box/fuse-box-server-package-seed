const { FuseBox, Sparky, QuantumPlugin } = require("fuse-box");

let fuse, app, isProduction;
Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        output : "dist/$name.js",
        target: "server@es6",
        globals: { 'default': '*' },
        plugins : [
            isProduction &&
                QuantumPlugin({
                    target : "server",
                    containedAPI : true,
                    bakeApiIntoBundle : "app"
                })
        ]
    });

});
// development
// once bundled it will be executed
// changes are watched
Sparky.task("default", ["config"], () => {
    fuse.bundle("dev")
        .instructions(">[dev.ts]")
        .watch()
        .completed(proc => proc.start())
    return fuse.run();
});

Sparky.task("set-prod-env", () => {
    isProduction = true;
});

// dist
// test before
Sparky.task("dist", ["test", "set-prod-env", "config"], () => {
    fuse.bundle("app")
        .instructions("[index.ts]") // add > if you want to execute bundle's entry point once loaded
    return fuse.run();
});

// test
Sparky.task("test", ["config"], () => {
    return fuse.bundle("app").test();
});