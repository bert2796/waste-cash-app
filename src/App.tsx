import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ReduxNetworkProvider } from 'react-native-offline';
import * as io from 'socket.io-client';

import ThemeProvider from '@themes/ThemeProvider';
import SocketProvider from '@components/SocketContext';
import { store, persistor } from '@state/store';
import { ScreenInitialLoading } from '@screens/ScreenInitialLoading/ScreenInitialLoading';
import ContainerNavigation from '@containers/ContainerNavigation';

const App: React.FC = () => {
  // const socket = io.connect('wss://waste-cash.com');

  const socket = io.connect('ws://10.0.2.2:3000');

  return (
    <Provider store={store}>
      <PersistGate loading={<ScreenInitialLoading />} persistor={persistor}>
        <ReduxNetworkProvider>
          <ThemeProvider>
            <SocketProvider.Provider value={{ socket }}>
              <ContainerNavigation />
            </SocketProvider.Provider>
          </ThemeProvider>
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
