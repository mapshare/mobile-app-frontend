/**
 * @format
 */

import {AppRegistry} from 'react-native';
import dotenv from 'dotenv;';
import App from './App';
import {name as appName} from './app.json';

dotenv.configure();
AppRegistry.registerComponent(appName, () => App);
