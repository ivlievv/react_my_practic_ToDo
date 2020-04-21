import React from 'react';
import './App.scss';
import List from "./components/Menu";
import listSvg from "./assets/img/list.svg";

function App() {
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                items={[
                    {
                        icon: (<img src={listSvg} alt="logo list"/>),
                        name: 'All tasks',
                        active:true
                    }
                ]}
                />
                <List
                    items={[
                        {
                            color: 'green',
                            name: 'Product',
                        },
                        {
                            color: 'blue',
                            name: 'Frontend',
                        },
                        {
                            color: 'black',
                            name: 'Backend',
                        },
                        {
                            color: 'red',
                            name: 'Film',
                        },

                    ]}
                />
            </div>
            <div className="todo__tasks">
                sdvrev erv er
            </div>
        </div>
    );
}

export default App;
