# Septcuts [![npm](https://static.7net.cc/septcuts/septcuts.svg)](https://www.npmjs.com/package/septcuts)

## 七天网络快键菜单
JSON: https://static.7net.cc/septcuts/septcuts.json

Demo: https://static.7net.cc/septcuts/examples/index.html


## Getting Started
#### Install with NPM:

```javascript

$ npm install --save septcuts

```
#### Import into your project:

```javascript

import Septcuts from 'septcuts'

```


## Usage

```html
<button class='btn-septcuts'>七天网络</button>
```

```javascript

var septcuts=new Septcuts(".btn-septcuts");

```

## Options

```javascript
var septcuts = new Septcuts('.btn-septcuts', {
	  //应用列表，默认全部七天全部产品，也可设置为接口地址，如https://static.7net.cc/septcuts/septcuts.json
	  groups: [{
			"title": "应用平台",
			"items": [
			  { "label": "考试阅卷", "url": "https://office.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/ksgl.png" },
			  { "label": "阅卷任务", "url": "https://yj.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/yjrw.png" },
			  { "label": "分析中心", "url": "https://rpt.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/fxzx.png" },
			  { "label": "题库组卷", "url": "https://tiku.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/tkzj.png" },
			  { "label": "精准分层教学", "url": "https://ta.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/jzhfcjx.png" },
			  { "label": "学情监测", "url": "https://studentplatformmanager.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/xqjc.png" }
			]
		  }, {
			"title": "教考工具",
			"items": [
			  { "label": "小题分导入", "url": "https://scoreimport.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/xtfdr.png" },
			  { "label": "答题卡制作", "url": "https://ac.7net.cc", "icon": "https://static.7net.cc/septcuts/icons/dtkzz.png" }
			]
	  }],
	  http: { url: 'https://static.7net.cc/septcuts/septcuts.json', method: 'post', header: {}, data: {} },//接口请求，设置groups未设置时，可设置此项
	  cssClass: 'drop-item', //给下拉菜单额外添加的className
	  itemWidth: 180,  //菜单项的宽度，默认180px
	  iconSize: 28,  //菜单icon的大小，默认28px
	  colNum: 3, //一行最多显示几个菜单项，默认3个
	  trigger: 'click',  //弹出菜单的触发方式，默认hover
	  click: function (item) { //菜单项的点击事件，默认如果有url则打开
		//todo
		//
		//
	  }
})
```

## In Browser
```html
<script src="path/septcuts.min.js"></script>
var septcuts=new Septcuts(".drop-button");
```

## CDN

```html
<script src="//static.7net.cc/septcuts/septcuts.min.js"></script>
```