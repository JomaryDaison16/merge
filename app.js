// Dom7
// import Framework7 from 'framework7';
var $$ = Dom7;
var login_screen;

// Init App
var app = new Framework7({
  init: false,
  id: 'io.Framework7.Bookshelf',
  root: '#app',
  theme: "auto",
  pushState: true,
  routes: routes,
  on: {
    init: function () {
        console.log('App initialized');
        createLogin();
    },
  },
  panel: {
    leftBreakpoint: 960,
  },  
});

var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});
function createLogin(){
    login_screen = app.loginScreen.create({
    content:
    '<div class="login-screen">'+
    '<div class="view">'+
      '<div class="page">'+
        '<div class="page-content login-screen-content">'+
          '<div class="login-screen-title" style="color: #673ab7; font-family:cursive;"><br>'+
          'Bookshelf'+
          '<br></div>'+
          '<form id="loginform">'+
            '<div class="list">'+
              '<ul>'+
                '<li class="item-content item-input">'+
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">'+
                    'Username'+
                    '</div>'+
                    '<div class="item-input-wrap">'+
                      '<input type="text" id="username" name="username" placeholder="Username" required validate>'+
                      '<span class="input-clear-button"></span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
                '<li class="item-content item-input">'+
                  '<div class="item-inner">'+
                    '<div class="item-title item-label">'+
                    'Password'+
                    '</div>'+
                    '<div class="item-input-wrap">'+
                      '<input type="password" id="password" name="password" placeholder="Password" required validate>'+
                      '<span class="input-clear-button"></span>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>'+
            '</div>'+
            '<div class="list">'+
              '<ul>'+
                '<li>'+
                '<button type="button" class="col button button-round button-fill button-login" style="width:60%; margin-right:auto !important;margin-left:auto !important;">'+
                'Log In'+
                '</button>'+
                '</li>'+
              '</ul>'+
              '<div class="block-footer">'+
              'New to bookshelf? '+
              '<a href="/signup/">Create an account'+
              '</a>'+
             ' </div>'+
            '</div>'+
          '</form>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="preloader"></div>'+
  '</div>',
        on: {
        opened: function () {
            console.log('Login Screen opened')
        },
        }
    });

login_screen.open(false);
checkLogin();


$('.button-login').on('click', function (e) {
    app.dialog.preloader();
    var username = $("#username").val();
    var password = $("#password").val();
    if(username != '' && password !='' ){
      app.request({
        async: true, 
        url: 'https://desolate-basin-69053.herokuapp.com/login',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            'username': username,
            'password': password
                }),
        type: "POST",
        dataType: "json",
        crossDomain: true,
        headers: {'Authorization' : 'Basic ' + btoa(username + ':' + password)},
      error: function (data) {
        app.dialog.close();
        app.dialog.alert('Invalid username or password!', 'Login Error');
      },
      success: function (data)  {
        localStorage.setItem('token', data.token);
        localStorage.setItem('authorization', 'Basic' + btoa(username + ':' +password));
        localStorage.setItem('username', username);
        app.dialog.alert('Welcome ' + username, 'Login Success');
        recentadded();
        toprated();
        topborrow();
        allbooks();
/*        app.dialog.close();*/
        app.loginScreen.close();
      },
      complete: function (jqXHR) {
        if (jqXHR.status == '401') {
            app.loginScreen.open();
          }
        }
      });
    }
    else{
      app.preloader.hide(); 
      app.dialog.alert('invalid username or password!', 'Login Error')
    }
  });  
}

function checkLogin(){
  var token = "";
  if (typeof(Storage) !== "undefined" && localStorage.getItem("token")!=="") {
      token = localStorage.getItem("token");
  }
  if(token){
    app.dialog.preloader();
    recentadded();
    toprated();
    topborrow();
    allbooks();
    login_screen.close();
  }else{
    login_screen.open();
  }
}

function searchCheck(that) {
      if (that.value == "isbn_") {
          console.log(that.value);
          document.getElementById("isbn-check").style.display = "block";
          document.getElementById("author-check").style.display = "none";
          document.getElementById("title-check").style.display = "none";
      } else if (that.value == "author_") {
          console.log(that.value);
          document.getElementById("author-check").style.display = "block";
          document.getElementById("isbn-check").style.display = "none";
          document.getElementById("title-check").style.display = "none";
      } else if (that.value == "title_") {
          console.log(that.value);
          document.getElementById("title-check").style.display = "block";
          document.getElementById("author-check").style.display = "none";
          document.getElementById("isbn-check").style.display = "none";
      } else {
          document.getElementById("ifYes").style.display = "none";
      }
  }

function paymentMethod1() {
  var checkRate = document.getElementById("options2");

  if (checkRate.checked == true) {
    document.getElementById("price-rate").style.display = "block";

  } else {
    document.getElementById("price-rate").style.display = "none";
  }
}


function paymentMethod2() {
  var checkSale = document.getElementById("options3");

  if (checkSale.checked == true) {
    document.getElementById("price-sale").style.display = "block";
  } else {
    document.getElementById("price-sale").style.display = "none";
  }
}

function hiddenLabel() {
  var hideLabelBorrow = document.getElementById("options1");


  if (hideLabelBorrow.checked == true) {
    document.getElementById("label2").style.display = "none";
    document.getElementById("label3").style.display = "none";
  } else {
    document.getElementById("label2").style.display = "block";
    document.getElementById("label3").style.display = "block";
  }
}

function hiddenLabel2() {
  var hideLabelRent = document.getElementById("options2");

  if (hideLabelRent.checked == true) {
    document.getElementById("label1").style.display = "none";
    document.getElementById("label3").style.display = "none";
  } else {
    document.getElementById("label1").style.display = "block";
    document.getElementById("label3").style.display = "block";
  }
}

function hiddenLabel3() {
  var hideLabelSale = document.getElementById("options3");

  if (hideLabelSale.checked == true) {
    document.getElementById("label1").style.display = "none";
    document.getElementById("label2").style.display = "none";
  } else {
    document.getElementById("label1").style.display = "block";
    document.getElementById("label2").style.display = "block";
  }
}

// DOM events for About popover
$$('.popover-about').on('popover:open', function (e, popover) {
  console.log('About popover open');
});
$$('.popover-about').on('popover:opened', function (e, popover) {
  console.log('About popover opened');
});

