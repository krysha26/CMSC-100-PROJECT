import React from 'react';
import {
  LayoutGrid,
  Users,
  FileText,
  Menu,
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
  BarChart,
  LogOut,
  Search,
  Filter,
  X,
  MoreHorizontal,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Wheat,
  ShoppingCart,
  Receipt,
  Check
} from 'lucide-react';

// Mapping of icon names to actual icon components
const icons = {
  user: Users,
  logout: LogOut,
  search: Search,
  dropdown: ChevronRight,
  filter: Filter,
  close1: X,
  actions: MoreHorizontal,
  back: ArrowLeft,
  dashboard: LayoutGrid,
  membersGroup: Users,
  feesDocument: FileText,
  menu: Menu,
  chevronRight: ChevronRight,
  creditCard: CreditCard,
  barChart: BarChart2,
  trendingUp: TrendingUp,
  alertCircle: AlertCircle,
  add: Plus,
  lock: Lock,
  building: Building,
  edit: Pencil,
  delete: Trash2,
  check: Check,
  accountManagement: UserCog,
  products: Package,
  orders: ShoppingBag,
  salesReport: BarChart,
  wheat: Wheat,
  cart: ShoppingCart,
  invoice: Receipt
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
