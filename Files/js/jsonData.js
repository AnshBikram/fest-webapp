/**
Developed By @AnshBikram
*/
//var urlStart = 'http://localhost:8081/perfectEvent/';
var urlStart = 'http://54.209.145.90:8080/perfectEvent/';
$fbuserSession = '';
$advuserSession = 'Guest';
$loggedIn = false;
$userEmailSession = '';
$appId = '';
$userId = '';
$id = 1;
$advusernameSession = '';
$session = '';
$counter = '';
$accessToken = '';
$eventNoRegister = ['MUN','Contact','About_Us','Salsa','Archery','Rosei','Funstudio','Acropolis','Ultimate_Literatti','TUSK','Slowcycle','Youtube','More_Games','Street_X','Youtube','Registrations','Super_6','Tug_of_War'];
$event = ['Codeenigma','CSI','Dejavu','GoogleBuster','Botsumo','Hovorun','Interroger','Pathseeker','Piratewarz','SEO','Simulab','Switchcoding','Technova','Xtermination','Appfest','Arbalete','Blueprint','Butsumo',' ',' ','Broadway','Footloose','Lamode','Rockathon','Soprano','Bollyquiz','Acoustica','Picasso','Accommodation','Counter_Strike_1-6','NFS_Most_Wanted','Fifa_11','Dota_2-0','Paper_Presentation'];
$registeredEvent = [];

function putEventToStickyNote()
{
	var sticky = $('#wrapper_stickynote #body');
	if(!$loggedIn)
	{
		sticky.html('<div><p>Please, login to see your registered events.</p></div>');
		return;
	}
	else
	{
		sticky.html('');//resetting existing datas.
		$.each($registeredEvent,function(){
			var htm = '<div title="' + $event[this - 1] + '">\n<p>' + $event[this - 1] + '</p>';
			sticky.append(htm);
		});
	}
}

	function getEventRegisterArray()
	{
		var url = urlStart + 'Servlet/controllerGetEventRegistered';
		var posting = $.post(url, {responseType : 'json', appId : 1, userId : $userId});
		posting.done(function(data){
			if(data.response == 'success')
			{
				$registeredEvent = data.responseString.split(' ');
				$registeredEvent = $registeredEvent.filter( function( item, index, inputArray ) {
					return inputArray.indexOf(item) == index;
				});
				putEventRegisterArray();
				putEventToStickyNote();
			}
			else
				resetEventRegister();
			
		});
	}
	
	function resetEventRegister()
	{
		$('#info').children().each(function(){
			$(this).attr('title','true false');
		});
		$.each($eventNoRegister, function(){
			$('#event_' + this).attr('title','false');
		}); 
	}
	function putEventRegisterArray()
	{
		$.each($registeredEvent,function(){
			var tmp = $event[this - 1];
			var obj = $('#event_' + tmp);
			obj.attr('title','true true');
		});
	}

	

