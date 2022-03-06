     'use strict';
const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
 

/**
 * @swagger
 *     components:
 *       schemas: 
 *         User: 
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              id:
 *                type: string
 *                description: Auto generated ID for user 
 *              username:
 *                type: string
 *                description: Preferred username for the user
 *              password: 
 *                type: string
 *                description: Preferred password for the user (Hashed)
 *            example: 
 *              id: dbi7yedhbuo323
 *              username: Solomon Udumizi
 *              password: dcb8urbvp8uwrbvjndfipvnp4ruv-f9inerc9[sfkf4o04]
 */

// // Swagger for User Routes


 /**
  * @swagger
  *     tags: 
  *         name: User
  *         description: User managing API
  */


// //   End of reusable swagger component


/**
 * @swagger
 *      /user/:
 *        get:
 *          summary: Return all users in DB
 *          tags: [User]
 *          responses:
 *            "200":
 *              description: List of all users
 *              content: 
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items: 
 *                      $ref: '#/components/schemas/User'
 */


router.get('/user', async (req, res) => {
    // fetch users from db
    const getUser = await Promise.all([
        User.find()
    ]);
    try{
        res.json(getUser);
    }catch(err){ 
        console.debug(err)
    };
});

/**
 * @swagger
 *   /user/{id}:
 *      get: 
 *        summary: Get a single user by id
 *        tags: [User]
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             description: User ID 
 *           required: true
 *           description: User ID
 *        responses:    
 *          "200":
 *              description: User was returned
 *              content: 
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User' 
 *          "404":
 *              description: User was not found                  
 */

router.get('/user/:id', async (req, res) => {
    const checkID = req.params.id ;
    const singleUser = await Promise.all([
        User.findOne({ id: checkID })
    ]);
    try{
        if(!singleUser){
            res.sendStatus(404);
        }
        res.json(singleUser);
    }catch(err){ 
        console.debug(err)
    };
});


/**
 * @swagger
 *   /add/user:
 *      post:
 *          summary: Add a user to the db
 *          tags: [User]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 *          responses:
 *             "200":
 *                description: User was successfully created and added to the DB
 *                content:
 *                  application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/User'
 *             "404":
 *                 description: Server error occured in user creation
 *                      
 */

router.post('/add/user', async (req, res) => {
    const { username, password } = req.body ;
    const addUser = await Promise.all([
        User.create({ username, password }) 
    ]);
    try{
        if(!addUser){
            res.sendStatus(500);
        }
        res.json(addUser);
    }catch(err){ 
        console.debug(err)
    };
});

/**
 * @swagger
 *   /user/{id}/update:
 *      put:
 *        summary: Update user details to the database by ID
 *        tags: [User]
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             description: User ID 
 *        requestBody:
 *           required: true     
 *           content:
 *              application/json:
 *                schema:
 *                 $ref: '#/components/schemas/User'
 *        responses:
 *          "200":
 *             description: User was successfully updated
 *             content: 
 *                application/json:
 *                   schema: 
 *                     $ref: '#/components/schemas/User'
 *          "404":
 *             description: User was not found
 */


router.put('/user/:id/update', async (req,res) => {
    const userID = req.params.id;
    const { username, password } = req.body ;

    const updateUser = await Promise.all([
        User.findByIdAndUpdate(userID ,
            { $set: { "username": username, "password": password }}, { 
                upsert: true, 
                safe: true 
            })  
    ]);
    try{
        if(!updateUser){
            res.sendStatus(404);
        }
        res.json("User was successfully updated");
    }catch(err){ 
        console.debug(err)
    };
});


/**
 * @swagger
 *   /user/{id}/delete:
 *      delete: 
 *        summary: Delete user by ID from DB
 *        tags: [User]
 *        parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *             description: User ID 
 *           required: true
 *           description: User ID
 *        responses:    
 *          "200":
 *              description: User was successfully deleted
 *              content: 
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User' 
 *          "404":
 *              description: User was not found                  
 */


router.delete('/user/:id/delete', async (req, res) => {
    const userID  = req.params.id ;
    const deleteUser = await Promise.all([
        User.findOneAndDelete({ id: userID })
    ]);
    try{
        if(!deleteUser){
            res.sendStatus(404);
        }
        res.json("User was successfully removed from the DB");
    }catch(err){ 
        console.debug(err)
    };
});



module.exports = router ;