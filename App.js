import React from 'react';
import {
  StatusBar
} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistor, store} from './store/store';
import theme from './src/styles/theme';
import Home from './src/components/viewComponents/Home';
StatusBar.setBackgroundColor(theme.colors.statusBarColor);
StatusBar.setBarStyle("light-content")

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
                   <Home/>
                </PersistGate>
            </ReduxProvider>
        );
    }
}
export default App;
