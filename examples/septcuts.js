; (function (undefined) {
  "use strict";
  var _global;
  // 工具函数
  //加载css
  function loadCssCode(code) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(code));
    } catch (ex) {
      style.styleSheet.cssText = code;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  var styleString = '.qt-dropdown-btn{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.qt-dropdown-list{position:absolute;top:0;left:0;z-index:10;margin:5px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-shadow:0 2px 12px 0 rgba(0,0,0,.1);-webkit-transform-origin:center top;transform-origin:center top;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.qt-dropdown-list.show{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list.hide{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.qt-dropdown-list .list-content{padding:25px 30px;max-height:800px;max-height:80vh;overflow:auto}.qt-dropdown-arrow,.qt-dropdown-arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.qt-dropdown-arrow{top:-6px;left:49%;left:calc(50% - 6px);margin-right:3px;border-bottom-color:#ebeef5;border-width:6px;border-top-width:0;-webkit-filter:drop-shadow(0 2px 12px rgba(0, 0, 0, .03));filter:drop-shadow(0 2px 12px rgba(0, 0, 0, .03))}.qt-dropdown-arrow:after{content:" ";border-width:6px;top:1px;margin-left:-6px;border-top-width:0;border-bottom-color:#fff}.qt-dropdown-group{overflow:hidden}.qt-dropdown-title{line-height:36px;font-size:14px;margin:0;color:#999}.qt-dropdown-item{float:left;width:180px;list-style:none;margin:5px 0;padding:6px 0;line-height:36px;font-size:16px;color:#333;cursor:pointer;outline:0;vertical-align:middle;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:6px 0;margin:5px 0}.qt-dropdown-item:hover{background:#f7fbfe}.qt-dropdown-item.is-disabled{cursor:default;color:#bbb;pointer-events:none}.qt-item-icon{display:inline-block;background-color:#f2f2f2;margin:0 10px;vertical-align:middle;text-align:center}.qt-item-icon img{height:100%;max-width:100%;vertical-align:top}';
  loadCssCode(styleString);
  //兼容bind函数
  if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
      if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
      var _this = this;
      var obj = arguments[0];
      var ags = Array.prototype.slice.call(arguments, 1);
      return function () {
        _this.apply(obj, ags);
      };
    };
  }
  //兼容addEventListener函数
  function addEventListener(ele, event, fn, boolean) {
    if (!boolean) boolean = false;
    if (ele.addEventListener) {
      ele.addEventListener(event, fn, boolean);
    } else {
      ele.attachEvent('on' + event, fn.bind(ele));
    }
  }
  //阻止事件冒泡stopPropagation的兼容写法
  function stopPropagation(e) {
    if (document.all) {  //只有ie识别
      e.cancelBubble = true;
    } else {
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
        function add_rmv(className, valArr, tag) {
          for (var i in valArr) {
            if (typeof valArr[i] !== 'string' || !!~valArr[i].search(/\s+/g)) throw TypeError('the type of value is error')
            var temp = valArr[i]
            var flag = !!~className.search(new RegExp('(\\s+)?' + temp + '(\\s+)?'))
            if (tag === 1) {
              !flag ? className += ' ' + temp : ''
            } else if (tag === 2) {
              flag ? className = className.replace(new RegExp('(\\s+)?' + temp), '') : ''
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
            if (typeof value !== 'string' || arguments.length === 0) throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument(string) required, but only 0 present.")
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
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
      for (var index = (start || 0), j = this.length; index < j; index++) {
        if (this[index] === obj) {
          return index;
        }
      }
      return -1;
    }
  }
  // 对象合并
  function extend(o, n, override) {
    for (var key in n) {
      if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
        o[key] = n[key];
      }
    }
    return o;
  }
  // 随机生成4位数
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
    var t = obj.offsetTop;
    var l = obj.offsetLeft;
    var width = obj.offsetWidth;
    while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
      t += obj.offsetTop;
      l += obj.offsetLeft;
    }
    var r = document.body.offsetWidth - width - l;
    return { top: t, left: l, right: r }
  }
  function contains(parent, node) {
    if (parent.compareDocumentPosition) { //ff
      var _flag = parent.compareDocumentPosition(node);
      return (_flag == 20 || _flag == 0) ? true : false;
    } else if (parent.contains) { //ie
      return parent.contains(node);
    }
  }
  // 对象转url参数
  function parseParam(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += urlEncode(param[i], k, encode)
      }
    }
    return paramStr;
  };
  // 插件构造函数 - 返回数组结构
  function Septcuts(selector, opt) {
    // window.onload = function () {
    //   this.init(selector, opt);
    // }.bind(this)
    // window.onresize = function () {
    //   var dropdownListShow = document.querySelectorAll(".qt-dropdown-list.show");
    //   for (var i = 0; i < dropdownListShow.length; i++) {
    //     this.setPosition(dropdownListShow[i]);
    //   }
    // }.bind(this)

    //独立事件避免覆盖
    addEventListener(window, 'load', function (e) {
      this.init(selector, opt);
    }.bind(this))

    addEventListener(window, 'resize', function (e) {
      var dropdownListShow = document.querySelectorAll(".qt-dropdown-list.show");
      for (var i = 0; i < dropdownListShow.length; i++) {
        this.setPosition(dropdownListShow[i]);
      }
    }.bind(this))

  }
  addEventListener(document.body, 'click', function (e) {
    var e = e || window.event;
    var target = e.target ? e.target : e.srcElement;
    if (target.className.indexOf('qt-dropdown-list') == -1 && target.className.indexOf('qt-dropdown-btn') == -1) {
      var dropdownListAll = document.querySelectorAll(".qt-dropdown-list");
      for (var i = 0; i < dropdownListAll.length; i++) {
        dropdownListAll[i].classList.remove('show');
        dropdownListAll[i].classList.add('hide');
        (function (j) {
          setTimeout(function () {
            dropdownListAll[j].style.display = "none";
          }, 300)
        })(i);
      }
    }
  })
  Septcuts.prototype = {
    constructor: this,
    init: function (selector, opt) {
      // 默认参数
      var def = {
        groups: [{
          "title": "应用平台",
          "items": [
            { "label": "考试阅卷", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://office.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/ksgl.png" },
            { "label": "阅卷任务", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://yj.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/yjrw.png" },
            { "label": "分析中心", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://rpt.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/fxzx.png" },
            { "label": "题库组卷", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://tiku.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/tkzj.png" },
            { "label": "精准分层教学", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://ta.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/jzhfcjx.png" },
            { "label": "学情监测", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://studentplatformmanager.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/xqjc.png" }
          ]
        }, {
          "title": "教考工具",
          "items": [
            { "label": "小题分导入", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://scoreimport.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/xtfdr.png" },
            { "label": "答题卡制作", "memo": "精选优质资源，好题随便刷平台介绍平台介绍平", "url": "https://ac.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/dtkzz.png" }
          ]
        }],
        itemWidth: 180,
        colNum: 3,
        iconSize: 28,
        trigger: "hover"
      };
      this.opt = extend(def, opt, true); //配置参数
      // http:{
      //   url:'',
      //   method:'GET',
      //   params:{}
      // }
      if (typeof this.opt.groups == 'string') {
        this.opt.http = { url: this.opt.groups }
      }
      if (this.opt.http) {
        var xhr = '';
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest();
        } else {
          xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        this.opt.http.method = this.opt.http.method ? this.opt.http.method.toUpperCase() : 'GET';
        if (this.opt.http.method == "GET") {
          xhr.open('GET', this.opt.http.url + '?' + parseParam(this.opt.http.params), true);
          xhr.send();
        } else if (this.opt.http.method == "POST") {
          xhr.open('POST', this.opt.http.url, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(parseParam(this.opt.http.params));
        }
        var _this = this;
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
              _this.opt.groups = JSON.parse(xhr.responseText);
              _this._renderDom(selector, _this.opt);
            }
          }
        }
      } else {
        this._renderDom(selector, this.opt);
      }
    },
    _renderDom: function (selector, opt) {
      var elementList = document.querySelectorAll(selector);
      var maxLenght = 0;
      for (var i = 0; i < opt.groups.length; i++) {
        if (maxLenght < opt.groups[i].items.length) {
          maxLenght = opt.groups[i].items.length;
        }
        if (maxLenght >= 3) {
          break;
        }
      }
      if (maxLenght < this.opt.colNum) {
        this.opt.colNum = maxLenght;
      }
      for (var i = 0; i < elementList.length; i++) {
        var currentElm = elementList[i];
        this._renderItemDom(currentElm, opt);
      }
    },
    _renderItemDom: function (currentElm, opt) {
      var listWidth = this.opt.itemWidth * this.opt.colNum;
      currentElm.className = currentElm.className + ' qt-dropdown-btn';
      var randnum = rand(1000, 9999);
      while (document.getElementById("qt-dropdown-list-" + randnum)) {
        randnum = rand(1000, 9999);
      }
      currentElm.setAttribute("aria-describedby", "qt-dropdown-list-" + randnum);
      // 下拉弹出框
      var dropdownList = document.createElement("div");
      dropdownList.className = opt.cssClass ? ("qt-dropdown-list hide " + opt.cssClass) : "qt-dropdown-list hide";
      dropdownList.setAttribute("id", "qt-dropdown-list-" + randnum);
      var html = "";
      for (var i = 0; i < opt.groups.length; i++) {
        var list = opt.groups[i].items;
        if (!list) break;
        html += '<div class="qt-dropdown-group">' + '\n';
        if (opt.groups[i].title) {
          html += '<div class="qt-dropdown-title">' + opt.groups[i].title + '</div>' + '\n';
        }
        for (var j = 0; j < list.length; j++) {
          var dataStr = ""
          if (!list[j]) break;
          for (var key in list[j]) {
            if (list[j][key]) {
              dataStr += "data-" + key + "=" + list[j][key] + " ";
            }
          }
          // console.log(list[j]);
          if (list[j].disabled) {
            html += '<div class="qt-dropdown-item is-disabled"' + dataStr + ' style="width:' + this.opt.itemWidth + 'px;">' + '\n';
          } else {
            html += '<div class="qt-dropdown-item"' + dataStr + ' style="width:' + this.opt.itemWidth + 'px;">' + '\n';
          }
          var iconStyle = 'height:' + this.opt.iconSize + 'px;width:' + this.opt.iconSize + 'px;'
          if (list[j].icon) {
            iconStyle += 'background:transparent;';
            html += '<i class="qt-item-icon" style="' + iconStyle + '">' + '\n' +
              '<img src="' + list[j].icon + '">' + '\n' +
              '</i>' + '\n';
          } else {
            html += '<i class="qt-item-icon" style="' + iconStyle + '"></i>' + '\n';
          }
          html += '<span class="item-label">' + list[j].label + '</span>' + '\n';
          html += '</div>' + '\n';
        }
        html += '</div>' + '\n';
      }
      var dropdownContent = document.createElement("div");
      dropdownContent.style.width = listWidth + "px";
      dropdownContent.className = "list-content";
      dropdownContent.innerHTML = html;
      var dropdownArrow = document.createElement("div");
      dropdownArrow.className = "qt-dropdown-arrow";
      dropdownList.appendChild(dropdownContent);
      dropdownList.appendChild(dropdownArrow);
      this.setPosition(dropdownList, currentElm, dropdownArrow);
      dropdownList.style.display = "none";
      document.body.appendChild(dropdownList);
      //绑定事件
      this.bindEvent(currentElm, dropdownList);
    },
    bindEvent: function (currentElm, dropdownList) {
      var _this = this;
      var showTimeout = null, hideTimeout = null, isClick = false;
      if (this.opt.trigger == "click") {
        addEventListener(currentElm, 'click', function (e) {
          var e = e || window.event;
          stopPropagation(e);
          if (!isClick) {
            isClick = true;
            setTimeout(function () {
              isClick = false;
            }, 300)
            _this.toggle(dropdownList);
          }
        }, true);
      } else if (this.opt.trigger == "hover") {
        addEventListener(currentElm, 'mouseover', function (e) {
          var e = e || window.event;
          stopPropagation(e);
          if (!showTimeout) {
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              hideTimeout = null;
            }
            showTimeout = setTimeout(function () {
              _this.show(dropdownList, function () {
                clearTimeout(showTimeout);
                showTimeout = null;
              });
            }, 200)
          }
        }, true);
        addEventListener(currentElm, 'mouseout', function (e) {
          var e = e || window.event;
          stopPropagation(e);
          var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
          if (!relatedEle || !contains(this, relatedEle)) {
            if (showTimeout) {
              clearTimeout(showTimeout);
              showTimeout = null;
            }
            hideTimeout = setTimeout(function () {
              _this.hide(dropdownList, function () {
                clearTimeout(hideTimeout);
                hideTimeout = null;
              });
            }, 200)
          }
        }, true);
        addEventListener(dropdownList, 'mouseover', function (e) {
          var e = e || window.event;
          stopPropagation(e);
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
        }, true);
        addEventListener(dropdownList, 'mouseout', function (e) {
          var e = e || window.event;
          stopPropagation(e);
          var relatedEle = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
          if (!relatedEle || !contains(this, relatedEle)) {
            if (!showTimeout) {
              hideTimeout = setTimeout(function () {
                _this.hide(dropdownList, function () {
                  clearTimeout(hideTimeout);
                  hideTimeout = null;
                });
              }, 200);
            }
          }
        }, true);
      }
      addEventListener(dropdownList, 'click', function (e) {
        var e = e || window.event;
        stopPropagation(e);
        var target = e.target ? e.target : e.srcElement;
        if (target.className.indexOf('qt-dropdown-item') > -1) {
          _this.click(target, dropdownList);
        } else if (target.parentNode.className.indexOf('qt-dropdown-item') > -1) {
          _this.click(target.parentNode, dropdownList);
        }
      }, true);
    },
    // 弹框的位置
    setPosition: function (dropdownList, currentElm, dropdownArrow) {
      if (!currentElm) {
        var elmList = document.querySelectorAll(".qt-dropdown-btn")
        for (var i = 0; i < elmList.length; i++) {
          if (elmList[i].getAttribute("aria-describedby") == dropdownList.getAttribute("id")) {
            currentElm = elmList[i];
            break;
          }
        }
      }
      if (!dropdownArrow) {
        dropdownArrow = dropdownList.lastElementChild || dropdownList.lastChild;
      }
      var listWidth = this.opt.itemWidth * this.opt.colNum;
      var paddingLR = 60;
      var currentElmStyle = getPoint(currentElm);
      dropdownList.style.top = currentElmStyle.top + currentElm.offsetHeight + 5 + "px";
      if (currentElmStyle.left < (listWidth + paddingLR - currentElm.offsetWidth) / 2) {
        //在左边
        dropdownList.style.left = "10px";
        dropdownArrow.style.left = currentElmStyle.left - 10 + (currentElm.offsetWidth / 2 - 6) + "px";
        dropdownList.style.right = "unset";
        dropdownArrow.style.right = "unset";
      } else {
        if (currentElmStyle.right < (listWidth + paddingLR - currentElm.offsetWidth) / 2) {
          //在右边
          dropdownList.style.right = "10px";
          dropdownArrow.style.right = currentElmStyle.right - 10 + (currentElm.offsetWidth / 2 - 6) + "px";
          dropdownList.style.left = "unset";
          dropdownArrow.style.left = "unset";
        } else {
          dropdownList.style.left = currentElmStyle.left + (currentElm.offsetWidth - listWidth - paddingLR) / 2 + "px";
          dropdownArrow.style.left = (listWidth + paddingLR) / 2 - 6 + "px";
          dropdownList.style.right = "unset";
          dropdownArrow.style.right = "unset";
        }
      }
    },
    toggle: function (dropdownList, callback) {
      var sh = dropdownList.classList.contains('show');
      if (sh) {
        this.hide(dropdownList);
      } else {
        this.hideAll();
        this.show(dropdownList);
      }
    },
    show: function (dropdownList, callback) {
      this.setPosition(dropdownList);
      dropdownList.style.display = "block";
      setTimeout(function () {
        dropdownList.classList.remove('hide');
        dropdownList.classList.add('show');
        callback && callback();
      }, 10);
    },
    hide: function (dropdownList, callback) {
      dropdownList.classList.add('hide');
      dropdownList.classList.remove('show');
      setTimeout(function () {
        dropdownList.style.display = "none";
        callback && callback();
      }, 300)
    },
    hideAll: function () {
      var dropdownListAll = document.querySelectorAll(".qt-dropdown-list");
      for (var i = 0; i < dropdownListAll.length; i++) {
        dropdownListAll[i].classList.add('hide');
        dropdownListAll[i].classList.remove('show');
        dropdownListAll[i].style.display = "none";
      }
    },
    click: function (element, dropdownList) {
      var attributes = element.attributes;
      var dataobj = {};
      for (var i = 0; i < attributes.length; i++) {
        if (attributes[i].name.indexOf("data-") > -1) {
          dataobj[attributes[i].name.replace("data-", "")] = attributes[i].value;
        }
      }
      if (this.opt.click) {
        this.opt.click(dataobj);
      } else {
        dataobj.url && window.open(dataobj.url)
      }
      this.hide(dropdownList);
    },
    css: function (element, styleObj) {
      for (var prop in styleObj) {
        var attr = prop.replace(/[A-Z]/g, function (word) {
          return '-' + word.toLowerCase();
        });
        element.style[attr] = styleObj[prop];
      }
      return this;
    }
  }
  // 最后将插件对象暴露给全局对象
  _global = (function () { return this || (0, eval)('this'); }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Septcuts;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return Septcuts; });
  } else {
    !('Septcuts' in _global) && (_global.Septcuts = Septcuts);
  }
}());