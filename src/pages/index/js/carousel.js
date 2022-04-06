// 轮播图特效
// 日期：2022年1月8日
// lzheng
(function () {
  var carousel_list = document.getElementById('carousel_list')
  var left_btn = document.getElementById('left_btn')
  var right_btn = document.getElementById('right_btn')
  var circles_ol = document.getElementById('circles_ol')
  var circles_li = circles_ol.getElementsByTagName('li')
  var banner = document.getElementById('banner')
  //克隆第一张li
  var clone_li = carousel_list.firstElementChild.cloneNode(true)
  // 上树
  carousel_list.appendChild(clone_li)

  // 当前正在显示的图片序号从0开始
  var idx = 0
  //节流锁
  var lock = true

  //右按钮添加监听
  right_btn.onclick = right_btn_handler
    function right_btn_handler () {
      //判断节流锁的状态，如果是关闭的，那么就什么都不做
      if (!lock) return;
        //关锁
        lock = false
        //加上过渡
        carousel_list.style.transition = 'transform .5s ease 0s'
        idx++
        carousel_list.style.transform = 'translatex(' + -16.66 * idx + '%)'
          // 判断是否是最后一张图片
          if (idx > 4) {
            setTimeout(function () {
            // 去掉过渡
              carousel_list.style.transition = 'none'
            // 删除transform属性
              carousel_list.style.transform = 'none'
              idx = 0
          }, 500)
        }
      // 设置小圆点
      setCircles()

      // 动画结束 开锁
       setTimeout(function(){
         lock = true
       }, 500);
  
  }

  // 左按钮添加监听
  left_btn.onclick = function () {
    if(!lock) return
      lock = false
      // 要先写if语句判断
      if (idx == 0) {
        carousel_list.style.transition = 'none'
        //拉到最后 是瞬间移动
        carousel_list.style.transform = 'translatex(' + -16.66 * 5 + '%)'
        // 改变idx的值
        idx = 4
        // 加上过渡 小技巧 可以让刚才的瞬移加上过渡
        setTimeout(function () {
          // 加上过渡
          carousel_list.style.transition = 'transform .5s ease 0s'
          // 动画
          carousel_list.style.transform = 'translatex(' + -16.66 * 4 + '%)'
        }, 0)
      } else {
        idx--
        carousel_list.style.transform = 'translatex(' + -16.66 * idx + '%)'
      }
    // 设置小圆点
    setCircles()

    setTimeout(function() {
      lock = true
    }, 500);
  }

  // // 设置小圆点的current在谁身上，序号为idx的li才有
  function setCircles() {
    for (var i = 0; i <= 4; i++) {
      // %5很有灵性
      if (i == idx % 5) {
        circles_li[i].className = 'current'
      } else {
        circles_li[i].className = ''
      }
    }
  }
  // 事件委托 小圆点的监听
  circles_ol.onclick = function (e) {
    if (e.target.tagName.toLowerCase() == 'li') {
      var n = Number(e.target.getAttribute('data-n'))
      idx = n
      carousel_list.style.transform = 'translatex(' + -16.66 * idx + '%)'
      setCircles()
    }
  }

  // 定时器 轮播图自动轮播
   var timer = setInterval(right_btn_handler,2000)
  
  //鼠标进入 自动轮播暂停
  banner.onmouseenter = function(){
    clearInterval(timer)
  }
  //鼠标离开 自动轮播开始
  banner.onmouseleave = function(){
    //设表先关
    clearInterval(timer)
    timer = setInterval(right_btn_handler,2000)
   
  }
})();