import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SectionList,
  ScrollView,
  Picker,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

import DropDownPicker from 'react-native-dropdown-picker';

import TreeView from 'react-native-final-tree-view';
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';

import SearchableDropdown from 'react-native-searchable-dropdown';
import { List } from 'react-native-paper';

import Dialog from 'react-native-dialog';
import Select from 'react-select';

import Moment from 'moment';
import {
  Button,
  RadioButton,
  Menu,
  Divider,
  Provider,
  TextInput,
  Card,
} from 'react-native-paper';
import CheckboxFlex from 'react-native-checkbox-flex';

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
  const [isAlive, setIsAlive] = useState(true);
  const [cat, setCats] = useState([]);
  const [catName, setCatName] = useState('');
  const [catId, setCatId] = useState('');
  const [accountList, setAccountList] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [utilizedDivName, setUtilizedDivName] = useState('');
  const [utilizedList, srtUtilizedList] = useState([]);
  const [bankName, setBankName] = useState('');
  const [bankList, setBankList] = useState([]);

  const [employeeName, setEmployeeName] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  const [vendorName, setVendorName] = useState('');
  const [vendorList, setVendorList] = useState([]);

  const [bankSlipFile, setBankSlipFile] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [payMode, setPayMode] = useState('');
  const [payModeList, setPayModeList] = useState([
    { label: 'Cash', value: 'Cash' },
    { label: 'Cheque', value: 'Cheque' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
  ]);

  const [taxOpen, setTaxOpen] = useState(false);
  const [taxPaid, setTaxPaid] = useState('');
  const [taxPaidList, setTaxPaidList] = useState([
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]);
  const [agree, setAgree] = useState(false);

  const [open, setOpen] = useState(false);
  const [bankTransferOpen, setBankTransferOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);
  const [vendOpen, setVendOpen] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [company, setCompany] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [invNumber, setInvNumber] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [saveButton, setSaveButton] = useState(false);
  const [alert, setAlert] = useState(false);
  const formData = new FormData();

  const [payDate, setPayDate] = useState(
    Moment(new Date()).format('DD-MM-YYYY'),
  );

  const [paidAccount, setPaidAccount] = useState([]);

  const K_OPTIONS = [
    {
      id: 36,
      item: 'dee personal 0',
    },
    {
      id: 37,
      item: 'sowmya personal 0',
    },
  ];

  const submitForm = () => {
    // setSaveButton(true);
    console.log('ssssdd');

    formData.append('file_path', referenceFile);
    formData.append('bank_slip', bankSlipFile);

    formData.append('created_by', '');
    formData.append('paid_by', '');
    formData.append('referrence_bill_no', '');
    formData.append('paid_date', payDate);
    formData.append('paid_to', accountName.id);

    formData.append('payment_type', payMode);
    formData.append('check_no', chequeNumber);
    formData.append('transaction_id', '');
    formData.append('payment_account_id', '');
    formData.append('description', description);
    formData.append('is_paid', '');
    formData.append('tax', '');
    formData.append('status', 'new');
    formData.append('bank_ref_no', '');
    formData.append('account_category_id', catId);
    formData.append('company_name', '');
    formData.append('div_id', '');
    formData.append('company', company);
    formData.append('vatno', vatNumber);
    formData.append('inv_no', invNumber);
    formData.append('utilize_div_id', utilizedDivName.id);
    formData.append('bank_id', bankName);
    formData.append('voucher_no', '');
    formData.append('vendor_id', vendorName);
    formData.append('employee_id', employeeName);
    formData.append('amount', amount);
    axios.post(url + '/expenceStore', formData).then(res => {
      // console.log(accountName.id);
      // console.log(utilizedDivName.id);
      // console.log(catId);
      // console.log(employeeName);
      // console.log(payMode);
      // console.log(payDate);
      // console.log(taxPaid);
      // console.log(amount);
      // console.log(description);
      // console.log(invNumber);
      // console.log(vatNumber);
      // console.log(company);
      // console.log(referenceFile);
      // console.log(bankSlipFile);
      // console.log(bankName);
      // console.log(chequeNumber);

      clearStateHandle();
      setIsAlive(true);
      setAlert(true);
    });
  };

  const handleAlertClose = () => {
    setAlert(false);
  };

  const OS = Platform.OS;

  const getIndicator = (isExpanded, hasChildrenNodes) => {
    // const plus  = "\u2190";
    if (!hasChildrenNodes) {
      return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>→ </Text>;
    } else if (isExpanded) {
      return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>- </Text>;
    } else {
      return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+ </Text>;
    }
  };

  const clearStateHandle = () => {
    setCatName(null);
    setAccountName(null);
    setUtilizedDivName(null);
    setCatId(null);
    setBankSlipFile(null);
    setReferenceFile(null);
    setOpen(false);
    setBankTransferOpen(false);
    setEmpOpen(false);
    setVendOpen(false);
    setGoNext(false);
    setSaveButton(false);
    setAccountName('');
    setUtilizedDivName('');
    setBankName('');
    setEmployeeName('');
    setVendorName('');
    setPayMode('');
    setTaxPaid('');
    setDescription('');
    setCompany('');
    setVatNumber('');
    setAmount('');
    setInvNumber('');
    setSelectedTeams(null);
    setPayDate(Moment(new Date()).format('DD-MM-YYYY'));
  };

  const catHandler = (id, name) => {
    setCatName(name);
    setCatId(id);
  };

  const uploadBankFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf,
      });
      // Printing the log realted to the file

      // Setting the state to show single file attributes
      setBankSlipFile(res);
      console.log(res);
    } catch (err) {
      setBankSlipFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Uploading Bank slip has been Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const uploadReferenceFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf,
      });
      // Printing the log realted to the file

      // Setting the state to show single file attributes
      setReferenceFile(res);
    } catch (err) {
      setReferenceFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Uploading Bank slip has been Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  function onMultiChange() {
    console.log(selectedTeams);
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }

  function onChange() {
    return val => setSelectedTeam(val);
  }
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    axios.get(`${url}/getMCat`).then(data => {
      srtUtilizedList(data.data.division);
      setCats(data.data.getAllCat);
      setAccountList(data.data.payment_account);
      setBankList(data.data.banks);
      setEmployeeList(data.data.employees);
      setVendorList(data.data.vendors);

      setPaidAccount(data.data.paidAccount);
    });

    setIsAlive(false);
  }, [isAlive]);

  const RecComp = ({ data, id }) => {
    return (
      <>
        {data.map((m, i) => {
          const nId = i + Math.floor(Math.random() * 1000);

          return (
            <>
              <List.Accordion
                title={m.name}
                id={nId}
                // onPress={(e) => { changeIcon(e, nId)}}
                left={props => (
                  <Avatar
                    //  onPress={(e) => { chooseExpenceCat(m.id,m.name) }}
                    size="medium"
                    icon={{
                      name: 'check-circle',
                      color: 'black',
                      type: 'font-awesome',
                    }}
                    rounded
                    activeOpacity={0.7}
                  />
                )}
              >
                <View>
                  <Avatar
                    onPress={e => {
                      chooseExpenceCat(m.id, m.name);
                    }}
                    size="medium"
                    icon={{
                      name: 'check-circle',
                      color: 'black',
                      type: 'font-awesome',
                    }}
                    rounded
                    activeOpacity={0.7}
                  />
                </View>

                {m.sub_categories !== null ? (
                  <RecComp data={m.sub_categories} />
                ) : (
                  <></>
                )}
              </List.Accordion>
            </>
          );
        })}
      </>
    );
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
      ></View>

      <SCLAlert
        theme="success"
        show={alert}
        title="Lorem"
        subtitle="Lorem ipsum dolor"
      >
        <SCLAlertButton onPress={handleAlertClose} theme="info">
          Done
        </SCLAlertButton>
      </SCLAlert>
      <View
        style={{
          padding: 18,
          justifyContent: 'center',
        }}
      >
        {accountName && utilizedDivName && catName ? (
          <View>
            {goNext == true ? (
              <>
                <View>
                  <View style={{ justifyContent: 'center' }}>
                    <TextInput
                      style={{ height: 50 }}
                      type="number"
                      keyboardType={OS == 'android' ? 'numeric' : 'number-pad'}
                      placeholder="Amount"
                      value={amount}
                      onChangeText={text => setAmount(text)}
                      // value={value}
                    />
                    <Text style={{ position: 'absolute', right: 10 }} size={20}>
                      SAR
                    </Text>
                  </View>
                </View>
                <Text></Text>
                <View>
                  <SelectBox
                    label="Select Payment Account"
                    options={paidAccount}
                    disabled="disabled"
                    selectedValues={selectedTeams}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                  />
                </View>

                <ScrollView>
                  <Text></Text>
                  <View>
                    <CheckboxFlex
                      title="Tax Paid ?"
                      onPress={e => {
                        console.log(e);
                        setTaxPaid(e);
                      }}
                      // date="9:00 AM"
                      // description="Compan"
                    />
                  </View>
                  {taxPaid == true ? (
                    <View>
                      <Text></Text>
                      <View>
                        <TextInput
                          style={{ height: 50 }}
                          placeholder="Company Name"
                          value={company}
                          onChangeText={e => {
                            setCompany(e);
                          }}
                        />
                      </View>
                      <Text></Text>
                      <View>
                        <TextInput
                          style={{ height: 50 }}
                          placeholder="Vat Number"
                          onChangeText={e => {
                            setVatNumber(e);
                          }}
                          value={vatNumber}
                        />
                      </View>
                      <Text></Text>
                      <View>
                        <TextInput
                          style={{ height: 50 }}
                          placeholder="Invoice Number"
                          onChangeText={e => {
                            setInvNumber(e);
                          }}
                          value={invNumber}
                        />
                      </View>
                      <Text></Text>
                      <View>
                        <CheckboxFlex
                          title="I agree the above Mentioned ?"
                          description="Company name, Invoice Number, Vat Number is as per the Uploaded File"
                          onPress={e => {
                            setAgree(e);
                          }}
                          // date="9:00 AM"
                          // description="Compan"
                        />
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                  <View>
                    <Text></Text>
                    <TouchableOpacity
                      style={{
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
                      }}
                      activeOpacity={0.5}
                      onPress={uploadReferenceFile}
                    >
                      <Text
                        style={{
                          color: '#FFFFFF',
                          paddingVertical: 10,
                          fontSize: 16,
                        }}
                      >
                        Upload Reference Bill
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text></Text>

                  <View style={{ alignItems: 'center' }}>
                    <Button
                      // icon="camera"
                      style={{ width: 150 }}
                      mode="contained"
                      loading={saveButton}
                      disabled={saveButton}
                      onPress={submitForm}
                    >
                      {saveButton == true ? (
                        <Text>SAVING</Text>
                      ) : (
                        <Text>SAVE</Text>
                      )}
                    </Button>
                  </View>
                </ScrollView>
              </>
            ) : (
              <>
                <ScrollView>
                  <Text style={{ fontSize: 18 }}>
                    <Text style={{ fontWeight: 'bold' }}>Expence :</Text>{' '}
                    <Text style={{ color: 'blue' }}> {catName}</Text>
                  </Text>
                  {catName == 'Salary' && (
                    <>
                      <Text></Text>

                      <DropDownPicker
                        open={empOpen}
                        value={employeeName}
                        placeholder="Choose Employee"
                        items={employeeList}
                        setOpen={setEmpOpen}
                        setValue={setEmployeeName}
                        setItems={setEmployeeList}
                      />
                    </>
                  )}
                  {catName == 'Material Purchase' && (
                    <>
                      <Text></Text>
                      <DropDownPicker
                        open={vendOpen}
                        value={vendorName}
                        placeholder="Choose Vendor"
                        items={vendorList}
                        setOpen={setVendOpen}
                        setValue={vendorName}
                        setItems={setVendorList}
                      />
                    </>
                  )}
                  <Text></Text>

                  <>
                    <DropDownPicker
                      open={open}
                      style={{ zIndex: -100 }}
                      value={payMode}
                      placeholder="Choose Payment Mode"
                      items={payModeList}
                      setOpen={setOpen}
                      setValue={setPayMode}
                      setItems={setPayModeList}
                    />
                  </>
                  {payMode == 'Cheque' ? (
                    <View>
                      <Text></Text>
                      <TextInput
                        style={{ height: 50 }}
                        placeholder="Cheque Number"
                        value={chequeNumber}
                        keyboardType={
                          OS == 'android' ? 'numeric' : 'number-pad'
                        }
                        onChangeText={text => setChequeNumber(text)}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {payMode == 'Bank Transfer' ? (
                    <View>
                      <Text></Text>
                      <DropDownPicker
                        style={{ zIndex: -200 }}
                        open={bankTransferOpen}
                        value={bankName}
                        placeholder="Choose Bank"
                        items={bankList}
                        setOpen={setBankTransferOpen}
                        setValue={setBankName}
                        setItems={setBankList}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                  {payMode == 'Bank Transfer' ? (
                    <View>
                      <Text></Text>
                      <TouchableOpacity
                        style={{
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
                        }}
                        activeOpacity={0.5}
                        onPress={uploadBankFile}
                      >
                        <Text
                          style={{
                            color: '#FFFFFF',
                            paddingVertical: 10,
                            fontSize: 16,
                          }}
                        >
                          Upload Bank Slip
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <Text></Text>

                  <DatePicker
                    style={{ width: Dimensions.get('window').width - 40 }}
                    date={payDate}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    // minDate="2016-05-01"
                    // maxDate="2016-06-01"
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
                    onDateChange={date => {
                      setPayDate(date);
                    }}
                  />
                  <Text></Text>
                  <TextInput
                    style={{ height: 50 }}
                    placeholder="Description"
                    value={description}
                    onChangeText={e => {
                      setDescription(e);
                    }}
                  />
                  <Text></Text>
                </ScrollView>
              </>
            )}
            <Text></Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                // padding: 3,
              }}
            >
              {goNext == true && (
                <View style={{ padding: 5 }}>
                  <Avatar
                    size="medium"
                    overlayContainerStyle={{ backgroundColor: 'blue' }}
                    icon={{
                      name: 'arrow-left',
                      color: 'white',
                      type: 'font-awesome',
                    }}
                    rounded
                    activeOpacity={0.7}
                    onPress={() => {
                      setGoNext(false);
                    }}
                  />
                </View>
              )}
              {!goNext && (
                <>
                  <View style={{ padding: 5 }}>
                    <Avatar
                      size="medium"
                      overlayContainerStyle={{ backgroundColor: 'blue' }}
                      icon={{
                        name: 'arrow-right',
                        color: 'white',
                        type: 'font-awesome',
                      }}
                      rounded
                      activeOpacity={0.7}
                      onPress={() => {
                        setGoNext(true);
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        ) : (
          <>
            <SearchableDropdown
              multi={true}
              onItemSelect={item => {
                setUtilizedDivName(item);
              }}
              selectedItems={utilizedDivName}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={utilizedList}
              resetValue={false}
              textInputProps={{
                placeholder: 'Please Choose Utilized Division',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            <SearchableDropdown
              onItemSelect={item => {
                setAccountName(item);
              }}
              selectedItems={accountName}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={accountList}
              resetValue={false}
              textInputProps={{
                placeholder: 'Paid to',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },
                // onTextChange: text => alert(text)
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
            <Text></Text>
            <>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                Choose Category :
              </Text>
              <ScrollView>
                <TreeView
                  data={cat}
                  getCollapsedNodeHeight={() => 30}
                  renderNode={({
                    node,
                    level,
                    isExpanded,
                    hasChildrenNodes,
                  }) => {
                    return (
                      <View>
                        <Text
                          style={{
                            marginLeft: 20 * level,
                            height: 'auto',
                            zIndex: 1,
                            padding: 10,
                            overflow: 'hidden',
                            fontSize: 20,
                          }}
                        >
                          {getIndicator(isExpanded, hasChildrenNodes)}
                          <Text
                            onStartShouldSetResponder={() =>
                              catHandler(node.id, node.name)
                            }
                          >
                            {node.name}{' '}
                          </Text>
                        </Text>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </>
          </>
        )}
      </View>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 55,
          position: 'absolute',
          bottom: 12,
          right: 10,
          height: 55,
          backgroundColor: 'blue',
          borderRadius: 100,
        }}
        onPress={() => {
          clearStateHandle();
        }}
      >
        <Avatar
          icon={{ name: 'close', color: '', type: 'font-awesome' }}
          color="#222a45"
          size="medium"
        />
      </TouchableOpacity>
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
