// 实现缩略图效果
(function(){
    // 获取相关元素
    var thumbBox = document.querySelector('#thumbBox'); // 缩略图外层元素
    var thumbWrapper = document.querySelector('#thumbWrapper'); // 图片包裹元素
    var arrowLeft = document.querySelector('#arrowLeft'); // 左边按钮
    var arrowRight = document.querySelector('#arrowRight'); // 右边按钮
    var smallImage = document.querySelector('#smallImage'); // 获取放大镜小图
    var bigImage = document.querySelector('#bigImage'); // 获取放大镜大图

    // 根据 数据 添加缩略图图片，遍历图片信息
    goodData.imgsrc.forEach(function(item, index){
        // 创建 img 元素
        var imgNode = document.createElement('img');
        // 设置图片的属性
        imgNode.src = item.s;
        // 把图片添加到 thumbWrapper
        thumbWrapper.appendChild(imgNode);
    });


    // 定义相关变量
    var imgWidth = thumbWrapper.firstElementChild.offsetWidth + parseInt(getStyle(thumbWrapper.firstElementChild, 'marginRight')); // 单个图片所占的位置宽度（自身宽度+外边距）
    var scrollLen = imgWidth * 2;  // 一次滚动的距离
    // 计算向左滚动的临界值， thumbWrapper left 的最小值  ()
    var minLeft = imgWidth * 5 - imgWidth * goodData.imgsrc.length;


    // 点击右边按钮， 向左滚动
    arrowRight.onclick = function(){
        // 计算 thumbWrapper 的 left 值
        var left = thumbWrapper.offsetLeft - scrollLen;
        // 判断是否超过临界值
        if (left <= minLeft) {
            left = minLeft;
        }
        // 设置 thumbWrapper 的属性
        thumbWrapper.style.left = left + 'px';
    };


    // 点击左边按钮。向右移动
    arrowLeft.onclick = function(){
        // 计算  thumbWrapper 的 left 值
        var left = thumbWrapper.offsetLeft + scrollLen;
        // 判断 left 属性的临界值
        if (left >= 0) {
            left = 0;
        }
        // 设置 thumbWrapper 的 left 属性
        thumbWrapper.style.left = left + 'px';
    };

    // 给每一张缩略图图片添加 click 事件
    [].forEach.call(thumbWrapper.children, function(item, index){
        // 添加 click 事件
        item.onclick = function(){
            // 修改放大镜小图
            smallImage.src = item.src;
            // 修改放大镜大图
            bigImage.src = goodData.imgsrc[index].b;

        }
    });
})();

// 实现放大镜效果
(function(){
    // 获取相关元素
    var smallImageBox = document.querySelector('#smallImageBox'); // 小图包裹元素
    var zoom = document.querySelector('#zoom'); // 蒙版元素
    var bigImageBox = document.querySelector('#bigImageBox'); // 获取包裹大图的元素

    // 鼠标悬停在 smallImageBox
    smallImageBox.onmouseenter = function() {
        // 蒙版元素显示
        zoom.style.display = 'block';
        // 大图显示
        bigImageBox.style.display = 'block';
    };
    // 鼠标离开 smallImageBox
    smallImageBox.onmouseleave = function(){
        // 蒙版元素隐藏
        zoom.style.display = 'none';
        // 大图隐藏
        bigImageBox.style.display = 'none';
    };
    // 鼠标在 smallImageBox 上面移动
    smallImageBox.onmousemove = function(event){
        // 获取鼠标在smallImageBox 上的位置 （鼠标在视口上的位置 - 元素在视口上的位置 = 鼠标在元素上的位置）
        var eleX = event.clientX - smallImageBox.getBoundingClientRect().left;
        var eleY = event.clientY - smallImageBox.getBoundingClientRect().top;

        // 计算蒙版元素的位置
        var left = eleX - zoom.offsetWidth/2;
        var top = eleY - zoom.offsetHeight/2;

        // 蒙版元素位置限定
        // 限定 left 的值
        if (left < 0) {
            left = 0;
        } else if (left > smallImageBox.clientWidth - zoom.offsetWidth) {
            left = smallImageBox.clientWidth - zoom.offsetWidth;
        }
        // 限定 top 的值
        if (top < 0) {
            top = 0;
        } else if (top > smallImageBox.clientHeight - zoom.offsetHeight) {
            top = smallImageBox.clientHeight - zoom.offsetHeight;
        }

        // 设置蒙版元素的位置
        zoom.style.left = left + 'px';
        zoom.style.top = top + 'px';

        // 根据蒙版元素的位置调整大图的位置
        bigImageBox.scrollLeft = left * 2;
        bigImageBox.scrollTop = top * 2;
    }
})();

