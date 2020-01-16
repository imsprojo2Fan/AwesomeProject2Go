

			function start(){
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
																														},9000);//岁岁年年长安康
																													},4500);//花朝月夕多胜意
																												},4500);//多喜乐，长安宁
																											},4500);//所行化坦途
																										},4500);//所求皆如愿
																									},4500);//人海常有良友相伴，长乐未央
																								},4500);//长夜总有梦想发亮，秋收春耕
																							},4500);//每身孤独皆拥抱共鸣
																						},4500);//一切困难皆云淡风轻
																					},4500);//背包有书本和远方
																				},4500);//愿生活有热汤和甜食
																			},4500);//目明心亮，立心力行
																		},4500);//时日平淡，而又温情如水
																	},4500);//和气作春妍，新年胜旧年
																},4500);//山高有行路，水深有渡舟
															},4500);//乐交友，惜四时
														},4500);//存远志，常读书
													},4000);//平安喜乐，诸事顺遂
												},1000);//百事都如意
											},1500);//吉吉利利
										},1500);//愿新春已后
									},1500);//戴得更忔戏
								},1200);//幡儿胜儿都姑媂
							},1500);//和气入、东风里
						},1500);//菜传纤手青丝细
					},1000);//喜新春新岁
				},0);//笙歌间错华筵启
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
			
			
			
			
			