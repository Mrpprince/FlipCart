import axios from '../healpers/axios'
import { productConstant } from './constant'

export const getProductBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/product/${slug}`)
        console.log(res.data)
        if(res.status===200){
            
            dispatch({
                type:productConstant.GET_PRODUCT_BY_SLUG,
                payload:res.data
            })
        }
    }
}