// Create dynamic Popover
var dynamicPopover = app.popover.create({
  targetEl: 'a.dynamic-popover',
  content: '<div class="popover">' +
    '<div class="popover-inner">' +
    '<div class="block">' +
    '<p>Popover created dynamically.</p>' +
    '<p><a href="#" class="link popover-close">Close me</a></p>' +
    '</div>' +
    '</div>' +
    '</div>',
  // Events
  on: {
    open: function (popover) {
      console.log('Popover open');
    },
    opened: function (popover) {
      console.log('Popover opened');
    },
  }
});
// Events also can be assigned on instance later
dynamicPopover.on('close', function (popover) {
  console.log('Popover close');
});
dynamicPopover.on('closed', function (popover) {
  console.log('Popover closed');
});

// Open dynamic popover
$$('.dynamic-popover').on('click', function () {
  dynamicPopover.open();
});

// function iconClick() {
//   // var $$ = $.noConflict();
//   $$('.rating').on('click', function() {
//       $$("#rated5").html() === '<i id="" class="f7-icons">star_fill</i>' ? $$("#rated5").html('<i id="" class="f7-icons">star</i>') : $$("#rated5").html('<i id="" class="f7-icons color-yellow">star_fill</i>')
      
//       $$("#rated3").html() = '<i id="" class="f7-icons">star_fill</i>';
//       $$("#rated2").html() = '<i id="" class="f7-icons">star_fill</i>';
//       $$("#rated1").html() = '<i id="" class="f7-icons">star_fill</i>';
//   })
// }

function iconClick1() {
  document.getElementById("icon-click1").style.color = "yellow";
  setInterval(function(){
    document.getElementById("icon-click1").style.color = "black";
  }, 3000)
}

function iconClick2() {
  document.getElementById("icon-click1").style.color = "yellow";
  document.getElementById("icon-click2").style.color = "yellow";
  setInterval(function(){
    document.getElementById("icon-click1").style.color = "black";
    document.getElementById("icon-click2").style.color = "black";
  }, 3000)
}

function iconClick3() {
  document.getElementById("icon-click1").style.color = "yellow";
  document.getElementById("icon-click2").style.color = "yellow";
  document.getElementById("icon-click3").style.color = "yellow";
  setInterval(function(){
    document.getElementById("icon-click1").style.color = "black";
    document.getElementById("icon-click2").style.color = "black";
    document.getElementById("icon-click3").style.color = "black";
  }, 3000)
}

function iconClick4() {
  document.getElementById("icon-click1").style.color = "yellow";
  document.getElementById("icon-click2").style.color = "yellow";
  document.getElementById("icon-click3").style.color = "yellow";
  document.getElementById("icon-click4").style.color = "yellow";
  setInterval(function(){
    document.getElementById("icon-click1").style.color = "black";
    document.getElementById("icon-click2").style.color = "black";
    document.getElementById("icon-click3").style.color = "black";
    document.getElementById("icon-click4").style.color = "black";
  }, 3000)
}

function iconClick5() {
  document.getElementById("icon-click1").style.color = "yellow";
  document.getElementById("icon-click2").style.color = "yellow";
  document.getElementById("icon-click3").style.color = "yellow";
  document.getElementById("icon-click4").style.color = "yellow";
  document.getElementById("icon-click5").style.color = "yellow";
  setInterval(function(){
    document.getElementById("icon-click1").style.color = "black";
    document.getElementById("icon-click2").style.color = "black";
    document.getElementById("icon-click3").style.color = "black";
    document.getElementById("icon-click4").style.color = "black";
    document.getElementById("icon-click5").style.color = "black";
  }, 3000)
}


// create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});

function signUp1() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "block";
}

function signUp2() {
  document.getElementById("signUp1").style.display = "block";
  document.getElementById("signUp2").style.display = "none"; 
}

function signUp3() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "none";
  document.getElementById("signUp3").style.display = "block";
}

function signUp4() {
  document.getElementById("signUp1").style.display = "none";
  document.getElementById("signUp2").style.display = "block";
  document.getElementById("signUp3").style.display = "none";
}

function signup0(){
        app.dialog.preloader();
        var fname = $("#first_name").val();
        var lname = $("#last_name").val();
        var contact_number = $("#contact_number").val();
        var birthdate = $("#birthdate").val();
        var gender = $("#gender").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var address = $("#address").val();
        $.ajax({
          url: "https://desolate-basin-69053.herokuapp.com/signup",
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            'first_name': fname,
            'last_name': lname,
            'contact_number': contact_number,
            'birth_date': birthdate,
            'gender': gender,
            'username': username,
            'password': password,
            'address': address
          }),
          method: "POST",
          dataType: "json",
          crossDomain: true,
          success: function(resp) {
            app.dialog.close()
            console.log("Registered success");
            alert("Registered successfully!");
            mainView.router.navigate('/');
            checkLogin();
          },
          error: function (e) {
            app.dialog.close()
            alert(birthdate)
            console.log('error');
          }
        });
         }

$(document).on('page:init', function (e) {  
  // Code for About page
  var page = e.detail;
   if (page.name === 'home') {
       //getDashboard();
   }
});

$('.button-logout').on('click', function (e) {
    app.dialog.confirm('Are you sure you want to exit?','Logging Out', function () {
        localStorage.removeItem("token");
        localStorage.clear();
        checkLogin();
        //location.reload();
    });    
});
function sik() {
  // selected = [];
  // selected1 = [];

  $("input:checkbox[name=select]:checked").each(function () {
    localStorage.setItem("siked1", $(this).val());
  });

  }
  // localStorage.setItem("siked1", JSON.stringify(selected));
//   localStorage.setItem("siked", JSON.stringify(selected1));
// }



