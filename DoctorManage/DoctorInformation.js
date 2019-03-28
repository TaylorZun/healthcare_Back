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
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Table,
  Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './doctorinf.less';
import Result from '@/components/Result';

const FormItem = Form.Item;

//getvalue用于搜索功能提取输入的值
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    }

    const columns = [
        {
          title: '医生编码',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '医生姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: '医院',
            dataIndex: 'hospital',
            key: 'hospital',
          },
          {
            title: '接诊量',
            dataIndex: 'faqnum',
            key: 'faqnum',
          },
          {
            title: '主治',
            dataIndex: 'master',
            key: 'master',
          },
          {
            title: '职称',
            dataIndex: 'zhicheng',
            key: 'zhicheng',
          },
          {
            title: '科室',
            dataIndex: 'keshi',
            key: 'keshi',
          },
          {
            title: '好评率',
            dataIndex: 'evaluation',
            key: 'evaluation',
          },
        ];

    @connect(({ doctor, loading }) => ({
        doctor,
        loading: loading.models.doctor,
      }))
      @Form.create()
      class DoctorInformation extends PureComponent {

        state={
            selectedRows: [],
            visible: false
            
        };
          
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'doctor/fetch',
    });
  }

  
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  showModal = () => {
    this.setState({
        visible: true,
        current: undefined,
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
        type: 'doctor/fetch1',
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
      type: 'doctor/fetch',
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'doctor/submit',
        payload: {  ...fieldsValue },
      });
    });
  };


  
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="医生名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="医生职称">
              {getFieldDecorator('zhicheng')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="主治医师">主治医师</Select.Option>
                  <Select.Option value="主任医师">主任医师</Select.Option>
                  <Select.Option value="副主任医师">副主任医师</Select.Option>
                  <Select.Option value="住院医师">住院医师</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="医生名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="医生职称">
              {getFieldDecorator('zhicheng')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="主治医师">主治医师></Select.Option>
                  <Select.Option value="主任医师">主任医师</Select.Option>
                  <Select.Option value="副主任医师">副主任医师</Select.Option>
                  <Select.Option value="住院医师">住院医师</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所属医院">
              {getFieldDecorator('hospital')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          
          <Col md={8} sm={24}>
          <FormItem label="科室">
              {getFieldDecorator('keshi')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
          <FormItem label="主治">
              {getFieldDecorator('master')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
          <FormItem label="接诊量">
              {getFieldDecorator('faqnum')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
      const { doctor , loading } = this.props;
      const { doctorlist } = doctor
      const { selectedRows } = this.state
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
             <FormItem key="name" label="医生名称" {...this.formLayout}>
                {getFieldDecorator('name', {
                    // rules: [{ required: true, message: '请输入用户姓名' }],
                    initialValue: current.name,
                })(<Input />)}
            </FormItem>
            <FormItem key="hospital" label="医院" {...this.formLayout}>
                {getFieldDecorator('hospital', {
                    initialValue: current.hospital,
                })(<Input />)}
            </FormItem>
            <FormItem key="zhicheng" label="职称" {...this.formLayout}>
                {getFieldDecorator('zhicheng', {
                    initialValue: current.zhicheng,
                })(<Input />)}
            </FormItem>
            <FormItem key="keshi" label="科室" {...this.formLayout}>
                {getFieldDecorator('keshi', {
                    // rules: [{ required: true, message: '请输入科室' }],
                    initialValue: current.keshi,
                })(<Input />)}
            </FormItem>
           
            </Form>
        )

    }

    
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };


     
      return(
        <PageHeaderWrapper title="医生基本信息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.showModal}>
                新建
              </Button>
             
            </div>
            <Table
              selectedRows={selectedRows}
              rowSelection={rowSelection}
              loading={loading}
              dataSource={doctorlist}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
       title="新增医生"
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
      export default DoctorInformation