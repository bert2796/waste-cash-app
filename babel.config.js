module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@containers': './src/containers',
          '@components': './src/components',
          '@atoms': './src/components/atoms',
          '@navigations': './src/components/navigations',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@screens': './src/components/screens',
          '@services': './src/services',
          '@state': './src/state',
          '@themes': './src/themes',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
