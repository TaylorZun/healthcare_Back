import { queryDoctor,queryDoctor1,addDoctor,fetchbusiness,updatebusiness } from '@/services/doctor'

export default {
    namespace: 'doctor',

    state: {
        doctorlist: [],
    },

    effects: {
        
        *fetch(_, { call, put }) {
            const res = yield call(queryDoctor);
            console.log(res)
            yield put ({
                type: 'show',
                payload: {
                    doctorlist: res.data,
                }
            })
        },

        *fetch1( {payload}, { call, put }) {
            const res = yield call(queryDoctor1, payload)
            console.log(res)
            yield put({
                type: 'show',
                payload:{
                    doctorlist: res.data,
                } 
                
            })
        },

        *submit({payload}, {call, put}) {
            const res = yield call (addDoctor,payload)
            yield put({
                type: 'show',
                payload:{
                    doctorlist: res.data,
                } 
                
            })


        },

        *fetchbusiness(_, {call, put}) {
            const res = yield call (fetchbusiness)
            yield put ({
                type: 'save',
                payload: res.data
                
            })
        },

        *updatebusiness({payload} ,{call, put}) {
            const res = yield call(updatebusiness,payload)
            yield put ({
                type:'save',
                payload:res.data
            })
        }

    },

    reducers: {
        show(state, { payload }) {
            return {
              ...state,
              ...payload,
            };
          },

          save(state, action) {
              return {
                  ...state,
                  data: action.payload,
              }
          }
    }

}