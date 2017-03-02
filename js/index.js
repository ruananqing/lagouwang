"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("data/city.json").then(function(e){t.city=e.data}),e.get("data/salary.json").then(function(e){t.salary=e.data}),e.get("data/scale.json").then(function(e){t.scale=e.data})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(n,a,i){var o=e.defer();return t.get(n).then(function(t){o.resolve(t)}).catch(function(t){o.reject(t)}),{then:function(t){o.promise.then(t)},catch:function(t){o.promise.then(null,t)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[\d]{10}/,password:function(t){var e=t+"";return e.length>5},required:function(t){return!!t}},n={phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少是6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(n)}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(t,e,n){t.get("data/company.json?id="+e.params.id).then(function(t){n.company=t.data})}]),angular.module("app").controller("favoriteCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("loginCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t.get("/data/positionList.json").then(function(t){e.list=t.data})}]),angular.module("app").controller("meCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("positionCtrl",["$q","$http","$state","$scope","cache",function(t,e,n,a,i){function o(){var i=t.defer();return e.get("data/position.json?id="+n.params.id).then(function(t){a.position=t.data,i.resolve(t.data)}).catch(function(t){i.reject(t)}),i.promise}function r(t){e.get("data/company.json?id="+t).then(function(t){a.company=t.data})}a.isLogin=!1,o().then(function(t){r(t.companyId)})}]),angular.module("app").controller("postCtrl",["$http","$scope",function(t,e){e.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}]}]),angular.module("app").controller("registerCtrl",["$interval","$http","$scope","$state",function(t,e,n,a){n.submit=function(){e.post("data/regist.json",n.user).then(function(t){a.go("login")})};var i=60;n.send=function(){n.send=function(){e.get("data/code.json").then(function(e){if(1===e.data.state){i=60,n.time="60s";var a=t(function(){return i<=0?(t.cancel(a),void(n.time="")):(i--,void(n.time=i+"s"))},1e3)}})}}}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,n){n.name="",n.search=function(){e.get("data/positionList.json?name="+n.name).then(function(t){n.positionList=t.data})},n.search(),n.sheet={},n.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}],n.filterObj={};var a="";n.tClick=function(e,i){a=e,n.sheet.list=t[e],n.sheet.visible=!0},n.sClick=function(t,e){t?(angular.forEach(n.tabList,function(t){t.id===a&&(t.name=e)}),n.filterObj[a+"Id"]=t):(delete n.filterObj[a+"Id"],angular.forEach(n.tabList,function(t){if(t.id===a)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company.html",scope:{com:"="}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/positionClass.html",link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(t){t.imagePath=t.isActive?"image/star-active.png":"image/star.png"}}}]),angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"="}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.click=function(e){t.seletedId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var n=[];return angular.forEach(t,function(t){var a=!0;for(var i in e)t[i]!=e[i]&&(a=!1);a&&n.push(t)}),n}}]),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,n){t.put(e,n)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);