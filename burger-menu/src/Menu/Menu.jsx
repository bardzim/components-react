import React from 'react'
import './Menu.css'

const Menu = ({ header, items, active, setActive }) => {
    console.log(header)
    console.log(items)
    return (
        <div className={active ? 'menu active' : 'menu'} onClick={()=> setActive(false)}>
            <div className='blur'>
                <div className='menu_content' onClick={e => e.stopPropagation()}>
                    <div className='menu__header'>{header}</div>
                    <ul>
                        {items.map(item => 
                            <li key={item.value} style={{color: 'white'}}>
                                <a href={item.href}>{item.value}</a>
                               {item.title}
                                <span className="material-icons">{item.icon}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu;