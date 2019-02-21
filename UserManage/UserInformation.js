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
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInformation.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;


@connect(({ users, loading }) => ({
    users,
    loading: loading.models.user,
}))
@Form.create()
class UserInformation extends PureComponent {
   state = {
       modalVisible: false,
       updateModalVisible: false,
       formValues: {},
   } 

   columns = [
       {
           title: '用户编码',
           dataIndex: 'userid',
       },
       {
           title: '真实姓名',
           dataIndex: 'username',
       },
       {
           title: '昵称',
           dataIndex: 'nickname',
       },
       {
           title: '性别',
           dataIndex: 'gender',
       },
       {
           title: '出生年月',
           dataIndex: 'birthdate',
       },
       {
           title: '年龄',
           dataIndex: 'age',
       },
       {
           title: '联系电话',
           dataIndex:'tel',
       },
       {
           title: '身份证号',
           dataIndex: 'identity',
       },
       {
           title: '紧急联系人邮箱',
           dataIndex: 'email',
       },
       {
           title: '操作',
           render: (text, record) => (
               <Fragment>
                   <a oncilck={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
                   <Divider type="vertical" />
                   <a href="">删除</a>
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


//    查询功能实现
   handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
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

// 编辑框modal显示
handleUpdateModalVisible = (flag, record) => {
    this.setState({
        updateModalVisible: !!flag,

    })
}

// 提交编辑框
handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
        type: 'users/update',
        payload: {
            username: fields.username,
        }
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();
};


renderHeadForm() {
    const {
        form:{ getFieldDecorator },
    } = this.props;
    return (
        <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg:24, xl: 48}}>
        <Col md={8} sm={24}>
        <FormItem label="用户姓名">
        {getFieldDecorator('username')(<Input placeholder="请输入" />)}
        </FormItem>
        </Col>
        <Col md={8} sm={24}>
        <FormItem label="用户性别">
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
    console.log(this.props.users)
    const { modalVisible, updateModalVisible, formValues } = this.state;

    const updateMethods = {
        handleUpdateModalVisible: this.handleUpdateModalVisible,
        handleUpdate: this.handleUpdate,
    };

    return (
        <PageHeaderWrapper title="用户基本信息">
        <Card bordered={false}>
        <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderHeadForm()}</div>
        <Table 
         loading={loading}
        dataSource={data}
        columns={this.columns}
        />
        </div>
        </Card>
        </PageHeaderWrapper>
    )
}


}

export default UserInformation;