import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import fetch from 'node-fetch';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../../../Axios';
import Moment from 'moment';
import axios from 'axios';
import {
  Searchbar,
  Button,
  TextInput,
  Card,
  Paragraph,
  Title,
} from 'react-native-paper';

import { colors, fonts } from '../../styles';

import { RadioGroup, GridRow } from '../../components';

// const onChangeSearch = query => setSearchQuery(query);

export default class ExpenseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      listverify: [],
    };
  }

  componentWillMount() {
    fetch(url + 'expense')
      .then(result => result.json())

      .then(data => {
        this.setState({ list: data });
        this.state.list.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        this.setState({ list: data });
      });
  }

  componentDidMount() {
    fetch(url + 'expense')
      .then(result => result.json())

      .then(data => {
        this.setState({ list: data });
        this.state.list.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        this.setState({ list: data });
      });
    fetch(url + 'expense-paid')
      .then(result => result.json())
      .then(data => {
        this.setState({ listverify: data });
        this.state.listverify.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        
        this.setState({ listverify: data });
      });
    this.updateState = this.updateState.bind(this);
  }

  _getRenderItemFunction = () =>
    [this.renderRowTwo, this.renderRowThree][this.props.tabIndex];

  _openArticle = (article, account) => {
    this.props.navigation.navigate('ExpenseView', {
      itemId: article,
      accountName: account,
    });
  };

  searchFilterFunction = text => {
    const newData = this.state.list?.filter(item => {
      const itemData = `${item.amount?.toUpperCase()} ${item.payment_account.name?.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    if (text !== '') this.setState({ list: newData });
    else {
      fetch(url + 'expense')
        .then(result => result.json())
        .then(data => {
          this.setState({ list: data });
        });
    }
  };

  updateState() {
    this.setState({ list: this.state.list });
  }
  //   renderRowOne = rowData => {
  //     const cellViews = rowData.item.map(item => (
  //       <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
  //         <View style={styles.itemOneContainer}>
  //           <View style={styles.itemOneImageContainer}>
  //             <Image style={styles.itemOneImage} source={{ uri: item.image }} />
  //           </View>
  //           <View style={styles.itemOneContent}>
  //             <Text style={styles.itemOneTitle} numberOfLines={1}>
  //               {item.title}
  //             </Text>
  //             <Text
  //               style={styles.itemOneSubTitle}
  //               styleName="collapsible"
  //               numberOfLines={3}
  //             >
  //               {item.subtitle}
  //             </Text>
  //             <Text style={styles.itemOnePrice} numberOfLines={1}>
  //               {item.price}
  //             </Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     ));
  //     return (
  //       <View key={rowData.item[0].id} style={styles.itemOneRow}>
  //         {cellViews}
  //       </View>
  //     );
  //   };

  renderRowTwo = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      // onPress={() => this._openArticle(item)}
    >
      {this.state.list ? (
        this.state.list.map((v, i) => (
          <Card style={styles.item}>
            <Card.Content>
              <View style={styles.itemThreeSubContainer}>
                <View style={styles.itemThreeContent}>
                  <Text style={styles.itemThreeBrand}>
                    {v.payment_account[0]?.name}
                  </Text>
                  <Text style={styles.itemThreeTitle}>
                    Bill No: {v.referrence_bill_no}
                  </Text>
                  <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                    {Moment(v.created_at).format('d MMM YYYY')}
                  </Text>

                  <View style={styles.itemThreeMetaContainer}>
                    {item.badge && (
                      <View
                        style={[
                          styles.badge,
                          item.badge === 'NEW' && {
                            backgroundColor: colors.primary,
                          },
                        ]}
                      >
                        <Text
                          style={{ fontSize: 10, color: colors.white }}
                          styleName="bright"
                          onPress={() =>
                            this._openArticle(v.id, v.account_name)
                          }
                        >
                          View
                        </Text>
                      </View>
                    )}
                    <Text style={styles.itemThreePrice}>{v.amount} SAR</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text />
      )}
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  renderRowThree = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      // onPress={() => this._openArticle(item)}
    >
      {this.state.listverify ? (
        this.state.listverify.map((v, i) => (
          <Card style={styles.item}>
            <Card.Content>
              <View style={styles.itemThreeSubContainer}>
                <View style={styles.itemThreeContent}>
                  <Text style={styles.itemThreeBrand}>
                    {v.payment_account[0]?.name}
                  </Text>
                  <View>
                    <Text style={styles.itemThreeTitle}>
                      Bill No: {v.referrence_bill_no}
                    </Text>
                    <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                      {Moment(v.created_at).format('d MMM YYYY')}
                    </Text>
                  </View>
                  <View style={styles.itemThreeMetaContainer}>
                    {item.badge && (
                      <View
                        style={[
                          styles.badge,
                          
                          v.is_paid === "0" ? {
                            backgroundColor: colors.secondary,
                          }:{ backgroundColor: colors.primary}
                        ]}
                      >
                        {v.is_paid === "0" ? (
                          <Text
                            style={{ fontSize: 10, color: colors.white }}
                            styleName="bright"
                            onPress={() => this._openArticle(v.id, v.id)}
                          >
                            Pending
                          </Text>
                        ) : (
                          <Text
                            style={{ fontSize: 10, color: colors.white }}
                            styleName="bright"
                            onPress={() => this._openArticle(v.id, v.id)}
                          >
                            Payment done
                          </Text>
                        )}
                      </View>
                    )}
                    <Text style={styles.itemThreePrice}>{v.amount} SAR</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text />
      )}
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {
    const groupedData =
      this.props.tabIndex === -1
        ? GridRow.groupByRows(this.props.data, 1)
        : this.props.data;

    return (
      <>
        <View style={styles.container}>
          <View style={{ height: 50 }}>
            <RadioGroup
              selectedIndex={this.props.tabIndex}
              items={this.props.tabs}
              onChange={this.props.setTabIndex}
              underline
            />
          </View>
          <Searchbar
            // style={styles.textInputStyle}
            // onChangeText={text => searchFilterFunction(text)}
            // value={search}
            onChangeText={text => this.searchFilterFunction(text)}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />

          <FlatList
            keyExtractor={item =>
              item.id
                ? `${this.props.tabIndex}-${item.id}`
                : `${item[0] && item[0].id}`
            }
            style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
            data={groupedData}
            renderItem={this._getRenderItemFunction()}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    padding: 1,
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 1,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 1,
    borderColor: colors.primaryGradientStart,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    marginVertical: 12,
  },
});
