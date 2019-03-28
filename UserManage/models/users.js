import { queryUser, addUser,removeUser, updateUser, getbloodpressure, sugardata, gettiezi} from '@/services/user';

export default {
    namespace: 'users',

    state:{
    //     data: {
    //       list: [],
    //       pagination: {},
    // },
    data:[],
    bloodpressure: [],
    sugardata: [],
    medicine: [],
    tiezilist: [],
    },

effects: {

    /**
     * 
     * @param {查询用户基本信息} param0 
     * @param {*} param1 
     */
    *fetch({ payload }, { call, put }) {
        const res = yield call(queryUser, payload);
        // console.log(res);
        yield put({
            type: 'save',
            payload: res.data,
            // list: res.data,
        });
    },

    /**
     * 
     * @param {新增用户} param0 
     * @param {*} param1 
     */
    *addUser({payload}, { call, put }) {
        const res = yield call(addUser, payload)
       
    },

    //新增与编辑二合一
    *submit({ payload }, { call, put }) {
        let callback;
        if (payload.userid) {
          callback = updateUser;
        } else {
          callback = addUser;
        }
        const res = yield call(callback, payload); // post
        console.log(res)
        yield put({
          type: 'save',
          payload: res.data,
        });
       
      },
    



/**
 * 
 * @param {userid} param0 
 * @param {删除用户*} param1 
 */
    *remove({ payload }, { call, put }) {
        const res = yield call(removeUser,payload);
        yield put({
            type: 'save',
            payload: res.data,
          });
       
    },

    /**
     * 
     * @param {编辑用户信息} param0 
     * @param {*} param1 
     */

    *update({ payload }, { call, put}) {
        const res = yield call(updateUser, payload);
        console.log(res)
        const res2 = yield call(queryUser, payload);
        yield put({
            type: 'save',
            payload: res2.data,
        });
    },


    *getbloodpressure({payload}, { call, put }) {
        const res = yield call(getbloodpressure,payload)
        console.log(res)
        yield put ({
            type: 'show',
            payload :{
                bloodpressure: res.data,
            }
           
        })

    },

    *sugardata({payload}, { call, put }) {
        const  res = yield call(sugardata,payload)
        console.log(res)
        yield put ({
            type:'show',
            payload: {  //payload与reducer有关的。
                sugardata: res.data
            }
        })
    },
    

    *gettiezi1(_, { call, put }) {
        console.log(res)
        const res = yield call(gettiezi)
        yield put ({
            type:'show',
            payload: {  //payload与reducer有关的。
                tiezilist: res.data
            }
        })
    },




},

reducers: {
    save(state, action) {
        return {
            ...state,
            data:action.payload,
        };
    },
    show(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
      queryList(state, action) {
        return {
          ...state,
          list: action.payload,
        };
      },

},


};