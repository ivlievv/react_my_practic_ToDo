import React, {useState} from "react";
import List from "./../Menu";
import './AddList.scss'
import Badge from "./../Badge";
import closeSvg from './../../assets/img/close.svg'


const AddListButton = ({colors, onAdd}) => {
    const [visibleContainer, setVisibleContainer] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('')


    const onClose = () => {
        setVisibleContainer(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert("Enter a list name");
            return;
        }
        const color = colors.filter(color => color.id === selectedColor)[0].name;
        onAdd({id: Math.random(), name: inputValue, color: color});
        onClose();
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisibleContainer(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: (
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 1V15"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1 8H15"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ),
                        name: 'Task List'
                    }
                ]}
            />
            {visibleContainer && (
                <div className="add-list__container">
                    <img
                        onClick={onClose}
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__container-close-btn"
                    />
                    <input value={inputValue}
                           onChange={e => {
                               setInputValue(e.target.value)
                           }}
                           className="field"
                           type="text"
                           placeholder="List name"/>
                    <div className="add-list__container-colors">
                        {colors.map(color => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                        ))}
                    </div>
                    <button onClick={addList} className="button">Add Task</button>
                </div>
            )}
        </div>
    );
};


export default AddListButton;
