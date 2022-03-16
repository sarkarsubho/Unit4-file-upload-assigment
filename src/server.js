const app=require("./index");

const Connect=require("./config/db");

app.listen(5000,async ()=>{
    try{
        await Connect();
            console.log ("listning on the port 5000");
    }catch(err){
        console.error(err.message)
    }
    
})


