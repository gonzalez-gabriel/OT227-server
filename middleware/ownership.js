'use strict';
const jwt            = require('jsonwebtoken');
const { response }   = require('express');
const { Role }  = require('../models');
const httpStatus = require('../helpers/httpStatus');

class Roles {

  static async adminRole( req, res = response, next) {  

    const token = req.headers.authorization.split(" ")[1];

    const { userId } = req.params;

    if ( !token && !userId ){
      return res.status(httpStatus.UNAUTHORIZED).json({
        msg: 'Not has token or userId in the request'
      });
    }
  
    const { id, roleId } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    if(userId !== id){
      return res.status(httpStatus.UNAUTHORIZED).json({
        msg: 'User not authorized for this action' 
      }) 
    }
        
    const roleDB = await Role.findByPk( roleId );
    if(!roleDB){
      return res.status(httpStatus.NOT_FOUND).json({
        msg: 'Role not found' 
      }) 
    }
    const role = 'Admin';
    
    if(roleDB.name === role){return next();}
  }
}

module.exports = Roles;