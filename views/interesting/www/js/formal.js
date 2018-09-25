

			function start(){
                debugger
				if(getCookieValue('volume')){
					//$('#loading').fadeIn(200);
					formal();
				}else{
					swal({
						  type:'error',
						  title: "试图打开音量",
						  text: "结果被拒绝了..",
						  //timer: 2000
						  showCancelButton: false,
						  confirmButtonColor: "rgb(242, 68, 35)",
						  confirmButtonText: "好吧",
						  closeOnConfirm: true
						},
						function(){
							addCookie('volume',true,1,'/');
							//$('#loading').fadeIn(200);
							formal();
						}
						
					);
				}
			}

			function formal(){
				
				autoPlayMusic();
				audioAutoPlay();
				setTimeout(function(){
					$('#loading').fadeOut(50);
					$('#t1').fadeIn(100);
					setTimeout(function(){
						$('#next').trigger('click');
						setTimeout(function(){
							$('#next').trigger('click');
							setTimeout(function(){
								$('#next').trigger('click');
								setTimeout(function(){
									$('#next').trigger('click');
									setTimeout(function(){
										$('#next').trigger('click');
										setTimeout(function(){
											$('#next').trigger('click');
											setTimeout(function(){
												$('#next').trigger('click');
												setTimeout(function(){
													$('#next').trigger('click');
													setTimeout(function(){
														$('#content01').fadeOut(100);
														$('#content02').fadeIn(100);
														$('#t11').fadeIn(4000);
														setTimeout(function(){
															$('#next2').trigger('click');
															setTimeout(function(){
																$('#next2').trigger('click');
																setTimeout(function(){
																	$('#next2').trigger('click');
																	setTimeout(function(){
																		$('#next2').trigger('click');
																		setTimeout(function(){
																			$('#next2').trigger('click');
																			setTimeout(function(){
																				$('#next2').trigger('click');
																				setTimeout(function(){
																					$('#next2').trigger('click');
																					setTimeout(function(){
																						$('#next2').trigger('click');
																						setTimeout(function(){
																							$('#content02').fadeOut(100);
																							$('#content03').fadeIn(100);
																							$('#t21').fadeIn(1000);
																							setTimeout(function(){
																								$('#next3').trigger('click');
																								setTimeout(function(){
																									$('#next3').trigger('click');
																									setTimeout(function(){
																										$('#next3').trigger('click');
																										setTimeout(function(){
																											$('#next3').trigger('click');
																											setTimeout(function(){
																												$('#next3').trigger('click');
																												setTimeout(function(){
																													$('#next3').trigger('click');
																													setTimeout(function(){
																														$('#next3').trigger('click');
																														setTimeout(function(){
																															$('#next3').trigger('click');
																															setTimeout(function(){
																																$('#t29').fadeOut(100);
																																alertFire();
																															},9000);//烟火
																														},9000);//愿,大富贵
																													},4500);//勿忘初心
																												},4500);//能哭能笑能尽欢
																											},4500);//随处可栖
																										},4500);//故人不散
																									},4500);//温暖长晴
																								},4500);//无邪有人懂
																							},4500);//活得烈马青葱
																						},4500);//百岁安生不离笑
																					},4500);//无疾无忧
																				},4500);//温暖相拥
																			},4500);//且以深情共白头
																		},4500);//佑余岁月无忧
																	},4500);//看烈焰繁花
																},4500);//或两败俱伤
															},4500);//梦醒时见ta
														},4500);//当七十岁之最爱
													},4000);//归来仍是少年
												},1000);//期,未至之于尔
											},1500);//往事难守
										},1500);//或闲云野鹤,浮世沉沦
									},1500);//纵使相逢不识缘
								},1200);//行将路远之艰
							},1500);//何人喜孤烈独酒
						},1500);//畏夜路者众
					},1000);//难掩期许
				},0);//岁暮之殊
			}
			
			function alertFire(){
				$('#content02').fadeOut(100);
				swal({
						  title: "",
						  text: "人生而时属平凡\n只愿如灿烂烟火",
						  type: "info",
						  showCancelButton: false,
						  confirmButtonColor: "rgb(242, 68, 35)",
						  confirmButtonText: "开",
						  closeOnConfirm: true
						},

						function(){
							$('#bg_fireworks').fadeIn(100);
							$('.bg_fireworks').fireworks({ 
							  sound: false, // sound effect
							  opacity: 1, 
							  width: '100%', 
							  height: '100%' 
							});

					});
			}
			
			function audioAutoPlay() {
				var audio = document.getElementById('bg-music');
				audio.play();
				document.addEventListener("WeixinJSBridgeReady", function () {
					audio.play();
				}, false);
			}
			// 音乐播放
			function autoPlayMusic() {
				// 自动播放音乐效果，解决浏览器或者APP自动播放问题
				function musicInBrowserHandler() {
					musicPlay(true);
					document.body.removeEventListener('touchstart', musicInBrowserHandler);
				}
				document.body.addEventListener('touchstart', musicInBrowserHandler);
				// 自动播放音乐效果，解决微信自动播放问题
				function musicInWeixinHandler() {
					musicPlay(true);
					document.addEventListener("WeixinJSBridgeReady", function () {
						musicPlay(true);
					}, false);
					document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
				}
				document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
			}
			function musicPlay(isPlay) {
				var media = document.querySelector('#bg-music');
				if (isPlay && media.paused) {
					media.play();
				}
				if (!isPlay && !media.paused) {
					media.pause();
				}
			}
			
			
			
			
			