// 商品图右侧商品价格信息 数据设置
(function(){
    // 获取相关元素
    var productTitle = document.querySelector('#productTitle');
    var productNews = document.querySelector('#productNews');
    var productPrice = document.querySelector('#productPrice');
    var productComments = document.querySelector('#productComments');
    var priceContent = document.querySelector('#priceContent');
    var supportContent = document.querySelector('#supportContent');
    var addressContent = document.querySelector('#addressContent');

    // 给元素设置内容
    productTitle.innerHTML = goodData.goodsDetail.title;
    productNews.innerHTML = goodData.goodsDetail.recommend;
    productPrice.innerHTML = goodData.goodsDetail.price;
    priceContent.innerHTML = (goodData.goodsDetail.promoteSales.type ? '<span class="badge">'+goodData.goodsDetail.promoteSales.type+'</span> ' : '') + goodData.goodsDetail.promoteSales.content;
    productComments.innerHTML = '累计评论 ' + goodData.goodsDetail.evaluateNum;
    supportContent.innerHTML = goodData.goodsDetail.support;
    addressContent.innerHTML = goodData.goodsDetail.address;
})();

// 商品选项参数设置
(function(){
    // 获取相关元素
    var chooseBox = document.querySelector('#chooseBox'); // 最外层包裹元素
    var selectedBox = document.querySelector('#selectedBox'); // 获取选中的标签的包裹元素
    var productPriceBox = document.querySelector('#productPrice'); // 显示价格的元素
    var productNumInput = document.querySelector('#productNum'); // 数量输入框
    var plusBtn = document.querySelector('#plusBtn');  // 增加数量的按钮
    var reduceBtn = document.querySelector('#reduceBtn'); // 减少数量的按钮
    var masterPriceBox = document.querySelector('#masterPrice'); // 主商品价格
    var resultPriceBox = document.querySelector('#resultPrice'); // 结果价格
    var checkboxNodes = document.querySelectorAll('#collectionsGroups li input[type="checkbox"]'); // 商品搭配的所有复选框
    var resultNumBox = document.querySelector('#resultNum'); // 搭配商品数量的包裹元素

    // 根据数据 动态地创建 dl 元素 以及里面的 dt 和 dd
    goodData.goodsDetail.crumbData.forEach(function(dlItem, dlIndex){
        // 创建 dl 元素
        var dl = document.createElement('dl');

        // 给dl添加自定义属性
        dl.dataset.index = dlIndex;

        // 向 dl 中添加 dt 元素
        var dt = document.createElement('dt'); // 创建 dt 元素
        dt.innerHTML = dlItem.title;
        dl.appendChild(dt); 

        // 根据数据 添加 dd 元素，
        dlItem.data.forEach(function(ddItem, ddIndex){
            // 创建 dd 元素
            var dd = document.createElement('dd');
            // 添加内容
            dd.innerHTML = ddItem.type;
            // 如果第一数据， 添加 active 类
            if (ddIndex === 0) {
                dd.classList.add('active');
            }
            // 添加自定义属性，标记价格变化
            dd.dataset.changePrice = ddItem.changePrice;
            // dd 添加到 dl 中
            dl.appendChild(dd);
        });

        // 把 dl 元素添加到 chooseBox 中
        chooseBox.appendChild(dl);
    })

    // 获取所有的 dd 元素
    var ddNodes = chooseBox.querySelectorAll('dd');

    // 创建数组，存储选中的标签元素
    var selectedArr = new Array(goodData.goodsDetail.crumbData.length);
    // 定义变量，表示主商品总价; 总价格初始值就是商品的初始单价
    var totalPrice = goodData.goodsDetail.price;
    // 定义变量，表示搭配商品的总价（除掉主商品），初始值0
    var collectionsPrice = 0;
    // 定义变量 记录商品的数量
    var nums = 1;
    // 定义变量，记录搭配商品的数量
    var collectionsNums = 0;

    // 给每个 dd 元素添加 click 事件，遍历
    ddNodes.forEach(function(ddNode, index){
        // 添加 click 事件
        ddNode.onclick = function(){
            // 当前 dd 的样式变化 ------------------------------------------------
            // 排他，当前点击的 dd 元素的其他兄弟dd元素
            // 获取当前点击的 dd 元素的兄弟元素中的 dd，（包含它自己）
            var ddSiblings = ddNode.parentNode.querySelectorAll('dd');
            ddSiblings.forEach(function(item, index){
                item.classList.remove('active');
            });
            // 当前的 dd 元素添加类名 active
            ddNode.classList.add('active');

            // 创建标签元素 添加到数组中----------------------------------------------
            var spanNode = document.createElement('span');
            spanNode.classList.add('mark');
            spanNode.innerHTML = ddNode.innerHTML;
            spanNode.dataset.changePrice = ddNode.dataset.changePrice;

            // 将新创建的span标签元素，添加到数组中
            selectedArr[ddNode.parentNode.dataset.index] = spanNode;

            // 清空selectedBox 中的内容
            selectedBox.innerHTML = '';
            // 根据数组中的内容，向 selectedBox 元素中添加标签
            selectedArr.forEach(function(span, index){
                // 添加到 selectedBox 中
                selectedBox.appendChild(span);
            });

            // 点击 x，删除标签元素功能 ----------------------------------------
            // 给 span 添加删除按钮
            var closeBtn = document.createElement('i');
            closeBtn.innerHTML = 'X';
            // 添加到 span 元素
            spanNode.appendChild(closeBtn);

            // 给删除按钮添加click事件
            closeBtn.onclick = function(){
                // span 元素要移除
                selectedBox.removeChild(this.parentNode);
                // 数组清除掉对应的 span 元素
                delete selectedArr[ddNode.parentNode.dataset.index];
                // 默认选择当前分组的第一个选项
                ddNode.classList.remove('active');  // 当前的选项不选中
                ddNode.parentNode.children[1].classList.add('active'); // 第一个选项选中
                // 调用函数价格变化
                computedPrice();
            }


            // 价格变化 --------------------------------------------------
            computedPrice();
        }
    });

    // 点击 + ,商品数量 +1
    plusBtn.onclick = function(){
        // 数量 +1,并修改 input 的显示
        productNumInput.value = ++ nums;
        // 价格变化
        computedPrice();
    }

    // 单击 -，商品数量 -1
    reduceBtn.onclick = function(){
        // 数量 -1
        nums --;
        // 数量最小是 1
        if (nums < 1) {
            nums = 1;
        }
        // 显示在 input 中
        productNumInput.value = nums;
        // 价格 变化
        computedPrice();
    }

    // 给 input 添加 change 事件
    productNumInput.onchange = function(){
        // 根据 input 中的内容设置数量
        nums = parseInt(this.value);
        // 判断数量的有效性,无效值，默认是1
        if (isNaN(nums) || nums < 1) {
            nums = 1;
        }
        // 让input与nums保持一致
        this.value = nums;
        // 修改价格
        computedPrice();
    }

    // 遍历商品搭配的每个复选框
    checkboxNodes.forEach(function(checkbox, index){
        // 添加 change 事件
        checkbox.onchange = function(){
           // 由不选中到选中
           if (checkbox.checked) {
                // 搭配商品总价 +
                collectionsPrice += Number(checkbox.dataset.changePrice);
                // 搭配商品数量 +
                collectionsNums ++;
            } else { // 由选中到不选中
                collectionsPrice -= Number(checkbox.dataset.changePrice);
                collectionsNums --;
           }
           // 显示搭配结果的总价
           resultPriceBox.innerHTML = '&yen;' + (totalPrice + collectionsPrice);
           // 心事搭配商品的数量
           resultNumBox.innerHTML = '已选够' + collectionsNums + '件商品';

        }
    });

    // 封装函数 显示最终价格
    function computedPrice() {
        // 定义变量，商品单价 初始值是默认价格 单价
        var price = goodData.goodsDetail.price;
        // 遍历数组 selectedArr
        selectedArr.forEach(function(item){
            price += Number(item.dataset.changePrice);
        });
        // 计算主商品总价
        totalPrice = price * nums;
        // 显示价格 
        productPriceBox.innerHTML = totalPrice;
        // 主商品价格
        masterPriceBox.innerHTML = '&yen;' + totalPrice;
        // 搭配结果价格 = 主商品总价 + 搭配商品总价
        resultPriceBox.innerHTML = '&yen;' + (totalPrice + collectionsPrice);
    }
})();

