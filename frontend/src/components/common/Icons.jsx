import React from 'react';
import { FaUserCircle, FaAngleDown, FaShoppingCart, FaFileInvoiceDollar } from "react-icons/fa";
import {
  IoLogOut,
  IoSearchOutline,
  IoFilterOutline,
  IoCloseOutline,
  IoArrowBack,
  IoAdd,
  IoPencilOutline, // Added for 'edit' icon
  IoTrashOutline // Added for 'delete' icon
} from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuWheat } from "react-icons/lu";

import {
  LayoutGrid,
  Users as LucideUsers,
  FileText,
  Menu as LucideMenu,
  ChevronRight,
  CreditCard,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Lock,
  Building,
  UserCog,
  Package,
  ShoppingBag,
  BarChart
} from 'lucide-react';

// Mapping of icon names to actual icon components
const icons = {
  user: FaUserCircle,
  logout: IoLogOut,
  search: IoSearchOutline,
  dropdown: FaAngleDown,
  filter: IoFilterOutline,
  close1: IoCloseOutline,
  actions: HiDotsHorizontal,
  back: IoArrowBack,
  dashboard: LayoutGrid,
  membersGroup: LucideUsers,
  feesDocument: FileText,
  menu: LucideMenu,
  chevronRight: ChevronRight,
  creditCard: CreditCard,
  barChart: BarChart2,
  trendingUp: TrendingUp,
  alertCircle: AlertCircle,
  add: IoAdd,
  lock: Lock,
  building: Building,
  // Added mappings for edit and delete
  edit: IoPencilOutline,
  delete: IoTrashOutline,
  // New admin navigation icons
  accountManagement: UserCog,
  products: Package,
  orders: ShoppingBag,
  salesReport: BarChart,
  wheat: LuWheat,
  cart: FaShoppingCart,
  invoice: FaFileInvoiceDollar
};

const Icons = ({ name, size, color, className, ...props }) => {
  const IconComponent = icons[name];

  // If the icon name is not found, log a warning and render a fallback
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Icons.jsx. Check the 'icons' mapping.`);
    // Fallback to prevent crashing, renders the name as text or a placeholder
    return <span className={className} style={{ fontSize: size, color: color, border: '1px dashed gray', padding: '2px' }} title={`Icon not found: ${name}`}>(?)</span>;
  }

  // Render the found icon component
  return <IconComponent size={size} color={color} className={className} {...props} />;
};

export default Icons;
