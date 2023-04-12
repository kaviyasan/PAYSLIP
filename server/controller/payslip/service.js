const mongoose = require("mongoose")
const empDetailsSchema = mongoose.Schema({
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String
});

const empDetailsModel = mongoose.model("empdetails", empDetailsSchema);


const payrollDetailsSchema = mongoose.Schema({
    Employee_id: String,
    Salary: String,
    Basic: String,
    HRA: String,
    Conveyance: String,
    Other_allowance: String,
    LOP: String,
    Month: String,
    Year: String,
    Designation: String,
    PAN: String,
    Bank_AC_Number: String
});

const payrollDetailsModel = mongoose.model("payrolldetails", payrollDetailsSchema);

const saveEmpDetails = async (data) => {
    console.log(data);
    if (data.length != 0) {
        const empDetails = new empDetailsModel(data);
        const savedEmpDetails = await empDetails.save();
        return savedEmpDetails;
    } else {
        return false;
    }
};

const savePayrollDetails = async (data) => {
    console.log(data);
    if (data.length != 0) {
        const { Employee_id, Salary, LOP, Month, ...rest } = data; 
        const salary = parseFloat(Salary); 
        const lop = parseInt(LOP); 
        const daysInMonth = new Date(new Date().getFullYear(), new Date(Date.parse(Month + " 1, 2022")).getMonth() + 1, 0).getDate(); // Get number of days in the month
        let calculatedSalary = salary; 

        if (lop > 1) { 
            const dailySalary = salary / daysInMonth; 
            const salaryToDeduct = lop * dailySalary; 
            calculatedSalary -= salaryToDeduct; 
        }

        calculatedSalary = Math.round(calculatedSalary); 

        const payrollDetails = new payrollDetailsModel({
            Employee_id,
            Salary: calculatedSalary.toString(),
            LOP: LOP.toString(),
            ...rest
        });
        const savedPayrollDetails = await payrollDetails.save();
        return savedPayrollDetails;
    } else {
        return false;
    }
};







const getEmpDetailsById = async (employeeId) => {
    try {
        const empDetails = await empDetailsModel.findOne({ Employee_id: employeeId });
        return empDetails;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getPayrollDetails = async (employeeId, month, year) => {
    try {
        const payrollDetails = await payrollDetailsModel.find({ Employee_id: employeeId, Month: month, Year: year });
        return payrollDetails;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch payroll details");
    }
};


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
    saveEmpDetails,
    savePayrollDetails,
    updatePayslip,
    retrivePayslip,
    getEmpDetailsById,
    getPayrollDetails
}