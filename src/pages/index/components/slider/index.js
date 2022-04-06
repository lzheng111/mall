import './slider.css'
import './btn.css'

import Slider from './module'

import { getData } from 'api/getData'
import render from './slider.art'

const layoutEL = document.getElementById('slider-layout')

// getData('http://152.136.185.210:7878/api/hy66/home/multidata'
// ).then(data =>{
//   console.log(data);
//   layoutEL.innerHTML =  render({items:data})
// }).catch(err=>{
//   console.log(err);
// })

const slider = new Slider(document.querySelector('.slider'),{
    //初始索引
  initialIndex:0,
    //切换时是否有动画
  animation:true,
  //切换速度，单位ms
  speed:500,
  //自动切换，单位ms
  autoplay:1000
})

const leftbtnEL = document.getElementById('left_btn')
const rightbtnEL = document.getElementById('right_btn')
const bannerEL = document.getElementById('banner')

leftbtnEL.addEventListener('click',()=>{
  slider.prev()
},false)

rightbtnEL.addEventListener('click',()=>{
  slider.next()
},false)

bannerEL.addEventListener('mouseenter',() => {
  slider.pause()
},false)

bannerEL.addEventListener('mouseleave',() => {
  slider.autoplay()
},false)