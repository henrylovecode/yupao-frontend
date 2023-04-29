import myAxios from "../plugins/myAxios";
import { setCurrentUserState} from "../state/user";

export const getCurrentUser = async ()=>{
   /* const  currentUser = getCurrentUserState();
    if (currentUser){
        return currentUser;
    }*/
    const res = await  myAxios.get('/user/current');
    if (res.code === 0 ){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;

}