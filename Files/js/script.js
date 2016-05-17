/**
Developed By @AnshBikram
*/

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
img1.src = "./Files/img/blu.png";
img2.src = "./Files/img/grn.png";
img3.src = "./Files/img/newbg.png";
img4.src = "./Files/img/college logo.png";

$(document).ready(function(){
	$audio = new Array();
	$audio[0] = new Audio('Files/1.ogg');
	$audio[0].loop = true;
	$cur = 0;
	$muted = false;
	$played = false;
	$('.musicPlay').click(function(){
		if($played)
		{
			$audio[$cur].pause();
			$played = false;
			$(this).attr('src','Files/img/play.png');
		}
		else
		{	
			$audio[$cur].play();
			$played = true;
			$(this).attr('src','Files/img/pause.png');
		}
		
	});
	$('.musicStop').click(function(){
		$audio[$cur].currentTime = 0;
		$audio[$cur].pause();
	});
	$('.musicVolume').click(function(){
		if(!$muted)
		{
			$audio[$cur].volume = 0;
			$(this).attr('src','Files/img/mute.png');
			$muted = true;
		}
		else if($muted)
		{
			$audio[$cur].volume = 1;
			$(this).attr('src','Files/img/volume.png');
			$muted = false;
		}
		
	});
	
	$('#musicList').change(function(){
		$cur = $(this).val()
		$audio[$cur].play();
	});
	
	var event = ['Codeenigma','CSI','Dejavu','GoogleBuster','Botsumo','Hovorun','Interroger','Pathseeker','Piratewarz','SEO','Simulab','Switchcoding','Technova','Xtermination','Appfest','Arbalete','Blueprint','Butsumo','','','Broadway','Footloose','Lamode','Rockathon','Soprano','Bollyquiz','Acoustica','Picasso','Accommodation'];
		

	var and = false;
	$('#and > p').click(function(){
		if(!and)
		{
			$('#and').animate({bottom : '-10px'},300);
			and = true;
		}
		else
		{
			$('#and').animate({bottom : '-70px'},300);
			and = false;
		}
		
		return false;
	});
	$(img1).error(function(){
		window.location = window.location;
	});

	$.desktopStarted = false;
	$.desktopActive = false;
	$clickedItem = '';
	$clickedIndex = 0;
	$sponserTagClicked = false;
	$open = false;
	$.eventStarted = false;
	$event_reg = false;

	//$('#wrapper1_startup').hide();
	$('#wrapper_icon_window').hide();
	$('#wrapper_login').hide();
	$('#wrapper_sponser').hide();
	$('#wrapper_desktop').hide();
	$('#wrapper1_homescreen').hide();
	//openDesktop();
	//$(img1,img2,img3).load(function(){

		$('#power_logo').click(function(){
			$('#fbLike').fadeIn(1000).css({display : 'block'});
			$('.fullscreen').trigger( "click" );
			$('#wrapper3_startup').css({height : "300px", width : "600px"});
			$(this).css({height : '300px', width : '600px', background : "url('./Files/img/newbg.png') no-repeat center", cursor : 'default'});
			$('#load').css({background : "url('./Files/img/loading_circle.gif') no-repeat center", display : 'block'});
			$('#clg_logo').fadeIn(500).css({display : 'block'});
			$('#date').fadeIn(500).css({display : 'block'});
			$('#fill').animate({width : '600px'},8000,function(){
				$('#move_up').css({ display : 'block' });
				$('#wrapper1_startup').css({cursor : 'pointer'});
				$('#load').css({visibility : 'hidden'});	
				$('#power_logo').css({cursor : 'pointer'});					
	
				$('#wrapper1_startup').animate({left : '1%'},100,function(){
					$('#wrapper1_startup').animate({left : '-1%'},100,function(){
						$('#wrapper1_startup').animate({left : '1%'},100,function(){
							$('#wrapper1_startup').animate({left : '0%'},100,function(){});
						});
					});
				});
				$('#wrapper1_startup').click(function(){
					$('#wrapper1_startup').css({width : '100%'});
					$('#wrapper1_startup').css({cursor : 'default'});
					$('#power_logo').css({cursor : 'default'});
					up();
					changeVisibility('#wrapper1_startup','hide',10);
				});
	
			});
		});
	
	//});	
	
	function up()
	{		
		openLogin();
		$('#wrapper1_startup').animate({top : '-100%'},300,function(){
			$('#wrapper1_startup').hide();
		});
		$('#move_up').css({display : 'none'});
		$('#wrapper_sponser').show(100);
		$('.musicPlay').trigger('click');
	}

	function changeVisibility(element,mode,speed)
	{
		if(mode=='hide')
			$(element).animate({opacity : 0},speed,function(){$(this).animate({display : 'none'})}).hide(1000);
		else if(mode=='show')
			$(element).animate({opacity : 1},speed,function(){$(this).animate({display : 'table'})}).show();
	}
	
	$('.tile_box').draggable({
		stop: function(event, ui) {event.stopPropagation();
        $( event.toElement ).one('click', function(e){e.stopImmediatePropagation(); } );
		}
	});

	$('#user > li').click(function(){
		$(this).css({background : 'rgba(64,0,0,0.8)'}).children('li ul').toggle();
		return false;
	});
	
	$('.desktopIcon').click(function(){openDesktop();});
	function openDesktop(){
	$.desktopStarted = true;
	$.desktopActive = true;
	var x = $('.desktopIcon').offset();
		$('#wrapper_desktop').animate({top : x.top + 'px', left : x.left + 'px', zIndex : '20'},function(){
			$(this).show(100,function(){
				$(this).animate({top : '0px', left : '0px', height : '100%', width : '100%'},200,function(){
					$(this).css({minHeight : '600px', minWidth : '1050px'});
				});
			});
		});
	}
	
	function hideDesktop()
	{
		$.desktopActive = false;
		$('#wrapper_desktop').css({minHeight : '0px', minWidth : '0px'});
		$('#wrapper_desktop').animate({zIndex : '-1', height : '134px', width : '170px'},50).hide(1);
		
	}
	$('#home').click(function(){
		$('#wrapper_start_menu').hide();
		$('#sponser_tag').animate({right : '-40px'},500);
		hideDesktop();
	});
	
	$('#advaita').click(function(){
		$('#wrapper_mycomputer').show(200,function(){
			$('#wrapper_start_menu').hide();
			$('#sponser_tag').animate({right : '-40px'},500);
			$('#wrapper_mycomputer > #mycomputer > section:nth-child(n + 2)').hide();
			$('#wrapper_mycomputer > #mycomputer > .main').show();
		});
		
	});
	
	$('.lock_screen').click(function(){
		hideDesktop();
		$('#move_up').css({display : 'block', cursor : 'pointer'});
		$('#wrapper1_startup').show(0,function(){
			$('#wrapper1_startup').animate({top : '0%', cursor : 'pointer', opacity : '1'},200);
		});
		$('#wrapper_sponser').hide(100);
		$('#wrapper1_startup').click(function(){
			$('#wrapper1_startup').css({width : '100%'});
			$('#wrapper1_startup').css({cursor : 'default'});
			$('#power_logo').css({cursor : 'default'});
			up();
			changeVisibility('#wrapper1_startup','hide',10);
		});
	});
	

	$('#sponser_tag').click(function(){openSponser();});
	
	function openSponser()
	{
		if(!$sponserTagClicked)
		{
			$('#sponser_tag').animate({right : '0px'});
			$('#wrapper_sponser').animate({minWidth : '950px', width : '100%', },500);
			$sponserTagClicked = true;
		}
		else if($sponserTagClicked)
		{
			$('#wrapper_sponser').animate({minWidth : '0px', width : '0%', },200);
			$('#sponser_tag').animate({right : '-40px'},500);
			$sponserTagClicked = false;
			
		}
	}

	
	$('#close_wrapper_sponser').click(function(){
		$('#wrapper_sponser').animate({minWidth : '0px', width : '0%', },200);
		$('#sponser_tag').animate({right : '-21px',MozBorderRadius : '5px', MozBorderRadiusTopleft : '0px',
			MozBorderRadiusBottomleft : '0px', WebkitBorderRadius : '5px',
			WebkitBorderTopLeftRadius : '0px', WebkitBorderBottomLeftRadius : '0px',
			borderRadius : '5px', borderTopLeftRadius : '0px', borderBottomLeftRadius : '0px',
		},500);
		$sponserTagClicked = false;
	});


	$('body').keyup(function(ev){//alert(ev.keyCode);
		if(ev.keyCode == 27)
		{
			if($open)
				$('body').trigger('click');
			else if($sponserTagClicked)
				openSponser();
			else if($.eventStarted)
				$('#back_icon_window').trigger('click');
		}
		else if(ev.keyCode == 91 && ev.ctrlKey && $.desktopActive)
			$('#start_button').trigger('click');
		else if(ev.keyCode == 91 && ev.ctrlKey && !$.desktopActive)
			openDesktop();
		else if(ev.keyCode == 65 && ev.altKey && $.desktopActive)
			$('#advaita').trigger('click');
		else if(ev.keyCode == 72 && ev.shiftKey && $.desktopActive)
			$('#home').trigger('click');
		else if(ev.keyCode == 85 && ev.altKey && $.desktopActive)
			openLogin();
		else if(ev.keyCode == 77 && ev.altKey)
			$('.musicVolume').trigger('click');
		else if(ev.keyCode == 80 && ev.altKey)
			$('.musicPlay').trigger('click');
	});

	
	function resolve($cls)
	{
		if($cls == 'Home')
			return 0;
		return $('.' + $cls.split('Icon')[0]).offset().left;
	}

	function openIconWindow($name)
	{
		$x = $('.' + $name).offset();
		if(!$x)
			$x = {top : 0, left : 0}
		$('#wrapper_icon_window').animate({top : $x.top + 'px', left : $x.left + 'px', zIndex : '30'},0,function(){
			$(this).animate({top : '0px', left : '0px', height : '100%', width : '100%'},200,function(){
				$('#wrapper_icon_window').css({minHeight : '600px', minWidth : '1050px'});
			}).show();
			$('#back_icon_window').show();
		});
		$.eventStarted = true;
		createIconMenuStructure($name);
		registerWrapperReg();
		registerSEOlink();
		if($name.indexOf('SEO') != -1)
			getRegisteredUser();
	}

	function registerSEOlink()
	{
		$('.SEO_domain_submit').click(function(){
			if(!$loggedIn)
			{
				alert('You are not logged in.\nKindly Login to register your domain.\nPress alt + u to login.');
				return false;
			}
			var cnf = confirm('Once you register your domain you will not be able to modify it.\nAre you sure?');
			if(!cnf)
				return false;
			var link = $(this).parent().siblings('td').children('.SEO_domain_name');
			if(link.val().toLowerCase().indexOf('readysteadyseo') == -1)
			{
				alert('Not a valid Domain link.\nYour Domain link must include the keyword "readysteadyseo"');
				return false;
			}
			var url = 'http://54.209.145.90:8080/perfectEvent/Servlet/controllerSeoRegister';
			//var posting = $.post(url, {responseType : 'json', accessToken : $accessToken, link : link.val(), userId : $userId, userName : $advuserSession});
			//posting.done(function(data){
			//	if(data.response == 'success')
			//	{
					alert('Your domain link has got registered successfully.');
					link.val('');
					getRegisteredUser();
			//	}
			//	else if(data.response == 'error')
			//	{
			//		alert(data.responseString);
			//		link.val('');
			//	}
			//});
		});
	}
	
	function getRegisteredUser()
	{
		var url = 'http://54.209.145.90:8080/perfectEvent/Servlet/controllerSeoLeader';
		//var posting = $.post(url);
		//posting.done(function(data){
		//	var score = data.totalScore;
		//	var name = data.userName;
			$('#icon_detail #SEO_table').html('<tr><th>Names</th><th>Domain Links</th></tr>');
		//	$.each(score,function(idx, dt){
		//		var html = '\n<tr>\n<td>' + name[idx] + '</td>\n<td>' + dt + '</td>\n</tr>';
		//		$('#icon_detail #SEO_table').append(html);
		//	});
		//});
	}
	
	function registerWrapperReg(){
		$('.event_reg').click(function(){
			$cur = $(this).parent();
			$cls = $cur.attr('class').split(' ');
			$evnt = $(this).parent().parent().children('#eventName').html();//alert($);
			$loggedIn = true //for tetsting purpose
			$event_reg = false //for testing purpose
			if(!$loggedIn)
				alert('You are not logged in.\nKindly login to register for this event!!!');
			else if(!$event_reg)
			{
				if($cls[1] == 'false')
				{	
					var conf = confirm("Are you sure,\n you want to register for this event ?");
					if(conf)
					{	
						var index = $event.indexOf($evnt) + 1;
						var url = 'http://54.209.145.90:8080/perfectEvent/Servlet/controllerEventRegistration';
						//var posting = $.post(url,{appId : $appId, eventId : index, feeReceived : 0, responseType : 'json', userId : $userId, accessToken : $accessToken});
						//posting.done(function(data){
						//	if(data.response == 'success')
						//	{
								$('#event_' + $evnt).attr('title', 'true true');
								$cur.attr('class','wrapper_event_reg true true');
								$cur.animate({left : 0, },400,function(){$event_reg = true;});
								$('#icon_detail .wrapper_event_reg > .event_reg').append('<p>E</p>\n<p>D</p>');
								$('#icon_detail .wrapper_event_reg > .event_reg').css({background : 'rgb(21,2,1)'});
								$('#icon_detail .wrapper_event_reg > .event_reg > p').animate({lineHeight : '1.3'},200);
								$('#icon_detail .success').fadeIn(100).fadeOut(10000);
								getEventRegisterArray();
						//	}
						//	else
						//		alert('Event registration unsuccessful. Please try again later.');
						//});
					}
					else return;
				}
				else if($cls[1] == 'true')
					$cur.animate({left : 0, },400,function(){$event_reg = true;});
				else
					alert('Something went wrong.\nPlease try again.');
			}
			else
				$('.wrapper_event_reg').animate({left : '-555px'},200,function(){$event_reg = false;});
			return false;
		});
		$('.reg_form').click(function(){return false;});
		$('#icon_detail .reg_form .event_reg_submit').click(function(){
			var email = $('#icon_detail .reg_form .evnt_partner1').val();
			$evnt = $('#icon_detail .event_reg').parent().parent().children('#eventName').html();
			var eventId = $event.indexOf($evnt) + 1;
			var eventName = $event[eventId - 1];
			var url = 'http://54.209.145.90:8080/perfectEvent/Servlet/controllerInviteFriends';
			var posting = $.post(url,{appId : $appId, eventId : eventId, responseType : 'json', registrationId : $userId, accessToken : $accessToken, email : email, name : $advuserSession, eventName : eventName});
			$('#icon_detail .reg_form .evnt_partner1').val('');
			//posting.done(function(data){
			//	if(data.response == 'success')
					$('.reg_submit').fadeIn(100).fadeOut(7000);
			//	else
			//		alert('Something went wrong.\nPease try again later.');
			//});
			
		});
	}
	
	$('#back_icon_window').click(function(){
		$('#wrapper_icon_window').animate({zIndex : '-1', height : '134px', width : '170px', 
			minWidth : '0', minHeight : '0'},50).hide(1);
		$clickedItem = '';
		$.eventStarted = false;
	});

	
	
	
	function createIconMenuStructure($a)
	{
		$a = $a.split('open')[1];
		$iconMenu = $('#icon_menu');
		$iconDetail = $('#icon_detail');
		$flag = $('#event_' + $a).attr('title').split(' ');
		$name = '<div id="eventName">' + $a + '</div>\n';
		if($flag[0] == 'true')
		{
			$('#registration > .wrapper_event_reg').attr('id', $a);
			//$('#registration > .wrapper_event_reg').addClass($flag[0]);
			$('#registration > .wrapper_event_reg').attr('class','wrapper_event_reg ' + $flag[1]);
			$('#registration > .wrapper_event_reg').attr('title', $flag[1] == 'true' ? 'You have already registered for this event.\nClick here to invite your friends to be your partner.' : 'You have not Registered for this event.\n Click here to Register now.');
			$reg = $('#registration').html();
			$name += $reg + '\n';	
		}
		$menuText = '<ul>\n';
		$detailText = $name +  '<ul>\n';
		$('#event_' + $a ).children().each(function(){
			$menuText += '\t<li title="' + $(this).attr('title') + '">' + $(this).attr('title') + '</li>\n';
			$detailText += '\t<li>' + $(this).html() + '</li>\n';
			
		});
		$menuText += '</ul>\n';
		$detailText += '</ul>\n';
		$iconMenu.html($menuText);
		$iconDetail.html($detailText);
		if($flag[1] == 'true')
		{
			$('#icon_detail .wrapper_event_reg > .event_reg').append('<p>E</p>\n<p>D</p>');
			$('#icon_detail .wrapper_event_reg > .event_reg').css({background : 'rgb(21,2,1)'});
			$('#icon_detail .wrapper_event_reg > .event_reg > p').css({lineHeight : '1.3'});
			
		}
		$('#icon_detail > ul > li:nth-child(n+2)').hide();
		$('#icon_menu > ul > li:first-child').css({background : 'rgba(130,13,6,1)'});
		$clickedIndex = 1;
		$clickedItem = $('#icon_menu > ul > li:first-child');
		
	}

	$('#not_reg').click(function(){
		$('#sumRegister').show();
		$('#register_module input').val('');
		$('#register_module select').val('');
		$('#login_module').animate({top : '-1500px'},300,function(){
			$('#login_module').css({display : 'none'});
			$('#register_module').css({display : 'block'});
		});
		$('#register_module').animate({left : '0px'},500,function(){
			$('#reg_back').css({display : 'block'});
		});
	});
	
	$('#reg_back').click(function(){
		$('#reg_back').css({display : 'none'});
		$('#register_module').animate({left : '300px'},100,function(){
			$(this).css({display : 'none'});
			$('#login_module').css({display : 'block'});
			$('#login_module').animate({top : '0px'},300);
			$('#register_module').css({height : '440px'});
			$('.reg_suc').siblings().show();
			$('.reg_suc').hide();
		});
	});

	$('#guest').click(function(){
		$('#wrapper_login').css({minHeight : '0px', minWidth : '0px'});
		$('#wrapper_login').slideUp(100,function(){
			if(!$.desktopStarted)
			{
				$('#wrapper1_homescreen').css({display : "table", zIndex : "15"},1000);		
				$('#wrapper1_homescreen').show(200);
				changeVisibility('#wrapper1_homescreen','show',10);
				$('#wrapper1_homescreen').animate({opacity : '1'},500);
			}
		});	
		$('#login_table tr input').each(function(){
			$(this).val('');
		});
		
	});
	
	$('#start_button').click(function(){
		if($open)
		{
			$('#wrapper_start_menu').hide(100,function(){$open = false;});
			$('#sponser_tag').animate({right : '-40px'},500);
		}
		else
		{
			$('#wrapper_start_menu').show(100,function(){$open = true;});
			$('#sponser_tag').animate({right : '0px'},500);
		}
		return false;
	});
	
	$('body').click(function(){
		$('#user > li').css({background : ''}).children('li ul').hide();
		if($event_reg)	
			$('.event_reg').trigger('click');
		if($open)
			$('#start_button').trigger('click');
	});

	$('.log_off').click(function(){openLogin();});
	$('.switch_user').click(function(){openLogin();});
	$('#swOpenLogin').click(function(){openLogin();});
	$('#swOpenRegister').click(function(){openLogin();$('#login_user1 table div p').trigger('click');});
	
	//openLogin();
	function openLogin()
	{
		$('#wrapper_start_menu').hide();
		$('#sponser_tag').animate({right : '-40px'},500);
		$('#wrapper_login').slideDown(100,function(){
			$('#wrapper_login').css({minHeight : '550px', minWidth : '950px'});
		});
		$('#login_user1').slideDown();
		$('#login_user1').css({left : '0px'});
		$('#login_user2').slideDown();
		$('#register_module').css({display : 'none', left : '300px', zIndex : '30'});
		$('#login_table tr:nth-child(n + 3)').css({display : 'none'});
		//$('#login_table tr:nth-child(2) input').attr('disabled',false);
		//if user logged in den it shouldn't happen n if notlogged in den it would be set fasle priorly
	}
	
	$('div, p, img, section').attr('draggable','false');
	
	$('#shutDown').click(function(){
		var z = confirm('Are you sure to Shutdown Advaita?');
		if(z)
		{
			hideDesktop();
			$('#move_up').css({display : 'block', cursor : 'pointer'});
			$('#wrapper_login').slideDown(100,function(){
				$('#wrapper1_startup').show(function(){
					$('#wrapper1_startup').animate({top : '0%', cursor : 'pointer', opacity : '1'},200);
					$('#wrapper_login').hide();
					$('#load').css({background : "url('./Files/img/loading_circle.gif') no-repeat center", display : 'block'});
					$('#fill').animate({width : '0px'},2000,function(){
						$('#fbLike').fadeOut(200);
						$('#power_logo').animate({height : "180px", width : "170px"},200);
						$('#wrapper3_startup').animate({height : "160px", width : "160px"},200);
						$('#power_logo').show().css({background : "url('./Files//img/blu.png') no-repeat center", cursor : 'pointer', margin : 'auto'});
						$('#clg_logo').fadeOut(200);
						$('#date').fadeOut(200);
					});
					
				});
				$('#wrapper_sponser').hide(100);
			});
		}
		else
		{
			$('#wrapper_start_menu').hide();
			$('#sponser_tag').animate({right : '-40px'},500);
		}
	});

	$('.tile_box').click(function(){
		$class = $(this).attr('class').split(' ');
		$class = $class[2];
		openDesktop();
		openMyComputer($class);
	});
	
	$('.menuStartMenu').click(function(){
		$class = $(this).attr('class').split(' ')[1];
		openMyComputer($class);
		
	});
	
	function openMyComputer($class)
	{
		if($class.indexOf('scrollTo') == 0)
		{
			$('#wrapper_mycomputer').show(200);
			$('#wrapper_mycomputer > #mycomputer > section:nth-child(n + 2)').hide();
			$class = $class.split('scrollTo')[1].split('Icon')[0].toLowerCase() + 'Tile';
			if($class)
			{
				if($id != '')
					$('.' + $id).hide();
				$id = $class;
				$('.main').hide(function(){
					$('.' + $id).slideDown(500);
				});
			}
		}
		else if($class.indexOf('goto') == 0)
		{
			$class = $class.split('goto')[1];
			if($class == 'Sponser')
			{
				openSponser();
				hideDesktop();
			}
			else if($class == 'Gamex')
			{
				$('#wrapper_mycomputer').show(200);
				$('.gamexTile').slideDown(500);
			}
		}
		else if($class.indexOf('open') == 0)
		{
			$class = $class.split('Icon')[0];
			$('#wrapper_mycomputer').show(200);
			$('#wrapper_mycomputer > #mycomputer > section:nth-child(n + 2)').hide();
			openIconWindow($class);
			registerIconWindow();
		}
	}
	function registerIconWindow()
	{
		$('#icon_menu > ul > li').click(function(){
			$sl = $(this).index() + 1;
			if($clickedItem == '')
			{
				$(this).css({background : 'rgba(130,13,6,1)'});
				$('#icon_detail').animate({right : '-100px'},0,function(){
					$('#icon_detail > ul > li:nth-child(' + $sl + ')').show(0);
					$('#icon_detail').animate({right : '0px'},100);
				});
				$clickedItem = this;
				$clickedIndex = $sl;
			}
			else if($clickedItem != this)
			{
				$($clickedItem).css({background : ''});
				$(this).css({background : 'rgba(130,13,6,1)'});
				$('#icon_detail > ul > li:nth-child(' + $clickedIndex + ')').hide(0);
				$('#icon_detail').animate({right : '-100px'},0,function(){
					$('#icon_detail > ul > li:nth-child(' + $sl + ')').show(0);
					$('#icon_detail').animate({right : '0px'},100);
				});
				
				$clickedIndex = $sl;
				$clickedItem = this;
			}
		});	
	}
	
	$('.backGallery').click(function(){
		$('#wrapper3_homescreen').animate({top : '0%'},200);
		$(this).css({top : '0%'});
	});

	//openIconWindow('openArbalete');
	$id = '';
	$('.drive').click(function(){
		$class = $(this).attr('class').split('open')[1];
		if($class)
		{
			openIconWindow('open'+$class);
			$('#icon_menu > ul > li').click(function(){
				$sl = $(this).index() + 1;
				if($clickedItem == '')
				{
					$(this).css({background : 'rgba(130,13,6,1)'});
					$('#icon_detail').animate({right : '-100px'},0,function(){
						$('#icon_detail > ul > li:nth-child(' + $sl + ')').show(0);
						$('#icon_detail').animate({right : '0px'},100);
					});
					$clickedItem = this;
					$clickedIndex = $sl;
				}
				else if($clickedItem != this)
				{
					$($clickedItem).css({background : ''});
					$(this).css({background : 'rgba(130,13,6,1)'});
					$('#icon_detail > ul > li:nth-child(' + $clickedIndex + ')').hide(0);
					$('#icon_detail').animate({right : '-100px'},0,function(){
						$('#icon_detail > ul > li:nth-child(' + $sl + ')').show(0);
						$('#icon_detail').animate({right : '0px'},100);
					});
					
					$clickedIndex = $sl;
					$clickedItem = this;
				}
			});
			return;
			
		}
		else if($(this).attr('id'))
		{
			$id = $(this).attr('id');
			$('.' + $id).parent().children().hide();
			$('.main').hide(function(){$('.' + $id).slideDown(500);});
		}
	});
	$('#wrapper_mycomputer > #back').click(function(){back();})
	function back()
	{
		$('.' + $id).slideUp(500,function(){$('.main').show();});
	}

	$('#wrapper_mycomputer > #close').click(function(){
		$('#wrapper_mycomputer').hide();
	});
	
	$('.tile_box').draggable({
		stop: function(event, ui) {
        $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
		}
	});
	
	var formData = window.location.search;
	formData = formData.split('?')[1];
	if($event.indexOf(formData) > -1 || $eventNoRegister.indexOf(formData) > -1)
		openEventDirect(formData);
	else if(formData == 'Register')	
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
		$('#not_reg').trigger('click');
	}
	else if(formData == 'Desktop')
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
		$('#guest').trigger('click');
		openDesktop();
	}
	else if(formData == 'Home')
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
		$('#guest').trigger('click');
	}
	else if(formData == 'Sponsors')
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
		$('#guest').trigger('click');
		openSponser();
	}
	else if(formData == 'Login')
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
	}
	
	function openEventDirect(name)
	{
		up();
		changeVisibility('#wrapper1_startup','hide',10);
		$('#guest').trigger('click');
		openDesktop();
		openIconWindow('open' + name);
		registerIconWindow();
	}
	$audio[1] = new Audio('./Files/2.ogg');
	$audio[2] = new Audio('./Files/3.ogg');
	
});
