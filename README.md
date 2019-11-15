# septcuts.js

七天网络快键菜单

## Install

```javascript
$ npm install --save septcuts
```

## Usage
```
var septcuts=new Septcuts(".drop-demo",{
      groups: [{  //列表数据
        title: '应用平台',
        items: [
          {label:"考试阅卷",url:"http://www.7net.cc",icon:"./demo.png"},
          {label:"阅卷任务",url:"http://www.7net.cc",icon:""},
          {label:"分析中心",url:"http://www.7net.cc",icon:"./demo.png"},
          {label:"精准分层教学",url:"http://www.7net.cc",icon:""},
          {label:"学情监测",url:"http://www.7net.cc",icon:""}
        ]
      },{
        title: '教考工具',
        items: [
          {label:"小题分导入",url:"http://www.7net.cc",icon:""},
          {label:"答题卡制作",url:"http://www.7net.cc",icon:""}
        ]
      }],
      cssClass:'drop-item', //给下拉菜单额外添加的className
      itemWidth:180,  //菜单项的宽度，默认180px
      iconSize:28,  //菜单icon的大小，默认28px
      colNum:3, //一行最多显示几个菜单项，默认3行
      trigger:'click',  //弹出菜单的触发方式，默认hover
      click:function(item){ //菜单项的点击事件，默认如果有url则打开
        if(item.url){
          window.open(item.url)
        }
      }
    })
```
### In Browser

```html
<script src="dist/septcuts.min.js"></script>
```