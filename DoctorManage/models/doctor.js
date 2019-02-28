import { queryDoctor,queryDoctor1 } from '@/services/doctor'

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
                type: 'save',
                payload: res.data,
                
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