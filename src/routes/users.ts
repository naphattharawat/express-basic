import { NextFunction, Request, Response } from "express";

import { UsersModel } from "../model/users";
const usersModel = new UsersModel();

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const rs:any = await usersModel.getList(req.db);
        res.send({ok:true,rows:rs})
    } catch (error) {
        res.send({ok:false,error:error})
    }
});


module.exports = router;
