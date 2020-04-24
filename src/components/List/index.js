import React from "react";
import axios from 'axios';
import './Menu.scss'
import classNames from 'classnames'
import Badge from "./../Badge";
import removeSvg from './../../assets/img/remove.svg';

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('You want delete this task list')){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }
    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li key={index}
                        onClick={onClickItem ? () => onClickItem(item): null}
                        className={classNames(item.className, {active: activeItem && activeItem.id === item.id})}>
                        <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                        <span>
                            {item.name}
                            {item.tasks && `(${item.tasks.length})`}
                        </span>
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
