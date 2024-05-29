var express = require('express');
var router = express.Router();
const upload = require('../fileupload/single');
const MySql = require("../modules/mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");




const usercon = {
    signup: async (req, res) => {
        try {
            upload(req, res, async function(err) {
                if (err) {
                    console.error("Error uploading files: " + err);
                    return res.status(400).json({
                        error: err.message
                    });
                }
                const user = {
                  ...req.body,
                  password :await bcrypt.hash(req.body.password, 10),
                  file: req.file.filename
                };


                if (user.name !== null && user.name !== '') {
                    if (user.email !== null && user.email !== '') {
                        if (user.birthday !== null && user.birthday !== '') {
                            if (user.gender !== null && user.gender !== '') {
                                if (user.place !== null && user.place !== '') {
                                    if (user.city !== null && user.city !== '') {
                                        if (user.disease !== null && user.disease !== '') {
                                            if (user.phone !== null && user.phone !== '') {
                                                if (user.password !== null && user.password !== '') {
                                                    if (user.file.filename !== null && user.file.filename !== '') {
                                                            const result = await MySql.signup(user);
                                                          
                                                            return res.status(200).json(result);

                                                    } else {
                                                        return res.status(400).json({
                                                            error: 'missing password'
                                                        });
                                                    }
                                                } else {
                                                    return res.status(400).json({
                                                        error: 'missing password'
                                                    });
                                                }
                                            } else {
                                                return res.status(400).json({
                                                    error: 'missing password'
                                                });
                                            }
                                        } else {
                                            return res.status(400).json({
                                                error: 'missing password'
                                            });
                                        }
                                    } else {
                                        return res.status(400).json({
                                            error: 'missing password'
                                        });
                                    }
                                } else {
                                    return res.status(400).json({
                                        error: 'missing password'
                                    });
                                }
                            } else {
                                return res.status(400).json({
                                    error: 'missing password'
                                });
                            }
                        } else {
                            return res.status(400).json({
                                error: 'missing password'
                            });
                        }
                    } else {
                        return res.status(400).json({
                            error: 'missing password'
                        });
                    }
                } else {
                    return res.status(400).json({
                        error: 'missing password'
                    });
                }

            });
        } catch (error) {
            console.error("Error in registration route:", error);
            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            });
        }
    },

    login: async function (req, res) {
        try {
            const { email, password } = req.body;
            // console.log(req.body);
            
            const result = await MySql.login(email,password,res);
            return res.status(200).json({ status: 'success', message: result });
        } catch (err) {
            return res.send(err);
        }
    },

    forget:async (req,res)=>{
        try{
            const { email,name,password} = req.body;
           
            const result = await MySql.forget(email,name,password);
            console.log(result);
            return res.status(200).json({status:"success", message: result});
        }
        catch(err){
            console.error("Error in forget function:", err);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    },
    d_avail:async (req,res)=>{
        try{
            const result = await MySql.d_avail();
            return res.status(200).json({ status: 'success', message: result });
        }
        catch(err){
            console.error("Error in davail function:", err);
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    },


};

module.exports = usercon;