function addbook()
  {
  app.dialog.preloader();  
  var priceRent = '';
  var priceSale = '';
  if ($("#pricerate").val() == '') {
    priceRent = '0';
  } else {
    priceRent = $("#pricerate").val();
  }

  if ($("#pricesale").val() == '') {
    priceSale = '0';
  } else {
    priceSale = $("#pricesale").val();
  }

  var i = localStorage.getItem('index');
  var method1 = localStorage.getItem('siked1')
  var edition = JSON.parse(localStorage.getItem('books'))[i]['edition'];
  var isbn = JSON.parse(localStorage.getItem("books"))[i]['isbn'];
  var description = JSON.parse(localStorage.getItem('books'))[i]['description'];
  var publisher_name = JSON.parse(localStorage.getItem('books'))[i]['publishers'];
  var title = JSON.parse(localStorage.getItem('books'))[i]['title'];
  var author_name = JSON.parse(localStorage.getItem('books'))[i]['author_name'];
  var book_cover = JSON.parse(localStorage.getItem('books'))[i]['book_cover'];
  var year = JSON.parse(localStorage.getItem('books'))[i]['year'];
  var tokens = localStorage.getItem('token');
  var username = localStorage.getItem('username');
  var fiction = ['Adventure', 'Action', 'Drama', 'Horror', 'Mystery', 'Mythology'];
  var nonFiction = ['Biography', 'Essay', 'Journalism', 'Personal Narrative', 'Reference Book', 'Speech'];
  var academics = ['English', 'History', 'Math', 'Science'];
  var category = "";
  var genre1 = $("#genre").val();
  if (fiction.includes(genre1)) {
    var category = "Fiction";
  } else if (nonFiction.includes(genre1)) {
    var category = "Non-Fiction";
  } else if (academics.includes(genre1)) {
    var category = "Academics";
  }else {
    var category = "Educational";
  }
    app.request({  
        async: true, 
        url: 'https://desolate-basin-69053.herokuapp.com/user/addbook',
        contentType: 'application/json; charset=utf-8',
        headers: {'x-access-token': tokens},
        method: "POST",
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify({
          "isbn": isbn,
          "title": title,
          "publisher_name": publisher_name,
          "year": year,
          "current_user": username,
          "author_name": author_name,
          "quantity": $("#quantity").val(),
          "method": method1,
          "price": priceSale,
          "price_rate": priceRent,
          "book_cover": book_cover,
          "genre": $("#genre").val(),
          "category": category,
          "edition": edition,
          "description": description
          }),

        success: function(data) {
        console.log(data);
        alert(title+ " book is added")
        recentadded();
        toprated();
        topborrow();
        allbooks();
        app.router.navigate('/', {
          reloadCurrent:true,
        });
        },
        error: function (data) {
        console.log(data);
        app.router.navigate('/', {
          reloadCurrent:true,
        });
        },
        complete: function(){
        }
    });
}


function addbooktitle(title){
  var tokens = localStorage.getItem('token');

  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/title_check/' + title,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      result1 = [];
        for (var i = 0; i < data.book.length; i++) 
        {
          employee_data += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
           employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
          employee_data += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
          var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
          result1.push(r);
        }
      $('#result').append(employee_data);
      localStorage.setItem("books", JSON.stringify(result1));
    }
  });
}

function search1(){
  var types = $("#booktype").val();
  var isbn = $("#isbn1").val();
  var title = $("#titleni").val();
  var author_name = $("#author_name").val();
 
  if (types == "isbn_"){ 
    addbookisbn(isbn);
  } else if (types == "title_"){
    addbooktitle(title);
  } else if (types == "author_")
    addbookauthor(author_name);
}


function addbookauthor(author_name){
  var tokens = localStorage.getItem('token');
loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/author_check/' + author_name,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },    
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      var employee_data = "";
      result1 = [];
        for (var i = 0; i < data.book.length; i++) 
        {
          employee_data += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
          employee_data += '<h3><div class="container">' + data.book[i].title +'</div></h3>';
          employee_data += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
          employee_data += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
           employee_data += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' + i + '\')">' + 'ADD BOOK' + '</a>';
          employee_data += '</div>';
          var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
        result1.push(r);
      }
      $('#result').append(employee_data);
      localStorage.setItem("books", JSON.stringify(result1));
    }
  });
}

function get_one(i) {
  localStorage.setItem('index', i);
}

function addbookisbn(isbn) {
   var tokens = localStorage.getItem('token');

   app.request({
      url: 'https://desolate-basin-69053.herokuapp.com/mobile/user/isbn_check/' + isbn,
      contentType: 'application/json; charset=utf-8',
      method: "GET",
      dataType: "json",
      crossDomain: true,
      headers: { 'x-access-token': tokens },
      success: function (data) {
         var employee_data1 = "";
          result1 = [];
         for (var i = 0; i < data.book.length; i++) {
            employee_data1 += '<div class="col-50" style="padding:2%;margin-bottom:2%;text-align:center;background:#efefef;">';
            employee_data1 += '<h3><div class="container">' + data.book[i].title + '</div></h3>';
            employee_data1 += '<img src="' + data.book[i].book_cover + '" width="90" height="150">';
            employee_data1 += '<p><div class="container">' + data.book[i].author_name + '</div></p>';
            employee_data1 += '<a class="col button button-fill" href="/form-add/" onclick="get_one(\'' +i+'\')">' + 'ADD BOOK' + '</a>';
            employee_data1 += '</div>';
           var r = { 'author_name': data.book[i]['author_name'], 'isbn': data.book[i]['isbn'], 'title': data.book[i]['title'], 'book_cover': data.book[i]['book_cover'], 'publishers': data.book[i]['publishers'], 'description': data.book[i]['description'], 'year': data.book[i]['year'], 'types': data.book[i]['types'], 'book_id': data.book[i]['book_id'], 'edition': data.book[i]['edition'] }
          result1.push(r);
        }
        $('#result').append(employee_data1);
        localStorage.setItem("books", JSON.stringify(result1));
      }
   });
}
function bookindex(i) {
  localStorage.setItem('bookid', i);
}

function bookowner(i) {
  localStorage.setItem('bookowners', i);
}

