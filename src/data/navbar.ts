
// mobile silde item

import { Mail, View, SmilePlus, ChartNoAxesColumnIncreasing } from 'lucide-react';
import { MdHome } from "react-icons/md";

export const MenuItems = [
    { id: 1, icon: MdHome, text: 'Home',path:'/' },
    { id: 2, icon: Mail, text: 'Contact',path: '/contact' },
    { id: 3, icon: View, text: 'MostViews',path: '/home/mostviews' },
    { id: 4, icon: SmilePlus, text: 'Popular',path: '/home/popular' },
    { id: 5, icon: ChartNoAxesColumnIncreasing, text: 'TopRate',path: '/home/toprates' },
];