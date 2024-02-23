module.exports = {
  // config for a library is scoped under "dependency" key
  dependency: {
    platforms: {
      ios: { sourceDir: "./ios" },
      android: {}, // projects are grouped into "platforms"
    },
    assets: ["./src/assets/", "./src/assets/fonts/"], // stays the same
  },
};