function onebook() {
  var tokens = localStorage.getItem('token');
  var id = localStorage.getItem('bookid');
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');
  var res = localStorage.getItem('checkfollow');
  if (owner == 'null' || owner == 'undefined'){
    owner = localStorage.getItem('username');
  } 
  // console.log("dhdhdhdh");  
  // console.log(b);
  loops = [];
  
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/bookshelf/book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_id': id,
      'username': owner,
      'current_user':user

    }),
    success: function (data) {
            console.log(data);
            console.log(data.book[0].borrower + "asdasdasd");;
            var title = "";
            var cover = "";
            var owner = "";
            var method = "";
            var star = "";
            var starRate = data.book[0].totalRate
            if (data.book[0].check == "Borrowed"){
            var borrower = data.book[0].borrower;
              localStorage.setItem('borrower', borrower);
            } else if (data.book[0].check == "Rented"){
              var total = data.book[0].total
              var borrower = data.book[0].borrower;
              localStorage.setItem('borrower', borrower);
              localStorage.setItem('total', total);
            }
             title += '<div class="demo-facebook-name">' + data.book[0].title;
              title += '<a href="#" class="link" style="float: right !important;">';
              title += '<i class="icon material-icons md-only size-100">bookmark_border</i>';
              title += '</a>';
              title += '</div>';

            $('#title').append(title);

            cover += '<img src="' + data.book[0].book_cover + '"width="80%" height="75%"/ class="row center">';
            cover += '<br>' + data.book[0].author_name;
            if ((data.book[0].check == "Borrowed") && (data.book[0].username == user)){
              cover += '<h3>This book is currently borrowed by ' + data.book[0].borrower_fname + ' ' + data.book[0].borrower_lname+'.</h3>';
              cover += '<button onclick="borrow_return();">' + 'Confirm' +'</button>';
              // borrow_return
            } else if ((data.book[0].check == "Borrowed") && (user == borrower)){
              cover += '<h3>Please confirm if you have returned this book to the owner.</h3>';
              cover += '<button onclick="borrow_return_request();">' + 'Confirm' +'</button>';
              // borrow_return_request
            } else if ((data.book[0].check == "Rented") && (data.book[0].username == user)) {
              cover += '<h3>This book is currently rented by ' + data.book[0].borrower_fname + ' ' + data.book[0].borrower_lname + '.</h3>';
              cover += '<h4>Please confirm if this book has been returned.</h4>';
              cover += '<button onclick="rent_return();">' + 'Confirm' +'</button>';
              // rent_return
            } else if ((data.book[0].check == "Rented") && (user == borrower)) {
              cover += '<h4>Prepare an amount of ' + data.book[0].total + 'php for the payment of rent.'+'</h4>';
              cover += '<h5>Please confirm if you have returned this book to the owner.</h5>';
              cover += '<button onclick="borrow_return_request();">'+'Confirm'+'</button>';
              // borrow_return_request
            }else{
              if (data.book[0].price != 0  ){
                cover += '<p class="likes">For Sale</p>';
                cover += '<p class="likes">Price:' + data.book[0].price +"php"+ '</p>';
              } else if (data.book[0].price_rate != 0){
                cover += '<p class="likes">For Rent</p>';
                cover += '<p class="likes">Price rate:' + data.book[0].price_rate + "php/day" + '</p>';
              }else{
                cover += '<p class="likes">For Borrow</p>';
              }
              for(var i = 0; i != 5; i++) {
        if (starRate >= 1 ) {
          star += '<i class="f7-icons color-yellow">star_fill</i>' + " ";
        } else if (starRate < 1 && starRate > 0) {
            star += '<i class="f7-icons color-yellow">star_half</i>' + " ";
        } else if (starRate == 0){
            star += '<i class="f7-icons">star</i>' + " ";
        }

          
        if (starRate < 1 && starRate > 0) {
          starRate = 0;
        } else if (starRate != 0){
          starRate = starRate - 1;
        }
      }


      cover += '<p class="likes">Rater Count:' + " " + star + " " + "(" + data.book[0].numofRates + ")" + '</p>';
            }
           $('#cover').append(cover);

            owner += data.book[0].owner;
            $('#owner').append(owner);


            if (data.book[0].username == user){
              method += ""
              $('#method').append(method);
            }else{
              method += '<a href="/viewprofile/" class="color-blue alert-reply">profile</a>';
              if (data.book[0].methods == "For Borrow"){
                method += '<a class="link popover-open color-blue" data-popover=".popover-borrow">' + data.book[0].methods + '</a>';
              } else if (data.book[0].methods == "For Rent"){
                method += '<a onclick="price(\'' + data.book[0].price_rate + '\')" class="link popover-open color-blue" data-popover=".popover-rent">' + data.book[0].methods + '</a>';
              }else{
                method += '<a onclick="price(\'' + data.book[0].price + '\');sale();" class="color-blue alert-forward">' + data.book[0].methods + '</a>';
              }
              
              console.log(res)
              if (res == "Following"){
                method += '<a onclick="#" class="color-red alert-forward" style="margin-right: 0.5em;">';
                // method += '<i class="f7-icons">add</i>';
                method += 'Unfollow';
                method += '</a>';  
              }else{        
              method += '<a onclick="follow()" class="color-blue alert-forward" style="margin-right: 0.5em;">';
              method += '<i class="f7-icons">add</i>';
              method += 'Follow';
              method += '</a>';
              }

              $('#method').append(method);
      }
    },
    complete: function(){
      app.dialog.close();
    }
  });
}

function price(i) {
  localStorage.setItem('price', i);
}

function checkfollow() {
    var tokens = localStorage.getItem('token')
    var owner = localStorage.getItem('bookowners');
    var user = localStorage.getItem('username');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/follow-check',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': owner,
      'current_user': user
    }),
    success: function (data) {
      localStorage.setItem('checkfollow', data.data)
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    },
    complete: function (){
      
    }
  })
}

function borrow() {
  var tokens = localStorage.getItem('token')
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');
  var ownerid = localStorage.getItem('ownerid');
  var bookid = localStorage.getItem('bookid');
  var returndate = document.getElementById("returndate").value;
  console.log(returndate);
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/borrow_book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_owner': owner,
      'book_borrower': user,
      'bookshelf_id':ownerid,
      'book_id':bookid,
      'end': returndate
    }),
    success: function (data) {
      app.dialog.alert(data.message, " ");
      console.log(data.message);
    },
    error: function (data) {
      console.log(data);
    }
  })
}
function rent() {
  var tokens = localStorage.getItem('token')
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');
  var ownerid = localStorage.getItem('ownerid');
  var price = localStorage.getItem('price');
  var bookid = localStorage.getItem('bookid');
  var returndate = document.getElementById("returndate1").value;
  console.log(returndate);
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/rent_book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_owner': owner,
      'book_borrower': user,
      'bookshelf_id': ownerid,
      'book_id': bookid,
      'end': returndate,
      'price_rate': price
    }),
    success: function (data) {
      console.log(data.message);
      app.dialog.alert(data.message, " ");
    },
    error: function (data) {
      console.log(data);
    }
  })
}
function sale() {
  var tokens = localStorage.getItem('token')
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');
  var price = localStorage.getItem('price');
  var bookid = localStorage.getItem('bookid');
  var ownerid = localStorage.getItem('ownerid');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/purchase_book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_owner': owner,
      'book_buyer': user,
      'bookshelf_id': ownerid,
      'book_id': bookid,
      'price': price
    }),
    success: function (data) {
      console.log(data.message);
      app.dialog.alert(data.message, " ");
    },
    error: function (data) {
      console.log(data);
    }
  })
}

