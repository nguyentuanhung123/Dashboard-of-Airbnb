import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

import { FaUserTie, FaBookAtlas } from "react-icons/fa6";

export const DASHBOARD_SIDEBAR_LINKS = [
    // {
    //     key: 'dashboard',
    //     label: 'Dashboard',
    //     path: '/',
    //     icon: <HiOutlineViewGrid />
    // },
    // {
    //     key: 'products',
    //     label: 'Products',
    //     path: '/products',
    //     icon: <HiOutlineCube />
    // },
    // {
    //     key: 'orders',
    //     label: 'Orders',
    //     path: '/orders',
    //     icon: <HiOutlineShoppingCart />
    // },
    // {
    //     key: 'customers',
    //     label: 'Customers',
    //     path: '/customers',
    //     icon: <HiOutlineUsers />
    // },
    // {
    //     key: 'transactions',
    //     label: 'Transactions',
    //     path: '/transactions',
    //     icon: <HiOutlineDocumentText />
    // },
    // {
    //     key: 'messages',
    //     label: 'Messages',
    //     path: '/messages',
    //     icon: <HiOutlineAnnotation />
    // },
    {
        key: 'owners',
        label: 'Owners',
        path: '/owners',
        icon: <FaUserTie />
    },
    {
        key: 'renters',
        label: 'Renters',
        path: '/renters',
        icon: <HiOutlineUsers />
    },
    {
        key: 'houses',
        label: 'Houses',
        path: '/houses',
        icon: <HiOutlineCube />
    },
    {
        key: 'bookings',
        label: 'Bookings',
        path: '/bookings',
        icon: <FaBookAtlas />
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]