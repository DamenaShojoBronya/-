window.onload = function() {
    // 进入就加载方法
    tabClick(); //切换方法
}

function tabClick() {
    var nav = document.querySelectorAll(".cont_nav li"); // 获取.cont_nav(导航栏)所有 li
    var text = document.querySelectorAll(".cont_text li") //获取.cont_text(文本)所有 li
    var bg = document.querySelectorAll(".carousel_bg li") //获取.carousel_bg(背景图)所有 li
    
    if (nav && text && bg) {
        for (var i = 0; i < nav.length; i++) { //遍历.cont_nav的li，给每个li添加监听点击事件
            addHover(i);
        }
        //添加鼠标移动监听
        function addHover(i) {
            nav[i].addEventListener('mouseover', function() { //鼠标移动到元素上时触发事件，后续定义事件内容
                setBgClass(i);
                setTextClass(i)
            });
        }
        
        // 定义切换内容的事件
        function setTextClass(num) {
            // 遍历li，移除当前显示的类名text__active
            for (var i = 0; i < text.length; i++) {
                text[i].classList.remove("text__active");
            }
            // 给鼠标移动到的那个li添加类名text__active
            text[num].classList.add("text__active");
        }
        // 同上
        function setBgClass(num) {
            for (var i = 0; i < bg.length; i++) {
                bg[i].classList.remove("bg__active");
            }
            bg[num].classList.add("bg__active");
        }
    }
}