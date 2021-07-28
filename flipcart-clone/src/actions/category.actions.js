import axios from '../healpers/axios'
import { categoryConstant } from './constant'
export const getAllCategory = () => {
    return async dispatch => {
        dispatch({
            type: categoryConstant.GET_ALL_CATEGORY_REQUEST
        });
        const res = await axios.get(`/category/getCategory`)
        
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            });
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST})
        const res = await axios.post(`/category/create`, form)
       console.log(res.data.category)
        if(res.status===201){
            dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                payload:{category:res.data.category}
            })
               
        }
        else{
            dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                payload:res.data.error
            })
        }
        
    }
}