import React from 'react';
import {
  StatusBar
} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistor, store} from './store/store';
import theme from './src/styles/theme';
import Home from './src/components/viewComponents/Home/AppContent';
StatusBar.setBackgroundColor(theme.colors.statusBarColor);
StatusBar.setBarStyle("light-content")
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppContent from './src/components/viewComponents/Home/AppContent';
//import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

class App extends React.Component {

    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render(){
        return (

            <ReduxProvider store={store}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <NavigationContainer>
                        <AppContent />
                    </NavigationContainer>
                </PersistGate>
            </ReduxProvider>
        );
    }
}
//AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
export default App;
