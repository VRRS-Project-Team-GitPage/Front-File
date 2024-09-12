module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // plungins 중 마지막에 추가되어야 한다.
      "react-native-reanimated/plugin",
    ],
  };
};
