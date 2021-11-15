import { NextFunction, Request, Response } from "express";

import { UsersModel } from "../model/users";
const usersModel = new UsersModel();

var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const rs: any = await usersModel.getList(req.db);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.get('/info', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.query.id;
        const rs: any = await usersModel.info(req.db, +id);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        if (body.first_name && body.last_name) {
            const rs: any = await usersModel.saveUser(req.db, body);
            res.send({ ok: true, rows: rs })
        } else {
            res.send({ ok: false, error: 'ไม่พบ parameter' })
        }
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        const rs: any = await usersModel.delete(req.db, +id);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});

router.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
    try {
        const id: any = req.params.id;
        const body: any = req.body;
        const rs: any = await usersModel.update(req.db, +id, body);
        res.send({ ok: true, rows: rs })
    } catch (error) {
        res.send({ ok: false, error: error })
    }
});


module.exports = router;
