/*
 * @Description: 用户数据管理
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-21 14:35:48
 * @LastEditTime: 2019-03-25 22:34:43
 */

import React, { PureComponent, Fragment } from 'react';
// import Debounce from 'lodash-decorators/debounce';
// import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
// import classNames from 'classnames';
// import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// const { Description } = DescriptionList;
// const ButtonGroup = Button.Group;

// const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;


const operationTabList = [
    {
      key: 'tab1',
      tab: '血压数据汇总',
    },
    {
      key: 'tab2',
      tab: '血糖数据汇总',
    },
    {
      key: 'tab3',
      tab: '用药数据汇总',
    },
    {
      key: 'tab4',
      tab: '基础数据汇总',
    },
  ];

  
const columns1 = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '血压高值',
      dataIndex: 'hypertention',
      key: 'hypertention',
    },
    {
        title: '血压低值',
        dataIndex: 'hypotention',
        key: 'hypotention',
      },
      {
        title: '备注',
        dataIndex: 'beizhu',
        key: 'beizhu',
      },
      {
        title: '时间戳',
        dataIndex: 'add_time',
        key: 'add_time',
      },
    {
      title: '判断结果',
      dataIndex: 'result',
      key: 'result',
      render: text =>
        text === '1' ? (
          <Badge status="success" text="正常" />
        ) : (
          <Badge status="error" text="波动" />
        ),
    },
];

const columns2 = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '血糖值',
      dataIndex: 'sugardata',
      key: 'sugardata',
    },
    {
        title: '时间点',
        dataIndex: 'timedian',
        key: 'timedian',
      },
      {
        title: '备注',
        dataIndex: 'beizhu',
        key: 'beizhu',
      },
      {
        title: '时间戳',
        dataIndex: 'add_time',
        key: 'add_time',
      },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    }

    @connect(({ users, loading }) => ({
        users,
        loading: loading.models.users,
        // loading: loading.effects['users/getbloodpressure'],

      }))
      class UserData extends PureComponent {
          state = {
              operationkey:'tab1',
          };

          
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/getbloodpressure',
    });
    // dispatch({
    //     type: 'users/sugardata',
    //   });
  }
          
  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  render() {
    const {  operationkey } = this.state;
    const { users , loading } = this.props;
    console.log(users)
    // console.log(users)
    const { bloodpressure, sugardata, medicine } = users;
    const contentList = {
      tab1: (
        <Table
          pagination={true}
          loading={loading}
          rowSelection={rowSelection}
          dataSource={bloodpressure}
          columns={columns1}
        />
      ),
      tab2: (
        <Table
          pagination={true}
          loading={loading}
          rowSelection={rowSelection}
          // dataSource={sugardata}
          columns={columns2}
        />
      ),
      tab3: (
        <Table
          pagination={true}
          loading={loading}
          rowSelection={rowSelection}
          // dataSource={sugardata}
          columns={columns2}
        />
      ),
      tab4: (
        <Table
          pagination={true}
          loading={loading}
          rowSelection={rowSelection}
          // dataSource={sugardata}
          columns={columns2}
        />
      ),
    };
    
    return (
        <PageHeaderWrapper title="用户数据汇总展示">
             <Card
        //   className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
        </PageHeaderWrapper>
    )
  }
  

      }

      export default UserData;
  
  
