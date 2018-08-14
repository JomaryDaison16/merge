var routes = [
  {
    path: '/',
    url: 'index.html',
    on:{
        pageInit: function (e, page) {
          books();
        }
    }
  },
  {
    path: '/signup/',
    url: './pages/signup.html',
    on:{
        pageInit: function (e, page) {
          login_screen.close();
        },
        pageBeforeRemove: function (e, page){
          login_screen.open();
        },
    }
  },
  {
    path: '/userprof/',
    url: './pages/profile.html',
    on:{
        pageInit: function(e, page){
          var username = localStorage.getItem('username');
          var tokens = localStorage.getItem('token');
          app.request({
          url: 'https://desolate-basin-69053.herokuapp.com/user/info/'+username ,
          type: "GET",
          contentType: 'application/json; charset=utf-8',
          dataType: "json",
          headers: { 'x-access-token': tokens },
          success: function(data){
            console.log(data)
            // user info in userprofile.html
            $("#name").html('');
            $("#name").append('<h2>'+data.user.first_name+' '+data.user.last_name+'</h2>');
            $("#contact").html('');
            $("#contact").append(data.user.contact_number)
            $("#contact").html('');
            $("#contact").append(data.user.contact_number)
            // userName in side pannel
            $("#showuser").html('');
            $("#showuser").append(data.user.username)
            $("#bday").html('');
            $("#bday").append(moment(data.user.birth_date).format('MMMM D Y'));
            $("#gender").html('');
            $("#gender").append(data.user.gender)
            $("#address").html('');
            $("#address").append(data.user.address)
          },
          error: function(data){
              alert("user is not found");
          }
         });
          app.request({
            url: 'https://desolate-basin-69053.herokuapp.com/activity_logs_mobile',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            headers: { 'x-access-token': tokens },
            data: JSON.stringify({
              "current_user": username
            }),
            success: function (data) {
              console.log("jdjddjdj")
              var log = "";
              logs = []
              for (var i = 0; i < data.activities.length; i++) {
              log += '<div class="timeline-item">';
                log += '<div class="timeline-item-date">' + data.activities[i].date+ '</div>';
               log += '<div class="timeline-item-divider"></div>';
               log += '<div class="timeline-item-content">';
               log += '<div class="timeline-item-inner">';
                log += '<div class="timeline-item-time">' + data.activities[i].time+'</div>';
              log += '<div class="timeline-item-text">' + data.activities[i].content+'</div>';
               log += '</div>';
               log += '</div>';
               log += '</div >';
              }
              $('#logs').append(log);
            },
            error: function (data) {
              alert("user is not found");
            }
          });

          app.request({
            url: 'https://desolate-basin-69053.herokuapp.com/notifications',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            headers: { 'x-access-token': tokens },
            data: JSON.stringify({
              "current_user": username
            }),
            success: function (data) {
              console.log(data)
              console.log("hshhhhs")
              var unreads = "";
              var notifs = "";
              var unread = data.total;
              unreads += unread;
              $('#unread').append(unreads);


            },
            error: function (data) {
              alert("user is not found");
            }
          });

          
          
        }
    }
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  {
    path: '/viewprofile/',
    url: './pages/viewprofile.html',
  },
  {
    path: '/search/',
    url: './pages/searchresult.html',
  },
  {
    path: '/educational/',
    url: './pages/educational.html',
  },
  {
    path: '/english/',
    url: './pages/english.html',
  },
  {
    path: '/math/',
    url: './pages/math.html',
  },
  {
    path: '/science/',
    url: './pages/science.html',
  },
  {
    path: '/history/',
    url: './pages/history.html',
  },
  {
    path: '/fictional/',
    url: './pages/fictional.html',
  },
  {
    path: '/Adventure/',
    url: './pages/Adventure.html',
  },
  {
    path: '/Action/',
    url: './pages/Action.html',
  },
  {
    path: '/Drama/',
    url: './pages/Drama.html',
  },
  {
    path: '/Horror/',
    url: './pages/Horror.html',
  },
  {
    path: '/Mystery/',
    url: './pages/Mystery.html',
  },
  {
    path: '/Mythology/',
    url: './pages/Mythology.html',
  },
  {
    path: '/non-fictional/',
    url: './pages/non-fictional.html',
  },
  {
    path: '/biography/',
    url: '../pages/biology.html',
  },
  {
    path: '/essay/',
    url: './pages/essay.html',
  },
  {
    path: '/journalism/',
    url: './pages/journalism.html',
  },
  {
    path: '/personalNarrative/',
    url: './pages/personalNarrative.html',
  },
  {
    path: '/referenceBook/',
    url: './pages/referenceBook.html',
  },
  {
    path: '/speech/',
    url: './pages/speech.html',
  },
  {
    path: '/notifications/',
    url: './pages/notifications.html',
  },
  {
    path: '/login/',
    url: './pages/login.html',
  },
  {
    path: '/item/',
    url: './pages/item-page.html',
    on:{
      pageInit: function (e, page) {
        app.dialog.preloader();
        setTimeout(function () {
          app.dialog.close();
        }, 5000);
      }
    }
  },
  {
    path: '/form-result/',
    url: './pages/form-result.html',
  },
  {
    path: '/form-add/',
    url: './pages/form-add.html',
  },
  {
    path: '/dashboard-comment/',
    url: './pages/dashboard-comment.html',
  },
  {
    path: '/homepage/',
    url: './pages/homepage.html',
  },
  // Left View Pages
  {
    path: '/left-page-1/',
    url: './pages/left-page-1.html',
  },
  {
    path: '/left-page-2/',
    url: './pages/left-page-2.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
   // Components
  {
    path: '/sales_activity/',
    url: './pages/sales_activity.html',
  },
  {
    path: '/action-sheet/',
    componentUrl: './pages/action-sheet.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './pages/login-screen-page.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

function books() {
  recentadded();
  toprated();
  topborrow();
  allbooks();
}


function recentadded() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/recent',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log("latest");
      console.log(data);
      var employee_data = "";
      var i = "";
      for (i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a onclick="getownerid(\'' + data.book[i].owner_bookshelfid + '\');bookowner(\'' + data.book[i].owner_username + '\');bookindex(\'' + data.book[i].book_id + '\');checkfollow();comment();onebook();" href="/item/">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#new').append(employee_data);
    }
  });
}

function topborrow() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/latest',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a onclick="getownerid(\'' + data.book[i].owner_bookshelfid + '\');bookowner(\'' + data.book[i].owner_username + '\');checkfollow();bookindex(\'' + data.book[i].book_id + '\');comment();  onebook();" href="/item/">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#borrow').append(employee_data);
    }
  });
}

function toprated() {
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/toprated',
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        console.log("djjdjd");
        console.log(data.book[i].contains_id);
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a onclick="bookowner(\'' + data.book[i].owner_username + '\');checkfollow();getownerid(\'' + data.book[i].owner_bookshelfid + '\');bookindex(\'' + data.book[i].book_id + '\');comment();onebook();" href="/item/">';
        employee_data += '<img src="' + data.book[i].book_cover + '" style="width: 100%;height: 100%;">' + '</a>';
        employee_data += '</div>';
      }
      $('#rated').append(employee_data);
    }
  });
}

function allbooks() {
  var tokens = localStorage.getItem('token');
  var username = localStorage.getItem('username');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/bookshelf',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'current_user': username
    }),
    success: function (data) {
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<div class="col-33" style="text-align:center;">';
        employee_data += '<a href="/item/" onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');onebook();">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div>';
      }
      $('#allbook').append(employee_data);
    }
  });
}