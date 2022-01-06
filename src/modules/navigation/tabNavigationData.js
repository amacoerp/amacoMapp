import HomeScreen from '../home/HomeViewContainer';
import ProductScreen from '../product/ProductViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';
import ExpenseScreen from '../Expense/ExpenseContainer';
import AddexpenseScreen from '../Expense/demoadd';






const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  
  
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  
  // {
  //   name: 'Product',
  //   component: ProductScreen,
  //   icon: iconCalendar,
  // },
  
  {
    name: 'Expense',
    component: ExpenseScreen,
    icon: iconCalendar,
  },
  // {
  //   name: 'Calendar',
  //   component: CalendarScreen,
  //   icon: iconCalendar,
  // },
  // {
  //   name: 'Grids',
  //   component: GridsScreen,
  //   icon: iconGrids,
  // },
  // {
  //   name: 'Pages',
  //   component: PagesScreen,
  //   icon: iconPages,
  // },
  
  
];

export default tabNavigationData;