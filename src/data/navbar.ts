
// mobile silde item

import { View, SmilePlus, ChartNoAxesColumnIncreasing } from 'lucide-react';
import { MdHome } from "react-icons/md";

export const MenuItems = [
    { id: 1, icon: MdHome, text: 'Home',path:'/' },
    { id: 3, icon: View, text: 'MostViews',path: '/home/mostviews' },
    { id: 4, icon: SmilePlus, text: 'Popular',path: '/home/popular' },
    { id: 5, icon: ChartNoAxesColumnIncreasing, text: 'TopRate',path: '/home/toprates' },
];