(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c90ff3d"],{"0bef":function(o,t,e){"use strict";var i=e("5bf8"),n=e.n(i);n.a},"5bf8":function(o,t,e){},a988:function(o,t,e){"use strict";e.r(t);var i=function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"my-cropper"},[e("div",{directives:[{name:"show",rawName:"v-show",value:o.model,expression:"model"}],staticClass:"model",on:{click:function(t){o.model=!1}}},[e("div",{staticClass:"model-show"},[e("img",{attrs:{src:o.modelSrc,alt:""}})])]),o._v(" "),e("p",{staticStyle:{color:"#000"}},[o._v("截图demo")]),o._v(" "),e("div",{staticClass:"cut"},[e("div",{staticClass:"cropper-cont"},[e("vue-cropper",{ref:"cropper",attrs:{img:o.option.img,"output-size":o.option.size,"output-type":o.option.outputType,info:!0,full:o.option.full,fixed:o.fixed,"fixed-number":o.fixedNumber,"can-move":o.option.canMove,"can-move-box":o.option.canMoveBox,"fixed-box":o.option.fixedBox,original:o.option.original,"auto-crop":o.option.autoCrop,"auto-crop-width":o.option.autoCropWidth,"auto-crop-height":o.option.autoCropHeight,"center-box":o.option.centerBox,high:o.option.high,mode:o.mode},on:{"real-time":o.realTime,"img-load":o.imgLoad}})],1),o._v(" "),e("div",{staticClass:"show-preview",style:{width:o.previews.w+"px",height:o.previews.h+"px",overflow:"hidden"}},[e("div",{style:o.previews.div},[e("img",{style:o.previews.img,attrs:{src:o.previews.url}})])])]),o._v(" "),e("div",{staticClass:"test-button"},[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.changeImg}},[o._v("changeImg")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.$refs.uploads.click()}}},[o._v("upload")]),o._v(" "),o.crap?e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.stopCrop}},[o._v("结束")]):e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.startCrop}},[o._v("开始")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.clearCrop}},[o._v("清空")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.refreshCrop}},[o._v("刷新")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.changeScale(5)}}},[o._v("放大")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.changeScale(-5)}}},[o._v("缩小")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.rotateLeft}},[o._v("向右旋转90")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:o.rotateRight}},[o._v("向左旋转90")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.finish("base64")}}},[o._v("预览(base64)")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.finish("blob")}}},[o._v("预览(blob)")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.down("base64")}}},[o._v("下载(base64)")]),o._v(" "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return o.down("blob")}}},[o._v("下载(blob)")]),o._v(" "),e("input",{ref:"uploads",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(t){return o.uploadImg(t,1)}}}),o._v(" "),e("div",{staticStyle:{display:"block",width:"100%",color:"#000"}},[e("div",{staticClass:"c-item"},[e("span",[o._v("上传图片是否显示原始宽高 (针对大图 可以铺满)：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.original,callback:function(t){o.$set(o.option,"original",t)},expression:"option.original"}},[o._v("original: "+o._s(o.option.original))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("能否拖动图片：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.canMove,callback:function(t){o.$set(o.option,"canMove",t)},expression:"option.canMove"}},[o._v("canMove: "+o._s(o.option.canMove))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("能否拖动截图框：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.canMoveBox,callback:function(t){o.$set(o.option,"canMoveBox",t)},expression:"option.canMoveBox"}},[o._v("canMoveBox: "+o._s(o.option.canMoveBox))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("截图框固定大小：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.fixedBox,callback:function(t){o.$set(o.option,"fixedBox",t)},expression:"option.fixedBox"}},[o._v("fixedBox: "+o._s(o.option.fixedBox))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("是否输出原图比例的截图：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.full,callback:function(t){o.$set(o.option,"full",t)},expression:"option.full"}},[o._v("full: "+o._s(o.option.full))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("是否自动生成截图框：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.autoCrop,callback:function(t){o.$set(o.option,"autoCrop",t)},expression:"option.autoCrop"}},[o._v("autoCrop: "+o._s(o.option.autoCrop))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("是否根据dpr生成适合屏幕的高清图片：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.high,callback:function(t){o.$set(o.option,"high",t)},expression:"option.high"}},[o._v("high: "+o._s(o.option.high))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("截图框是否限制在图片里(只有在自动生成截图框时才能生效)：")]),o._v(" "),e("el-checkbox",{model:{value:o.option.centerBox,callback:function(t){o.$set(o.option,"centerBox",t)},expression:"option.centerBox"}},[o._v("centerBox: "+o._s(o.option.centerBox))])],1),o._v(" "),e("div",{staticClass:"c-item"},[e("span",[o._v("输出图片格式：")]),o._v(" "),e("el-radio-group",{model:{value:o.option.outputType,callback:function(t){o.$set(o.option,"outputType",t)},expression:"option.outputType"}},[e("el-radio",{attrs:{label:"jpeg"}},[o._v("jpg")]),o._v(" "),e("el-radio",{attrs:{label:"png"}},[o._v("png")]),o._v(" "),e("el-radio",{attrs:{label:"webp"}},[o._v("webp")])],1)],1)])],1)])},n=[],a=e("0b46"),r=e("9743"),c={name:"ScreenShotDemo",components:{VueCropper:r["VueCropper"]},data:function(){return{model:!1,modelSrc:"",crap:!1,previews:{},lists:[],option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!1,canMoveBox:!0,autoCrop:!1,autoCropWidth:200,autoCropHeight:150,centerBox:!1,high:!0},show:!0,fixed:!1,fixedNumber:[1,2],info:!0,canScale:!0,infoTrue:!0,maxImgSize:2e3,enlarge:1,mode:"contain"}},mounted:function(){var o=this;this.getBas64("https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200327/cb2d839481c4f7b275a2bb084e838d6a.png").then((function(t){o.option.img=t,o.lists[0]={img:t}})),this.getBas64("https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_app/decoration/20200304/3281b15fe6aa8fe8cc11284a4e46dc48.png").then((function(t){o.lists[1]={img:t},o.lists[2]={img:e("e94e")}}))},methods:{getBas64:function(o){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image/png";return new Promise((function(e,i){var n=document.createElement("canvas"),a=n.getContext("2d"),r=new Image;r.crossOrigin="Anonymous",r.onload=function(){n.width=r.width,n.height=r.height,a.drawImage(r,0,0);var o=n.toDataURL(t);n=null,e(o)},r.src=o+"?t="+Date.now()}))},changeImg:function(){this.option.img=this.lists[~~(Math.random()*this.lists.length)].img},startCrop:function(){this.crap=!0,this.$refs.cropper.startCrop()},stopCrop:function(){this.crap=!1,this.$refs.cropper.stopCrop()},clearCrop:function(){this.$refs.cropper.clearCrop()},refreshCrop:function(){this.$refs.cropper.refresh()},changeScale:function(o){o=o||1,this.$refs.cropper.changeScale(o)},rotateLeft:function(){this.$refs.cropper.rotateLeft()},rotateRight:function(){this.$refs.cropper.rotateRight()},finish:function(o){var t=this;"blob"===o?this.$refs.cropper.getCropBlob((function(o){console.log(o);var e=window.URL.createObjectURL(o);t.model=!0,t.modelSrc=e})):this.$refs.cropper.getCropData((function(o){t.model=!0,t.modelSrc=o}))},realTime:function(o){this.previews=o,this.$emit("",this.previews),console.log(o)},down:function(o){var t=this,e=document.createElement("a");e.download="demo","blob"===o?this.$refs.cropper.getCropBlob((function(o){console.log(o),t.downImg=window.URL.createObjectURL(o),e.href=window.URL.createObjectURL(o),e.click()})):this.$refs.cropper.getCropData((function(o){t.downImg=o,e.href=o,e.click()}))},uploadImg:function(o,t){var e=this,i=o.target.files[0];if(!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(o.target.value))return alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种"),!1;var n=new FileReader;n.onload=function(o){var t;t="object"===Object(a["a"])(o.target.result)?window.URL.createObjectURL(new Blob([o.target.result])):o.target.result,e.option.img=t},n.readAsArrayBuffer(i)},imgLoad:function(o){console.log(o)}}},s=c,p=(e("0bef"),e("9ca4")),l=Object(p["a"])(s,i,n,!1,null,"433c4a8a",null);t["default"]=l.exports}}]);