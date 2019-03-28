/*
 * @Description: 用户数据明细展示
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-25 13:56:48
 * @LastEditTime: 2019-03-27 01:27:59
 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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

const FormItem = Form.Item;
const SugarModal = Form.create()(props => {
    const { sugarVisible, sugardata, handleCancel } = props;
    
    return (
      <Modal
        title="血糖数据明细"
        visible={sugarVisible}
        estroyOnClose
        onCancel={handleCancel}
      >
        <Table
        columns={columns2}
        rowSelection={null}
        dataSource={sugardata}
        ></Table>
      </Modal>
    );
  });
  const columns2=[
    {
        title: '数据编码',
        dataIndex: 'id',
        key: 'id',
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
  ]


  
const PressureModal = Form.create()(props => {
    const { pressureVisible, pressuredata, handleCancel } = props;
    
    return (
      <Modal
        title="血压数据明细"
        visible={pressureVisible}
        estroyOnClose
        onCancel={handleCancel}
      >
        <Table
        columns={columns3}
        rowSelection={null}
        dataSource={pressuredata}
        ></Table>
      </Modal>
    );
  });
  const columns3=[
    {
        title: '数据编码',
        dataIndex: 'id',
        key: 'id',
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
  ]
  



@connect(({ users, loading }) => ({
    users,
    loading: loading.models.users,
  }))
  @Form.create()
  class Datadetail extends PureComponent {

     columns1 =[
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
            title: '性别', 
            dataIndex: 'gender', 
            key: 'gender',
        },
        {
            title: '血压数据',
               key:'pressure',
               render: (text, record) => (
                   <Fragment>
                       <a onClick={() => this.showPressureModal(true,record)}>表格</a>
                       <Divider type="vertical" />
                       <a onClick={() => this.handleMenuClick(record)}>图表</a>
                   </Fragment>
               ),
        },
        {
            title: '血糖数据',
               key:'sugar',
               render: (text, record) => (
                   <Fragment>
                       <a onClick={()=> this.showSugarModal(true,record)}>表格</a>
                       <Divider type="vertical" />
                       <a onClick={() => this.handleMenuClick(record)}>图表</a>
                   </Fragment>
               ),
        },
        {
            title: '用药数据',
               key:'medicine',
               render: (text, record) => (
                   <Fragment>
                       <a onClick={() => this.showMedicineModal(record)}>表格</a>
                       <Divider type="vertical" />
                       <a href=''>图表</a>
                   </Fragment>
               ),
        },
    ];
    
    state = {
        visible:false,
        done: false,
        sugarVisible:false,
        sugardata: {},
        pressureVisible:false,
        pressuredata:{}
     } 
     formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'users/fetch',
        });
    }

    showSugarModal = (flag,record) => {
        // console.log(record)record是当前一整条数据对的记录，包含了userID  name等
        this.setState({
            sugarVisible: !!flag,
        });
        const { dispatch } = this.props
        dispatch({
            type: 'users/sugardata',
            payload: record

        })
    }

    showPressureModal = (flag,record) => {
        this.setState({
            pressureVisible: !!flag,
        });
        const {dispatch} = this.props
        dispatch({
            type:'users/getbloodpressure',
            payload: record
        })
    }

    showMedicineModal = record => {
        this.setState({
            visible: true,
            current: record,
        });
    }

    handleCancel = () => {
        this.setState({
          sugarVisible: false,
          pressureVisible:false,
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

  
handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'users/fetch',
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
        <FormItem key="username" label="用户姓名">
        {getFieldDecorator('username')(<Input placeholder="请输入" />)}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <FormItem key="gender" label="用户性别">
        {getFieldDecorator('gender')(
            <Select placeholder="请选择" style={{ width: '100%'}}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
            </Select>
        )}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <span className={styles.submitButtons}>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{ marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
        </span>
        </Col>
        </Row>
        </Form>
    );
}


    render() {
        const { users, loading} = this.props
        const {data,sugardata,bloodpressure} = users
        const { visible,  sugarVisible,pressureVisible } = this.state
        const somemethod = {showSugarModal:this.showSugarModal,
            handleCancel:this.handleCancel,
            showPressureModal:this.showPressureModal}
        
      
    return (
        <PageHeaderWrapper title="用户数据明细展示">
             <Card  bordered={false}>
             <div className={styles.tableList}>
             <div className={styles.tableListForm}>{this.renderHeadForm()}</div>
              <Table 
         loading={loading}
        dataSource={data}
        columns={this.columns1}
        rowSelection={null}
        rowKey="userid"
        />
        </div>
        </Card>
        <SugarModal {...somemethod} sugarVisible={sugarVisible} sugardata={sugardata}></SugarModal>
        <PressureModal {...somemethod} pressuredata={bloodpressure} pressureVisible={pressureVisible}></PressureModal>
        </PageHeaderWrapper>
    )
  }
}

  export default Datadetail;
