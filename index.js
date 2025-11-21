import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import AppProviders from './src/app/AppProviders';

AppRegistry.registerComponent(appName, () => AppProviders);