const service=require("./service")
const xlsx=require("xlsx")

const uploadXlFile = async (req, res) => {
    try {
        if (req.file == undefined) {
            res.send({ code: 400, Message: "Please upload file..!" });
        }
        let path = "./files/" + req.file.filename;

        const workbook = xlsx.readFile(path);
        const worksheet = workbook.Sheets['Employeedetails'];
        const data = xlsx.utils.sheet_to_json(worksheet);

        for (let item of data) {
            
            const empDetailsData = {
                Company_Name: item.Company_Name,
                Employee_id: item.Employee_id,
                Employee_Name: item.Employee_Name,
                Gender: item.Gender,
                Date_of_Joining: item.Date_of_Joining,
                Location: item.Location
            };

            const payrollDetailsData = {
                Employee_id: item.Employee_id,
                Salary: item.Salary,
                Basic: item.Basic,
                HRA: item.HRA,
                Conveyance: item.Conveyance,
                Other_allowance: item.Other_allowance,
                LOP: item.LOP,
                Month: item.Month,
                Year: item.Year,
                Designation: item.Designation,
                PAN: item.PAN,
                Bank_AC_Number: item.Bank_AC_Number
            };

            await service.saveEmpDetails(empDetailsData);
            await service.savePayrollDetails(payrollDetailsData);
        }
        res.send({ code: 200, Message: "File uploaded successfully..!" });
    } catch (error) {
        res.send({ code: 400, Message: "Something went wrong" });
    }
};

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