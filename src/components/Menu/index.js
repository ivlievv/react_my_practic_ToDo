import React from "react";
import listSvg from "../../assets/img/list.svg";
import './Menu.scss'

const List = ({items}) => {
    return(
        <ul className="list">
            {
                items.map(item => (
                    <li className={item.active ? "active" : ''}>
                        <i>
                            {item.icon ? (item.icon) : (<i className={`badge badge--${item.color}`}></i>)}
                        </i>
                        <span>{item.name}</span>
                    </li>
                ))
            }


        </ul>
    )
};


export default List;
