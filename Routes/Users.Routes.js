
module.exports = (router, auth)=>{

    router.get('/signin', (req, res)=>{
        res.render('signin',{
            title:"Sign-In"
        })
    })

    return router
}