import{ELEMENT_NODE_TYPE,SLIDER_ANIMATION_CLASS_NAME} from './constants'
import DEFAULTS from './defaults'

class BaseSlider{
  constructor(el,options){
    if(el.nodeType !== ELEMENT_NODE_TYPE){
      throw new Error('实例化的时候请传入DOM元素！')
    }
    this.options = {
      ...DEFAULTS,
      ...options
    }

  const sliderEL = el
  const sliderConentEL = sliderEL.querySelector('.slider-content')
  const sliderItemELs = sliderConentEL.querySelectorAll('.slider-item')
  
  //添加到this上，为了在方法中使用
  this.sliderEL = sliderEL
  this.sliderConentEL = sliderConentEL
  this.sliderItemELs = sliderItemELs
  
  this.minIndex = 0
  this.maxIndex = sliderItemELs.length - 1
  this.currIndex = this.getCorrectedIndex(this.options.initialIndex)

  //获取每个slider-intent的宽度
  this.itemWidth = sliderItemELs[0].offsetWidth

  //初始化
  this.init()
}

init(){
  //为每个slider-item设置宽度
  this.setItemsWidth()

  //为slider-content设置宽度
  this.setContentWidth()

  //切换到初始索引 initialIndex
  this.move(this.getDistance())

  //开启动画
  if(this.options.animation){
    this.openAnimation()
  }

  //自动切换
  if(this.options.autoplay){
    this.autoplay()
  }
}


//切换到index索引对应的幻灯片
to(index){
  index = this.getCorrectedIndex(index)
  if (this.currIndex ===index) return;

  this.currIndex =index
  const distance = this.getDistance()

  if (this.options.animation) {
    this.moveWithAnimation(distance)
  }else{
    this.move(distance)
  }
}

//切换上一张
prev(){
  this.to(this.currIndex -1)
}

//切换下一张
next(){
  this.to(this.currIndex + 1)
}

//自动切换
autoplay(){
  const{autoplay} = this.options
  if (autoplay<=0) return;

  this.pause()
  this.autoplayTimer = setInterval(()=>{
    this.next()
  },autoplay)
}

//暂停自动切换
pause(){
  clearInterval(this.autoplayTimer)
}

//开启动画
openAnimation(){
  this.sliderConentEL.classList.add(SLIDER_ANIMATION_CLASS_NAME)
}

//关闭动画
closeAnimation(){
  this.setAnimationSpeed(0)
}

//设置切换动画速度
setAnimationSpeed(speed=this.options.speed){
  this.sliderConentEL.style.transitionDuration=`${speed}ms`
}

//获取要移动的距离
getDistance(index=this.currIndex){
  return -this.itemWidth * index
}

//不带动画的移动
move(distance){
  this.sliderConentEL.style.transform = `translate3d(${distance}px,0px,0px)`
}

//带动画移动
moveWithAnimation(distance){
  this.setAnimationSpeed()
  this.move(distance)
  this.sliderConentEL.addEventListener(
    'transitionend',
    ()=>{
      this.closeAnimation()
    },
    false
  )
}

//为每个slider-item设置宽度
setItemsWidth(){
  for(const item of this.sliderItemELs){
    item.style.width = `${this.itemWidth}px`
  }
}
  //为slider-content设置宽度
setContentWidth(){
  this.sliderConentEL.style.width = `${this.itemWidth*this.sliderItemELs.length}px`
}
//获取修正后的索引值
getCorrectedIndex(index){
  if(index<this.minIndex)
    return this.maxIndex
  if(index>this.maxIndex)
    return this.minIndex
    return index
}

}

export default BaseSlider