import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {AuthContext} from '../../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import NavigatorView from './RootNavigation';
import LoginScreen from '../Screen/Login';

import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';

const iconHome = require('../../../assets/images/drawer/home.png');
const iconProduct = require('../../../assets/images/drawer/home.png');
const iconCalendar = require('../../../assets/images/drawer/calendar.png');
const iconGrids = require('../../../assets/images/drawer/grids.png');
const iconPages = require('../../../assets/images/drawer/pages.png');
const iconComponents = require('../../../assets/images/drawer/components.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');
const iconBlog = require('../../../assets/images/drawer/blog.png');
const iconExpense = require('../../../assets/images/drawer/currency.png');

const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
  },
  // {
  //   name: 'Product',
  //   icon: iconProduct,
  // },
  {
    name: 'Expense',
    icon: iconExpense,
  },
  // {
  //   name: 'Calendar',
  //   icon: iconCalendar,
  // },
  // {
  //   name: 'Grids',
  //   icon: iconGrids,
  // },
  // {
  //   name: 'Pages',
  //   icon: iconPages,
  // },
  // {
  //   name: 'Components',
  //   icon: iconComponents,
  // },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  // const SignOut = async () => {
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', 'stored value')
  //   } catch (e) {
  //     // saving error
  //   }
  // }
  const SignOut = () => {
    const arr=AsyncStorage.removeItem('userToken');
    // console.log(JSON.parse(arr))
    props.navigation.navigate('Home');
  };
  const {signOut}=React.useContext(AuthContext);
  return (
    
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.avatarContainer}>
        <Image
          // style={styles.avatar}
          style={{ paddingHorizontal: 12, paddingVertical: 12 }}
          source={require('../../../assets/images/drawer/logowhite.png')}
        />
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text style={styles.userName}>Danish</Text>
        <Text style={{ color: '#4BC1FD' }}>danish@amacoerp.com</Text>
      </View>

      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Image style={{ width: 20, height: 20 }} source={item.icon} />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
      <View style={styles.divider} />
      {/* <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconBlog}
            />
            <Text style={styles.menuTitle}>Blog</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Blog')}
      />
      <View style={styles.divider} /> */}
      {/* <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconSettings} 
            />
            <Text style={styles.menuTitle}>Settings</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Calendar')}
      /> */}
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image style={{ width: 20, height: 20 }} source={iconSettings} />
            <Text style={styles.menuTitle}>Logout</Text>
          </View>
        )}
        onPress={async () => {
          await signOut();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#161c37',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff',
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10,
  },
});
