     angular.module('mainApp', ['ngAnimate','ui.router'])
       .config(function ($stateProvider, $urlRouterProvider) {
     	$urlRouterProvider.when("", "main");
     	$stateProvider
     	.state("main", {
            url: "/main",
            views: {
                '': {
                    templateUrl: '/seller/templates/main.html'
                },
                'topbar@main': {
                    templateUrl: '/seller/templates/topbar.html'
                },
                'leftbar@main': {
                    templateUrl: '/seller/templates/leftbar.html',
                    controller:function(){
                    	myUtils.myClickRotate("a.toCaret","span.caret");//箭头旋转
                    }
                } ,
                'rightbody@main': {
                    templateUrl: '/seller/templates/notice.html'
                } 
            }
        })
         .state("main.notice", {
            url:"/notice",
            views: {
            	'rightbody@main': {
                    templateUrl: "/seller/templates/notice.html"
                } 
            }
        })
         .state("main.merCate", {//商品类型
            url:"/merCate",
            views: {
            	'rightbody@main': {
                    templateUrl: "/seller/templates/mer_cate.html",
                    controller:function($scope){
                    	//初始化
                    	$scope.merCateInit={
                    		mer_cate_id:'',
	                    	name:'',
	                    	update_time:''
                    	};
                    	//数据列表
                    	myUtils.myPrevToast("加载中...", function(){
                    	$.get("/merCate/list?seller_id="+myUtils.GetQueryString("seller_id"),function(data){
                    	$scope.merCateList=data;
                    	$scope.$apply();
                    	myUtils.myPrevToast("加载完成",null,"remove");
                    	});
                    	},"add");
                    	//监听数据列表
                    	$scope.$watch("merCateList",function(){
                    		if($scope.merCateList==''||$scope.merCateList==null||$scope.merCateList==undefined){
                    			$("#noMerCateList").text("还有没商品类型，赶紧添加吧！");
                    		}else{
                    			$("#noMerCateList").text("");
                    		}
                    	});
                    	//添加类型
                    	$scope.addMerCateBtn=function(){
                    			//绑定model
                        		$("#mySellerModal").unbind().click(function(){
                        			$("#mySellerModalLabel").text("添加商品类型");
                        			$("#mySellerModalBody").html("<input type='text'class='comment-input' id='merCateValue'/>");
                        		});
                        		//触发事件
                        		$("#mySellerModal").click();
                        		//修改类型，表单提交
                        		$("#sellerSubmit").unbind().click(function(){
                    				myUtils.myPrevToast("添加中...", function(){
                        			$.post("/merCate/add?name="+$("#merCateValue").val().trim()+"&seller_id="+myUtils.GetQueryString("seller_id"),
                        					function(data){
                        				if(data.code==200){
                        				$("#closeModal").click();
                        				myUtils.myPrevToast("添加成功",null,"remove");
                        				//更新表单
                        				$.get("/merCate/list?seller_id="+myUtils.GetQueryString("seller_id"),function(data){
                                        	$scope.merCateList=data;
                                        	$scope.$apply();
                                        	});
                        				}else{
                        					myUtils.myPrevToast(data.msg,null,"remove");
                        				}
                        				
                        			});
                    				}, "add");
                        		});	
                    	};
                    	//编辑更新
                    	$scope.updateMerCate=function(mer_cate_id){
                    		//绑定model
                    		$("#mySellerModal").unbind().click(function(){
                    			$("#mySellerModalLabel").text("修改商品类型");
                    			$("#mySellerModalBody").html("<input type='text'class='comment-input' id='merCateValue'/>");
                    		});
                    		//触发事件
                    		$("#mySellerModal").click();
                    		//修改类型，表单提交
                    		$("#sellerSubmit").unbind().click(function(){
                    			myUtils.myPrevToast("修改中...", function(){
                        			$.post("/merCate/update?mer_cate_id="+mer_cate_id+"&name="+$("#merCateValue").val().trim()+"&seller_id="+myUtils.GetQueryString("seller_id"),
                        					function(data){
                        				if(data.code==200){
                        				$("#closeModal").click();
                        				myUtils.myPrevToast("修改成功",null,"remove");
                        				//更新表单
                        				$.get("/merCate/list?seller_id="+myUtils.GetQueryString("seller_id"),function(data){
                                        	$scope.merCateList=data;
                                        	$scope.$apply();
                                        	});
                        				}else{
                        					myUtils.myPrevToast(data.msg,null,"remove");
                        				}
                        				
                        			});
                    				}, "add");
                    			
                    		});
                    	};
                    	//删除类型
                    	$scope.delMerCate=function(mer_cate_id){
                    		myUtils.myConfirm("删除类型吗？", function(){
                    		myUtils.myPrevToast("删除中...", function(){
                    			$.post("/merCate/"+mer_cate_id+"/delete?seller_id="+myUtils.GetQueryString("seller_id"),
                    					function(data){
                    				if(data.code==200){
                    				myUtils.myPrevToast("删除成功",null,"remove");
                    				//更新表单
                    				$.get("/merCate/list?seller_id="+myUtils.GetQueryString("seller_id"),function(data){
                                    	$scope.merCateList=data;
                                    	$scope.$apply();
                                    	});
                    				}else{
                    					myUtils.myPrevToast(data.msg,null,"remove");
                    				}
                    				
                    			});
                				}, "add");
                			
                    		});
                    	};
                    }
                } 
            }
        })
        .state("main.merInfo", {//商品管理
            url:"/merInfo",
            views: {
            	'rightbody@main': {
                    templateUrl: "/seller/templates/mer_info.html",
                    controller:function($scope,$state){
                    	$state.go("main.merInfo.merList");   
                    	
                    	//上架商品
                    	$scope.soldIn=function(){
                    		$state.go("main.merInfo.merList");
                    	};
                    	//销量
                    	$scope.sales=function(){};
                    	//库存
                    	$scope.stock=function(){};
                    	//已卖完
                    	$scope.soldOver=function(){};
                    	//已下架
                    	$scope.soldOut=function(){};
                    	//添加商品
                    	$scope.addMer=function(){
                    		$state.go("main.merInfo.merAdd");
                    	};
                    	//全选
                    	$scope.checkAllMer=function(){
                    		
                    	};
                    	//批量删除
                    	$scope.delBatchMer=function(){
                    		
                    	};
                    	//批量下架
                    	$scope.slodOutBatchMer=function(){};
                    }
                } 
            }
        })
        .state("main.merInfo.merList", {
        	url:"/merList",
        	views: {
        		'': {
        			templateUrl: "/seller/templates/mer_list.html",
        			controller:function($scope){
        				//数据列表
                    	myUtils.myPrevToast("加载中...", function(){
                    	$.get("/mer/list",function(data){
                    	$scope.merList=data;
                    	$scope.$apply();
                    	myUtils.myPrevToast("加载完成",null,"remove");
                    	});
                    	},"add");
                    	//监听数据列表
                    	$scope.$watch("merList",function(){
                    		if($scope.merList==''||$scope.merList==null||$scope.merList==undefined){
                    			$("#noMerList").text("还有没商品，赶紧添加吧！");
                    		}else{
                    			$("#noMerList").text("");
                    		}
                    	});
        			}
        		} 
        	}
        })
        .state("main.merInfo.merAdd", {
        	url:"/merAdd",
        	views: {
        		'': {
        			templateUrl: "/seller/templates/mer_add.html",
        			controller:function($scope,$state){
        				$state.go("main.merInfo.merAdd");
        				//商品类型数据列表
                    	myUtils.myPrevToast("加载中...", function(){
                    	$.get("/merCate/list?seller_id="+myUtils.GetQueryString("seller_id"),function(data){
                    	$scope.merCateList=data;
                    	$scope.$apply();
                    	myUtils.myPrevToast("加载完成",null,"remove");
                    	});
                    	});
                    	//选择商品类型
                    	$scope.addMerCateItem=function(){
                    		console.log(this.merCate.mer_cate_id)
                    		
                    	};
                    	$scope.merImgList=[];
                    	//图片上传
                    	$("#changeMerImgFile").unbind().change(function(){
        					myUtils.fileUpload({
            			    	inputfile:$(".drag-mer-file"),
            			    	ajaxObj:
            			    		{
            	  		  				formData:[{key:"mer_file",value:$(".drag-mer-file").get(0).files[0]},{key:"seller_id",value:myUtils.GetQueryString("seller_id")}],
            	  		  				url:"/merImg/add",
            	  		  				success:function(merimg){
            	  		  					console.log(merimg);
            	  		  					
            	  		                myUtils.myPrevToast("上传成功",null,"remove");
            	  		            	//设定图片显示问题
            	  		                $scope.merImgList.push(merimg);
            	  		                $scope.$apply();
            	  		  				}
            	  		  				},
            			    	dragFn:function(e){
            			    	
            			    		//sortable 更强大
            			    		 Sortable.create(imgMerWarp, { 
            			    		      handle: ".myDrag", 
            			    		      animation: 150,
            			    		      draggable:".myDrag",
            			    		      filter: ".nodrag",
            			    		      onEnd: function (/**Event*/evt) { // 拖拽
            			    		          for (var int = 0; int < $(evt.target).children().length; int++) {
            			    		        	  for (var j = 0; j < $scope.merImgList.length; j++) {
            			    		        		  console.log($(evt.target).children().children("img").get(int).getAttribute("src"))
            			    		        		  if($(evt.target).children().children("img").get(int).getAttribute("src")== $scope.merImgList[j].mer_img_address){
            			    		        			  console.log(int)
            			    		        			  $scope.merImgList[j].mer_id=int;
            			    		        		  }
												}
											}
            			    		        
            			    		          $scope.$apply();
            			    		          console.log($scope.merImgList)
            			    		      }
            			    		       });	
            			    }});
        			});
        				
        				//$scope.merImgList=[];
        					/*[
        				                   {
        				                	   mer_img_id:33,
        				                	   mer_img_address:"/resources/img/404.jpg"
        				                   },
        				                   {
        				                	   mer_img_id:22,
        				                	   mer_img_address:""
        				                   }
        				                   ];*/
        				//修改图片点击事件
        				$scope.replaceMerImg=function(){
        					$scope.thismer_img_id=this.merImg.mer_img_id;
        					$("#changeMerImgFile").click();
        				};
        				//上传修改图片
        				$("#updateMerImgFile").unbind().change(function($scope){
        					console.log($scope.thismer_img_id)
        					var thismerimgid=$scope.thismer_img_id;
        					myUtils.fileUpload({
            			    	inputfile:$(".drag-mer-file"),
            			    	ajaxObj:
            			    		{
            	  		  				formData:[{key:"mer_file",value:$(".drag-mer-file").get(0).files[0]},
            	  		  				          {key:"seller_id",value:myUtils.GetQueryString("seller_id")},
            	  		  				          {key:"mer_img_id",thismerimgid}
            	  		  				          ],
            	  		  				url:"/merImg/update",
            	  		  				success:function(merimg){
            	  		  					console.log(merimg);
            	  		  					
            	  		                myUtils.myPrevToast("修改成功",null,"remove");
            	  		                console.log($scope.merImgList)
            	  		            	//设定图片显示问题
            	  		                for (var int = 0; int < $scope.merImgList.length; int++) {
											if($scope.merImgList[int].mer_img_id==thismerimgid){
												$scope.merImgList.remove($scope.merImgList[int]);
											}
										}
            	  		                $scope.merImgList.push(merimg);
            	  		                $scope.$apply();
            	  		  				}
            	  		  				},
            			    	dragFn:function(e){
            			    	
            			    		//sortable 更强大
            			    		 Sortable.create(imgMerWarp, { 
            			    		      handle: ".myDrag", 
            			    		      animation: 150,
            			    		      draggable:".myDrag",
            			    		      filter: ".nodrag"
            			    		       });	
            			    		 
            			    }});
        					
        				});
        				
        			}
        		} 
        	}
        })
        .state("main.merGroup", {
            url:"/merGroup",
            views: {
            	'rightbody@main': {
                    templateUrl: "/seller/templates/mer_group.html"
                } 
            }
        })
        .state("main.merDistribution", {
            url:"/merDistribution",
            views: {
            	'rightbody@main': {
                    templateUrl: "/seller/templates/mer_distribution.html"
                } 
            }
        });
		})
       .controller('mainCtrl', function($scope,$http) {
    	   myUtils.idNotExistence("seller_id", "/404");
   		$scope.mainapp="2324324";
   		$("#closeOrder").click(function(){
   			//alert("sdf")
   			$.post("/weixin/order/close",function(data){
   				alert(data)
   			});
   		});			
   		});		