const mongoose=require("mongoose")
// const { String } = require("mongoose/lib/schema/index")

const payslipSchema=mongoose.Schema({
    Company_Name:String,
    Employee_id:String,
    Employee_Name:String,
    Gender:String,
    Date_of_Joining:String,
    Location:String,
    Salary:String,
    Basic:String,
    HRA:String,
    Conveyance:String,
    Other_allowance:String,
    LOP:String,
    Month:String,
    Year:String,
    Designation:String,
    PAN:String,
    Bank_AC_Number:String
})

const model=mongoose.model("payslip",payslipSchema)

const savePayslip=async(data)=>{
    console.log(data);
if (data.lenth!=0) {
    const details=new model(data)
    const savexlxs=await details.save()
    return savexlxs
} else {
    return false
}
}

const updatePayslip=async(data)=>{

}

const retrivePayslip=async(data)=>{
    console.log(data);
    let getInfo
    if (data.emp_id!=undefined&&data.month!=undefined&&data.year!=undefined) {
        getInfo=await model.aggregate([
            {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}}
           ])
    }
    else{
        getInfo=false
    }
     
   return getInfo
}

module.exports={
    savePayslip,
    updatePayslip,
    retrivePayslip
}