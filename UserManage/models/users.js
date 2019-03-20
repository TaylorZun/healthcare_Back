import { queryUser, removeUser, updateUser, getbloodpressure, sugardata, gettiezi} from '@/services/user';

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

    *fetch({ payload }, { call, put }) {
        const res = yield call(queryUser, payload);
        // console.log(res);
        yield put({
            type: 'save',
            payload: res.data,
            // list: res.data,
        });
    },

    *remove({ payload, callback }, { call, put }) {
        const res = yield call(removeUser,payload);
        yield put({
            type: 'save',
            payload: res,
        });
        if(callback) callback();
    },

    *update({ payload }, { call, put}) {
        const res = yield call(updateUser, payload);
        console.log(res)
        // yield put({
        //     type: 'save',
        //     payload: res.data,
        // });
        // if(callback) callback();
        const res2 = yield call(queryUser, payload);
        // console.log(res);
        yield put({
            type: 'save',
            payload: res2.data,
        });
    },


    *getbloodpressure(_, { call, put }) {
        const res = yield call(getbloodpressure)
        console.log(res)
        yield put ({
            type: 'show',
            // payload: res.data,
            payload :{
                bloodpressure: res.data,
            }
           
        })

    },

    *sugardata(_, { call, put }) {
        const  res = yield call(sugardata)
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