const express=require("express")
const fs=require("fs")
const path=require("path")
const site= express()
const mongoose=require("mongoose")
const data=require("./models/data")
const User = require("./models/data")
const { values } = require("lodash")
const dbURL="mongodb+srv://Aakash:Aakash19999033@nodejs.dbnjviq.mongodb.net/?retryWrites=true&w=majority"

site.set("view engine","ejs")
//site.listen(7456)

site.use(express.urlencoded({extended: true})) //Aways use whenever we use post request

mongoose.connect(dbURL).then(()=>{
     site.listen(7456)
    console.log("listen to the port number 7456 on localhost")
    console.log("mongodb is connected Successfully")
}).catch((err)=>{
   console.log(err)
})

//site.get("/adduser",(req,res)=>{
   
  //   const user=new User({
    //  FirstName:"Aakash",
      //SurName:"Verma",
      //Email:"aakashvermartk@gmail.com",
      //Password:"Aakashvermaa",
     //})

//     user.save().then((result)=>{
           //  res.send(result)
    // }).catch((err)=>{
      //      console.log(err)
    // })
//})

site.post("/addnewuser",(req,res)=>{
       
  //console.log(req.body)
  const user=new User(req.body)
  user.save().then((result)=>{
          res.send("Register Successfully")
          console.log(result)
  }).catch((err)=>{ 

    console.log(err)

  })
})

site.get("/deletedata",(req,res)=>{
  User.deleteMany()
})

site.post("/userlogin",(req,res)=>{
      User.find().then((result)=>{
        var m=0

        result.forEach((db)=>{
          if(db.Email==req.body.Email)
          {
            if(db.Password==req.body.Password)
            {
              res.render("index",{title:"Social Media",Fname:db.FirstName,Sname:db.SurName})
               m=1
            }
          }
        })

        if(m==0)
        {
          res.send("wrong username password")
        }

      }).catch((err)=>{
         console.log(err)
      })
     // console.log(req.body.Email)
     // console.log(req.body.Password)
})

site.use(express.static(path.join(__dirname,"public")))

site.get("/register",(req,res)=>{
  //  res,sendFile("register.html",{root:__dirname})
    res.render("register",{title:"Register Page"})
})

site.get("/login",(req,res)=>{
   // res.sendFile("login.html",{root:__dirname})
   res.render("login",{title:"login Page"})
})

//site.get("/profile",(req,res)=>{
   // res.sendFile("index.html",{root:__dirname})
  //  res.render("index",{title:"Social Media"})
//})

 site.get("/about",(req,res)=>{
  res.render("about",{title:"About Page"})
 })

 site.get("/register.ejs",(req,res)=>{
  res.redirect("/register")
 })

 site.get("/login.ejs",(req,res)=>{
  res.redirect("/login")
})

 site.get("/index.ejs",(req,res)=>{
  res.redirect("/profile")
 })

 site.get("/about.ejs",(req,res)=>{
  res.redirect("/about")
 })

site.use((req,res)=>{
  //  res.sendFile("404.html",{root:__dirname})
    res.render("404",{title:"404 Error"})
})

