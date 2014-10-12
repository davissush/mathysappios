window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);


var slider = new PageSlider($("#container"));
$(window).on('hashchange', route);

var slider = new PageSlider($("#container"));
var spinner = $("#spinner");

spinner.hide();

$('.goback').entwine({
        onclick: function(e){
	e.preventDefault();
	parent.history.back();
     }
});

function showMessage(message, title) {
        if (navigator.notification) {
                navigator.notification.alert(message, null, title, 'OK');
        } else {
                alert(title ? (title + ": " + message) : message);
        }
}


function route(event) {
var page,
    hash = window.location.hash;

                        var searchpage = hash.substring(1);

                        //var remotehost = 'http://mathyscms.edith.techrus.co.nz'
                        var remotehost = 'http://mathyscms.edith.techrus.co.nz/'

                        $('.debug').html(hash);

                        showMessage(hash,'Top');

                        if(!searchpage.trim()){
                                spinner.hide();
                                spinner.show();
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
                        } else {
                                window.alert(hash);
                                if(searchpage.substring(0,4) == 'page'){
                                        $pageid=searchpage.substring(5);
                                        spinner.hide();
                                        spinner.show();
                                        $.ajax({
                                                type: 'GET',
                                                url: remotehost + '/mathys_api/get_subcategory_page/?pageid='+$pageid,
                                                jsonp: "callback",
                                                dataType: "jsonp",
                                                complete: function(){
                                                },
                                                success: function(data){
                                                        spinner.hide();
                                                        slider.slidePage($(data));
                                                }
                                        });
                                } else {
                                        $pageid=searchpage.substring(5);
                                        spinner.hide();
                                        spinner.show();
                                        $.ajax({
                                                type: 'GET',
                                                url: remotehost + '/mathys_api/get_media_page/?pageid='+$pageid,
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
                        }

}

route();

