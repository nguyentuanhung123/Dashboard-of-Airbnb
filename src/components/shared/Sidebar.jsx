import { FcBullish } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../lib/constants/navigation';
import SidebarLink from './SidebarLink';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';

const Sidebar = () => {

    const [openSidebar, setOpenSidebar] = useState(true)

    const linkClasses = 'flex items-center gap-[12px] font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    
    return (
        <div className={`bg-neutral-900 ${ openSidebar ? "w-60" : "w-[68px]"} p-3 flex flex-col text-white`}>
            <div className="flex items-center gap-2 px-1 py-3 overflow-hidden">
                <FcBullish />
                <span className="text-neutral-100 text-lg cursor-pointer" onClick={handleSidebar}>Airbnb</span>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0.5 overflow-hidden">
                {
                    DASHBOARD_SIDEBAR_LINKS.map((item) => {
                        return(
                            <SidebarLink key={item.key} item={item} linkClasses={linkClasses}/>
                        )
                    })
                }
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700 overflow-hidden'>
                {
                    DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => {
                        return(
                            <SidebarLink key={item.key} item={item} linkClasses={linkClasses}/>
                        )
                    })
                }
                <div className={classNames('text-red-500 cursor-pointer', linkClasses)}>
                    <span className='text-xl'>
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Sidebar
