const service=require("./service")
const xlsx=require("xlsx")

const uploadXlFile=async(req,res)=>{
    try {
        if (req.file==undefined) {
            res.send({code:400,MessageL:"Please upload file..!"})
        }
        let path="./files/"+ req.file.filename
        
        const workbook=xlsx.readFile(path)
        // console.log(workbook);
        const worksheet=workbook.Sheets['Employeedetails']
        // console.log(worksheet);
        var data=xlsx.utils.sheet_to_json(worksheet)
// console.log(data);
        for(let item of data){
         var saveDetail=await service.savePayslip(item)
        }
        res.send({code:200,Message:"file Upload..!"})
        //  console.log(saveDetail);
    } catch (error) {
        // console.log(error);
        res.send({code:400,Message:"Something went wrong"})
    }
}

const retriveDetail=async(req,res)=>{
    const data=await service.retrivePayslip(req.query)
    res.send({code:200,Message:"success",result:data})
    console.log(data);
}

const getData=async(req,res)=>{
    var emp_id=req.body.Employee_id
    var month=req.body.Month
    var year=req.body.Year
    console.log(month);

    const data=await service.retrivePayslip({emp_id,month,year})
    res.send(data)
}



module.exports={
    uploadXlFile,
    retriveDetail,
    getData
}