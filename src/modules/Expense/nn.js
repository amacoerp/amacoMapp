import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  ScrollView,Picker,
  Image,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Moment from 'moment';
import {
  List,
  Button,
  RadioButton,
  Menu,
  Divider,
  Provider,
  TextInput,
  Card,
} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import fetch from 'node-fetch';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { Icon, Avatar } from 'react-native-elements';
import url, { phpurl } from '../../../Axios';

import { colors, fonts } from '../../styles';
import { Text } from '../../components/StyledText';
import color from 'color';
const iconview = require('../../../assets/images/drawer/view.jpg');
const arrowIcon = require('../../../assets/images/pages/arrow.png');

export default function AddexpenseScreen(props) {
 
  const nestedObject = [
    {
      itemId: 1,
      itemDetails: {
        name: 'C',
        caregory: 'Programming Language',
        price: 500,
      },
      itemCategory: 'Basic',
    },
    {
      itemId: 2,
      itemDetails: {
        name: 'C++',
        caregory: 'Programming Language',
        price: 700,
      },
      itemCategory: 'Beginner',
    },
    {
      itemId: 1,
      itemDetails: {
        name: 'Java Script',
        caregory: 'Web Development',
        price: 1500,
      },
      itemCategory: 'Advanced',
    },
  ];
  const [isAlive, setisAlive] = React.useState(false);
  const [checkedbox, setcheckedbox] = React.useState(false);
  const [List, setList] = React.useState([]);
  const [List3, setList3] = React.useState([]);
  const [singleFile, setSingleFile] = React.useState(null);
  const [checked, setChecked] = React.useState(null);
  const [List1, setList1] = React.useState([]);
  const [paymentaccount, setpaymentaccount] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [visiblepayment, setvisiblepayment] = React.useState(false);
  const [columnid, setcolumnid] = React.useState();
  const [check, setcheck] = React.useState(true);
  const [amount, setamount] = React.useState('');
  const [paidto, setpaidto] = React.useState('');
  const [paidby, setpaidby] = React.useState('');
  const [paidbyname, setpaidbyname] = React.useState('');
  const [categoryname, setcategoryname] = React.useState('');
  const [cname, setcname] = React.useState('');
  const [refbill, setrefbill] = React.useState('');
  const [taxamount, settaxamount] = React.useState('');
  const [description, setdescription] = React.useState('');
  const [date, setDate] = React.useState(
    Moment(new Date()).format('YYYY-MM-DD'),
  );
  const [expensename, setexpensename] = React.useState('');
  const isVisible = useIsFocused();
  
  React.useEffect(() => {
    let isMounted = true;  
    console.log("sSs",url);
    axios.get(`${url}/getMCat`).then((data) => {
      setList(data.gData)
      console.log("ssss",data);
});
    // fetch(url + 'getMCat')
    //   .then(result => result.json())
    //   .then(data => {
    //     console.log("ssss",data);
    //     if (isMounted) setList(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // fetch(url + 'payment-account')
    //   .then(result => result.json())
    //   .then(data => {
    //     if (isMounted) setpaymentaccount(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // axios
    // .get('http://192.168.60.154/file/controller/expense.php')
    // .then(function (response) {
    //   alert(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   // handle error
    //   alert(error.message);
    // })
    // return () => {
    //   isMounted = false;
    //   setisAlive(true);
    // };
    return setisAlive(true);
  }, [isAlive, check, isVisible]);

  const openMenu = () => setVisible(true);

  const closeMenu = n => {
    setVisible(false);
    
  };
  const openMenu1 = () => {
    setVisible1(true);
  };

  const closeMenu1 = () => setVisible1(false);
  const openMenupayment = () => setvisiblepayment(true);

  const closeMenupayment = () => setvisiblepayment(false);
  const setValue = ( v) => {
    // setpaidby(n);
    setpaidbyname(v);
    closeMenupayment();
  };

  const checkcat1 = (v, data, n) => {



    setcheck(false);
    closeMenu();
    data.map((item, i) => {
      if (
        item.sub_categories.length >= 2 &&
        item.sub_categories[0].category.parent_id === v
      ) {
        const arr = item.sub_categories.filter(season => {
          return season.category.parent_id === v;
        });

        setList1(arr);
        setcategoryname(v);
        setcheck(true);
      }

      FieldSet(v, item.sub_categories[0]?.category.id, n);
      setexpensename(n);
    });
  };

  const checkcat = (v, data, n) => {
    setcheck(false);
    closeMenu();

    data.map((item, i) => {
      if (
        item.sub_categories.length >= 2 &&
        item.sub_categories[0].category.parent_id === v
      ) {
        const arr = item.sub_categories.filter(season => {
          return season.category.parent_id === v;
        });

        setList1(arr);

        setcheck(true);
      }
      FieldSet(v, item.sub_categories[0]?.category.id, n);
      setexpensename(v);
      if (!categoryname) {
        setcategoryname(n);
      }
    });
  };

  const FieldSet = (v, n, name) => {
    fetch(url + `columns/${v}`)
      .then(result => result.json())
      .then(data => {
        if (data[0].column.length) {
          setList3(data[0].column);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const RecursiveComponent = category => {
    return (
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Menu
          visible={visible1}
          onDismiss={closeMenu1}
          anchor={
            <Button onPress={() => setVisible1(true)}>
              Choose Sub Category
            </Button>
          }
        >
          {List1.map((item, i) => (
            <Menu.Item
              onPress={() =>
                checkcat(
                  item.category.id,
                  List1,
                  item.category.name,
                  setcolumnid(item.category.id),
                )
              }
              title={item.category.name}
            />
          ))}
        </Menu>
      </View>
    );
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file

      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const selectMultipleFile = async (id) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      
      // Setting the state to show single file attributes
      const result = List3; // copy state
      result.map(el => {
        // map array to replace the old comment with the new one
      
        
          el.text = res;
          el.column_id = id;
        
        return el;
      }); // copy state
 
    // setfield(result);
    setisAlive(false);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
    const [selectedValue, setSelectedValue] = React.useState("Please select Utilized Division...");

  const uploadData = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      // Please change file upload URL
      let res = await fetch('http://localhost/upload.php', {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };
  const handleComment = (e, item, i) => {
    const result = List3; // copy state
    result.map(el => {
      // map array to replace the old comment with the new one
    
      if (el.name === item.name) {
        el.text = e;
        el.column_id = i;
      }
      return el;
    });
    // setfield(result);
    setisAlive(false);
    // set state with new comment
  };
  const handleFormSubmit = () => {
    const formData = new FormData();
    // for (const key of Object.keys(files)) {
    //   newItem.append('item', files[key].file)
    // }
    // if(tax)
    // {
    // formData.append("tax", parseFloat(taxamount).toFixed(2))
    // formData.append("company_name",company)
    // }
    const res = {
      name: singleFile.name,
      uri: singleFile.uri,
      type: singleFile.type,
    };
    formData.append('file_path', {
      name: singleFile.name,
      uri: singleFile.uri,
      type: singleFile.type,
    });
    List3.map((answer, i) => {  
      // formData.append(`quotation_detail${i}`,JSON.stringify(answer))
      formData.append(`file${answer.column_id}`,answer.text)
     console.log(answer.column_id);
     console.log(answer.text);
      // answer.files&& (formData.append(`file${i}`,answer.files))
    })
    formData.append('bank_slip', JSON.stringify(res));
    formData.append('paid_date', date);
    formData.append('referrence_bill_no', refbill);
    formData.append('amount', parseFloat(amount).toFixed(2));
    formData.append('paid_to', paidto);
    formData.append('description', description);
    // formData.append("created_by",created_by)
    formData.append('account_category_id', columnid);

    formData.append('payment_account_id', paidby);
    formData.append('created_by', 1);

    formData.append('status', 'new');
    formData.append('data', JSON.stringify(List3));
    if (checked === 'first') {
      formData.append('tax', parseFloat(taxamount).toFixed(2));
      formData.append('company_name', checkedbox);
    }
    console.log(formData)
    axios
      .post(`${phpurl}/expense.php`, formData)
      .then(response => {
        console.log('hd' + response.data);
        alert('Data Saved successfully');
        props.navigation.goBack();
        props.navigation.navigate('Expenses');
      })
      .catch(error => console.log('hsdfff' + error));
  };

  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar
          size="medium"
          overlayContainerStyle={{ backgroundColor: 'blue' }}
          icon={{ name: 'arrow-left', color: 'white', type: 'font-awesome' }}
          rounded
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.goBack();
            props.navigation.navigate('Expense');
          }}
        />

        <Text />
        <Avatar
          size="medium"
          overlayContainerStyle={{ backgroundColor: 'blue' }}
          icon={{ name: 'eye', color: 'white', type: 'font-awesome' }}
          rounded
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate('Expenses')}
        />
      </View>
     
     <View style={{
              padding: 18,
              justifyContent: 'center',
            }}>
          <Text >Utilized Division</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        
        // onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        >
        <Picker.Item label='Please select Utilizzed Division...' value='0' />
          {paymentaccount?.map((item, key) => (
              
              <Picker.Item
              label={ item?.name}
                value={item?.id}
                onValueChange={() => { setValue(item.id, item.name) }}

                key={key}
              />
            ))}
      </Picker>

 <Text >Paid By</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        
        // onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
      >
            {paymentaccount?.map((item, key) => (
              <Picker.Item
                label={item?.name}
                value={item?.id}
                onValueChange={() => { setValue(item.id, item.name) }}

                key={key}
              />
            ))}
      </Picker>



      <Text>Choose Category</Text>
      <Picker
        selectedValue={categoryname}
        onValueChange={(itemValue, itemIndex) => checkcat1(itemValue,List)}
       >
            {List?.map((item, key) => (
              <Picker.Item
                label={item?.name}
                value={item?.id}
                // onValueChange={() => { setValue(item.id, item.name) }}
                key={key}
              />
            ))}
          </Picker>
      
          <Text>Choose Sub Category</Text>
      <Picker
        selectedValue={expensename}
        onValueChange={(itemValue, itemIndex) => checkcat(
                  itemValue,
                  List1
                )}
       >
            {List1?.map((item, key) => (
              <Picker.Item
                label={item?.category?.name}
                value={item?.category?.id}
                // onValueChange={() => { setValue(item.id, item.name) }}
                key={key}
              />
            ))}
              </Picker>
              </View>
      <View style={styles.container}>
        <Provider>
          <View
            style={{
              paddingTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Menu
              visible={visiblepayment}
              onDismiss={closeMenupayment}
              anchor={<Button onPress={openMenupayment}>paidby</Button>}
            >
              {paymentaccount.map((item, i) => (
                <Menu.Item
                  onPress={() => setValue(item.id, item.name)}
                  title={item.name}
                />
              ))}
            </Menu>
            {paidby !== '' && (
              <Text
                style={{
                  fontFamily: fonts.primaryBold,
                  fontSize: 15,
                  paddingLeft: 1,
                  textAlign: 'center',
                  paddingTop: 10,
                  color: 'primary',
                }}
              >
                {selectedValue}
              </Text>
            )}
          </View>

          <View
            style={{
              paddingTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
          
            {/* {expensename? ( */}

            {check && (
              <Text
                style={{
                  fontFamily: fonts.primaryBold,
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'primary',
                  paddingTop: 10,
                }}
              >
                {categoryname}
              </Text>
            )}
          </View>
          {/* <Text
            style={{
              fontFamily: fonts.primaryBold,
              fontSize: 20,
              paddingLeft: 10,
              textAlign: 'center',
              paddingBottom: 1,
              color: 'primary',
            }}
          >
            {cname}
          </Text> */}

          <View
            style={{
              paddingTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {categoryname !== null ? RecursiveComponent(List1) : ""}
          </View>
        </Provider>
 
        <ScrollView>
          {!check && (
            <Text
              style={{
                fontFamily: fonts.primaryBold,
                fontSize: 20,
                paddingLeft: 1,
                paddingBottom: 15,
                color: '#5F5F5F',
              }}
            >
              {/* {expensename} */}
            </Text>
          )}
          {!check &&
            List3.map((item, i) => {
              if (item.type === 'file') {
                return (
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={()=>selectMultipleFile(item.id)}
                  >
                    <Text style={styles.buttonTextStyle}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }
              if (item.type === 'text') {
                return (
                  <TextInput
                    label={item.name}
                    mode="outlined"
                    style={{ padding: 15 }}
                    onChangeText={e => handleComment(e, item, item.id)}
                  />
                );
              }
              if (item.type === 'date') {
                return (
                  <>
                    <Text>{item.name}</Text>
                    <DatePicker
                      style={{
                        width: 300,
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}
                      onDateChange={e => handleComment(e, item, item.id)}
                      date={item.text}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                        // ... You can check the source to find the other keys.
                      }}
                    />
                  </>
                );
              }
            })}

          {!check && (
            <>
              <Text>Paid Date</Text>
              <DatePicker
                style={{
                  width: 300,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
                date={date}
                onDateChange={setDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
              />
            </>
          )}
          {!check && (
            <TextInput
              label="Paid To"
              mode="outlined"
              style={{ padding: 15 }}
              onChangeText={text => setpaidto(text)}
            />
          )}

          {!check && (
            <TextInput
              label="Amount"
              style={{ padding: 15 }}
              name="amount"
              mode="outlined"
              onChangeText={e => setamount(e)}
            />
          )}

          {!check && (
            <TextInput
              label="Referrence Bill No"
              mode="outlined"
              style={{ padding: 15 }}
              onChangeText={text => setrefbill(text)}
            />
          )}
          {!check && (
            <TextInput
              label="Description"
              mode="outlined"
              style={{ padding: 15 }}
              onChangeText={text => setdescription(text)}
            />
          )}
          {!check && (
            <>
              <Text style={{ paddingLeft: 15 }}>Tax Paid</Text>
              <View style={{ flexDirection: 'row', padding: 15 }}>
                <>
                  <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                  />
                </>
                <>
                  <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                  />
                </>
              </View>
            </>
          )}
          {checked === 'first' && (
            <TextInput
              label="Tax Amount"
              mode="outlined"
              style={{ padding: 15 }}
              onChangeText={text => settaxamount(text)}
            />
          )}

          {checked === 'first' && (
            // <>
            //   <Text style={{ paddingLeft: 15 }}>
            //     Is company name mentioned in invoice?
            //   </Text>
            //   <RadioButton
            //     style={{ paddingLeft: 15 }}
            //     status={checkedbox ? 'checked' : 'unchecked'}
            //     onPress={() => {
            //       setcheckedbox(!checkedbox);
            //     }}
            //   />

            // </>
            <CheckBox
              title="Is company name mentioned in invoice?"
              checked={checkedbox}
              onPress={() => {
                setcheckedbox(!checkedbox);
              }}
            />
          )}


          {!check && (
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={selectFile}
            >
              <Text style={styles.buttonTextStyle}>Upload Referrence Bill</Text>
            </TouchableOpacity>
          )}
          {!check && (
            <Button
              onPress={handleFormSubmit}
              style={styles.submitbuttonStyle}
              mode="contained"
            >
              submit
            </Button>
          )}
        </ScrollView> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  submitbuttonStyle: {
    color: 'blue',
    paddingVertical: 10,
    fontSize: 16,
    margin: 15,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    height: 150,
    paddingVertical: 20,
    borderColor: colors.primaryGradientStart,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
    marginHorizontal: 5,
    marginVertical: 12,
  },
});
