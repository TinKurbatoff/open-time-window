"use strict";
const express = require('express');
import { Request, Response } from 'express';
const app = express();
const PORT = 3000;

var DATA_BASE = { users:[{"admin": "adminPassword"},], data:[]}

app.use(express.json());

app.post('/register', (req: Request, res: Response) => {
  let newUser: any = {};
  let loginInfo = req.body;
  let newUserName: any = '';
  let reply: string = 'Fail';
  console.log('———————');
  console.log(loginInfo);
  if ("login" in loginInfo) {
  	newUserName = loginInfo.login;
  	newUser[newUserName] = '';
  } else {
  	res.status(400);
  	res.send("No login specified");
  	return
  }

  if ("password" in loginInfo) {
  	newUser[newUserName] = loginInfo.password;
  } else {
  	res.status(400);
  	res.send("No password specified")
  	return
  }  
  // Save user
  var alreadyRegistered: boolean = DATA_BASE.users.filter(function (user) {
        return user.hasOwnProperty(newUserName);
      }).length > 0;

  if (!alreadyRegistered) 
    {
      DATA_BASE.users.push(newUser);
      reply = `New user ${newUserName} created.`;
    } else {
      reply = `User ${newUserName} is already exists`;
    }
  console.log("-= DATA_BASE =-\n", DATA_BASE);

  res.status(200);
  res.send(reply)
})


app.post('/login', (req: Request, res: Response) => {
  res.send("PUT Request Called")
})

app.get('/getinfo', (req: Request, res: Response) => {

  })

app.listen(PORT, function(err: Error){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 