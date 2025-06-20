const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');

const Employee = require('./models/employee');
const Attendance = require('./models/attendance');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Priyanshu:Priyanshu@cluster0.gq57ufs.mongodb.net/employeeDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.post('/addEmployee', async (req, res) => {
    try {
        console.log("Received Employee Data in Backend:", req.body);

        const { employeeName, employeeId, phoneNumber, designation, dateOfBirth, joiningDate, activeEmployee, salary, address } = req.body;

        if (!employeeName || !employeeId || !phoneNumber || activeEmployee === undefined || !designation || !salary || !address || !joiningDate || !dateOfBirth) {
            return res.status(400).json({ message: "Missing one or more required fields from frontend data." });
        }

        const newEmployee = new Employee({
            employeeName,
            employeeId,
            phoneNumber,
            designation,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
    }
    catch (error) {
        console.error("Error Creating Employee (Backend):", error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ message: "Validation Failed", errors: errors });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: "Employee with this ID already exists." });
        }
        res.status(500).json({ message: "Failed to add an Employee", error: error.message });
    }
});

app.get('/Employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees (Backend):", error);
        res.status(500).json({ message: "Failed to fetch employees" });
    }
});

app.post("/attendance", async (req, res) => {
    try {
        const { employeeId, employeeName, date, status } = req.body;

        const attendanceDate = moment(date, 'MMMM D,YYYY').startOf('day').toDate();

        const existingAttendance = await Attendance.findOne({
            employeeId,
            date: attendanceDate
        });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(200).json(existingAttendance);
        } else {
            const newAttendance = new Attendance({
                employeeId,
                employeeName,
                date: attendanceDate,
                status
            });
            await newAttendance.save();
            res.status(200).json(newAttendance);
        }
    } catch (error) {
        console.error("Error processing attendance (Backend - POST):", error);
        res.status(500).json({ message: "Failed to process Attendance", error: error.message });
    }
});

app.get("/attendance", async (req, res) => {
    try {
        const { date } = req.query;

        const queryDate = moment(date, 'MMMM D,YYYY').startOf('day').toDate();

        const AttendanceData = await Attendance.find({ date: queryDate });
        res.status(200).json(AttendanceData);
    } catch (error) {
        console.error("Error fetching attendance (Backend - GET):", error);
        res.status(500).json({ message: "Failed to fetch Attendance", error: error.message });
    }
});

app.get("/attendace-report-all-employees", async (req, res) => {
    try {
        const { month, year } = req.query;
        console.log("query parameters:", month, year);

        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date" }, parseInt(month)] },
                            { $eq: [{ $year: "$date" }, parseInt(year)] }
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$employeeId",
                    present: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "Present"] }, then: 1, else: 0 },
                        },
                    },
                    absent: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "Absent"] }, then: 1, else: 0 },
                        },
                    },
                    halfday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "Half Day"] }, then: 1, else: 0 },
                        },
                    },
                    holidays: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "Holiday"] }, then: 1, else: 0 },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "employeeDetails",
                },
            },
            {
                $unwind: "$employeeDetails",
            },
            {
                $project: {
                    _id: 0,
                    employeeId: "$_id",
                    employeeName: "$employeeDetails.employeeName",
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    holidays: 1,
                },
            },
        ]);
        res.status(200).json(report);

    } catch (error) {
        console.error("Error fetching Summary Report (Backend):", error);
        res.status(500).json({ message: "Failed to fetch Summary Report", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});