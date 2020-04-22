import React, {useState} from 'react';
import './App.scss';
import List from "./components/Menu";
import listSvg from "./assets/img/list.svg";
import add from './assets/img/add.svg'
import AddList from "./components/AddList";
import DB from './assets/db';

function App() {
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
                    items={DB.lists.map(item => {
                        item.color = DB.colors.filter(
                            color => color.id === item.colorId
                        )[0].name;
                        console.log(item)
                        return item;

                    })}
                    isRemovable
                />
                <AddList colors={DB.colors}/>
            </div>
            <div className="todo__tasks">
            </div>
        </div>
    );
}

export default App;
