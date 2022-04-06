import BaseSlider from "./base";
import keyboard from "./keyboard";

//继承基类
 class Slider extends BaseSlider{
   constructor(el,options){
     super(el,options)
     this.bindEvent()
   }
bindEvent(){
  keyboard.bindEvent(this)
}
 }

export default Slider