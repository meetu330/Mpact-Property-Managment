import { Actiontype } from "../contants/action-types";

export const setProducts = (homepage_data) => {
    
    return {
        type: Actiontype.SET_HOMEPAGE,
        payload: homepage_data

    }
}




