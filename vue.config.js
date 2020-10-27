module.exports = {
    pluginOptions: {
        electronBuilder: {
            // nodeIntegration: true,
            extraResources: ["src/preload.js"]
        }
    }
}