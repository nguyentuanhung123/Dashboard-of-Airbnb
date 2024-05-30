/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

//const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const SidebarLink = ({ item, linkClasses }) => {

    const { pathname } = useLocation();

    return(
        <Link to={item.path} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClasses)}>
            <span className='text-xl'>{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default SidebarLink;
