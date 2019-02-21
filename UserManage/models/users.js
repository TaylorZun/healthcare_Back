import { queryUser, removeUser, updateUser} from '@/services/user';

export default {
    namespace: 'users',

    state:{
    //     data: {
    //       list: [],
    //       pagination: {},
    // },
    data:[]
},

effects: {

    *fetch({ payload }, { call, put }) {
        const res = yield call(queryUser, payload);
        console.log(res);
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

    *update({ payload, callback }, { call, put}) {
        const res = yield call(updateUser, payload);
        yield put({
            type: 'save',
            payload: res
        });
        if(callback) callback();
    },
},

reducers: {
    save(state, action) {
        return {
            ...state,
            data:action.payload,
        };
    },
},


};