function english() {
  var tokens = localStorage.getItem('token');
  var genre_name = "English"
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
      $('#english1').append(employee_data);
    }
  });
}


function math() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Math"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#math').append(employee_data);
      }
    }
  });
}
function history() {
  var tokens = localStorage.getItem('token');
  var genre_name = "History"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#history').append(employee_data);
      }
    }
  });
}
function Adventure() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Adventure"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Adventure').append(employee_data);
      }
    }
  });
}
function Action() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Action"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Action').append(employee_data);
      }
    }
  });
}
function Drama() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Drama"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Drama').append(employee_data);
      }
    }
  });
}
function Horror() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Horror"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Horror').append(employee_data);
      }
    }
  });
}
function Mystery() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Mystery"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Mystery').append(employee_data);
      }
    }
  });
}
function Mythology() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Mythology"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Mythology').append(employee_data);
      }
    }
  });
}
function Biography() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Biography"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#biography').append(employee_data);
      }
    }
  });
}
function essay() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Essay"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#essay').append(employee_data);
      }
    }
  });
}
function journalism() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Journalism"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#journalism').append(employee_data);
      }
    }
  });
}
function personalnarrative() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Personal Narrative"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#Personalnarrative').append(employee_data);
      }
    }
  });
}
function referencebook() {
  var tokens = localStorage.getItem('token');
  var genre_name = "Reference Book"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#referencebook').append(employee_data);
      }
    }
  });
}
function speech(){
  var tokens = localStorage.getItem('token');
  var genre_name = "Speech"
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
      if (data.book.length == 0) {
        app.dialog.alert('Sorry, nothing to display');
      } else {
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
        $('#speech').append(employee_data);
      }
    }
  });
}
function search2(that) {
  var tokens = localStorage.getItem('token');
  // var username = localStorage.getItem('username');
  // var dv = that.value;
  // console.log(dv);
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/search',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'item': that.value
      // 'current_user': username

    }),
    success: function (data) {
      console.log(data);
      // if (data.book.length == 0) {
      //   app.dialog.alert('Sorry, nothing to display');
      // } else {
      //   var employee_data = "";
      //   for (var i = 0; i < data.book.length; i++) {

      //     employee_data += '<li class="item-content">';
      //     employee_data += '<div class="item-inner">';
      //     employee_data += '<div class="item-title">' + data.book[i].title +'</div>';
      //     employee_data += '</div>';
      //     employee_data += '</li>';
      //   }
      //   $('#books').append(employee_data);
      // }
    }
  });
}

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
        employee_data += '<a onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\'); " href="/item/">';
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
    },
      complete: function (jqXHR) {
        if (jqXHR.status == '401') {
            app.loginScreen.open();
          }
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
        employee_data += '<a href="/item/" onclick="bookindex(\'' + data.book[i].book_id + '\'); bookowner(\'' + data.book[i].owner_username + '\');">' + '<img src="' + data.book[i].book_cover + '" width="100px" height="150px">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div></div>';
      }
      $('#allbook').append(employee_data);
    },
    complete: function(){
      sliders();
      app.dialog.close();
    }
  });
}

function searchall(){
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
  url: 'https://desolate-basin-69053.herokuapp.com/mobile/bookshelf/books',
  method: "GET",
  contentType: 'application/json; charset=utf-8',
  headers: { 'x-access-token': tokens },
  dataType: "json",
  crossDomain: true,
  success: function (data) {
    console.log(data);
    if (data.book.length == 0) {
      app.dialog.alert('Sorry, nothing to display');
    } else {
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
      $('#allbooks').append(employee_data);
    }
  },
  complete: function(){
    app.dialog.close();
  }
});
}


function alltoprated(){
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
  url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/alltoprated',
  method: "GET",
  contentType: 'application/json; charset=utf-8',
  headers: { 'x-access-token': tokens },
  dataType: "json",
  crossDomain: true,
  success: function (data) {
    console.log(data);
    if (data.book.length == 0) {
      app.dialog.alert('Sorry, nothing to display');
    } else {
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
      $('#alltoprated').append(employee_data);
    }
  },
  complete: function(){
    app.dialog.close();
  }
});
}

function alltoprated(){
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
  url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/alltoprated',
  method: "GET",
  contentType: 'application/json; charset=utf-8',
  headers: { 'x-access-token': tokens },
  dataType: "json",
  crossDomain: true,
  success: function (data) {
    console.log(data);
    if (data.book.length == 0) {
      app.dialog.alert('Sorry, nothing to display');
    } else {
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
      $('#alltoprated').append(employee_data);
    }
  },
  complete: function(){
    app.dialog.close();
  }
});
}

function alllatestedition(){
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
  url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/alllatest',
  method: "GET",
  contentType: 'application/json; charset=utf-8',
  headers: { 'x-access-token': tokens },
  dataType: "json",
  crossDomain: true,
  success: function (data) {
    console.log(data);
    if (data.book.length == 0) {
      app.dialog.alert('Sorry, nothing to display');
    } else {
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
      $('#alllatestedition').append(employee_data);
    }
  },
  complete: function(){
    app.dialog.close();
  }
});
}

function allrecentlyadded(){
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
  url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/books/allrecent',
  method: "GET",
  contentType: 'application/json; charset=utf-8',
  headers: { 'x-access-token': tokens },
  dataType: "json",
  crossDomain: true,
  success: function (data) {
    console.log(data);
    if (data.book.length == 0) {
      app.dialog.alert('Sorry, nothing to display');
    } else {
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
      $('#allrecentlyadded').append(employee_data);
    }
  },
  complete: function(){
    app.dialog.close();
  }
});
}

function sliders(){
  var mySwiper3 = app.swiper.create('.swiper-3', {
    pagination:'.swiper-3 .swiper-pagination',
    spaceBetween: 80,
    slidesPerView: 3,
    observer: true,
    touchMoveStopPropagation: false,
    paginationHide: false,
    paginationClickable: false
  });
    var mySwiper2 = app.swiper.create('.swiper-2', {
    pagination:'.swiper-2 .swiper-pagination',
    spaceBetween: 80,
    slidesPerView: 3,
    observer: true,
    touchMoveStopPropagation: false,
    paginationHide: false,
    paginationClickable: false
  });
  var mySwiper1 = app.swiper.create('.swiper-1', {
    pagination:'.swiper-3 .swiper-pagination',
    spaceBetween: 80,
    slidesPerView: 3,
    observer: true,
    touchMoveStopPropagation: false,
    paginationHide: false,
    paginationClickable: false
  });
  app.dialog.close();
}

