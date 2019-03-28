/*
 * @Description: 订单
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-21 14:35:22
 * @LastEditTime: 2019-03-27 08:52:44
 */

import React, { PureComponent, Fragment } from 'react';
// import { findDOMNode } from 'react-dom';   该项缺失
import { connect } from 'dva';
import moment from 'moment';
import {
    Row, 
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    Modal,
    DatePicker,
    message,
    Badge,
    Divider,
    Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './order.less';
import Result from '@/components/Result';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const confirm = Modal.confirm;

@connect(({ order, loading }) => ({
    order,
    loading: loading.models.order,
}))
@Form.create()
class Order extends PureComponent {
   state = {
      visible:false,
      done: false,
   } 
   formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

   columns = [
       {
           title: '订单编码',
           dataIndex: 'orderid',
           key: 'orderid',
       },
       {
           title: '用户编码',
           dataIndex: 'userid',
           key:'userid',
       },
       {
           title: '订单金额',
           dataIndex: 'money',
           key:'money',
       },
       {
           title: '订单日期',
           dataIndex: 'orderdate',
           key: 'orderdate',
       },
       {
           title: '订单类型',
           dataIndex: 'type',
           key: 'type',
       },
       {
           title: '咨询医师',
           dataIndex: 'doctorid',
           key:'doctorid',
       },
       {
           title: '签名',
           dataIndex:'sign',
           key:'sign',
       },
       
       {
           title: '操作',
           key:'caozuo',
           render: (text, record) => (
               <Fragment>
                   <a onClick={() => this.showEditModal(record)}>编辑</a>
                   <Divider type="vertical" />
                   <a onClick={() => this.handleMenuClick(record)}>删除</a>
               </Fragment>
           ),
       },
   ];
// 加载出列表数据
   componentDidMount() {
       const { dispatch } = this.props;
       dispatch({
           type: 'order/fetch',
       });
   }

   showModal = () => {
       this.setState({
           visible: true,
           current: undefined,
       });
   };

   showEditModal = record => {
       this.setState({
           visible: true,
           current: record,
       });
   };

   handleDone = () => {
    this.setState({
      done: false,
      visible: false,
    });
   }

   handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const orderid = current ? current.orderid : '';

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
    //   dispatch({
    //     type: 'users/submit',
    //     payload: { userid, ...fieldsValue },
    //   });
    });
  };


//    查询功能实现
   handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

    //   dispatch({
    //     type: 'users/fetch',
    //     payload: values,
    //   });
    });
  };

//   确定删除
handleMenuClick = (record) => {
    console.log(record)
    confirm({
        title: '确定要删除吗？',
        onOk: () => this.onDeleteItem(record.orderid)
    })
}

onDeleteItem = id => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'users/remove',
    //   payload: { id },
    // });
}

handleAdd = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

    //   dispatch({
    //     type: 'users/addUser',
    //     payload: values,
    //   });
    });
}


handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'order/fetch',
    });
  };

//头部搜索专用
renderHeadForm() {
    const {
        form:{ getFieldDecorator },
    } = this.props;
    return (
        <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg:24, xl: 48}}>
        <Col md={8} sm={24}>
        <FormItem key="orderid" label="订单编码">
        {getFieldDecorator('orderid')(<Input placeholder="请输入" />)}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <FormItem key="type" label="订单类型">
        {getFieldDecorator('type')(
            <Select placeholder="请选择" style={{ width: '100%'}}>
            <Select.Option value="视频问诊">视频问诊</Select.Option>
            <Select.Option value="电话问诊">电话问诊</Select.Option>
            <Select.Option value="图文问诊">图文问诊</Select.Option>
            </Select>
        )}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{ marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
        <Button style={{ marginLeft: 8}} onClick={this.showModal}>+新增</Button>
        </span>
        </Col>
        </Row>
        </Form>
    );
}





render() {
    const {
        order,
        loading,
    } = this.props;
    // console.log(this.props.users)
    const {
        form: { getFieldDecorator},
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const {orderlist} = order


    // const getModalContent = () => {
    //     if (done) {
    //       return (
    //         <Result
    //           type="success"
    //           title="操作成功"
    //           description="请合理更改用户基本信息。"
    //           actions={
    //             <Button type="primary" onClick={this.handleDone}>
    //               知道了
    //             </Button>
    //           }
    //           className={styles.formResult}
    //         />
    //       );
    //     }

    //     return (
    //         <Form onSubmit={this.handleSubmit}>
    //          <FormItem key="username" label="用户名" {...this.formLayout}>
    //             {getFieldDecorator('username', {
    //                 // rules: [{ required: true, message: '请输入用户姓名' }],
    //                 initialValue: current.username,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="age" label="年龄" {...this.formLayout}>
    //             {getFieldDecorator('age', {
    //                 initialValue: current.age,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="tel" label="联系电话" {...this.formLayout}>
    //             {getFieldDecorator('tel', {
    //                 initialValue: current.tel,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="identity" label="身份证号" {...this.formLayout}>
    //             {getFieldDecorator('identity', {
    //                 // rules: [{ required: true, message: '请输入身份证号' }],
    //                 initialValue: current.identity,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem  key="email" label="邮箱" {...this.formLayout}>
    //             {getFieldDecorator('email', {
    //                  rules: [{
    //                     type: 'email', message: '不是合法的格式!',
    //                   }],
    //                 initialValue: current.email,
    //             })(<Input />)}
    //         </FormItem>
    //         </Form>
    //     )

    // }

    
    // const modalFooter = done
    //   ? { footer: null, onCancel: this.handleDone }
    //   : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



    return (
        <PageHeaderWrapper title="订单基本信息">
        <Card bordered={false}>
        <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderHeadForm()}</div>
        <Table 
         loading={loading}
        dataSource={orderlist}
        columns={this.columns}
        rowSelection={null}
        rowKey="orderid"
        />
        </div>
        </Card>
       <Modal
       title={done ? null : `订单信息${current ? '更新' : '添加'}`}
       width={640}
       destroyOnClose
       visible={visible}
    //    {...modalFooter}
     >
       {/* {getModalContent()} */}
     </Modal>
        </PageHeaderWrapper>
    )
}


}

export default Order;


