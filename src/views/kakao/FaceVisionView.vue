<template>
  <div id="app">
    <ModalView :modalWindow="modalWindow">
      <template v-slot:title>인물 정보</template>
      <template #sub-title>성별 : {{sex}} / 나이 : {{age}}</template>
      <template>
        <div> 
          <v-img :src="img_url" />
        </div>
      </template>
      <template #close>
        <v-btn outlined class="mr-4" color="primary" @click="modalWindow=false" dark>Close</v-btn>
      </template>
    </ModalView>
		<div class="d-flex flex-wrap-reverse">
			<table>
				<tr>
					<td><v-text-field height="50px" v-model="search" @keyup.enter="callImg"></v-text-field></td>
					<td><v-btn color="success" @click="callImg">검색</v-btn></td>
				</tr>
			</table>
		</div>        
    <table>
        <tr>
            <th>제목</th>
            <th>이미지 (이미지를 클릭하여 인물의 정보를 확인)</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
            <td>
                <a :href="item.doc_url" target='_blank'>
                    {{item.display_sitename}}
                </a>
            </td>
            <td>
                <img :src="item.thumbnail_url" @click="callFaceVision(index)">
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import ModalView from "./ModalView.vue"
import { kakaoAxios } from '@/plugins/axios'

export default {
  components: {
    ModalView
  },
  data: () => ({
    modalWindow: false,
    image_url: '',
    sex : '',
    age : '',
    search: '한진희',
    list : [],
  }),
  methods: {
    async callImg(){
      await kakaoAxios({
        headers: {
          Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
        },
        method: "get",
        url: `/search/image`,
        params: {
          query: `${this.search}`
        }
      }).then(response=>{
          this.list = response.data.documents;
      }).catch(error=>{
          console.error(error);
      });
    },
    async callFaceVision(index){
        this.img_url = this.list[index].image_url;
        await kakaoAxios({
          headers: {
            Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
          },
          method: "get",
          url: `/vision/face/detect`,
          params: {
            image_url: `${this.img_url}`
          }
        }).then(response=>{
            if(response.status === this.HTTP_OK){
                this.modalWindow = true;
                this.sex = response.data.result.faces[0].facial_attributes.gender.male > response.data.result.faces[0].facial_attributes.gender.female ? '남성' : '여성';
                this.age = response.data.result.faces[0].facial_attributes.age.toFixed();
                console.log(this.age)
            }
        }).catch(error=>{
            console.error(error);
        });
    }
  }
}
</script>

<style>

</style>
