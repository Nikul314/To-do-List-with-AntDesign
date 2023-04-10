import React from 'react';
import { useState } from 'react';
import './App.css';
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import { 
  Space, 
  Input, 
  Layout, 
  Button, 
  Table, 
  Tag, 
  DatePicker,
  Modal,
  Select
} from 'antd'

const { Header, Content } = Layout;
function App() {

  //--------- Table data --------
  const [data, setData] = useState([
    {
      key:'1',
      time: 1254,
      task: 'HTML',
      description: 'tables',
      duedate: <DatePicker/>,
      tags: ['nice', 'developer'],
      status: 'OPEN'
    },
    {
      key:'2',
      time: 1544,
      task: 'CSS',
      description: 'animation & girds',
      duedate: <DatePicker/>,
      tags: ['nice', 'developer'],
      status: 'OPEN'
    },
    {
      key:'3',
      time: 2214,
      task: 'JS',
      description: 'variables & operators',
      duedate: <DatePicker/>,
      tags: ['nice', 'developer'],
      status: 'OPEN'
    }
  ])

  //------ Table columns with title ------- 
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'duedate',
      key: 'duedate',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: () =>( 
        <Select 
              style={{
                width: 120,
              }}
              defaultValue="OPEN"
              options={[
                {
                  value: 'WORKING',
                  label: 'WORKING',
                },
                {
                  value: 'DONE',
                  label: 'DONE',
                },
                {
                  value: 'OVERDUE',
                  label: 'OVERDUE',
                },
              ]}
          />
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return <>
          <EditOutlined
          onClick={()=>{
            editTask(record)
          }}/>
          <DeleteOutlined 
          onClick={()=>{
            deleteTask(record.key)
          }}
          style={{color:"red", marginLeft:"12px"}} />
        </>
    },
    },
  ];

  const date = <DatePicker/>
  const [todoList, setTodoList] = useState('');
  const [task, setTask] = useState('');
  const timestamp = Date.now();
  
  // For adding the task
  const addTask = ()=>{
    setTask([...todoList, task]);
    console.log(todoList)
    const timedate = (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
    const newTask = {
      key: timestamp,
      time: timedate,
      task: todoList,
      description: '',
      duedate: date,
      tags: ['nice', 'developer'],
      status: 'OPEN'
    }
    setData(pre=>{
      return [...pre, newTask]
    })
  }

  // For deleting the task
 const deleteTask = (record) => {
  Modal.confirm({
    title: "Are you sure, you want to delete this task?",
    okText:"Yes",
    okType:"danger",
    onOk:(() => {
      setData((pre) => {
        return pre.filter((t) => t.key !== record)
      });
    })
  })
    
 };

 // For edit task & decription
 const [edit, setEdit] = useState(false);
 const [editText, setEditText] = useState(null);

  const editTask = (record) => {
    setEdit(true);
    setEditText({...record});
  }

  return (
    <div>
      <Layout>

        {/* Heading */}
        <Header>
          <h1>To Do List</h1>
        </Header>

        {/* Main Content */}
        <Content>
          <div className='task-header'>
            <Space.Compact
              style={{
                width: '40%',
              }}
              >
              <Input
              onKeyDown={(event)=>{if(event.keyCode === 13) addTask()}} 
              placeholder="add your task here" 
              allowClear 
              onChange={(event)=>{
                setTodoList(event.target.value)
              }}/>
              <Button type="primary" onClick={addTask}>Add</Button>
            </Space.Compact>
          </div>

          {/* Table from antDesign */}
          <div>
          <Table
            columns={columns}
            dataSource={data}
          />
          <Modal
          title="Edit task & description"
          open={edit}
          okText="Save"
          onCancel={()=>{
            setEdit(false);
          }}
          onOk={()=>{
            setEdit(false);
            setData((pre)=>{
              return pre.map((t)=>{
                if(t.key === editText.key){
                  return editText;
                }else{
                  return t;
                }
              })
            })
          }}

          >
            <label>Task</label>
            <Input value={editText?.task}
            onChange={(e)=>{
              setEditText(pre=>{
                return {...pre, task:e.target.value}
              })
            }}
            />
            <label>Description</label>
            <Input value={editText?.description}
            onChange={(e)=>{
              setEditText(pre=>{
                return {...pre, description:e.target.value}
              })
            }}
            />
          </Modal>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
export default App;

