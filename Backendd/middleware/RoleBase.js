

function authorize(permitedRole) {
    return (req, res, next) => {
        if (permitedRole.includes(req.role)) {
            next()
        }else{
            return res.send("unAuthorised")
        }
    }
}




module.exports = { authorize }