$('.tabs').on('show', function(){
  $(this).find('.swiper-container')[0].swiper.update()
});

function follow() {
  app.dialog.preloader();
  var tokens = localStorage.getItem('token');
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/follow',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': owner,
      'current_user': user

    }),
    success: function (data) {
      console.log(data);
      app.dialog.alert(owner,"You followed ");
    },
    error: function (data) {
      console.log(data);
    },
    complete: function(data){
      mainView.router.navigate(mainView.router.currentRoute.url, {
      ignoreCache  : true,
      reloadCurrent : true    
  });
      app.dialog.close();
    }
  });
}

function viewprofile() {
  var tokens = localStorage.getItem('token');
  var username = localStorage.getItem('bookowners');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/info/' + username,
    method: "GET",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    success: function (data) {
      console.log(data);
      // app.dialog.alert(data);
      $("#name").html('');
      $("#name").append('<h2>' + data.user.first_name + ' ' + data.user.last_name + '</h2>');
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
    error: function (data) {
      console.log(data);
    }

  });
}


// <-- code from brex -->
function displayComment() {
  var tokens = localStorage.getItem('token')
  var owner = localStorage.getItem('bookowners');
  var id = localStorage.getItem('bookid');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/comments/book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': owner,
      'book_id': id
    }),
    success: function (data) {
      var comment = "";
      console.log(data.comments.length);
      for (var i = 0; i < data.comments.length; i++ ){
        comment += '<ul>';
        comment +='<li class="item-content">';
        comment +=  '<div class="item-media"><img src="images/ES.jpg" width="50" height="50" /></div>';
        comment +=  '<div class="item-inner">';
        comment +=    '<div class="item-title-row">';
        comment += '<div class="item-title">Name: ' + data.comments[i].user_fname + " " + data.comments[i].user_lname+' </div>';
        comment +=    '</div>';
        comment +=    '<div class="item-subtitle">Date: '+data.comments[i].date+' <br>';
        comment +=   data.comments[i].comment ;       
        comment +=    '</div>';
        comment +=    '</div>';
        comment += '</li>';
        comment += '</ul>';
      }
      $("#comments").append(comment)
    },
    error: function (data) {
      console.log(data);
    },
    complete: function(data){
      app.dialog.close();
    }
  });
}
function comment() {
  app.dialog.preloader();
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var comment = $('#myComment').val();
  console.log(comment)
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/comment-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'comment': comment,
      'book_id': bookid
    }),
    success: function (data) {
      console.log(data);
      console.log('sulod sa success sa add comment');

    },
    error: function (data) {
      console.log(data);
            console.log('sulod sa success sa add comment');
      mainView.router.navigate(mainView.router.currentRoute.url, {
      ignoreCache  : true,
      reloadCurrent : true    
  });
    }
  })
}

function rateThis1() {
  var tokens = localStorage.getItem('token');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var user = localStorage.getItem('username');
  var rating = $('#thisRate1').val();
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rate-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'ratings': rating,
      'book_id': bookid
    }),
    success: function (data) {
      console.log('rate for 1 star');
      alert("RATED!");

    },
    error: function (data) {
      console.log(rating);
      app.dialog.alert('Invalid username or password!', 'Login Error');
      console.log(data);
          mainView.router.navigate(mainView.router.currentRoute.url, {
          ignoreCache  : true,
          reloadCurrent : true
          
      });
    }
  });  
}

function rateThis2() {
  var tokens = localStorage.getItem('token');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var user = localStorage.getItem('username');
  var rating = $('#thisRate2').val();
  console.log(rating)
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rate-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'ratings': rating,
      'book_id': bookid
    }),
    success: function (data) {
      console.log(data);
      alert("RATED!");
    },
    error: function (data) {
      console.log(rating);
      console.log(data);
          mainView.router.navigate(mainView.router.currentRoute.url, {
          ignoreCache  : true,
          reloadCurrent : true
          
      });
    }
  })  
}

function rateThis3() {
  var tokens = localStorage.getItem('token');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var user = localStorage.getItem('username');
  var rating = $('#thisRate3').val();
  console.log(rating)
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rate-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'ratings': rating,
      'book_id': bookid
    }),
    success: function (data) {
      console.log(data);
      alert("RATED!");
    },
    error: function (data) {
      console.log(rating);
      console.log(data);
          mainView.router.navigate(mainView.router.currentRoute.url, {
          ignoreCache  : true,
          reloadCurrent : true
          
      });
    }
  })  
}

function rateThis4() {
  var tokens = localStorage.getItem('token');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var user = localStorage.getItem('username');
  var rating = $('#thisRate4').val();
  
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rate-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'ratings': rating,
      'book_id': bookid
    }),
    success: function (data) {
      console.log(data);
      alert("RATED!");
    },
    error: function (data) {
      console.log(rating);
      console.log(data);
          mainView.router.navigate(mainView.router.currentRoute.url, {
          ignoreCache  : true,
          reloadCurrent : true
          
      });
    }
  })  
}

function rateThis5() {
  var tokens = localStorage.getItem('token');
  var bookowner = localStorage.getItem('bookowners');
  var bookid = localStorage.getItem('bookid');
  var user = localStorage.getItem('username');
  var rating = $('#thisRate5').val();
  console.log(rating)
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rate-book',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'username': user,
      'owner':  bookowner,
      'ratings': rating,
      'book_id': bookid
    }),
    success: function (data) {
      console.log(data);
      alert("RATED!");
    },
    error: function (data) {
      console.log(rating);
      console.log(data);
          mainView.router.navigate(mainView.router.currentRoute.url, {
          ignoreCache  : true,
          reloadCurrent : true
          
      });
    }
  })  
}

// Joms codes

