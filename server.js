const express =require('express');
const hbs=require('hbs');
var app= express();
const fs=require('fs');
const port =process.env.PORT||3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log= `${now} :${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    {
      console.log("Unable to create Log");
    }
  })
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
//
// });adddadsa

hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
  //res.send("<h1>Hello Express!</h1>");
  // res.send({adddadsa
  //   name:'Pritish',
  //   likes:[
  //     'Biking' ,
  //     'Cities'
  //   ]
  // })
  res.render('home.hbs',{
    pageTitle:'Home page',
    message:'Welcome',
      //currentYear: new Date().getFullYear()
  });
});
app.get('/about',(req,res)=>{
  res.render("about.hbs",{
    pageTitle:'About page',
    //currentYear: new Date().getFullYear()
  });
});
app.get('/project',(req,res)=>{
  res.render("project.hbs",{
    pageTitle:'Project page',
    //currentYear: new Date().getFullYear()
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to Handle'
  })
});

//listen(port name)
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
