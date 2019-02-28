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
  
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //过滤减索
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'doctor/fetch1',
      payload: params,
    });
  };


  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
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
      type: 'doctor/fetch1',
      payload: {},
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
                  <Option value="主治医师">主治医师</Option>
                  <Option value="主任医师">主任医师</Option>
                  <Option value="副主任医师">副主任医师</Option>
                  <Option value="住院医师">住院医师</Option>
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
                  <Option value="0">主治医师</Option>
                  <Option value="1">主任医师</Option>
                  <Option value="2">副主任医师</Option>
                  <Option value="3">住院医师</Option>
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
      const menu = (
        <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
          <Menu.Item key="remove">删除</Menu.Item>
          <Menu.Item key="approval">批量审批</Menu.Item>
        </Menu>
      );

      return(
        <PageHeaderWrapper title="医生基本信息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
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
        </PageHeaderWrapper>
      )
  }



      }
      export default DoctorInformation