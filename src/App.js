import React, {useState} from 'react';
import './App.scss';
import List from "./components/Menu";
import listSvg from "./assets/img/list.svg";
import add from './assets/img/add.svg'
import AddList from "./components/AddList";
import DB from './assets/db';

function App() {
    const [lists, setLists] = useState(DB.lists.map(item => {
        item.color = DB.colors.filter(
            color => color.id === item.colorId
        )[0].name;
        return item;

    }))

    const onAddList = obj => {
        const newList = [...lists, obj]
        setLists(newList)
    }
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    items={[
                        {
                            icon: (<img src={listSvg} alt="logo list"/>),
                            name: "All Tasks",
                            active: true
                        }
                    ]}
                />
                <List
                    items={lists}
                    onRemove={list => {
                        console.log(list)
                    }}
                    isRemovable
                />
                <AddList onAdd={onAddList} colors={DB.colors}/>
            </div>
            <div className="todo__tasks">
            </div>
        </div>
    );
}

export default App;
