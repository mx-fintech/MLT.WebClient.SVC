
module.exports = (router, auth)=>{

    router.get('/login', (req, res)=>{
        res.render('signin',{
            title:"Login",
            header:'secondary',
            session:{
                isLoggedIn:false
            }
        })
    })

    router.get('/register', (req, res)=>{
        res.render('signup', {
            title:"Register",
            header:'primary',
            session:{
                isLoggedIn:false
            }
        })
    })

    return router
}