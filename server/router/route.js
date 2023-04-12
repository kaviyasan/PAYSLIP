const express=require("express")
const router=express.Router()
const xlFile=require("../multer/xlsx")
const payslip=require("../controller/payslip/index")

let routes=(app)=>{
    router.post("/xlupload", xlFile.single("xlxs"),payslip.uploadXlFile)
    router.post("/getinfo",payslip.getData)

    app.use("/api",router)
}

module.exports=routes