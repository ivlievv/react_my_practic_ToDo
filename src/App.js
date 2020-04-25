import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.scss';
import listSvg from "./assets/img/list.svg";
import {List, AddList, Tasks} from './components';
import {Route, useHistory} from 'react-router-dom';

function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    let history = useHistory();

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({data}) => {
                setLists(data);
            });
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data);
        });
    }, []);


    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        });
        setLists(newList);
    };

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Текст задачи', taskObj.text);

        if (!newTaskText) {
            return;
        }

        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskObj.id) {
                        task.text = newTaskText;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskObj.id, {
                text: newTaskText
            })
            .catch(() => {
                alert('Failed to update task');
            });
    };

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Are you sure you want to delete the task?')) {
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId);
                }
                return item;
            });
            setLists(newList);
            axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
                alert('Failed to delete task');
            });
        }
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {
                completed
            })
            .catch(() => {
                alert('Failed to update task');
            });
    };

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        });
        setLists(newList);
    };

    const onAddList = obj => {
        const newList = [...lists, obj]
        setLists(newList)
    }


    useEffect(() => {
        const listId = history.location.pathname.split('lists/')[1];
        if (lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
        }
    }, [lists, history.location.pathname]);

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    onClickItem={list => {
                        history.push(`/`)
                    }}
                    items={[
                        {
                            icon: (<img src={listSvg} alt="logo list"/>),
                            name: "All Tasks",
                            active: history.location.pathname === '/',
                        }
                    ]}
                />
                {lists ? (
                    <List
                        items={lists}
                        onRemove={id => {
                            const newLists = lists.filter(item => item.id !== id);
                            setLists(newLists);
                        }}
                        onClickItem={list => {
                            history.push(`/lists/${list.id}`);
                        }}
                        activeItem={activeItem}
                        isRemovable

                    />
                ) : (
                    'Loading...'
                )}
                <AddList onAdd={onAddList} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Route exact path="/">
                    {lists &&
                    lists.map(list => (
                        <Tasks
                            key={list.id}
                            list={list}
                            onAddTask={onAddTask}
                            onEditTitle={onEditListTitle}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                            withoutEmpty
                        />
                    ))}
                </Route>
                <Route path="/lists/:id">
                    {lists && activeItem && (
                        <Tasks
                            list={activeItem}
                            onAddTask={onAddTask}
                            onEditTitle={onEditListTitle}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onCompleteTask={onCompleteTask}
                        />
                    )}
                </Route>
            </div>
        </div>
    );
}

export default App;
