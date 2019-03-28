import { orderlist} from '@/services/order';

export default {
    namespace: 'order',

    state:{
    //     data: {
    //       list: [],
    //       pagination: {},
    // },
    
    },

effects: {

    *fetch(_, {call ,put}){
        const res = yield call (orderlist)
        yield put ({
            type:'show',
            payload: {  //payload与reducer有关的。
                orderlist: res.data
            }
        })
    }
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
      }

},
}
