/*
 * @Description:医生业务管理
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-27 01:42:34
 * @LastEditTime: 2019-03-27 07:39:32
 */

 
import React, { PureComponent, Fragment } from 'react';
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
import styles from './doctorinf.less';
import Result from '@/components/Result';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const confirm = Modal.confirm;

@connect(({ doctor, loading }) => ({
    doctor,
    loading: loading.models.doctor,
}))
@Form.create()
class DoctorBusiness extends PureComponent {
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
           title: '业务编码',
           dataIndex: 'bn_id',
           key: 'bn_id',
       },
       {
           title: '医生姓名',
           dataIndex: 'name',
           key:'name',
       },
       {
           title: '视频问诊业务是否开通',
           dataIndex: 'video_zixun',
           key:'video_zixun',
       },
       {
           title: '电话问诊业务是否开通',
           dataIndex: 'tel_zixun',
           key: 'tel_zixun',
       },
       {
           title: '图文问诊业务是否开通',
           dataIndex: 'text_zixun',
           key: 'text_zixun',
       },
       {
           title: '视频问诊定价',
           dataIndex: 'video_price',
           key:'video_price',
       },
       {
           title: '电话问诊定价',
           dataIndex:'tel_price',
           key:'tel_price',
       },
       {
           title: '图文问诊定价',
           dataIndex: 'text_price',
           key:'text_price',
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
           type: 'doctor/fetchbusiness',
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
    const bn_id = current ? current.bn_id : '';

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'doctor/updatebusiness',
        payload: { bn_id, ...fieldsValue },
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
        onOk: () => this.onDeleteItem(record.bn_id)
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
      type: 'doctor/fetchbusiness',
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
        <FormItem key="username" label="医生姓名">
        {getFieldDecorator('username')(<Input placeholder="请输入" />)}
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
        doctor:{ data },
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
             <FormItem key="name" label="医生姓名" {...this.formLayout}>
                {getFieldDecorator('name', {
                    // rules: [{ required: true, message: '请输入用户姓名' }],
                    initialValue: current.name,
                })(<Input />)}
            </FormItem>
            <FormItem key="video_price" label="视频问诊价格" {...this.formLayout}>
                {getFieldDecorator('video_price', {
                    initialValue: current.video_price,
                })(<Input />)}
            </FormItem>
            <FormItem key="tel_price" label="电话问诊价格" {...this.formLayout}>
                {getFieldDecorator('tel_price', {
                    initialValue: current.tel_price,
                })(<Input />)}
            </FormItem>
            <FormItem key="text_price" label="图文问诊价格" {...this.formLayout}>
                {getFieldDecorator('text_price', {
                    initialValue: current.text_price,
                })(<Input />)}
            </FormItem>
           
            </Form>
        )

    }

    
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };



    return (
        <PageHeaderWrapper title="医生业务管理">
        <Card bordered={false}>
        <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderHeadForm()}</div>
        <Table 
         loading={loading}
        dataSource={data}
        columns={this.columns}
        rowSelection={null}
        rowKey="bn_id"
        />
        </div>
        </Card>
       <Modal
       title={done ? null : `业务信息${current ? '更新' : '添加'}`}
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

export default DoctorBusiness;


