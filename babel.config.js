module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "@babel/plugin-proposal-optional-chaining",
      {
        loose: true,
      },
    ],
    [
      "babel-plugin-transform-imports",
      {
        lodash: {
          transform: "lodash/${member}",
          preventFullImport: false,
        },
      },
    ],
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@assets/": "./src/assets",
          "@components": "./src/components",
          "@navigators": "./src/navigators",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@types": "./types",
          "@store": "./src/store",
          "@providers": "./src/providers",
          "@constants": "./src/constants",
          "@src": "./src",
        },
      },
    ],
  ],
};
