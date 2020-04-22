import React from "react";
import listSvg from "../../assets/img/list.svg";
import './Menu.scss'
import classNames from 'classnames'
import Badge from "./../Badge";

const List = ({items, isRemovable, onClick}) => {
    return(
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li key={index} className={classNames(item.className, {active: item.active})}>
                        <i>
                            {item.icon ? (item.icon) : (<Badge  color={item.color}/>)}
                        </i>
                        <span>{item.name}</span>
                    </li>
                ))
            }


        </ul>
    )
};


export default List;
