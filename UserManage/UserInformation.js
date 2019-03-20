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
import styles from './UserInformation.less';
import Result from '@/components/Result';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const confirm = Modal.confirm;

@connect(({ users, loading }) => ({
    users,
    loading: loading.models.users,
}))
@Form.create()
class UserInformation extends PureComponent {
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
           title: '用户编码',
           dataIndex: 'userid',
           key: 'userid',
       },
       {
           title: '真实姓名',
           dataIndex: 'username',
           key:'username',
       },
       {
           title: '昵称',
           dataIndex: 'nickname',
           key:'nickname',
       },
       {
           title: '性别',
           dataIndex: 'gender',
           key: 'gender',
       },
       {
           title: '出生年月',
           dataIndex: 'birthdate',
           key: 'birthdate',
       },
       {
           title: '年龄',
           dataIndex: 'age',
           key:'age',
       },
       {
           title: '联系电话',
           dataIndex:'tel',
           key:'tel',
       },
       {
           title: '身份证号',
           dataIndex: 'identity',
           key:'identity',
       },
       {
           title: '紧急联系人邮箱',
           dataIndex: 'email',
           key:'email',
       },
       {
           title: '操作',
           key:'caozuo',
           render: (text, record) => (
               <Fragment>
                   <a onClick={() => this.showEditModal(record)}>编辑</a>
                   <Divider type="vertical" />
                   <a onClick={() => this.handleMenuClick(record, this.props)}>删除</a>
               </Fragment>
           ),
       },
   ];
// 加载出列表数据
   componentDidMount() {
       const { dispatch } = this.props;
       dispatch({
           type: 'users/fetch',
       });
   }

   showModal = () => {
       this.setState({
           visible: true,
           current: undefined,
       });
   };

   showEditModal = record => {
    //    console.log(record)
       this.setState({
           visible: true,
           current: record,
       });
   };

   handleDone = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
   }

   handleCancel = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const userid = current ? current.userid : '';

    // setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'users/update',
        payload: { userid, ...fieldsValue },
      });
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

      dispatch({
        type: 'users/fetch',
        payload: values,
      });
    });
  };

//   确定删除
handleMenuClick = (record,  props) => {
    confirm({
        title: '确定要删除吗？',
        onOk() {
            props.onDeleteItem(record.id)
        }
    })
}

//头部搜索专用
renderHeadForm() {
    const {
        form:{ getFieldDecorator },
    } = this.props;
    return (
        <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg:24, xl: 48}}>
        <Col md={8} sm={24}>
        <FormItem key="username" label="用户姓名">
        {getFieldDecorator('username')(<Input placeholder="请输入" />)}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <FormItem key="username" label="用户性别">
        {getFieldDecorator('gender')(
            <Select placeholder="请选择" style={{ width: '100%'}}>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
            </Select>
        )}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{ marginLeft: 8}}>重置</Button>
        </span>
        </Col>
        </Row>
        </Form>
    );
}





