import { Actiontype } from "../contants/action-types";
const initialState = {
    HomepageArray : [],
   
}

export const homepagedata = (state = initialState ,{type ,payload}) =>
{
    
    switch(type)
    {
        case Actiontype.SET_HOMEPAGE:
            return { ...state, HomepageArray:payload};
        default : 
        return state;
    }
};




