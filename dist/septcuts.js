;(function(undefined) {
    "use strict"
    var _global;
    // 工具函数
    //加载css
    function loadCssCode(code){
      var style = document.createElement('style');
      style.type = 'text/css';
      try{
          style .appendChild(document.createTextNode(code));
      }catch(ex){
          style.styleSheet.cssText = code;
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    var styleString='.qt-dropdown-btn{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qt-dropdown-list{position:absolute;top:0;left:0;z-index:10;margin:5px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-shadow:0 2px 12px 0 rgba(0,0,0,.1);-webkit-transform-origin:center top;transform-origin:center top;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.qt-dropdown-list.show{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list.hide{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list .list-content{padding:25px 30px;max-height:800px;max-height:80vh;overflow:auto}.qt-dropdown-arrow,.qt-dropdown-arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.qt-dropdown-arrow{top:-6px;left:49%;left:calc(50% - 6px);margin-right:3px;border-bottom-color:#ebeef5;border-width:6px;border-top-width:0;-webkit-filter:drop-shadow(0 2px 12px rgba(0, 0, 0, .03));filter:drop-shadow(0 2px 12px rgba(0, 0, 0, .03))}.qt-dropdown-arrow:after{content:" ";border-width:6px;top:1px;margin-left:-6px;border-top-width:0;border-bottom-color:#fff}.qt-dropdown-group{overflow:hidden}.qt-dropdown-title{line-height:36px;font-size:14px;margin:0;color:#999}.qt-dropdown-item{float:left;width:180px;list-style:none;margin:5px 0;padding:6px 0;line-height:36px;font-size:16px;color:#333;cursor:pointer;outline:0;vertical-align:middle;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:6px 0;margin:5px 0}.qt-dropdown-item:hover{background:#f7fbfe}.qt-dropdown-item.is-disabled{cursor:default;color:#bbb;pointer-events:none}.qt-item-icon{display:inline-block;background-color:#f2f2f2;margin:0 10px;vertical-align:middle;text-align:center}.qt-item-icon img{height:100%;max-width:100%;vertical-align:top}';
    loadCssCode(styleString);
    //兼容bind函数
    if(!Function.prototype.bind){
      Function.prototype.bind = function(){
          if(typeof this !== 'function'){
    　　　　　　throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    　　　　}
          var _this = this;
          var obj = arguments[0];
          var ags = Array.prototype.slice.call(arguments,1);
          return function(){
              _this.apply(obj,ags);
          };
      };
    }
    //兼容addEventListener函数
    function addEventListener(ele,event,fn,boolean){
      if(!boolean)boolean=false;
      if(ele.addEventListener){
          ele.addEventListener(event,fn,boolean);
      }else{
          ele.attachEvent('on'+event,fn.bind(ele));
      }
    }
    //阻止事件冒泡stopPropagation的兼容写法
    function stopPropagation(e){
        if(document.all){  //只有ie识别
            e.cancelBubble=true;
        }else{
            e.stopPropagation();
        }
    }
    //兼容classList
    if (!("classList" in document.documentElement)) {
      Object.defineProperty(window.Element.prototype, 'classList', {
        get: function () {
          var self = this
          function update(fn) {
            return function () {
              var className = self.className.replace(/^\s+|\s+$/g, ''),
                valArr = arguments
              return fn(className, valArr)
            }
          }
          function add_rmv (className, valArr, tag) {
            for (var i in valArr) {
              if(typeof valArr[i] !== 'string' || !!~valArr[i].search(/\s+/g)) throw TypeError('the type of value is error')
              var temp = valArr[i]
              var flag = !!~className.search(new RegExp('(\\s+)?'+temp+'(\\s+)?'))
              if (tag === 1) {
                !flag ? className += ' ' + temp : ''
              } else if (tag === 2) {
                flag ? className = className.replace(new RegExp('(\\s+)?'+temp),'') : ''
              }
            }
            self.className = className
            return tag
          }
          return {
            add: update(function (className, valArr) {
              add_rmv(className, valArr, 1)
            }),
            remove: update(function (className, valArr) {
              add_rmv(className, valArr, 2)
            }),
            toggle: function (value) {
              if(typeof value !== 'string' || arguments.length === 0) throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument(string) required, but only 0 present.")
              if (arguments.length === 1) {
                this.contains(value) ? this.remove(value) : this.add(value)
                return
              }
              !arguments[1] ? this.remove(value) : this.add(value)
            },
            contains: update(function (className, valArr) {
              if (valArr.length === 0) throw TypeError("Failed to execute 'contains' on 'DOMTokenList': 1 argument required, but only 0 present.")
              if (typeof valArr[0] !== 'string' || !!~valArr[0].search(/\s+/g)) return false
              return !!~className.search(new RegExp(valArr[0]))
            }),
            item: function (index) {
              typeof index === 'string' ? index = parseInt(index) : ''
              if (arguments.length === 0 || typeof index !== 'number') throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument required, but only 0 present.")
              var claArr = self.className.replace(/^\s+|\s+$/, '').split(/\s+/)
              var len = claArr.length
              if (index < 0 || index >= len) return null
              return claArr[index]
            }
          }
        }
      })
    }
    //兼容indexOf
    if(!Array.prototype.indexOf){
      Array.prototype.indexOf=function(obj,start){
        for(var index=(start || 0), j=this.length;index<j;index++){
          if(this[index]===obj){ 
            return index; 
          }
        }
        return -1;
      }
    }
    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }
    // 随机生成4位数
    function rand(min,max) {
      return Math.floor(Math.random()*(max-min))+min;
    }
    function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
      var t = obj.offsetTop;
      var l = obj.offsetLeft;
      var width=obj.offsetWidth;
      while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
        t += obj.offsetTop;
        l += obj.offsetLeft;
      }
      var r=document.body.offsetWidth-width-l;
      return {top:t,left:l,right:r}
    }
    function contains(parent, node) {
    　　if(parent.compareDocumentPosition){ //ff
    　　　　var _flag = parent.compareDocumentPosition(node); 
    　　　　return (_flag == 20 || _flag == 0)? true : false; 
    　　}else if(parent.contains){ //ie
    　　　　return parent.contains(node);
    　　}
    }
    // 插件构造函数 - 返回数组结构
    function Septcuts(selector,opt){
      window.onload=function(){
        this.init(selector,opt);
      }.bind(this)
      window.onresize=function(){
        var dropdownListShow=document.querySelectorAll(".qt-dropdown-list.show");
        for(var i=0;i<dropdownListShow.length;i++){
          this.setPosition(dropdownListShow[i]);
        }
      }.bind(this)
    }
    addEventListener(document.body,'click',function (e) {
      var e=e||window.event;
      var target= e.target? e.target:e.srcElement;
      if(target.className.indexOf('qt-dropdown-list')==-1&&target.className.indexOf('qt-dropdown-btn')==-1){
        var dropdownListAll = document.querySelectorAll(".qt-dropdown-list");
        for(var i=0;i<dropdownListAll.length;i++){
          dropdownListAll[i].classList.remove('show');
          dropdownListAll[i].classList.add('hide');
          (function(j) {
            setTimeout(function(){
              dropdownListAll[j].style.display="none";
            },300)
          })(i);
        }
      }
    })
    Septcuts.prototype = {
        constructor: this,
        init: function(selector,opt) {
            // 默认参数
            var def = {
              groups:[{
                title: '应用平台',
                items: [
                  { label: "考试阅卷", url: "http://www.7net.cc", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAjVBMVEUAAAD/fS3/fSz/fS3/fy3/fC3/eSv/fiz/fi7/fSz/fSz/fS3/fCv/fS3/fSz/fS3/fS3/fCz/fS3/fSz/fSz/fi3/fy3/fwD/fS3/fC3/fSz/AAD/fS3/fS3/fC3/fS3/fSz/fSz/fCz/fC3/fC7/fzD/fS3/fS3/fSz/fS3/fS3/fiz/fi3/fC7/fS3zqYhZAAAALnRSTlMAzLJmIqoGMYB1EfAL9uviyW3dlkIlHAK8oYYB5tfTs62QfHA7GfnziU7BYCpUD8NcbwAAAYZJREFUWMPtl9lugzAQRdkJmDXshC0hZO/9/88ruEjtA0qNeWiJcl9sobnHoxkPkoXXUqwwKp6061swq1QmAKrry4zynWwCIEoCs2pxIUB6A9YDeBiBlGaXq8UFsNot4Hq30oat6rMBie/Ak+nQaMc9Qa3MA0QevGO/Hi+Bb/bZGMQ2djMAH8T2+/gkAwicgdSlqE1mgIFS/1oDq59yZ3AmxqmKGQEGUnrYrrgNaeuQ6eeQuAoTwIRjjhuDrue9QHXAngFAA8WOlv9EDR02Y2LbmLEGLdyQhpGoxzTQh3QaVB1zF64EudY30zkHBxHZUAAXkjnvHmzvmqA0J7gHTXg0sNvdvJsoOyguoZVYSSSngKTMnwW/BHAuAK5ZoIraYRrzq7XeH8qaAbk6JZ0doIoT8sI11eDvAe8u/FtAoH7LrTgAKMRRFeDzADbjRpMgC/yA0c8PoH5+wOjnB1A/P2D08wOofwGA+hcAcup/Aqh/Adi4Pw1QifxU+HE+37NPXPrw1IQX1SdRoi500xQR/QAAAABJRU5ErkJggg=="},
                  {label:"阅卷任务",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAh1BMVEUAAAD/fy3/fzD/fyr/fi3/dzP/fS3/fS3/fSv/cDz/fS3/fS3/fC3/fi3/fS3/fS3/fS3/fC7/fC3/fSz/fSz/fC3/fCz/fi7/fS3/fSz/fi3/fS3/dyv/fS3/fSz/fS3/fi3/fC3/fS3/fC3/fCz/fC3/fCz/ey3/fS3/fS3/fiz/fC7/fS34xtryAAAALHRSTlMAIiAqVQnj9BIE+ukWyLyIZkLUwpdvSCX27locC+eikzDRtKp+dFI72atdJ5Rb2e4AAAEySURBVFjD7ZfbToQwEIYHsJzKmeXgArur69n//Z/PNlGJMTUyjTGQ/S4KN/2SdjozLW0E4bAQn/N9sPA/DC6YuLOgdRbTfhF4tBjvItiwIDmFNoIuA+LnhC0YJDTVyBXsEOzdJsY9V+DjTo0HZETHGEbqyCSQKNSYIyVKYSYQJkGGm5AciZ2KxsOVkc64hBK4TgP0HTuMRQ/laC0O0tDkRbjyXAj3j5GV4ABUno3gRQIy4QoiHYAyQK5+HTOjUVDH+ntETXT7Y0szCSY0Oif5gjP80y+WIIxL8HogsNlEKn1YhjEq1UFady7YpnMR2xSUuaS9MgRzUXWnBUWVWdZH68byZ61tmKCphF17P4eWF4y135Eugn8QsJ484rtgGU+zgPfsq0gzSl8wH57R+yxB2+ANHGN9HnuLJYkAAAAASUVORK5CYII="},
                  {label:"分析中心",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAh1BMVEUAAAD/fCz/fi3/fi3/fS3/fS3/fS3/fS3/fC3/PBv/fCz/fSz/fTD/fS3/fi3/eSv/fiz/fSz/fyz/fS3/fS3/fS3/fS3/fS3/fS3/fCz/ey//fSz/fSz/fS3/fS3/ey3/fy7/fS3/fS3/fCz/fS3/fSz/fCn/fS7/fSz/fS7/fC//fS3/fS16dV5ZAAAALHRSTlMAbU9VZvvnv9MBd5YT9yEISkAw8e3i18SSRA+5oo1wOAXSsamDKBh9aFsmyG1V2ukAAAF2SURBVFjD7ZbrjoIwEIUVBS1QkDsoCN4ve97/+ZaiINk0pqXZTcxyfk0nPV/GkRmYjHrq5Kv5z4HuKAE0YDoC/gJApmatbDhAQ6NiMKDU0eg+uAdOtmWM1fAmahRKAFMHIhkAsUn/eAFgbSUAToxYex2PzE+ugCcIOBnAK02Kxj+x87QSAzB/3BHcvPFLPIllCKSE/W1mbbN3rV8UMKNAWhtWFMgrd4MGJA4wAf2R8AJgcQBwkRkm1vD5M74nqBXcJKbxzAo+dkdWv1FKjPM6YfX3fnCVaWuJfeDEQKANXyhZAIS+wkY6NH4FgImI55fpQfX+qj89i05jSlPOVQMHUcASEeeqjoU4wPifAOK4HABxiCigwBcHUMAUBSxAOYAIO3GAzgEYWI6ATwJsELbJBEkb7rFvwxjW+6W67zay7XXb3GVhm3U/90PzVwElYCkB3BDUVyJsAWpd51K62T0ASSCvXb8EO9chqZ/vnbU3k9PKnox66BvMa04Cg/Tj/QAAAABJRU5ErkJggg=="},
                  {label:"精准分层教学",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAhFBMVEUAAAD/fS3/Z0H/fS3/fC3/fSr/dzP/fS3/fS3/fS3/fCz/fi3/fC3/fS3/fS3/fiz/fS3/fS3/fS3/fiz/fSz/fS3/fS3/fS3/fC3/fC3/fi3/fC7/fC3/fS3/fC3/fC3/ey7/fSz/fC3/fSz/fiv/fS3/fS3/fiT/fS3/fSz/fC3/fS0Gi2KSAAAAK3RSTlMA+gNMbg4J9Oe7Q4g74GYv7l+AI+uzks2reFUbnpg3KBPZ0B4XxlAH1YWmU01BdwAAAd9JREFUWMPtlNuSgjAMhhcQReS8gJwERAQx7/9+a4ozi621hZ3Z8cLc0Sbl/5t8/frE28e3E8SBXy+s1lcNkFC2mbrg5zsPfsMIZsowIyzzYrPt8+6qoIzCla5e+xcsP67W94U2tXFh70s5yYMQs7fadLHPtpJOrAT1bg4Vs+MexE56vyHaU53dI04M3D5nqkg7N/rszHXijtrjSuTxOnrMqXVHIfeuy9zygEo963FsFNSuSve5ATAeslOAbNak7QDM6XcMoM8bVQB/+r0CGPo5oEUA5XSh9rA5rWR5ddgA7KnuGDhm11JcrWpkqpsTLSq1qTHjPBJHUu6r3KONXS56JCKTl+CiOVCS8gVoXnx6LZGDvu5Qj4TgkhAYWjsLmsBJ4VLav+UHpQ1G9FPN6gZy7xeHo12APgmifUGURUiq7R1qXxSqq/laJZerlbNOZtI77L3sNdWpDQply8JGhUMu3WSvZhElPFoC7d19zFr+FDMNl09RzWjk8fScxZiIpFiknYxJicU5PGQP58tkWWw42gUvC/uOiMMtFHSyXd1gSs887WInJHjviNhJlmxIdViYS2FalzeYXFUOJutvMGUAzb/BVBCY2ucwJW8N08gJyMFkcg734g9M7wzTJ5bHD7veV65YYS+VAAAAAElFTkSuQmCC"},
                  {label:"学情监测",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAjVBMVEUAAAD/fS3/fS3/fS3/fS3/fS3/fSz/fS3/fy3/fC3/fS3/fS3/cyb/dyf/fSz/fS7/ey7/eSv/fS3/fS3/fSz/fS3/fSz/fS3/fS3/fS3/fS3/fC3/fSz/fC3/eyv/fSz/fi3/fC3/fC3/fC3/fSv/fir/fC3/fS7/fS3/fi3/fi7/fS3/fS3/fS7/fS16cqilAAAALnRSTlMA3bvYtS1iZiKq+/YGAkUbFQvpXPCimntW5ZF2TkASy8adbjo0L87EsIgmq5aL+szkcAAAAWVJREFUWMPt1MlugzAUhWEbaEmNzTwPmee25/0fr6VJVZCikOtkkSr5V3jzCa7wZTcqqAyTX956tmS99hzUMtZJmkBoEJoIIO8AEZBIRmnhwOwcE4iA0SoB/+9ktRytV+DlMQE/+tQH1LIyBEpNwM/TAm2NHrBycChUmm/gHoUP+hD7gqsN1DG+i6UmIEuYtgPMNP+D/RpJ0H5FrQdETpz/zCGUOkCQYDI6PHqEX1llx5215Cgl/S6MNhBN68xF6GpcJtuJbV6MmWdgO6bfRn+LzYgthFWHzlzRr7NbiF371RVgruj7QO4EXxzmaCUBfaGsTKTBr0XfSGruhLX+SmuHbnnsGqCo1HVLVd79Wn8Cg0DzdrJUXgpE/GST8f+ZwRO4B8Czh3PPARmG4+cANRouuO8hPjjAqYDdA1IInwikQGfT5YBBEyKBaeeopoDghGJANF3Qn4KYE7FeKp9ZxuW9Zx67VV8C11USZpkqvgAAAABJRU5ErkJggg=="}
                ]
              },{
                title: '教考工具',
                items: [
                  {label:"小题分导入",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAllBMVEUAAAD/eyn/fi3/fi7/fS3/fS3/fS3/ZTr/fC3/fCz/fS3/fS3/fi3/fS3/fSz/fS3/fS3/eDP/fS3/fSz/fSz/fi3/fS3/fC3/aTT/fi3/fC3/fSz/fS3/fSz/fS3/fC3/fi3/fS3/fS3/fS3/fS7/fi3/fS3/fyr/fS3/fS3/fiz/fC3/fSz/fSz/bST/fS3/fS3/fS01HGAaAAAAMXRSTlMAD4iAcmbdAqo7/foU8erm4gnYHZuN9s8ExqNsXyPu08u1r5R6WEgwwX1QKaY1B0Hzq4n6IwAAAkJJREFUWMPtlmdv4kAQQMc0N9wbBhx6CeWS9///3IHl5LCjAOv7ypNcZO0+zVozOysvKsx9yvNYg+6fxnwLRYy6YM9n0lEgB7MmSElEhQgmtQ/QVRJo0HsJXoJnBdrlKg56W4G+tD9EfHptBZNy1AwvaCcYvuEMRfowaSeIYX15BC6+1kawgUEZ+zuMWwiODtaHXPkTwkZZEPmwqt7PFvZBURANIP/eN7uQbpUEpgeD4b+EiMGKg+cFfRsGUS2lgFnxrMAELHdwi7ECFs8KPmARU0ebpoyfXsJhox/HhuFhGSU+jKTYBKq1kONKyRK7VTH5ZFKywGkjOMLpq/F5bQTd7zLMCaWOntnmI8HQwa5yISOTBiNNHgj0JcTVu8defvBAoBngV8m8A6OKamrMXH++2o4eCEZTH952Yl6OAuuOV/2M4N2hIjzcFUQhEB5FZl/jtevXDPCMVbxIgXh0r5jAToLrZuS+XZglw+t8D+ZbvQxl4sJS/10wXMSFNAgySPTvETl01DrTOyS3vjnWUUWgOWS1mAubpYpgA1upscLWFAQn3EaLNGGjIJizaCazxVpB4BNLA4+VgmDwszs5JAqCPXmzWqGnIEiwhlJjWjsuW48EJqzr5Z7j3pRDyLzQfkW/bkE4USOAbi1R7xFeuuQWZtpNRGn91DAacwf7uvwOhLuv+KcpzaPTuf8753LSGKzTVhOJpnMAxxQ19LUN8Fne/b6rbpBinFLirTXZtTFIcOglncm5rKuLwZP/Yhee5EXJX1+HegfFoWrkAAAAAElFTkSuQmCC"},
                  {label:"答题卡制作",url:"http://www.7net.cc",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAZlBMVEUAAAD/fy3/fzD/eC3/eSr/fi3/fi3/fi3/fS3/fS3/fS3/fS3/fC3/fS3/fjD/fi3/fS3/fS3/fCz/fC7/fS3/fS3/fC3/fC3/fC3/fC3/fC3/fiz/fCv/fC3/fS3/fi3/eyz/fS38VCbFAAAAIXRSTlMAIiARBogrkvbz7tpqRhrGjVI7e/Czo5x2cU4tC33IVTpTx8+hAAABEUlEQVRYw+2X2w6CMAyGp9TNwwQUzyi6939JV0ZRDFlodiEh+6/2JfRbFy62ikkF0tnApNBTrSvDSKZ/HHJjmNnITv3BsHP4MgDun0sQAwNSYQ+f77XFm2DlZkt0S5XdXzBje8jajqxNcgWlLaIzpG7NC+6aNuu5XQt2bNE8CvoEkNQBH/kEz6Wps94jbVeOVluk/drRcucRHE0ThXQiOiEpoqNHsKMOXvwOOucUvaduaOS/MQpGIEiKRZ0rIN0vji53JLg6KhKP4GyaPJByohzpQXQeIigYAv4RRv0XomAUgnixxIvlb4Lwh2b4U1dkxqiAx3boc58GDlUOHzhKGjjCR57woYsCOmOOfYGD55TyBkYgbQeiu0bYAAAAAElFTkSuQmCC"}
                ]
              }],
              itemWidth:180,
              colNum:3,
              iconSize:28,
              trigger:"hover"
            };
            this.opt = extend(def,opt,true); //配置参数
            this._renderDom(selector,this.opt);
        },
        _renderDom:function(selector,opt){
          var elementList = document.querySelectorAll(selector);
          var maxLenght=0;
          for(var i=0;i<opt.groups.length;i++){
            if(maxLenght<opt.groups[i].items.length){
              maxLenght=opt.groups[i].items.length;
            }
            if(maxLenght>=3){
              break;
            }
          }
          if(maxLenght<this.opt.colNum){
            this.opt.colNum=maxLenght;
          }
          for(var i=0;i<elementList.length;i++){
            var currentElm=elementList[i];
            this._renderItemDom(currentElm,opt);
          }
        },
        _renderItemDom:function(currentElm,opt){
          var listWidth=this.opt.itemWidth*this.opt.colNum;
          currentElm.className = currentElm.className + ' qt-dropdown-btn';
          var randnum=rand(1000,9999);
          while (document.getElementById("qt-dropdown-list-"+randnum)) {
            randnum=rand(1000,9999);
          }
          currentElm.setAttribute("aria-describedby","qt-dropdown-list-"+randnum);
          // 下拉弹出框
          var dropdownList=document.createElement("div");
          dropdownList.className="qt-dropdown-list";
          dropdownList.className=opt.cssClass?("qt-dropdown-list "+opt.cssClass):"qt-dropdown-list";
          dropdownList.setAttribute("id","qt-dropdown-list-"+randnum);
          var html="";
          for(var i=0;i<opt.groups.length;i++){
            var list=opt.groups[i].items;
            if(!list)break;
            html+='<div class="qt-dropdown-group">'+'\n';
            if(opt.groups[i].title){
              html+='<div class="qt-dropdown-title">'+opt.groups[i].title+'</div>'+'\n';
            }
            for(var j=0;j<list.length;j++){
              var dataStr=""
              if(!list[j])break;
              for(var key in list[j]){
                if(list[j][key]){
                  dataStr+="data-"+key+"="+list[j][key]+" ";  
                }
              }
              // console.log(list[j]);
              if(list[j].disabled){
                html+='<div class="qt-dropdown-item is-disabled"'+dataStr+' style="width:'+this.opt.itemWidth+'px;">'+'\n';
              }else{
                html+='<div class="qt-dropdown-item"'+dataStr+' style="width:'+this.opt.itemWidth+'px;">'+'\n';
              }
              var iconStyle='height:'+this.opt.iconSize+'px;width:'+this.opt.iconSize+'px;'
              if(list[j].icon){
                iconStyle+='background:transparent;';
                html+='<i class="qt-item-icon" style="'+iconStyle+'">'+'\n'+
                '<img src="'+list[j].icon+'">'+'\n'+
                '</i>'+'\n';
              }else{
                html+='<i class="qt-item-icon" style="'+iconStyle+'"></i>'+'\n';
              }
              html+='<span class="item-label">'+list[j].label+'</span>'+'\n';
              html+='</div>'+'\n';
            }
            html+='</div>'+'\n';
          }
          var dropdownContent=document.createElement("div");
          dropdownContent.style.width=listWidth+"px";
          dropdownContent.className="list-content";
          dropdownContent.innerHTML=html;
          var dropdownArrow=document.createElement("div");
          dropdownArrow.className="qt-dropdown-arrow";
          dropdownList.appendChild(dropdownContent);
          dropdownList.appendChild(dropdownArrow);
          this.setPosition(dropdownList,currentElm,dropdownArrow);
          dropdownList.style.display="none";
          document.body.appendChild(dropdownList);
          //绑定事件
          this.bindEvent(currentElm,dropdownList);
        },
        bindEvent:function(currentElm,dropdownList){
          var _this=this;
          var showTimeout=null,hideTimeout=null,isClick=false;
          addEventListener(currentElm,'click', function(e){
            var e=e||window.event;
            stopPropagation(e);
            if(!isClick){
              isClick=true;
              setTimeout(function(){
                isClick=false;
              },300)
              _this.toggle(dropdownList);
            }
          },true);
          if(this.opt.trigger=="hover"){
            addEventListener(currentElm,'mouseover', function(e){
              var e=e||window.event;
              stopPropagation(e);
              showTimeout=setTimeout(function(){
                isClick=true;
                setTimeout(function(){
                  isClick=false;
                },300)
                _this.show(dropdownList,function(){
                  clearTimeout(showTimeout);
                  showTimeout=null;
                });
              },200)
            },true);
            addEventListener(currentElm,'mouseout', function(e){
              var e=e||window.event;
              stopPropagation(e);
              var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement
              if (!relatedEle||!contains(this, relatedEle)) {
                if(showTimeout){
                  clearTimeout(showTimeout);
                  showTimeout=null;
                }else{
                  hideTimeout=setTimeout(function(){
                    _this.hide(dropdownList,function(){
                      clearTimeout(hideTimeout);
                      hideTimeout=null;
                    });
                  },200)
                }
          　　}
            },true);
            addEventListener(dropdownList,'mouseover', function(e){
              var e=e||window.event;
              stopPropagation(e);
              if(hideTimeout){
                clearTimeout(hideTimeout);
                hideTimeout=null;
              }
            },true);
            addEventListener(dropdownList,'mouseout', function(e){
              var e=e||window.event;
              stopPropagation(e);
              var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
              if (!relatedEle||!contains(this, relatedEle)) {
                _this.hide(dropdownList);
          　　}
            },true);
          }
          addEventListener(dropdownList,'click', function(e){
            var e=e||window.event;
            stopPropagation(e);
            var target= e.target? e.target:e.srcElement;
            if(target.className.indexOf('qt-dropdown-item')>-1){
              _this.click(target,dropdownList);
            }else if(target.parentNode.className.indexOf('qt-dropdown-item')>-1){
              _this.click(target.parentNode,dropdownList);
            }
          },true);
        },
         // 弹框的位置
        setPosition:function(dropdownList,currentElm,dropdownArrow){
          if(!currentElm){
            var elmList=document.querySelectorAll(".qt-dropdown-btn")
            for(var i=0;i<elmList.length;i++){
              if(elmList[i].getAttribute("aria-describedby")==dropdownList.getAttribute("id")){
                currentElm=elmList[i];
                break;
              }
            }
          }
          if(!dropdownArrow){
            dropdownArrow=dropdownList.lastElementChild || dropdownList.lastChild;
          }
          var listWidth=this.opt.itemWidth*this.opt.colNum;
          var paddingLR=60;
          var currentElmStyle=getPoint(currentElm);
          dropdownList.style.top=currentElmStyle.top+currentElm.offsetHeight+5+"px";
          if(currentElmStyle.left<(listWidth+paddingLR-currentElm.offsetWidth)/2){
            //在左边
            dropdownList.style.left="10px";
            dropdownArrow.style.left=currentElmStyle.left-10+(currentElm.offsetWidth/2-6)+"px";
          }else{
            if(currentElmStyle.right<(listWidth+paddingLR-currentElm.offsetWidth)/2){
              //在右边
              dropdownList.style.left="unset";
              dropdownList.style.right="10px";
              dropdownArrow.style.left="unset";
              dropdownArrow.style.right=currentElmStyle.right-10+(currentElm.offsetWidth/2-6)+"px";
            }else{
              dropdownList.style.left=currentElmStyle.left+(currentElm.offsetWidth-listWidth-paddingLR)/2+"px";
            }
          }
        },
        toggle:function(dropdownList,callback){
          var sh = dropdownList.classList.contains('show');
          if(sh){
            this.hide(dropdownList);
          }else{
            this.hideAll();
            this.show(dropdownList);
          }
        },
        show: function(dropdownList,callback){
          this.setPosition(dropdownList);
          dropdownList.style.display="block";
          setTimeout(function(){
            dropdownList.classList.remove('hide');
            dropdownList.classList.add('show');
          },10);
          callback && callback();
        },
        hide: function(dropdownList,callback){
          dropdownList.classList.add('hide');
          dropdownList.classList.remove('show');
          setTimeout(function(){
            dropdownList.style.display="none";
          },300)
          callback && callback();
        },
        hideAll:function(){
          var dropdownListAll = document.querySelectorAll(".qt-dropdown-list");
          for(var i=0;i<dropdownListAll.length;i++){
            dropdownListAll[i].classList.add('hide');
            dropdownListAll[i].classList.remove('show');
          }
        },
        click:function(element,dropdownList){
          var attributes = element.attributes;
          var dataobj={};
          for(var i=0;i<attributes.length;i++){
            if(attributes[i].name.indexOf("data-")>-1){
              dataobj[attributes[i].name.replace("data-","")] = attributes[i].value;
            }
          }
          if(this.opt.click){
            this.opt.click(dataobj);
          }else{
            dataobj.url && window.open(dataobj.url)
          }
          this.hide(dropdownList);
        },
        css: function(element,styleObj){
            for(var prop in styleObj){
                var attr = prop.replace(/[A-Z]/g,function(word){
                    return '-' + word.toLowerCase();
                });
                element.style[attr] = styleObj[prop];
            }
            return this;
        }
    }
    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Septcuts;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Septcuts;});
    } else {
        !('Septcuts' in _global) && (_global.Septcuts = Septcuts);
    }
}());