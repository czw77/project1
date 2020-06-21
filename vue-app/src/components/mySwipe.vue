<template>
    <div class="swiper-container" :id="id">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    props:["id","swiperOptions"],

    mounted(){
        // 3. 实例化  
        let oneSwiper = new Swiper("#"+this.id,this.swiperOptions);
    }
}
</script>
