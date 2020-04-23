import React from "react";
import listSvg from "../../assets/img/list.svg";
import './Menu.scss'
import classNames from 'classnames'
import Badge from "./../Badge";
import removeSvg from './../../assets/img/remove.svg';

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (item) => {
        if (window.confirm('You want delete this task list')){
            onRemove(item)
        }

    }
    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li key={index} className={classNames(item.className, {active: item.active})}>
                        <i>
                            {item.icon ? (item.icon) : (<Badge color={item.color}/>)}
                        </i>
                        <span>{item.name}</span>
                        {isRemovable && <img className="list__remove-icon"
                                             onClick={() => removeList(item)}
                                             src={removeSvg} alt="Remove"/>}
                    </li>
                ))
            }


        </ul>
    )
};


export default List;
