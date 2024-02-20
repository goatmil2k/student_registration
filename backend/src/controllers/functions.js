const pool = require("../connectionPool/connectionPool");

const getAllStudents = async (req, res, next) => {
    try {
        const query = "SELECT * FROM general_info";
        const result = await pool.query(query);

        res.status(200).json(result.rows);
    } catch(err) {
        console.error("Error executing query: ", err );
        res.status(500).json({error: "Internal Server Error"});
    }
};

const getAStudent = async (req, res) => {
    const id = req.params.id;
    const studentData = await pool.query("SELECT * FROM general_info WHERE id = $1", [id]);

    if (studentData.rows.length === 0 ) {
        return res.status(404).send("Student not found");
    }
    try {
        const academicData = await pool.query("SELECT * FROM academic_info WHERE studentId = $1", [id]);

        if (academicData.rows.length !== 0) {
            res.status(200).json({generalInfo: studentData.rows, academicInfo: academicData.rows});
        }
        else {
            res.status(200).json({generalInfo: studentData.rows});
        }
    }catch(err) {
        console.error("Could not fetch data from database: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
    

    

}

const registerNewStudent = async (req, res) => {
    const { student_id, name, dob, gender, address, nrc, hobbies, region} = req.body;

    const parseSmallInt = (value) => (value === '' ? null : parseInt(value, 10));

    if(!student_id || !name || !dob || !gender || !address || !nrc || !region) {
        console.log("Error in the input");
        return res.status(400).json({error: "Some fields are missing"});
    }
    else {
        try {
            console.log(req.body);
            

            console.log("Querying.......");
            const photoBuffer = req.file.buffer;
            const query1 = 'INSERT INTO general_info (student_id, name, dob, gender, address, nrc, hobbies, region, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
            await pool.query(query1, [student_id, name, dob, gender, address, nrc, hobbies, region, photoBuffer]);

            if (req.body.academicInfo) {
                const academicInfo = JSON.parse(req.body.academicInfo);
                const query2 = 'SELECT id FROM general_info WHERE student_id = $1 AND name = $2 AND dob = $3 AND gender = $4 AND address = $5 AND region = $6 AND nrc = $7';
                const id = await pool.query(query2, [student_id, name, dob, gender, address, region, nrc]);
                if (id.rows.length === 0) {
                    console.log("Error inserting academic record");
                    res.status(500).json({error: "Internal Server Error"});
                }
                for (let i = 0; i < academicInfo.length; i++) {
                    const query3 =  "INSERT INTO academic_info (myanmar, english, math, student_year, studentId) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    
                    await pool.query(query3, [parseSmallInt(academicInfo[i].myanmar), parseSmallInt(academicInfo[i].english), parseSmallInt(academicInfo[i].math), parseSmallInt(academicInfo[i].year), id.rows[0].id]);
                }
            }        

            res.status(201).json({message: "Ok"});
        } catch(err) {
            console.error("Error executing query: ", err);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    
}

const updateStudentInfo = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    const studentData = await pool.query("SELECT * FROM general_info WHERE id = $1", [id]);


    if (studentData.rows.length === 0 ) {
        return res.status(404).send("Student not found");
    }

    const parseSmallInt = (value) => {
        if (value == '' || value == null) {
            return null
        }
        else {
            return parseInt(value, 10);
        };
    }
    const { student_id, name, dob, gender, address, nrc, hobbies, region } = req.body;



    if(!req.file) {
        if (!student_id || !name || !dob || !gender || !region) {
            return res.status(400).json({message: 'Some fields are missing'});
        }
        try {
            const query = 'UPDATE general_info SET student_id = $1, name = $2, dob = $3, gender = $4, address = $5, nrc = $6, hobbies = $7, region= $8 WHERE id = $9';
            await pool.query(query, [student_id, name, dob, gender, address, nrc, hobbies, region, id])

            
            if (req.body.academicInfo) {
            const academicInfo = JSON.parse(req.body.academicInfo);
                for (let i = 0; i < academicInfo.length; i++) {
                    const query2 =  'UPDATE academic_info SET myanmar = $1, english = $2, math = $3, student_year = $4 WHERE id = $5 AND studentId = $6';
                    await pool.query(query2, [parseSmallInt(academicInfo[i].myanmar), parseSmallInt(academicInfo[i].english), parseSmallInt(academicInfo[i].math), parseSmallInt(academicInfo[i].student_year), academicInfo[i].id, id]);
    
                }
            }
            


            console.log("Data Updated");
            res.status(200).json({message: "Ok"});            
        }catch(err) {
            console.error("Error executing query: ", err);
            res.status(500).json({error: "Internal Server Error"});
        }   
    }
    else {
        if (!student_id || !name || !dob || !gender || !region) {
            return res.status(400).json({message: 'Some fields are missing'});
        }
        try {
            const phtoBuffer = req.file.buffer;
            const query = 'UPDATE general_info SET student_id = $1, name = $2, dob = $3, gender = $4, address = $5, nrc = $6, hobbies = $7, region = $8, photo = $9 WHERE id = $10';
            await pool.query(query, [student_id, name, dob, gender, address, nrc, hobbies, region, phtoBuffer, id]);
            
            if (req.body.academicInfo) {
                const academicInfo = JSON.parse(req.body.academicInfo);
                    for (let i = 0; i < academicInfo.length; i++) {
                        const query2 =  'UPDATE academic_info SET myanmar = $1, english = $2, math = $3, student_year = $4 WHERE id = $5 AND studentId = $6';
                        await pool.query(query2, [parseSmallInt(academicInfo[i].myanmar), parseSmallInt(academicInfo[i].english), parseSmallInt(academicInfo[i].math), parseSmallInt(academicInfo[i].student_year), academicInfo[i].id, id]);
        
                    }
                }
            console.log("Data Updated");
            res.status(200).json({message: "Ok"});
        } catch(err) {
            console.error("Error executing query: ", err);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
        
}
    

const addAcademicInfo = async (req, res) => {
    console.log("Function called");
    const {myanmar, english, math, student_year} = req.body;
    const id = req.params.id;
    const parseSmallInt = (value) => (value === '' ? null : parseInt(value, 10));
    try {
        console.log("Adding>>>");
        const query = "INSERT INTO academic_info (myanmar, english, math, student_year, studentId) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const result = await pool.query(query, [parseSmallInt(myanmar), parseSmallInt(english), parseSmallInt(math), parseSmallInt(student_year), id]);
        res.status(200).json({message: 'Ok', newAcademicInfo: result.rows[0]});
    }catch(err) {
        console.log("Error executing query", err.message);
    }
}

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    const studentData = await pool.query("SELECT * FROM general_info WHERE id = $1", [id]);

    if (studentData.rows.length === 0 ) {
        return res.status(404).send("Student not found");
    }

    try {
        const deleteAcademicInfo = await pool.query("DELETE FROM academic_info WHERE studentId = $1", [id]);
        const deleteGeneralInfo = await pool.query("DELETE FROM general_info WHERE id = $1", [id]);
        
        console.log("Data Deleted");
        res.status(200).json({message: "Ok"});
    }
    catch(err) {
        console.error("Error executing query: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const deleteARecord = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        console.log("Deleting>>>")
        const query = "DELETE FROM academic_info WHERE id = $1";
        await pool.query(query, [id]);
        res.status(200).json({message: "Ok"});
    }catch(err) {
        console.log("Error executing query: ", err);
        res.status(500).json({err: err.message});
    }
}

module.exports = {
    getAllStudents,
    getAStudent,
    registerNewStudent,
    updateStudentInfo,
    deleteStudent,
    deleteARecord,
    addAcademicInfo,
}