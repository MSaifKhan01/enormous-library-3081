
const RoleBaseAuth = (role_array) => {
    //inner function
    return (req, res, next) => {
        const userrole = req.body
        if(role_array.includes(userrole.Role)){
            next()
        }
        else{
            res.send("not authorised")
        }
    }
}




module.exports = { RoleBaseAuth }