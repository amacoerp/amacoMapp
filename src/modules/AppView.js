import React from 'react';
import {
  Text,
 
} from 'react-native';
import Navigator from './navigation/Navigator';


export default function AppView() {
  return <Navigator onNavigationStateChange={() => {}} uriPrefix="/app" />;
  
}
