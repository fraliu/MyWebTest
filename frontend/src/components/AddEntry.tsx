import React, {useEffect, useState} from "react";
import {Avatar, ConfigProvider, Menu, MenuProps} from "antd";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Checkbox, Form, Input ,message} from 'antd';
import { useNavigate } from 'react-router-dom';
import GetUrl from "./Context/UrlSource";
import cookie from 'react-cookies';
import axios from "axios";

export default function AddEntry() {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [status, setStatus] = useState(false)

    const sendMsg=(data) => {

        data = {
            "data": data
        }
        data['url'] = 'http'
        axios.post(GetUrl("movies"),data, {headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + cookie.load("access_token"),
            }})
            .then(response=>{
                if('error' in response.data) fail('上传失败')
                    else success()
        })
            .catch(e=>{
                fail('连接超时')
                console.log("Error:", e)
            })
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '上传成功',
        });
        setTimeout(()=>{
            return navigate('/addentry')
        }, 2000)

    };

    const fail = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const onFinish = (values: any) => {
        sendMsg(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4b5cc4',
                },
            }}
        >
                    {contextHolder}
                    <div className={"contentStyle"}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ minWidth: 400,
                                maxWidth: 600,
                                display:"inline-block",
                                // top: 50,
                                position: "relative"
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="名称"
                                name="name"
                                hasFeedback
                                rules={[
                                    {required: true, message: '请输入姓名'},
                                    {max: 8, message: '姓名过长'},
                                ]}
                            >
                                <Input placeholder="请输入电影名字"/>
                            </Form.Item>

                            <Form.Item
                                label="年份"
                                name="year"
                                hasFeedback
                                rules={[
                                    { required: true, message: '请输入年份!' },
                                    { validator:  (rule, val, callback) => {
                                            let pattern = new RegExp(/^\d{4}$/);
                                            if (!pattern.test(val) && val){
                                                // console.log(val)
                                                callback('请输入正确年份');
                                            }else {
                                                callback();
                                            }
                                            callback();
                                        },
                                    }
                                ]}
                            >
                                <Input placeholder="请输入年份"/>
                            </Form.Item>

                            <Form.Item
                                label="描述"
                                name="desc"
                                hasFeedback
                                rules={[{ required: true, message: '请输入描述!' }]}
                            >
                                <Input placeholder="请输入描述"/>
                            </Form.Item>

                            <Form.Item
                                label="地址"
                                name="url"
                                hasFeedback
                                rules={[
                                    { required: true, message: '请输入地址!' },
                                    { validator:  (rule, val, callback) => {
                                            let pattern = new RegExp(/^http:\/\/www.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/);
                                            if (!pattern.test(val) && val){
                                                // console.log(val)
                                                callback('请输入正确域名，形如http://www.xxx.com');
                                            }else {
                                                callback();
                                            }
                                            callback();
                                        },
                                    }
                                ]}
                            >
                                <Input placeholder="请输入描述"/>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
        </ConfigProvider>
    );
}