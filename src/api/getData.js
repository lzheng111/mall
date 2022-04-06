import{getJSON} from './ajax'
import { SUCC_CODE,TIMEOUT } from './config';

//获取数据
const getData = (url,Options) => {
  return getJSON(url,{
    timeoutTime:TIMEOUT,
    ...Options
  }).then(response =>{
    // if (response.code!==SUCC_CODE) throw new Error(`出错了:${response.code}`);

    return response.data.banner.list
  }).catch(err =>{
    console.log(err);
  })
}

export{getData}