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
    var styleString='.qt-dropdown-btn{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qt-dropdown-list{position:absolute;top:0;left:0;z-index:10;margin:5px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-shadow:0 2px 12px 0 rgba(0,0,0,.1);-webkit-transform-origin:center top;transform-origin:center top;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.qt-dropdown-list.show{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list.hide{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list .list-content{padding:25px 30px;max-height:800px;max-height:80vh;overflow:auto}.qt-dropdown-arrow,.qt-dropdown-arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.qt-dropdown-arrow{top:-6px;left:49%;left:calc(50% - 6px);margin-right:3px;border-bottom-color:#ebeef5;border-width:6px;border-top-width:0;-webkit-filter:drop-shadow(0 2px 12px rgba(0,0,0,.03));filter:drop-shadow(0 2px 12px rgba(0,0,0,.03))}.qt-dropdown-arrow:after{content:" ";border-width:6px;top:1px;margin-left:-6px;border-top-width:0;border-bottom-color:#fff}.qt-dropdown-group{overflow:hidden}.qt-dropdown-title{line-height:36px;font-size:14px;margin:0;color:#999}.qt-dropdown-item{float:left;width:180px;list-style:none;margin:10px 0;line-height:36px;font-size:16px;color:#333;cursor:pointer;outline:0}.qt-dropdown-item.is-disabled{cursor:default;color:#bbb;pointer-events:none}.qt-item-icon{display:inline-block;background-color:#f2f2f2;margin-right:10px;vertical-align:middle;text-align:center}.qt-item-icon img{width:100%;height:100%;vertical-align:top}.qt-dropdown-item .item-label{display:inline-block;width:calc(100% - 65px);vertical-align:middle;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}';
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
        }
      }
    })
    Septcuts.prototype = {
        constructor: this,
        init: function(selector,opt) {
          console.log(selector,opt);
            // 默认参数
            var def = {
              itemWidth:180,
              colNum:3,
              showTime:0,
              iconSize:45,
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
          this.colNum=maxLenght;
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
                html+='<div class="qt-dropdown-item is-disabled"'+dataStr+'>'+'\n';
              }else{
                html+='<div class="qt-dropdown-item"'+dataStr+'>'+'\n';
              }
              var iconStyle='height:'+this.opt.iconSize+'px;width:'+this.opt.iconSize+'px;'
              if(list[j].icon){
                iconStyle+='background:#fff;';
                html+='<i class="qt-item-icon" style="'+iconStyle+'">'+'\n'+
                '<img src="'+list[j].icon+'">'+'\n'+
                '</i>'+'\n';
              }else{
                html+='<i class="qt-item-icon" style="'+iconStyle+'"></i>'+'\n';
              }
              html+='<span class="item-label" style="width:'+(this.opt.itemWidth-this.opt.iconSize-25)+'px">'+list[j].label+'</span>'+'\n';
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
              if (!contains(this, relatedEle)) {
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
              var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement
              if (!contains(this, relatedEle)) {
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
          console.log(attributes)
          for(var i=0;i<attributes.length;i++){
            if(attributes[i].name.indexOf("data-")>-1){
              dataobj[attributes[i].name.replace("data-","")] = attributes[i].value;
            }
          }
          this.opt.click && this.opt.click(dataobj);
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