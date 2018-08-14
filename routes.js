var routes = [
  {
    path: '/',
    url: 'index.html',
    on:{
        pageInit: function(e, page){
          count();
        },
    }
  },
  {
    path: '/notifications/',
    url: './pages/notifications.html',
    on:{
        pageInit: function(e, page){
          notif();
        },
        pageBeforeRemove: function (){
          mainView.router.navigate('/');
/*        app.dialog.preloader();*/
        // toprated();
        // topborrow();
        // allbooks();
      },
    }
  },
  {
    path: '/signup/',
    url: './pages/signup.html',
    on:{
        pageInit: function (e, page) {
          login_screen.close();
        },
    }
  },
  {
    path: '/viewprofile/',
    url: './pages/viewprofile.html',
    on:{
        pageInit: function (e, page){
          app.dialog.preloader();
          viewprofile();
          visitviewbooks();
          displayCommentuser();
        },
    }
  },
  {
    path: '/userprof/',
    url: './pages/profile.html',
    on:{
        pageInit: function(e, page){
          app.dialog.preloader();
          myprofilecomments();
          myprofileinfo();
          count();
        }
    }
  },
  {
    path: '/form/',
    url: './pages/form.html',
    on:{
      pageBeforeRemove: function (){
        app.dialog.preloader();
        toprated();
        topborrow();
        allbooks();
      },
    }
  },
    {
    path: '/all-toprated/',
    url: './pages/all-toprated.html',
    on:{
      pageInit: function(e, page){
        topratedSearch();
        alltoprated();
      },
    }
  },
    {
    path: '/all-recentlyadded/',
    url: './pages/all-recentlyadded.html',
    on:{
      pageInit: function(e, page){
        recentlyaddedSearch();
        allrecentlyadded();
      },
    }
  },
    {
    path: '/all-latestedition/',
    url: './pages/all-latestedition.html',
    on:{
      pageInit: function(e, page){
        latesteditionSearch();
        alllatestedition();
      },
    }
  },
  {
    path: '/educational/',
    url: './pages/educational.html',
    on:{
      pageInit: function(e, page){
      },
      pageBeforeRemove: function (e, page){

        },
    }
  },
  {
    path: '/english/',
    url: './pages/english.html',
    on:{
      pageInit: function(e, page){
        english();
        englishSearch();

      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/math/',
    url: './pages/math.html',
    on:{
      pageInit: function(e, page){
        math();
        mathSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/science/',
    url: './pages/science.html',
    on:{
      pageInit: function(e, page){
        scienceSearch();
        science();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/history/',
    url: './pages/history.html',
        on:{
      pageInit: function(e, page){
        history();
        historySearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/fictional/',
    url: './pages/fictional.html',
        on:{
      pageInit: function(e, page){

      },
      pageBeforeRemove: function (e, page){

        },
    }
  },
  {
    path: '/Adventure/',
    url: './pages/Adventure.html',
    on:{
      pageInit: function(e, page){
        Adventure();
        adventureSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/Action/',
    url: './pages/Action.html',
    on:{
      pageInit: function(e, page){
        Action();
        actionSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/Drama/',
    url: './pages/Drama.html',
    on:{
      pageInit: function(e, page){
        Drama();
        dramaSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/Horror/',
    url: './pages/Horror.html',
    on:{
      pageInit: function(e, page){
        Horror();
        horrorSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/Mystery/',
    url: './pages/Mystery.html',
    on:{
      pageInit: function(e, page){
        Mystery();
        mysterySearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/Mythology/',
    url: './pages/Mythology.html',
    on:{
      pageInit: function(e, page){
        Mythology();
        mythologySearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/non-fictional/',
    url: './pages/non-fictional.html',
    on:{
      pageInit: function(e, page){

      },
      pageBeforeRemove: function (e, page){

        },
    }
  },
  {
    path: '/biography/',
    url: '../pages/biology.html',
    on:{
      pageInit: function(e, page){
        Biography();
        biologySearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/essay/',
    url: './pages/essay.html',
    on:{
      pageInit: function(e, page){
        essay();
         essaySearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/journalism/',
    url: './pages/journalism.html',
    on:{
      pageInit: function(e, page){
        journalism();
        journalismSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/personalNarrative/',
    url: './pages/personalNarrative.html',
    on:{
      pageInit: function(e, page){
        personalnarrative();
        narrativeSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/referenceBook/',
    url: './pages/referenceBook.html',
    on:{
      pageInit: function(e, page){
        referencebook();
        referenceSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/speech/',
    url: './pages/speech.html',
    on:{
      pageInit: function(e, page){
        speech();
        speechSearch();
      },
      pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/login/',
    url: './pages/login.html',
  },
  {
    path: '/item/',
    url: './pages/item-page.html',
    on:{
      pageInit: function(e, page){
         app.dialog.preloader();
         checkfollow();
         onebook();
      },
    }
  },
  {
    path: '/form-result/',
    url: './pages/form-result.html',
  },
  {
    path: '/form-add/',
    url: './pages/form-add.html',
    beforeLeave: function (routeTo, routeFrom, resolve, reject){
      recentadded();
      toprated();
      topborrow();
      allbooks();
    }
  },
  {
    path: '/dashboard-comment/',
    url: './pages/dashboard-comment.html',
    on:{
        pageInit: function(e, page){
          displayComment();
        },
              pageBeforeRemove: function (e, page){
        recentadded();
        toprated();
        topborrow();
        allbooks();
        },
    }
  },
  {
    path: '/search-page/',
    url: './pages/search-page.html',
    on:{
      pageInit: function(e, page){
        searchall();
        allbookSearch();
        app.dialog.preloader();
      },
    }
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
    path: '/log-out/',
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

function recentadded() {
  console.log('recentadded')
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
      console.log(data);
      var employee_data = "";
      var i = "";
      for (i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');  " href="/item/">';
        employee_data += '<img alt="'+data.book[i].title+'" src="' + data.book[i].book_cover + '">' + '</a>';
        employee_data += '</div>';
      }
      $('#new').append(employee_data);
    }
  });
}

function topborrow() {
  console.log('topborrow')
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
        employee_data += '<a onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');" href="/item/">';
        employee_data += '<img alt="'+data.book[i].title+'" src="' + data.book[i].book_cover + '">' + '</a>';
        employee_data += '</div>';
      }
      $('#borrow').append(employee_data);
    }
  });
}

function toprated() {
  console.log('toprated')
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
      console.log(data);
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<div class="swiper-slide">';
        employee_data += '<a onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');" href="/item/">';
        employee_data += '<img alt="'+data.book[i].title+'" src="' + data.book[i].book_cover + '">' + '</a>';
        employee_data += '</div>';
      }
      $('#rated').append(employee_data);
    }
  });
}

function allbooks() {
  console.log('allbooks')
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
        employee_data += '<div class="elevation-20">';
        employee_data += '<a href="/item/" alt="'+data.book[i].title+'" onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');">' + '<img src="' + data.book[i].book_cover + '" width="100px" height="150px">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div></div>';
      }
      $('#allbook').append(employee_data);
    }
  });
}

function science(){
  var tokens = localStorage.getItem('token');
  var genre_name = "Science"
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/interests/view2/' + genre_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      if (data.book.length == 0){
        app.dialog.alert('Sorry, nothing to display');
      }else{
      var employee_data = "";
      for (var i = 0; i < data.book.length; i++) {
        employee_data += '<li>';
        employee_data += '<a  class="item-link item-content" href="/item/" onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');">';
        employee_data += '<div class="item-media">';
        employee_data += '<img src="' + data.book[i].book_cover + '" width="100px" height="150px">';
        employee_data += '</div>';
        employee_data += '<div class="item-inner">';
        employee_data += '<div class="item-title">' + data.book[i].title + '</div>';
        employee_data += '</div>';
        employee_data += '</a></li>';
      }
        $('#Science').append(employee_data);
    }
    }
  });
}

function scienceSearch(){
  var searchbar1 = app.searchbar.create({
  el: '.searchbar1',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function actionSearch(){
  var searchbar2 = app.searchbar.create({
  el: '.searchbar2',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function adventureSearch(){
  var searchbar3 = app.searchbar.create({
  el: '.searchbar3',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function biologySearch(){
  var searchbar4 = app.searchbar.create({
  el: '.searchbar4',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function dramaSearch(){
  var searchbar5 = app.searchbar.create({
  el: '.searchbar5',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function englishSearch(){
  var searchbar6 = app.searchbar.create({
  el: '.searchbar6',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function essaySearch(){
  var searchbar7 = app.searchbar.create({
  el: '.searchbar7',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function historySearch(){
  var searchbar8 = app.searchbar.create({
  el: '.searchbar8',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function horrorSearch(){
  var searchbar9 = app.searchbar.create({
  el: '.searchbar9',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function journalismSearch(){
  var searchbar10 = app.searchbar.create({
  el: '.searchbar10',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function mathSearch(){
  var searchbar11 = app.searchbar.create({
  el: '.searchbar11',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function mysterySearch(){
  var searchbar12 = app.searchbar.create({
  el: '.searchbar12',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function mythologySearch(){
  var searchbar13 = app.searchbar.create({
  el: '.searchbar13',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function narrativeSearch(){
  var searchbar14 = app.searchbar.create({
  el: '.searchbar14',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function referenceSearch(){
  var searchbar15 = app.searchbar.create({
  el: '.searchbar15',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function speechSearch(){
  var searchbar16 = app.searchbar.create({
  el: '.searchbar16',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function allbookSearch(){
  var searchbar17 = app.searchbar.create({
  el: '.searchbar17',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function topratedSearch(){
  var searchbar18 = app.searchbar.create({
  el: '.searchbar18',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function recentlyaddedSearch(){
  var searchbar19 = app.searchbar.create({
  el: '.searchbar19',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function latesteditionSearch(){
  var searchbar20 = app.searchbar.create({
  el: '.searchbar20',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
}

function myprofileinfo(){
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

          // app.request({
          //   url: 'https://desolate-basin-69053.herokuapp.com/notifications',
          //   type: "POST",
          //   contentType: 'application/json; charset=utf-8',
          //   dataType: "json",
          //   headers: { 'x-access-token': tokens },
          //   data: JSON.stringify({
          //     "current_user": username
          //   }),
          //   success: function (data) {
          //     console.log(data)
          //     console.log("hshhhhs")
          //     var unreads = "";
          //     var notifs = "";
          //     var unread = data.total;
          //     unreads += unread;
          //     $('#unread').append(unreads);
          //     app.dialog.close();
          //   },
          //   error: function (data) {
          //     alert("user is not found");
          //   }
          // });
}

function count() {
  var username = localStorage.getItem('username');
  var tokens = localStorage.getItem('token');
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
      app.dialog.close();
    },
    error: function (data) {
      alert("user is not found");
    }
  });
}




