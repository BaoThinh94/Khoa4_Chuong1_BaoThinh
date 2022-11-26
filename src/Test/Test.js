import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Axios from 'axios';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { debounce } from 'redux-saga/effects';
const { Header, Sider, Content } = Layout;

export default function Test() {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  function openDropdown() {
    setVisible(true);
  }

  useEffect(() => {

    const fetchDropdownOptions = setTimeout(() => {
      Axios.get(`http://localhost:3000/users?name=${keyword}`)
        .then(res => setDropdownOptions(res.data))
    }, 2000)

    return () => clearTimeout(fetchDropdownOptions)
  }, [keyword])
  // function fetchDropdownOptions(key) {
  //   Axios.get(`http://localhost:3000/users?name=${key}`)
  //     .then(res => setDropdownOptions(res.data));
  // }



  function handleInputOnchange(e) {
    const { value } = e.target;
    console.log(value, 123);
    setKeyword(value);

  }

  return (
    <div>
      <input value={keyword} placeholder='Enter string' onClick={openDropdown} onChange={handleInputOnchange} />
      <div>
        {
          visible ?
            dropdownOptions.map(value => {
              return <div key={value}>{value}</div>
            }) : null
        }
      </div>
    </div>
  );
}
