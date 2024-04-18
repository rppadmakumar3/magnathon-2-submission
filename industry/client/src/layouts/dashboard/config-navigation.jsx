import { FaBook } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { RiHammerLine } from 'react-icons/ri';
import { FaCog, FaHome, FaList, FaGavel, FaHistory, FaComments, FaMoneyBillAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";


const icon = (name) => {
  switch (name) {
    case 'ic_home':
      return <FaHome />;
    case 'ic_list':
      return <FaList />;
    case 'ic_bid':
      return <FaMoneyBillAlt />;
    case 'ic_auction':
      return <FaGavel />;
    case 'ic_order':
      return <FaHistory />;
    case 'ic_analytics':
      return <SiGoogleanalytics />;
    case 'ic_chat':
      return <FaComments />;
    case 'ic_resources':
      return <FaBook />;
    case 'ic_payment':
      return <MdPayment />;
    case 'ic_settings':
      return <FaCog />;
    default:
      return null;
  }
};

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_home'),
  },
  {
    title: 'Listings',
    path: '/listings',
    icon: icon('ic_list'),
  },
  {
    title: 'Biddings',
    path: '/biddings',
    icon: icon('ic_bid'),
  },
  {
    title: 'Auctions',
    path: '/auctions',
    icon: icon('ic_auction'),
  },
  {
    title: 'Pending Payments',
    path: '/payments',
    icon: icon('ic_payment'),
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic_order'),
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic_chat'),
  },
  {
    title: 'Resources',
    path: '/resources',
    icon: icon('ic_resources'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic_settings'),
  },
];

export default navConfig;