// 商品详情侧边栏选项卡效果
(function(){
    // 获取相关元素
    var tabTitles = document.querySelectorAll('#asidebar .tab-title h4');  //选项卡按钮
    var tabItems = document.querySelectorAll('#asidebar .tab-content .tab-item'); // 选项卡内容

    // 给每个选项卡的标题（按钮） 添加 click 事件
    tabTitles.forEach(function(tabTitle, index){
        // 添加事件
        tabTitle.onclick = function(){
            // 排他 所有的兄弟元素，去掉 active 类
            tabTitles.forEach(function(item, index) {
                // 所有的 h4 去掉 active 类
                item.classList.remove('active');
                // tabItem 去掉
                tabItems[index].classList.remove('active');
            });
            //当前的选中
            tabTitle.classList.add('active');
            // 对应的 tabItem 选中
            tabItems[index].classList.add('active');
        }

       
    });
})();

// 商品详情内容选项卡
(function(){
    // 获取相关元素
    var tabTitleItems = document.querySelectorAll('#detailsContent .tab-title li'); // 选项卡标题元素
    var tabContentItems = document.querySelectorAll('#detailsContent .tab-content>li'); // 选项卡内容元素

    // 遍历标题元素
    tabTitleItems.forEach(function(item, index){
        // 添加 click 事件
        item.onclick = function(){
            // 排他 所有的兄弟元素去掉 active
            tabTitleItems.forEach(function(item, index){
                // 所有选项卡标题元素去掉 active
                item.classList.remove('active'); 
                // 所有选项卡内容元素 去掉active
                tabContentItems[index].classList.remove('active');
            });

            // 当前的标题元素 添加 active
            item.classList.add('active');
            // 当前对应的选项卡内容元素添加 active
            tabContentItems[index].classList.add('active');

        }
    })
})();

// 页面侧边栏展开和收回
(function(){
    // 获取开关按钮
    var openBtn = document.querySelector('#openBtn');
    // 获取页面侧边栏包裹元素
    var pageAsider = document.querySelector('#pageAsider');

    // 点击开关按钮
    openBtn.onclick = function(){
        pageAsider.classList.toggle('open');
        openBtn.classList.toggle('open');
    }
})();

// 点击返回页面顶部
(function(){
    // 获取按钮元素
    var gotoTopBtn = document.querySelector('#gotoTop');

    // 点击事件
    gotoTopBtn.onclick = function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
})();