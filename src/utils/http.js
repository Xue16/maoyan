import axios from 'axios'
axios.defaults.withCredentials = true;
class Http{
    constructor(){
        this.instance = axios.create({
            // baseURL: 'http://localhost:8080/mmdb',
            // baseURL: '/mmdb',
            // baseURL:'/api',
            timeout: 5000,
        });
    }
    get({url,params={}}){
        console.log(url);
        return new Promise((resolve,reject)=>{
            this.instance.get(url,{
                params
            }).then(result =>{
                console.log(result.data);
                resolve(result.data)
            }).catch((err)=>{
                reject(err)
            })

        })
    }
}
export default Http