function commentuser() {
  app.dialog.preloader();
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');
  var bookowner = localStorage.getItem('bookowners');
  var comment = $('#myComment').val();
  console.log(comment)
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/comment/user',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'current_user': user,
      'username':  bookowner,
      'comment': comment,
    }),
    success: function (data) {
      console.log(data);
      console.log('sulod sa success sa add comment');

    },
    error: function (data) {
      console.log(data);
      console.log('finish na');
      mainView.router.navigate(mainView.router.currentRoute.url, {
      ignoreCache  : true,
      reloadCurrent : true   
  });
    app.dialog.close();
    }
  })
}


  function displayCommentuser() {
  var username = localStorage.getItem('username');
    var tokens = localStorage.getItem('token')
    var owner = localStorage.getItem('bookowners');
  
    app.request({
      url: 'https://desolate-basin-69053.herokuapp.com/user/comments',
      method: "POST",
      contentType: 'application/json; charset=utf-8',
      headers: { 'x-access-token': tokens },
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify({
        'username': owner,
  
      }),
success: function (data) {
      console.log("comments")
      console.log(data)
      var logs = "";
      logs = []
      for (var i = 0; i < data.comments.length; i++) {
        logs += '<div class="row no-gap">';
        logs += '<img src="#" class="comment-image">';
        logs += '<div class="col-75">';
        logs += '<div class="title">';
        logs += '<a href="#">'
        logs += '<b>'+ data.comments[i].user_fname + ' ' + data.comments[i].user_lname+'</b>';
        logs += '</a>';
        logs += '</div>';
        logs += '<div class="comment-box" style="padding: 2%;">';
        logs += data.comments[i].comment ;
        logs += '</div></div></div>';
        logs += '<hr>';
      }
        $("#comments").append(logs);
      },
      error: function (data) {
        console.log(data);
      },
      complete: function(data){
        app.dialog.close();
      }
    });
  }

function markread() {
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');

  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/mark-read',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'current_user': user,

    }),
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.log(data);
    }

  })
}
function getownerid(i) {
   localStorage.setItem('ownerid', i);
}

function notif(){
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
    var notifs = "";
    for (var i = 0; i < data.notifications.length; i++) {
      if (data.notifications[i].type == "borrower_returned_request" || data.notifications[i].type == "owner_borrow_return_verification") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Verify</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Verify that ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' + ' has returned your ';
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >' + 'book.' + ' </a >';
        notifs += '</div>';
        notifs += '</div>';

      }
      else if (data.notifications[i].type == "borrower_borrow_one_day" || data.notifications[i].type == "renter_rent_one_day") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Note!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Book must be returned tomorrow. Please confirm if you have returned ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  "'s " ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';

      }else if (data.notifications[i].type == "owner_borrow_one_day" || data.notifications[i].type == "owner_rent_one_day") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Note!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Book must be returned tomorrow. Verify that ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has returned your ';
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';

      }
       else if (data.notifications[i].type == "owner_borrow_today") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Note!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Book must be returned today. Verify that ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has returned your ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';

      } else if (data.notifications[i].type == "borrower_borrow_today") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Note!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Book must be returned today. Please confirm if you have returned ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has returned your ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      } else if (data.notifications[i].type == "owner_returned_successful") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Returned</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has returned your ' ;
        notifs += '<a onclick="bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+'</a >' + '. Leave a rating.';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "borrower_returned_successful") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Thank you!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Thank you for returning the book.';
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >' + '. Leave a rating.';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "borrower_borrow_return_") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">please,Confirm!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Please confirm if you have returned ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  "'s " ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "owner_request_accepted") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Accepted request</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'You have accepted the request of ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' for your ';
        notifs += '<a onclick="bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" hre ="/item/">'+'book.'+'</a>';
        notifs += 'Click' + '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].borrower + '\');acceptreq();"> here</a>' +' for details';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "borrower_request_accepted") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Request accepted</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'Your request has been accepted by ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' for ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+'</a >';
        notifs += 'Click' + '<a onclick="bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');promptTest();">'+'here'+'</a>' +' to enter code';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "borrower_borrow_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Borrowed a book</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'You have borrowed ' + '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  "'s " ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }
      else if (data.notifications[i].type == "owner_borrow_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Borrow</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has borrowed your book ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "user_rent_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Rented a book</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'You have rented '+'<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  "'s " ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "owner_rent_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Note!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has rented your book ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "user_purchased_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">You bought a Book</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += 'You have purchased '+'<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  "'s " ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "owner_purchased_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Purchased</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has purchased your book ' ;
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "borrow_request" ||data.notifications[i].type == "rent_request" ||data.notifications[i].type == "purchase_request") {
        // diri na part ang naa accept ug reject na button! wala pa js pd 
        // tawagon si "verification-code" tapos pagdisplay sa code ky si "verification-code-details"
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">Request!</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has sent you a request. ' ;
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');bookindex(\'' + data.notifications[i].book_id + '\');acceptreq();">' +'ACCEPT'+'</a>' + ' ';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');bookindex(\'' + data.notifications[i].book_id + '\');rejectreq();">' +'REJECT'+'</a>';        
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "user_follow") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">New follower</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has followed you.' ;
        notifs += '</div>';
        notifs += '</div>';
      }else if (data.notifications[i].type == "follower_new_book") {
        notifs += '<li>';
        notifs += '<div class="item-inner">';
        notifs += '<div class="item-title-row">';
        notifs += '<div class="item-title">New Book</div>';
        notifs += '<div class="item-after">' + data.notifications[i].time + '</div>';
        notifs += '</div>';
        notifs += '</div class="item-text">';
        notifs += '<a onclick="bookowner(\'' + data.notifications[i].borrower + '\');viewprofile();" href="/viewprofile/">' + data.notifications[i].borrower_fname + ' ' + data.notifications[i].borrower_lname + '</a>' +  ' has added a new ';
        notifs += '<a onclick = "bookindex(\'' + data.notifications[i].book_id + '\');bookowner(\'' + data.notifications[i].owner_username + '\');onebook()" href = "/item/" >'+'book.'+' </a >';
        notifs += '</div>';
        notifs += '</div>';
      }
    }
    $('#notif').append(notifs);


  },
  error: function (data) {
    alert("user is not found");
  }
});
}


