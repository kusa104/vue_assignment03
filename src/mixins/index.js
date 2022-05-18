import { loginAxios } from '@/plugins/axios'
import store from '@/store'
import Code from '@/static/Code'

export default {

    data: () => ({
        ...Code
    }),

    methods: {
        /**
         * 공통 통신 함수 header에 토큰을 포함하여 전송함.
         * @param {*} url 
         * @param {*} method 
         * @param {*} data paramter 
         * @returns 
         */
        async $api(url, method, data, errorCallback) {

            return loginAxios({
                headers: {
                    Authorization: `Bearer ${store.getters['user/token']}`
                },
                method: method
                , url
                , data
            }).catch(e => {
                if(e.response.status === this.HTTP_UNAUTHORIZED 
                    && e.response?.data?.error 
                    && e.response.data.error === 'Invalid token'){

                    alert('로그인 정보가 만료되었습니다.');
                    // 토큰을 비워준다. 
                    store.dispatch('user/setToken', null);

                } else if(errorCallback){
                    errorCallback(e.response);
                } else if(e.response?.data?.error){
                    alert(e.response.data.error);
                }
            });
            
        },

    },

}