$(document).ready(function(){

	

	putEventToStickyNote();
		
	$('#sw_counter').hide(0);
	$('#close_sw_counter').click(function(){
		$('#sw_counter').hide(200);
	});

	
	$('.refresh_forum').click(function(){
		getDataForForumTopic();
		$('.forum').animate({scrollTop : '0px'},500);
	});

	// $('.desktopIcon').click(function(){
		// checkSessionUser();
	// });
	
	getDataForForumTopic();
	$updateTimer = setInterval(function(){getDataForForumTopic();},180000);
	
	function getDataForForumTopic()
	{
		$('.refresh_forum').hide();
		$('.loading_forum').show();
		var url = urlStart + 'Servlet/controllerGetDiscussionTopic';
		var posting = $.get( url, { appId:'1', responseType : 'json' } );
		posting.done(function(data){
		var link = '';
		var pic = './Files/img/guestLarge.png';
		if($loggedIn)
		{
			pic = 'http://graph.facebook.com/' + $fbuserSession + '/picture?width=80&height=80';
			link = 'http://www.facebook.com/' + $fbuserSession
		}
		var txt = '<li><div class="acc">' +
					'<a href="' + link + '" target="_blank" onclick="return false">' +
					'<img class="pic" style="height:80px;width:80px;border-radius:40px;" src="' + pic + '"  alt="" />' +
					'<p class="author">' + $advuserSession + '</p></a></div><div>' +
					'<textarea class="postingText" placeholder="Say Hello to your friendz!!!">' +
					'</textarea><input class="post" type="submit" value="Express" />' +
					'<p class="post_message"></p></div></li>';
		$('.forum > ul').html(txt);			
		
			$(data.responseString).each(function(){
				insertTopic(this.fbUserName,this.name,this.discussionId,this.topicSummary,this.updatedDateTime);
			});
			$('.loading_forum').hide();
			$('.refresh_forum').show();
		});
	}
	
	function format(dt)
	{
		var date = dt.split(' ')[0];
		var time = dt.split(' ')[1];
		var year = date.split('-')[0];
		var mon = date.split('-')[1];
		var day = date.split('-')[2];
		var hr = time.split(':')[0];
		var mn = time.split(':')[1];
		mn = hr < 12 ? mn + ' AM': mn + ' PM';
		hr -= 12;
		date = hr+':'+mn+' '+day+'.'+mon+'.'+year;
		switch(mon)
		{
			case '01' : return day+' Jan '+year+' '+hr+':'+mn;
			case '02' : return day+' Feb '+year+' '+hr+':'+mn;
			case '03' : return day+' Mar '+year+' '+hr+':'+mn;
			case '04' : return day+' Apr '+year+' '+hr+':'+mn;
			case '05' : return day+' May '+year+' '+hr+':'+mn;
			case '06' : return day+' Jun '+year+' '+hr+':'+mn;
			case '07' : return day+' Jul '+year+' '+hr+':'+mn;
			case '08' : return day+' Aug '+year+' '+hr+':'+mn;
			case '09' : return day+' Sep '+year+' '+hr+':'+mn;
			case '10' : return day+' Oct '+year+' '+hr+':'+mn;
			case '11' : return day+' Nov '+year+' '+hr+':'+mn;
			case '12' : return day+' Dec '+year+' '+hr+':'+mn;
			default : return date
		}
	}
	
	function insertTopic(fbname,name,id,data,time)
	{
		var pic = './Files/img/guestSmall.png';
		var link = '';
		if($loggedIn)
		{
			pic = 'http://graph.facebook.com/' + $fbuserSession + '/picture?width=20&height=20';
			link = 'http://www.facebook.com/' + $fbuserSession
		}
	
		var html = '<li id="' + id + '"><div class="acc"><a href="http://www.facebook.com/' + fbname + 
				'" target="_blank" onclick="return false">' +
				'<img class="pic" src="http://graph.facebook.com/' + fbname + '/picture?width=50&height=50" alt="" />' +
				'<p class="author">' + name + '</p></a></div>' +
				'<div class="content"><p class="text">' + data + 
				'</p><p class="time">Last Updated  ' + format(time) + '</p> ' + 
				'<ul class="comments"><li class="more">\' \' \'</li>' +
				'<li><div class="cmntPic">' +
				'<a href="' + link + '" target="_blank" onclick="return false">' +
				'<img class="amntPic" src="' + pic + '" alt="" />' +
				'</a></div>' +
				'<input class="givecmnt" type="text" placeholder="Put on your views" />' +
				'<input class="givecmntSub" type="submit" value="Comment" /></li></ul>' +
				'</div></li>';
		$('.forum > ul').append(html);
		// $('.givecmnt').focus(function(){
			// clearTimeout($updateTimer);
		// });
		// $('.givecmnt').focusout(function(){
			// $updateTimer = setInterval(function(){getDataForForumTopic();},60000);
		// });
		// $('.postingText').focus(function(){
			// clearTimeout($updateTimer);
		// });
		// $('.postingText').focusout(function(){
			// $updateTimer = setInterval(function(){getDataForForumTopic();},60000);
		// });
						
		
		$( ".post" ).click(function(){
			var text = $('.postingText').val();
			if(text == '')
				exit(0);
			if(!$loggedIn)
			{
				$('.forum').animate({scrollTop : '0'},200);
				$('.postingText').val('');
				$('.post_message').stop();
				$('.post_message').fadeIn(200).text('You are not Loged in. Please log in to continue').fadeOut(5000);
				exit(0);
			}
			else if($loggedIn)
			{
				$('.loading_forum').show();
				$('.refresh_forum').hide();

				$time = Date();
				$time = $time.split(' ');
				$time = $time[2]+' '+$time[1]+' '+$time[3]+' '+$time[4];
				$('.postingText').val('');
				var url = urlStart + 'Servlet/controllerUploadDiscussionTopic';
				var posting = $.post( url, { appId:'1',name: $advuserSession, email:$userEmailSession, fbUserName:$fbuserSession, topicTitle:'Advaita', topicSummary:text, responseType : 'json', accessToken : $accessToken} );
				posting.done(function( data ){
					if (data.response === 'success')
					{
						$('.post_message').text('Your Post was updated sucessfully');
						$('.post_message').animate({opacity : '1'},function(){
							$('.post_message').animate({opacity : '0'},5000);
						});//alert(data.topicId);
						var html = '<li id="' + data.topicId + '"><div class="acc"><a href="http://www.facebook.com/' + $fbuserSession + '" target="_blank">' +
								'<img class="pic" src="http://graph.facebook.com/' + $fbuserSession + '/picture?width=50&height=50" alt="" />' +
								'<p class="author">' + $advuserSession + '</p></a></div>' +
								'<div class="content"><p class="text">' + text + 
								'</p><p class="time">Last Updated  ' + $time + '</p> ' + 
								'<ul class="comments"><li class="more">\' \' \'</li>' +
								'<li><div class="cmntPic">' +
								'<a href="http://www.facebook.com/' + $fbuserSession + '" target="_blank">' +
								'<img class="amntPic" src="http://graph.facebook.com/' + $fbuserSession + '/picture?width=20&height=20" alt="" />' +
								'</a></div>' +
								'<input class="givecmnt" type="text" placeholder="Put on your views" />' +
								'<input class="givecmntSub" type="submit" value="Comment" /></li></ul>' +
								'</div></li>';
							$('.forum > ul > li:first-child').after(html);
					}
					else if(data.responseString == "Session expired")
					{
						killSession();
					}
					else
					{
						$('.post_message').text('Error in connection. Try again later!!!');
						$('.post_message').animate({opacity : '1'},function(){
							$('.post_message').animate({opacity : '0'},5000);
						});
					}
					$('.loading_forum').hide();
					$('.refresh_forum').show();

				});
				
				exit(0);
			}
		});
		
		$('.givecmntSub').click(function(ev){
			ev.preventDefault();
			var data = $(this).parent().children('input[type="text"]').val();
			var id = $(this).parent().parent().parent().parent().attr('id');
			//alert(data+' '+id+' '+$(this).parent().children('input[type="text"]'));

			if(!$loggedIn)
			{
				$('.forum').animate({scrollTop : '0'},200);
				$(this).parent().children('input[type="text"]').val('')
				$('.post_message').finish();
				$('.post_message').fadeIn(200).text('You are not Loged in. Please log in to continue').fadeOut(5000);
				exit(0);
			}
			else if(data != '' && data != ' ')
			{
				sendForumComment(data, id, $(this).parent().children('input[type="text"]'));
				
			}
			exit(0);
		});
		
		$('.more').click(function(){
			$x = $(this);
			var id = $(this).parent().parent().parent().attr('id');
			getDataForForumComment(id,$x.next());
			$x.hide();
			exit(0);
		});

	}

	function getDataForForumComment(dissId,obj)
	{			//alert($(obj).html());

		var url = urlStart + 'Servlet/controllerGetDiscussionComment';
		var posting = $.get( url, { appId:'1',topicId : dissId, responseType : 'json'} );
		$comments = '';
		posting.done(function(data){
			$(data.responseString).each(function(){
			
				$comments += '<li title="' + this.name + '" id="' + this.commentId + '"><div class="cmntPic">' +
						'<a href="http://www.facebook.com/' + this.fbUserName + '" target="_blank">' +
						'<img class="amntPic" src="http://graph.facebook.com/' + this.fbUserName + 
						'/picture?width=20&height=20" alt=""/>' +
						'</a></div><p>' + this.message + '</p></li>'; 
			});
			$(obj).before($comments);
			$x.siblings().slideDown(300);
		});	
	}
	
	function sendForumComment(data, id, elem)
	{
		if($loggedIn)
		{
			$('.loading_forum').show();
			$('.refresh_forum').hide();
			var text = data;
			elem.val('');
			//elem.parent().before($html);
			var url = urlStart + 'Servlet/controllerUploadDiscussionComment';
			var posting = $.post( url, { appId:'1',topicId : id, responseType : 'json',
				fbUserName : $fbuserSession, name : $advuserSession, email : $userEmailSession,
				message : data, accessToken : $accessToken} );
			posting.done(function(data){
				if(data.response == 'success')
				{
					var html = '<li style="display:block" id="' + id + '"><div class="cmntPic">' +
							'<a href="http://www.facebook.com/' + $fbuserSession + '" target="_blank">' +
							'<img class="amntPic" src="http://graph.facebook.com/' + $fbuserSession + 
							'/picture?width=20&height=20" alt=""/>' +
							'</a></div><p>' + text + '</p></li>';
					elem.parent().parent().children(':first-child').after(html);
				}
				else if(data.responseString == 'Session expired')
				{
					killSession();
				}
				else
				{
					$('.forum').animate({scrollTop : '0'},200);
					$('.post_message').finish();
					$('.post_message').fadeIn(100).text('Error occured, while posting the message. Please try again later').fadeOut(5000);
				}
				$('.loading_forum').hide();
				$('.refresh_forum').show();
			});
		}
		else
			exit(0);
	}
	
	
	$('#sumRegister').click(function(ev){
		//ev.preventDefault();
		validate();
	});
	
	function validate()
	{
		//$('#wrapper_login').css({cursor : 'wait'});
		var value = true;
		var name = $('#reg_name');
		var year = $('#reg_year');
		var branch = $('#reg_branch');
		var college = $('#reg_college');
		var fbUser = $('#reg_fbUser');
		var RfbUser = $('#reg_RfbUser');
		var advUser = $('#reg_advUser');
		var passwd = $('#reg_passwd');
		var Rpasswd = $('#reg_Rpasswd');
		var email = $('#reg_email');
		var contact = $('#reg_contact');
		if(name.val() == '' || name.val().indexOf(' ') == 0)
		{
			name.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			name.parent().next().children('span').css({display : 'none'});
		if(year.val() == 'Select Year')
		{
			year.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			year.parent().next().children('span').css({display : 'none'});
		if(branch.val() == 'Select your Branch')
		{
			branch.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			branch.parent().next().children('span').css({display : 'none'});
		if(college.val() == '' || college.val().indexOf(' ') == 0)
		{
			college.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			college.parent().next().children('span').css({display : 'none'});
		if(fbUser.val() == '')
		{
			fbUser.parent().next().children('span').css({display : 'block'});
			value = false;
		}
			
		else
			fbUser.parent().next().children('span').css({display : 'none'});
		if(fbUser.val() != '' && fbUser.val() != RfbUser.val())
		{
			RfbUser.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			RfbUser.parent().next().children('span').css({display : 'none'});
		if(advUser.val() == '' || advUser.val().indexOf(' ') == 0)
		{
			advUser.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			advUser.parent().next().children('span').css({display : 'none'});
		if(passwd.val() == '')
		{
			passwd.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			passwd.parent().next().children('span').css({display : 'none'});
		if(passwd.val() != '' && passwd.val() != Rpasswd.val())
		{
			Rpasswd.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			Rpasswd.parent().next().children('span').css({display : 'none'});
		if(email.val() == '')
		{
			email.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			email.parent().next().children('span').css({display : 'none'});
		if(contact.val() == '')
		{
			contact.parent().next().children('span').css({display : 'block'});
			value = false;
		}
		else
			contact.parent().next().children('span').css({display : 'none'});
		
		if(value)
		{
			$('#sumRegister').hide();
			var url = urlStart + 'Servlet/controllerGeneralRegistration';
			var posting = $.post( url, { appId:'1', name : name.val(), responseType : 'json', email : email.val(),
							year : year.val().charAt(0), branch : branch.val(), college : college.val(), fbUserName : fbUser.val(), userName : advUser.val(),
							password : passwd.val(), mobileNo : contact.val(), registrationFrom : 'computer', feeReceived : 0,
							mobileOs : '0', mobileImei : '0', mobileSim : '0', deviceId : '0'});
			posting.done(function(data){
				$('#sumRegister').hide();
				if(data.response == 'success')
				{
					$('.reg_suc').show().html(data.responseString);
					$('.reg_suc').siblings().hide(200,function(){
						$('#reg_back').show();
						$('#register_module').css({height : 'auto'});
					});
				}
				else
				{
					$('.reg_suc').show().html('Registration unsuccessful. The username and the email is already registered.');
					$('.reg_suc').siblings().hide(200,function(){
						$('#reg_back').show();
						$('#register_module').css({height : 'auto'});
					});
				}
			});

		}
			
			
	}
	
	
		$('#AUsername').keypress(function(ev){
		if(ev.keyCode == 13 && $(this).val().indexOf(' ') != 0 && $(this).val() != '')
		{
			$(this).attr('disabled',true);
			getFbUserName($(this).val());
		}
		else if(ev.keyCode == 13)
		{
			var a = $('#uname_sub');
			a.animate({marginLeft : '0px'},50,function(){
				$(this).animate({marginLeft : '20px'},70,function(){
					$(this).animate({marginLeft : '0px'},100,function(){
						$(this).animate({marginLeft : '10px'},100);
					});
				});
			});
		}
	});

	
	
	
	$('#uname_sub').click(function(){
		if($('#AUsername').val() != '' && $('#AUsername').val().indexOf(' ') != 0)
		{
			$(this).attr('disabled',true);
			getFbUserName($('#AUsername').val());
		}
		else if($('#AUsername').val() == '' || $('#AUsername').val().indexOf(' ') == 0)
		{
			var a = $(this);
			a.animate({marginLeft : '0px'},50,function(){
				$(this).animate({marginLeft : '20px'},70,function(){
					$(this).animate({marginLeft : '0px'},100,function(){
						$(this).animate({marginLeft : '10px'},100);
					});
				});
			});
		}
	});
	
	function getFbUserName(text)
	{
		var url = urlStart + 'Servlet/controllerGetFbUserName';
		var posting = $.post(url , {userName : text, responseType : 'json'});
		
		posting.done(function(data){
			if(data.response == 'success')
			{
				var fb = 'http://graph.facebook.com/'  + data.fbUserName + '/picture?width=150&height=150';
				$('#user1_pic').attr('src',fb);
				loginUser();
				//getDataForForumTopic();
			}
			else
			{
				$('#AUsername').attr('disabled',false);
				$('#login_response1').finish();
				$('#login_response1').fadeIn(100).html('Oops!You are not registered yet.').fadeOut(3000);
			}
				
		});
		$('#AUsername').attr('disabled',false);
	}
	
	function loginUser(){
		$('#login_user2').slideUp(100,function(){
			$('#AUsername').attr('disabled',true);
			$('#AUsername').css({fontSize : '200%', 
				textAlign : 'center', background : 'none', boxShadow : 'none'});
			$('#not_reg').hide();
			$('#uname_sub').hide();
			$('#passwd').show();
			$('#login_back').css({display : 'block'});
			$('#login_user1').animate({marginLeft : '25%'},100);
			$('#login_passwd').val('');
			$('#login_passwd').focus();
		});
	}

	
	$('#passwd_sub').click(function(){
		signIn();
	});
	
	$('#login_passwd').keypress(function(ev){
		if(ev.keyCode == 13 && $(this).val() != '' && $(this).val().indexOf(' ') != 0 )
		{
			signIn();
			
		}
	});

	function signIn()
	{
		var uname = $('#AUsername').val();
		var passwd = $('#login_passwd').val();
		var url = urlStart + 'Servlet/LoginServlet';
		var posting = $.post(url, {userName : uname, password : passwd, responseType : 'json'});
		posting.done(function(data){//alert(data.currentSessionName+' '+data.curentSessionUserName);
			if(data.response == 'success')
			{
				$userEmailSession = data.currentSessionUserEmail;
				$advuserSession = data.currentSessionName;
				$fbuserSession = data.currentSessionFbUserName;
				$advusernameSession = data.curentSessionUserName;
				$accessToken = data.accessToken;
				$loggedIn = true;
				clearTimeout(sw_counter);
				$('#sw_counter').fadeOut(500);
				//startTimer();				
				$appId = data.currentSessionAppId;
				$userId = data.currentSessionUserId;//alert($advuserSession+' '+$fbuserSession);
				getEventRegisterArray()
				setCurrentSession($advuserSession, $fbuserSession, $loggedIn);
				getDataForForumTopic();
				exit(0);
			}
			else
			{
				$('#login_response2').fadeIn(100).html('Password maybe incorrect or you may not have validated your email!!!').fadeOut(5000);
				exit(0);
			}
			exit(0);
		});
	}
	
	function startTimer()
	{
		$session = setInterval(function(){
			var cur = 120;
			$('#sessionCheck').fadeIn(1000);
			$counter = setInterval(function(){
				if(cur > 0) $('#var').html(cur + '<sub>sec</sub>');
				else {
					clearTimeout($session);		
					$fbuserSession = '';
					$advuserSession = 'Guest';
					$loggedIn = false;
					$userEmailSession = '';
					$appId = '';
					$userId = '';
					resetEventRegister();
					putEventToStickyNote();
					$registeredEvent = [];
					$id = 1;
					$advusernameSession = '';
					$counter = '';
					$accessToken = '';
					sw_counter = setInterval(function(){$('#sw_counter').show(300);},10000);
					setCurrentSession('Guest','',$loggedIn);
					$('#user1_pic').attr('src','./Files/img/guestLarge.png');
					//$('#login_table tr p').show();
					$('#AUsername').css({fontSize : '100%', 
						textAlign : 'left', background : 'rgba(200,200,200,0.1)', boxShadow : 'none'});
					} cur--;
			},1000);
		},27900);
	}
	
	$('#ok').click(function(){
		clearTimeout($counter);
		getDataForForumTopic();
		$('#sessionCheck').fadeOut(1000);
	});	
	
	$('#cancel').click(function(){
		$('#sessionCheck').fadeOut(1000);
		//setCurrentSession('Guest', '', false);
	});
	
	function setCurrentSession(name, fbname, flag)
	{
		$fbuserSession = fbname;
		$advuserSession = name;
		var picLar = './Files/img/guestLarge.png';
		var picSml = './Files/img/guestSmall.png';
		var link = '';
		if(flag)
		{
			picLar = 'http://graph.facebook.com/' + $fbuserSession + '/picture?width=110&height=110';
			picSml = 'http://graph.facebook.com/' + $fbuserSession + '/picture?width=55&height=55';
			link = 'http://www.facebook.com/' + $fbuserSession;
		}
		
		$('.forum > ul > li:first-child > .acc img').attr('src',picLar);
		$('.forum > ul > li:first-child > .acc a').attr('href',link);
		$('#user > li > img').attr('src',picSml);
		$('#user > li > img').attr('title',name);
		$('#session_uname').text(name);
		$('.author').html('Guest');
		$('#user_pic1').attr('src',picLar);
		$('#not_reg').show();
		$('#user_pic1').attr('title',name);
		$('#wrapper_login').css({minHeight : '0px', minWidth : '0px'});
		$('#login_user1').css({marginLeft : '0%'},10);
		$('#login_user2').slideDown(10);
		//$('#AUsername').val($advusernameSession);not needed coz already required name is entered by user from prev window.
		$('#login_back').hide();
		
		$('#wrapper_login').slideUp(100,function(){
			$('#wrapper1_homescreen').css({display : "table", zIndex : "15"},1000);		
			$('#wrapper1_homescreen').fadeIn(200);
		});	
		$('#passwd').hide();
		$('#uname_sub').show();
	}
	
	$('#guest').click(function(){
		$loggedIn = false;
		$fbuserSession = '';
		$advuserSession = 'Guest';
		$userEmailSession = '';
		$appId = '';
		$userId = '';
		$id = 1;
		$advusernameSession = '';
		$counter = '';
		$accessToken = '';
		resetEventRegister();
		putEventToStickyNote();
		$registeredEvent = [];
		sw_counter = setInterval(function(){$('#sw_counter').show(300);},10000);
		setCurrentSession('Guest','',$loggedIn);
		$('#user1_pic').attr('src','./Files/img/guestLarge.png');
		//$('#login_table tr p').show();
		$('#AUsername').css({fontSize : '100%', 
			textAlign : 'left', background : 'rgba(200,200,200,0.1)', boxShadow : 'none'});
		$('#login_table tr:nth-child(2) input').attr('disabled',false);

	});
	
	
	$('#login_back').click(function(){
		$('#login_user1').animate({marginLeft : '0%'},100,function(){
			if(!$loggedIn)
			{
				$('#user1_pic').attr('src','./Files/img/guestLarge.png');
				$('#login_user1 input').val('');
			}
			$('#login_user2').slideDown(100);
		});
		$('#login_table tr img').show();
		$(this).hide();
		$('#passwd').hide();
		$('#not_reg').show();
		if(!$loggedIn)
		{
			$('#login_table tr:nth-child(2) input').css({fontSize : '100%', 
				textAlign : 'left', background : 'rgba(200,200,200,0.1)', boxShadow : 'none'});
			$('#AUsername').attr('disabled',false);
		}
	});

	
	function killSession()
	{
		$loggedIn = false;
		setCurrentSession('Guest','',$loggedIn);
		sw_counter = setInterval(function(){$('#sw_counter').show(300);},10000);

	}
});