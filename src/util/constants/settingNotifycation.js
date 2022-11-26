import { Button, notification, Space } from 'antd';
import React from 'react';


export const openNotificationWithIcon = (type, des) => {
    notification[type]({
        message: '',
        description: des

    });
};