function borrow_return(){
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');
  var borrower = localStorage.getItem('borrower');
  var id = localStorage.getItem('bookid');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/borrow_return',
    contentType: 'application/json; charset=utf-8',
    method: "POST",
    dataType: "json",
    crossDomain: true,
    headers: { 'x-access-token': tokens },
    data:JSON.stringify({
      'book_id': id,
      'borrower': borrower,
      'owner': user
    }),
    success: function (data) {
      console.log(data)
    }, error: function (data) {
      console.log(data);
      console.log("gdgagsd");
    }
  });
}
function borrow_return_request() {
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');
  var borrower = localStorage.getItem('bookowners');
  var id = localStorage.getItem('bookid');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/borrow_return_request',
    contentType: 'application/json; charset=utf-8',
    method: "POST",
    dataType: "json",
    crossDomain: true,
    headers: { 'x-access-token': tokens },
    data: JSON.stringify({
      'book_id': id,
      'borrower': user,
      'owner': borrower
    }),
    success: function (data) {
      console.log(data)
    }, error: function (data) {
      console.log(data);
      console.log("gdgagsd");
    }
  });
}
function rent_return() {
  var tokens = localStorage.getItem('token');
  var user = localStorage.getItem('username');
  var borrower = localStorage.getItem('borrower');
  var id = localStorage.getItem('bookid');
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/rent_return',
    contentType: 'application/json; charset=utf-8',
    method: "POST",
    dataType: "json",
    crossDomain: true,
    headers: { 'x-access-token': tokens },
    data: JSON.stringify({
      'book_id': id,
      'borrower': borrower,
      'owner': user
    }),
    success: function (data) {
      console.log(data);
    },error:function(data) {
      console.log(data);   
      console.log("gdgagsd");   
    }
  });
}

function promptTest() {
  app.dialog.prompt('<h5>'+'Step-by-step procedure:'+'</h5>'+
  '<ol><h5><li>'+'Make contact with the owner of the book to discuss where to meet and when.'+'</li></h5>'+
  '<h5><li>'+'Meet up with them'+'</li></h5>'+
  '<h5><li>'+'When you receive the book, make sure they have given the verification code.'+'</h5></li>'+
  '<h5 style="font-weight:bolder;"><li>'+'Enter the code given to you from the owner.'+'</li></h5></ol>', '<h4>' +'Enter the verification code given by the owner of the book:'+'</h4>', function (code) {
    var tokens = localStorage.getItem('token');
    var id = localStorage.getItem('bookid');
    var owner = localStorage.getItem('bookowners');
    var user = localStorage.getItem('username');

    loops = [];

    app.request({
      url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/confirm',
      method: "POST",
      contentType: 'application/json; charset=utf-8',
      headers: { 'x-access-token': tokens },
      dataType: "json",
      crossDomain: true,
      data: JSON.stringify({
        'book_id': id,
        'book_borrower': user,
        'book_owner': owner,
        'code': code

      }),
      success: function (data) {
        console.log(data);
        if (data.message == "Code invalid" ){
          app.dialog.alert('Code is invalid', "INVALID");
        }else{
          app.dialog.alert('Confirmed', "SUCCESS");
          mainView.router.navigate(mainView.router.currentRoute.url,{
            ignoreCache: true,
            reloadCurrent: true
          });
        }
      },
      error: function (data) {
        console.log(data);
        console.log("error");
      }
    });
  });
}

function visitviewbooks() {
  var tokens = localStorage.getItem('token');
  var username = localStorage.getItem('bookowners');
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
        employee_data += '<a href="/item/" onclick="getownerid(\'' + data.book[i].owner_bookshelfid + '\');bookowner(\'' + data.book[i].owner_username + '\');bookindex(\'' + data.book[i].book_id + '\');">' + '<img src="' + data.book[i].book_cover + '" width="100" height="100">' + '</a>';
        employee_data += '<div class="container">' + data.book[i].title + '</div>';
        employee_data += '</div>';
      }
      $('#allbook').append(employee_data);
    }
  });
}


function acceptreq() {
  var tokens = localStorage.getItem('token');
  var id = localStorage.getItem('bookid');
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');

  loops = [];
  
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/verification-code',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_id': id,
      'book_owner': user,
      'book_borrower': owner

    }),
    success: function (data) {
      console.log(data);
      app.dialog.alert('<h5>' + 'Please give this code to the person who will borrow/rent/purchase your book after giving the book' + '</h5>'+
              '<h5>' + 'Step-by-step procedure:' + '</h5>' +
        '<ol><h5 style="margin-bottom:10px !important;"><li>' + 'Save or write down the code given to you.' + '</li></h5>'+
        '<h5 style="margin-bottom:10px !important;"><li>' + 'Make contact with the person who will borrow/rent/purchase your book to discuss where to meet and when.' + '</li></h5>' +
        '<h5 style="margin-bottom:10px !important;"><li>' + 'Bring the book.' + '</li></h5>'+
        '<h5 style="margin-bottom: 10px !important;"><li style="font-weight:bolder;">' + 'Give him the code along with the book.' + '</li></h5></ol>' , 
      '<h4 style="text-align: center !important;">' + data.code[0].code + '</h5>');
      // var code = "";
      // code += '<h3>'+'Please give this code to the person who will borrow/rent/purchase your book after giving the book'+'</h3>';
      // code += '<h2  style="font-weight:bolder; text-align:center !important;">" '+data.code[0].code+' "</h2>';
      // $('#code').append(code);        
    },
    error:function (data){
      console.log(data);
      console.log("error");
    }
  });
} 
function rejectreq() {
  var tokens = localStorage.getItem('token');
  var id = localStorage.getItem('bookid');
  var owner = localStorage.getItem('bookowners');
  var user = localStorage.getItem('username');

  loops = [];
  
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/bookshelf/remove_borrow',
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    headers: { 'x-access-token': tokens },
    dataType: "json",
    crossDomain: true,
    data: JSON.stringify({
      'book_id': id,
      'book_owner': user,
      'username': owner

    }),
    success: function (data) {
      console.log(data);
    },
    error:function (data){
      console.log(data);
      console.log("error");
    }
  });
} 

// Jerald code
function myprofilecomments(){
  console.log('myprofilecomments')
  var username = localStorage.getItem('username');
  var tokens = localStorage.getItem('token');
  loops = [];
  app.request({
    url: 'https://desolate-basin-69053.herokuapp.com/user/comments',
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    dataType: "json",
    headers: { 'x-access-token': tokens },
    data: JSON.stringify({
      "username": username
    }),
    success: function (data) {
      console.log("comments")
      var log = "";
      logs = []
      for (var i = 0; i < data.comments.length; i++) {
      log += '<div class="row no-gap">';
      log += '<div class="col-75">';
      log += '<div class="title"><a href="#"><b>';
      log += data.comments[i].user_fname + ' ' + data.comments[i]. user_lname + '</b></a>';
      log += '</div>';
      log += '<div class="comment-box" style="padding: 2%;">' + data.comments[i].comment + '</div>';
      log += '</div></div><hr>';
      }
      $('#myprofilecomments').append(log);
    },
    error: function (data) {
    }
  });
}

app.init();
