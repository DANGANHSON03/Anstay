import React, { useState } from "react";
import { Tabs, Collapse, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Help.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const Help = () => {
  const [activeKey, setActiveKey] = useState("1");

  const getTabTitle = () => {
    return activeKey === "1" ? "Các vấn đề thường gặp" : "Tạo issue";
  };

  const troubleshootItems = [
    {
      key: "1",
      label: "1. Mạng",
      children: "Nội dung về các vấn đề mạng và cách khắc phục.",
    },
    {
      key: "2",
      label: "2. Truyền hình Nhật/ Cab",
      children: "Nội dung về các vấn đề truyền hình và cách khắc phục.",
    },
    {
      key: "3",
      label: "3. Điều hòa không mát",
      children: "Nội dung về vấn đề điều hòa không mát và cách khắc phục.",
    },
    {
      key: "4",
      label: "4. Mất điện",
      children: "Nội dung về vấn đề mất điện và cách khắc phục.",
    },
    {
      key: "5",
      label: "5. Đồ điện/ điện tử",
      children: "Nội dung về các vấn đề đồ điện/điện tử và cách khắc phục.",
    },
    {
      key: "6",
      label: "6. Máy giặt",
      children: "Nội dung về các vấn đề máy giặt và cách khắc phục.",
    },
  ];

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <div className="help-poster">
        <h1>{getTabTitle()}</h1>
      </div>
      <div className="app-container">
        <Tabs
          activeKey={activeKey}
          onChange={handleTabChange}
          className="app-tabs"
        >
          <TabPane tab="Các vấn đề thường gặp" key="1">
            <Collapse
              bordered={false}
              expandIconPosition="end"
              className="issues-collapse"
            >
              {troubleshootItems.map((item) => (
                <Panel header={item.label} key={item.key}>
                  {item.children}
                </Panel>
              ))}
            </Collapse>
          </TabPane>
          <TabPane tab="Tạo issue" key="2">
            <div className="create-issue-container">
              <h3>Tạo issue mới</h3>
              <p>Nhập thông tin về vấn đề bạn đang gặp phải.</p>
              {/* Thêm form ở đây nếu cần */}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Help;
