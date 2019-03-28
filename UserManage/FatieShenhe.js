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

const statusMap = ['0', '1', '2', '3'];
const status1 = ['待审核', '允许发布', '拒绝发布', '退回锁定'];

@connect(({ users, loading }) => ({
    users,
    loading: loading.models.users,
}))
@Form.create()
class FatieShenhe extends PureComponent {
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
           title: '帖子编码',
           dataIndex: 'aid',
           key: 'aid',
       },
       {
           title: '用户编码',
           dataIndex: 'userid',
           key:'userid',
       },
       {
           title: '帖子标题',
           dataIndex: 'title',
           key:'title',
       },
       {
           title: '内容',
           dataIndex: 'content',
           key: 'content',
       },
       {
           title: '发表时间',
           dataIndex: 'time',
           key: 'time',
       },
       {
           title: '状态',
           dataIndex: 'status1',
           key:'status1',
           filters: [
            {
              text: status1[0],
              value: 0,
            },
            {
              text: status1[1],
              value: 1,
            },
            {
              text: status1[2],
              value: 2,
            },
            {
              text: status1[3],
              value: 3,
            },
          ],
          render(val) {
            return <Badge status={statusMap[val]} text={status1[val]} />;
          },
       },
      
       {
           title: '操作',
           key:'caozuo',
           render: (text, record) => (
               <Fragment>
                   <a onClick={() => this.showEditModal(record)}>详情</a>
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
           type: 'users/gettiezi1',
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

  
  
//   确定删除
handleMenuClick = (record,  props) => {
    confirm({
        title: '审核通过吗？',
        onOk() {
            props.onDeleteItem(record.id)
        }
    })
}



render() {
    const {
        users,
        loading,
    } = this.props;
    // console.log(this.props.users)
    const {
        form: { getFieldDecorator},
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const { tiezilist } = users


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
    //         <Form >
    //          <FormItem key="aid" label="帖子编码" {...this.formLayout}>
    //             {getFieldDecorator('aid', {
    //                 initialValue: current.aid,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="userid" label="用户编码" {...this.formLayout}>
    //             {getFieldDecorator('userid', {
    //                 initialValue: current.userid,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="title" label="标题" {...this.formLayout}>
    //             {getFieldDecorator('title', {
    //                 initialValue: current.title,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem key="content" label="发帖内容" {...this.formLayout}>
    //             {getFieldDecorator('content', {
    //                 initialValue: current.content,
    //             })(<Input />)}
    //         </FormItem>
    //         <FormItem  key="status1" label="状态" {...this.formLayout}>
    //             {getFieldDecorator('status1', {
    //                 initialValue: current.status1,
    //             })(<Input />)}
    //         </FormItem>
    //         </Form>
    //     )

    // }

    
    // const modalFooter = done
    //   ? { footer: null, onCancel: this.handleDone }
    //   : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



    return (
        <PageHeaderWrapper title="用户发帖列表">
        <Card bordered={false}>
        <div className={styles.tableList}>
       
        <Table 
         loading={loading}
        dataSource={tiezilist}
        columns={this.columns}
        rowSelection={null}
        rowKey="aid"
        />
        </div>
        </Card>
       <Modal
       title={done ? null : `编辑用户信息`}
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

export default FatieShenhe;

