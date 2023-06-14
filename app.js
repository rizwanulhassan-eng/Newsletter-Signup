const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({urlencoded:true}));

app.use(express.static("public"))
app.get("/",function(req,res){
      res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
      const firstName=req.body.firstname;
      const lastName=req.body.lastname;
      const mail=req.body.email;
      const data={
            members:[
                  {
                        email_address: mail,
                        status: "subscribed",
                        merge_fields:{
                              FNAME:firstName,
                              LNAME:lastName
                        }
                  }
            ]
            
      };
      const jsonData=JSON.stringify(data);
      const url="https://us9.api.mailchimp.com/3.0/lists/3fb753ba45";
      const options={
            method : "POST",
            auth:"rizwanul:2d8f4f1322ee0e62d915dc541bbaa084-us9"
      };
      const request=https.request(url,options,function(response){
            response.on("data",function(data){
                  const data1=JSON.parse(data);
                  console.log(data1);
                  console.log(response.statusCode);
                  if(response.statusCode===200){
                        res.sendFile(__dirname+"/success.html");
                  }
                  else{
                        res.sendFile(__dirname+"/failure.html");
                  }
            });
      });
      request.write(jsonData);
      request.end();
      
})

app.post("/failure",function(req,res){
      res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
      console.log("ok");
});

//api key
//2d8f4f1322ee0e62d915dc541bbaa084-us9
//audience id/list id
//3fb753ba45