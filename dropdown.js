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
    var styleString="";
    loadCssCode(styleString);
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
    function DropDown(selector,opt){
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
    document.body.addEventListener('click',function (e) {
      var e=e||window.event;
      if(e.target.className.indexOf('qt-dropdown-list')==-1&&e.target.className.indexOf('qt-dropdown-btn')==-1){
        var dropdownListAll = document.querySelectorAll(".qt-dropdown-list");
        for(var i=0;i<dropdownListAll.length;i++){
          dropdownListAll[i].classList.remove('show');
          dropdownListAll[i].classList.add('hide');
        }
      }
    })
    DropDown.prototype = {
        constructor: this,
        init: function(selector,opt) {
          console.log(selector,opt);
            // 默认参数
            var def = {
              itemWidth:180,
              colNum:3,
              showTime:0,
              trigger:"hover"
            };
            this.opt = extend(def,opt,true); //配置参数
            this._renderDom(selector,this.opt);
        },
        _renderDom(selector,opt){
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
        _renderItemDom(currentElm,opt){
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
            html+='<div class="qt-dropdown-group">'+'\n';
            if(opt.groups[i].title){
              html+='<div class="qt-dropdown-title">'+opt.groups[i].title+'</div>'+'\n';
            }
            for(var j=0;j<list.length;j++){
              var dataStr=""
              for(var key in list[j]){
                if(list[j][key]){
                  dataStr+="data-"+key+"="+list[j][key]+" ";  
                }
              }
              if(list[j].disabled){
                html+='<div class="qt-dropdown-item is-disabled"'+dataStr+'>'+'\n';
                
              }else{
                html+='<div class="qt-dropdown-item"'+dataStr+'>'+'\n';
              }
              if(list[j].icon){
                html+='<i class="qt-item-icon '+list[j].icon+'"></i>'+'\n';
              }else{
                html+='<i class="qt-item-icon"></i>'+'\n';
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
        bindEvent(currentElm,dropdownList){
          var _this=this;
          var showTimeout=null,hideTimeout=null,isClick=false;
          currentElm.addEventListener('click', function(e){
            var e=e||window.event;
            e.stopPropagation();
            if(!isClick){
              isClick=true;
              setTimeout(function(){
                isClick=false;
              },300)
              _this.toggle(dropdownList);
            }
          },true);
          if(this.opt.trigger=="hover"){
            currentElm.addEventListener('mouseover', function(e){
              var e=e||window.event;
              e.stopPropagation();
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
            currentElm.addEventListener('mouseout', function(e){
              var e=e||window.event;
              e.stopPropagation();
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
            dropdownList.addEventListener('mouseover', function(e){
              var e=e||window.event;
              e.stopPropagation();
              if(hideTimeout){
                clearTimeout(hideTimeout);
                hideTimeout=null;
              }
            },true);
            dropdownList.addEventListener('mouseout', function(e){
              var e=e||window.event;
              e.stopPropagation();
              var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement
              if (!contains(this, relatedEle)) {
                _this.hide(dropdownList);
          　　}
            },true);
          }
          dropdownList.addEventListener('click', function(e){
            var e=e||window.event;
            e.stopPropagation();
            if(e.target.className.indexOf('qt-dropdown-item')>-1){
              _this.click(e.target,dropdownList);
            }else if(e.target.parentNode.className.indexOf('qt-dropdown-item')>-1){
              _this.click(e.target.parentNode,dropdownList);
            }
          },true);
        },
         // 弹框的位置
        setPosition(dropdownList,currentElm,dropdownArrow){
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
        toggle(dropdownList,callback){
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
        hideAll(){
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
            if(attributes[i].localName.indexOf("data-")>-1){
              dataobj[attributes[i].localName.replace("data-","")] = attributes[i].value;
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
        module.exports = DropDown;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return DropDown;});
    } else {
        !('DropDown' in _global) && (_global.DropDown = DropDown);
    }
}());