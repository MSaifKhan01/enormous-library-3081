const Redis=require("ioredis")
require("dotenv").config()

const configuartion={
    port:19979,
    host:"redis-19979.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    username:"default",
    password:process.env.redis_Key
}

//newKey=GIBnvjlzFfG7q0Cz5TyQd9rJX4N8GadZ

const redis=new Redis(configuartion)

module.exports={redis}