var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var mModel = mongoose.model('marksModel');


exports.loginFormHandler = function (req, res){
	req.session.destroy();
	res.render('login.handlebars', {});
};//loginPageHandler

exports.authHandler = function (req, res){
	var nmReq = req.body.nm;
	var pwdReq = req.body.pwd;
	var loginOutcome;

	mongoose.model('User').findOne({username:nmReq}, function(err, userObj){
	    if(userObj === null){
	     	loginOutcome = "Login Failed: User name does not exist in db";
        console.log( "Login Name %s, Password %s. Login outcome [%s]", nmReq, pwdReq, loginOutcome);
	     	res.render('landingpage.handlebars', {welcomeMessage:loginOutcome});
	    } else {  //userObj is Not NULL
	    	if(pwdReq === userObj.password) {
	    		loginOutcome = "Login successful";
          console.log( "Login Name %s, Password %s. Login outcome [%s]", nmReq, pwdReq, loginOutcome);
          res.render('landingpage.handlebars', {welcomeMessage:loginOutcome});
				} else{
				  loginOutcome = "Login Failed: Password did not match";
          console.log( "Login Name %s, Password %s. Login outcome [%s]", nmReq, pwdReq, loginOutcome);
          res.render('landingpage.handlebars', {welcomeMessage:loginOutcome});
		    }
		  }//userObj is Not NULL
		  
	});//findOne
}; //authHandler


//////////////////////////////////////////////////////////////////////////////////////////////////////


exports.resultFormHandler = function (req, res){
		res.render('resultForm.handlebars', {});
}; //resultFormHandlebars

//////////RESULT PAGE HANDLER/////////////////////////////
exports.resultPageHandler = function(req,res){
  var rollReq = req.body.roll;
  console.log("resultPageHandler Roll" + rollReq);

  mModel.findOne({roll:rollReq}, function(err, mrksRec){
    if (!err && mrksRec != null){
      mrksRec.total = parseInt(mrksRec.physics) 
                    + parseInt(mrksRec.chemistry) 
                    + parseInt(mrksRec.maths) 
                    + parseInt(mrksRec.computer) ;
      console.log(" Record found. total=%s", mrksRec.total);
      res.render('resultPage.handlebars', {marks:mrksRec});
    }else{
      res.render('landingpage.handlebars', {welcomeMessage:"No record found for Roll:" + rollReq});
    }
  });

  
}
///////////////////////////////////////////////////////////////////////
exports.registerFormHandler = function(req, res){
   res.render("register", {});
}; //registerFormHandler

exports.marksEntryForm = function(req, res){
   res.render("marksEntryForm.handlebars", {});
}; //marksEntryForm

exports.marksEntry = function(req, res){
   var nameReq = req.body.nm;////req=request
   var rollReq = req.body.roll;
   var physicsReq = req.body.physics;
   var chemistryReq = req.body.chemistry;
   var mathsReq = req.body.maths;
   var computerReq = req.body.computer;
   
   console.log("name=%s roll=%s",nameReq, rollReq );
   console.log("physics=%s chem=%s maths=%s comp=%s",physicsReq, chemistryReq ,mathsReq ,computerReq );
   
   var newmarks = new mModel();
   newmarks.xname = nameReq;
   newmarks.roll = rollReq;
   newmarks.physics = physicsReq;
   newmarks.chemistry = chemistryReq;
   newmarks.maths = mathsReq;
   newmarks.computer = computerReq;
  
   //save to db through model
   newmarks.save(function(errorx, savedRec){
       if(errorx){
         var message = "A entry already exists with that name or roll";
         console.log(message);
         res.render('landingpage.handlebars', {welcomeMessage:"Entry Submission failed"});
       }else{
         //req.session.newmarks = savedstudentsscorecard.marks;
         res.render('landingpage.handlebars', {welcomeMessage:"Entries Submitted succesfully"});
       }
   });
};//marksenterpageHandler




exports.registerUserHandler = function(req, res){
   var usernameReq = req.body.username;////req=request
   var emailReq = req.body.email;
   var passwordReq = req.body.password;

   var newuser = new User();
   newuser.username = usernameReq;
   newuser.email = emailReq;
   newuser.password = passwordReq;

   //save to db through model
   newuser.save(function(err, savedUser){
       if(err){
         var message = "A user already exists with that username or email";
         console.log(message);
         res.render("register", {errorMessage:message});
         return;
       }else{
         req.session.newuser = savedUser.username;
         res.render('landingpage.handlebars', {welcomeMessage:"Registration succesful"});
       }
   });
};//registerUserHandler