render() {
    const {
        users:{ data },
        loading,
    } = this.props;
    // console.log(this.props.users)
    const {
        form: { getFieldDecorator},
    } = this.props;
    const { visible, done, current = {} } = this.state;


    const getModalContent = () => {
        if (done) {
          return (
            <Result
              type="success"
              title="操作成功"
              description="请合理更改用户基本信息。"
              actions={
                <Button type="primary" onClick={this.handleDone}>
                  知道了
                </Button>
              }
              className={styles.formResult}
            />
          );
        }

        return (
            <Form onSubmit={this.handleSubmit}>
             <FormItem key="username" label="用户名" {...this.formLayout}>
                {getFieldDecorator('username', {
                    initialValue: current.username,
                })(<Input />)}
            </FormItem>
            <FormItem key="age" label="年龄" {...this.formLayout}>
                {getFieldDecorator('age', {
                    initialValue: current.age,
                })(<Input />)}
            </FormItem>
            <FormItem key="tel" label="联系电话" {...this.formLayout}>
                {getFieldDecorator('tel', {
                    initialValue: current.tel,
                })(<Input />)}
            </FormItem>
            <FormItem key="identity" label="身份证号" {...this.formLayout}>
                {getFieldDecorator('identity', {
                    initialValue: current.identity,
                })(<Input />)}
            </FormItem>
            <FormItem  key="email" label="邮箱" {...this.formLayout}>
                {getFieldDecorator('email', {
                    initialValue: current.email,
                })(<Input />)}
            </FormItem>
            </Form>
        )

    }

    
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



    return (
        <PageHeaderWrapper title="用户基本信息">
        <Card bordered={false}>
        <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderHeadForm()}</div>
        <Table 
         loading={loading}
        dataSource={data}
        columns={this.columns}
        rowSelection={null}
        rowKey="userid"
        />
        </div>
        </Card>
       <Modal
       title={done ? null : `编辑用户信息`}
       width={640}
       destroyOnClose
       visible={visible}
       {...modalFooter}
     >
       {getModalContent()}
     </Modal>
        </PageHeaderWrapper>
    )
}


}

export default UserInformation;



// @Form.create()
// class UpdateForm extends PureComponent {
//     constructor(props) {
//         super(props);
//     console.log(props)
//         this.state = {
//             formVals: {
//                 // username: props.values.username,
//                 // age: props.values.age,
//                 // tel: props.values.tel,
//                 // identity: props.values.identity,
//                 // email: props.values.email,
//                 // target: '0',
//             },
//         };

//         this.formLayout = {
//             labelCol: { span: 7 },
//             wrapperCol: { span: 13 },
//         };
//     }

//     renderContent = (formVals) => {
//         const { form } = this.props;
//         // form.validateFields((err, fieldsValue) => {
//         //     if(err) return;
//         //     const formVals = {...fieldsValue}
//         //     // this.setState({
//         //     //     formVals
//         //     // });

//         // })

//         return [
            
//             <FormItem key="username" label="用户名" {...this.formItemLayout}>
//                 {form.getFieldDecorator('username', {
//                     initialValue: formVals.username,
//                 })(<Input />)}
//             </FormItem>,
//             <FormItem key="age" label="年龄" {...this.formItemLayout}>
//                 {form.getFieldDecorator('age', {
//                     initialValue: formVals.age,
//                 })(<Input />)}
//             </FormItem>,
//             <FormItem key="tel" label="联系电话" {...this.formItemLayout}>
//                 {form.getFieldDecorator('tel', {
//                     initialValue: formVals.tel,
//                 })(<Input />)}
//             </FormItem>,
//             <FormItem key="identity" label="身份证号" {...this.formItemLayout}>
//                 {form.getFieldDecorator('identity', {
//                     initialValue: formVals.identity,
//                 })(<Input />)}
//             </FormItem>,
//             <FormItem  key="email" label="邮箱" {...this.formItemLayout}>
//                 {form.getFieldDecorator('email', {
//                     initialValue: formVals.email,
//                 })(<Input />)}
//             </FormItem>,
           
//         ];
//     };

    

//     renderFooter = () => {
//         const { handleUpdateModalVisible } = this.props;
//         return [
//             <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
//             取消
//           </Button>,
//           <Button key="submit" type="primary" >
//             完成
//           </Button>,
//         ]

//     }

//     render(){
       
//         const { updateModalVisible, handleUpdateModalVisible} = this.props;
//         const { formVals } = this.state;

//         return(
//             <Modal
//             width={600}
//             bodyStyle={{ padding:'32px 40px 48px'}}
//             destroyOnClose
//             title="修改信息"
//             visible={updateModalVisible}
//             footer={this.renderFooter()}
//             onCancel={() => handleUpdateModalVisible()}
//             >
//              {this.renderContent(formVals)}
//             </Modal>
            
//         )
//     }

   


// }