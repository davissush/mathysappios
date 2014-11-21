window.addEventListener('load', function () {
        new FastClick(document.body);
}, false);

var slider = new PageSlider($("#container"));
//var remotehost = 'http://mathyscms.edith.techrus.co.nz/'
//var remotehost = 'http://mathys.cms'
var remotehost = 'http://rmsurgeon.com/';
var spinner = $("#spinner");

spinner.hide();

$(window).on('hashchange', route);

$('.goback').entwine({
        onclick: function(e){
                e.preventDefault();
                parent.history.back();
        }
});

document.addEventListener("online", onOnline, false);

function onOnline() {
        if(checkConnection() == Connection.NONE){
                alert('No internet connection.');
                spinner.hide();
        } else if(checkConnection() == Connection.UNKNOWN) {
                alert('No internet connection.');
                spinner.hide();
        } else {
                alert('You are connected via: ' + checkConnection());
        }
}

function checkConnection() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        return networkState;
}

function renderhomepage(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get-main-categories',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        if(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        } else {
                                renderhomepage2();
                        }
                }
        });
}

function renderhomepage2(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get-main-categories',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                }
        });
}

function rendercategorypage(pageid){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_subcategory_page/?pageid='+pageid,
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        if(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        } else {
                                renderhomepage2();
                        }
                },
                error:function(xhr,status,error){
                        alert(error);
                }
        });
}

function rendermediapage(pageid){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_media_page/?pageid='+pageid,
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        if(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        } else {
                                renderhomepage2();
                        }
                },
                error:function(xhr,status,error){
                        alert(error);
                }
        });
}

function renderRegistrationForm(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_registration_form',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        if(data){
                                spinner.hide();
                                slider.slidePage($(data));
                        } else {
                                spinner.hide();
                        }
                },
                error:function(xhr,status,error){
                        alert(error);
                }
        });
}

function renderIntroPage(){
        $.ajax({
                type: 'GET',
                url: remotehost + '/mathys_api/get_intro_page',
                jsonp: "callback",
                dataType: "jsonp",
                complete: function(){
                },
                success: function(data){
                        spinner.hide();
                        slider.slidePage($(data));
                },
                error:function(xhr,status,error){
                        alert(error);
                }
        });
}

// Basic page routing
function route(event) {
        var hash = window.location.hash;

        var searchpage = hash.substring(1);

        spinner.hide();
        spinner.show();
        if(!searchpage.trim()){

                window.localStorage.removeItem('isregistered');

                if(window.localStorage.getItem("isregistered")){
                        renderhomepage();
                } else {
                        renderIntroPage();
                }

        } else {
                pageid=searchpage.substring(5);
                if(searchpage.substring(0,4) == 'page'){
                        rendercategorypage(pageid);
                } else {
                        rendermediapage(pageid);
                }
        }
}

route();

(function($) {

        var IsLoading = false;

        $('mathys').entwine(function($){

                $('*').entwine({
                        showAlert: function (message, title) {
                                if (navigator.notification) {
                                        navigator.notification.alert(message, null, title, 'OK');
                                } else {
                                        alert(title ? (title + ": " + message) : message);
                                }
                        }
                });

                $("input[name='Name']").entwine({
                        onclick: function(){

                        }
                });

//                $("input[type='text']").entwine({
//                        onfocusin: function(){
//                                var height = $(window).height();
//                                $('.bar-tab').hide();
//                        },
//                        onfocusout: function(){
//                                $('.bar-tab').show();
//                        }
//                });

                $("#TermsAndCondition").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });

                $("#CloseModal").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });

                var bodyheight = 0;

                $(".TOCCheckLabel").entwine({
                        onadd: function(){
                                bodyheight = $(window).height();
                        },
                        onclick: function(){
                                this.closest('.TOCCheck').find('.checkbox').trigger('click');
                                $('body').height(bodyheight);
                        }
                });



                $("#SumbitRegForm").entwine({
                        onclick: function(e){
                                e.preventDefault();
                                self = this;

                                var emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
                                var emailInput = $("input[name='Email']").val();

                                if(IsLoading) return;
                                IsLoading = true;

                                if($("input[name='Name']").val() == ''){
                                        self.showAlert('Please enter name.', 'Message');
                                        IsLoading = false;
                                        return;
                                }

                                if(emailRegex.test(emailInput)){
                                }else {
                                        self.showAlert('Please enter a valid email.', 'Message');
                                        IsLoading = false;
                                        return;
                                }

                                if($("input[name='Institution']").val() == ''){
                                        self.showAlert('Please enter Hospital/Institution.', 'Message');
                                        IsLoading = false;
                                        return;
                                }


                                if($('#IAgree').prop('checked')){
                                } else {
                                        self.showAlert('Please click T&C.', 'Message');
                                        IsLoading = false;
                                        return;
                                }

                                spinner.hide();
                                spinner.show();

                                $.ajax({
                                        url: remotehost + "/mathys_api/get_registration",
                                        type: 'POST',
                                        crossDomain: true,
                                        data: $('#RegistrationForm').serialize(),
                                        dataType: "html",
                                        success:function(data){
                                                $dataObj = JSON.stringify(data);

                                                console.log('tesat');
                                                window.localStorage.setItem("isregistered", "true");
                                                IsLoading = false;

                                                renderhomepage();
                                        },
                                        error:function(xhr,status,error){
                                                alert(error);
                                        }
                                });
                        }

                });

                $("#EnterApp").entwine({
                        onclick: function(e){
                                e.preventDefault();

                                spinner.hide();
                                spinner.show();
                                renderRegistrationForm();
                        }
                });


                $("#VideoPlay").entwine({
                        onclick: function(e){
                                e.preventDefault();

                                var videofile = $(this).data("videouri");

                                console.log(videofile);
                                VideoPlayer.play(videofile);
                        }
                });

                $(".ignore-link").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });


                $(".sharelink").entwine({
                        onclick: function(e){
                                e.preventDefault();
                        }
                });

                $('.iFrameWrapper').entwine({
                        onadd: function(){
                                var pdfsrc = this.data('iframeurl');

                                window.plugins.ChildBrowser.showWebPage(pdfsrc,
                                        { showLocationBar: true });
                        }
                })

                $('.iFrameWrapper .btn-outlined').entwine({
                        onclick: function(){
                                var pdfsrc = this.closest('.iFrameWrapper').data('iframeurl');

                                window.plugins.ChildBrowser.showWebPage(pdfsrc,
                                        { showLocationBar: true });
                        }
                })
        });

})(jQuery);