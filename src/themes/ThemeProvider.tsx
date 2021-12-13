import React from 'react';
import { DefaultTheme, Colors, Provider } from 'react-native-paper';

interface Props {
	children?: React.ReactNode;
}

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.green500,
	},
};

const ThemeProvider: React.FC<Props> = ({ children }) => (
	<Provider theme={theme}>{children}</Provider>
);

export default ThemeProvider;
