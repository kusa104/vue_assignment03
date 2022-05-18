import axios from 'axios'

// // axios의 기본 베이스를 정의 함.
// axios.defaults.baseURL = 'https://api.devcury.kr';
// // post타입의 content-type을 정의.
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// export default axios;

export const loginAxios = axios.create({
  baseURL: 'https://api.devcury.kr',
  headers: {'Content-Type': 'application/json'},
})

export const calendarAxios = axios.create({
  baseURL: 'http://localhost:5000/vue-calendar-f1cfa/us-central1/calendar',
})

export const kakaoAxios = axios.create({
  baseURL: 'https://dapi.kakao.com/v2',
  headers: {'Content-Type': 'application/json'},
})