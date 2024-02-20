import axios from 'axios';

const getAllStudents = async () => {
    try {
      const res = await axios.get('/students');
  
      if (res.status !== 200) {
        throw new Error("Unable to fetch data");
      }
  
      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw new Error("Unable to fetch data");
    }
  };

const registerNewStudent = async (payload) => {
  try {
    const res = await axios.post('/students/register', payload );
    if (res.status !== 201) {
      throw new Error("Unable to register");
    }
    const data = await res.data;
    console.log(data);
    return data;
  }catch(error) {
    console.error("Error registering student", error.message);
    throw new Error("Unable to register");
  }
}

const getAStudent = async (id) => {
  try {
    const res = await axios.get(`/students/${id}`);
    if (res.status !== 200) {
      throw new Error("Unable to make request");
    }
    
    
    const data = await res.data;
    return data;

  }catch(err) {
    console.log("Error fetching student informations", err.message);
    throw new Error("Unbale to fetch data");
  }

}

  const addAcademicInfo = async (id, myanmar, english, math, student_year) => {
    console.log(id);
    try {
      console.log("trying");
      const res = await axios.post(`/students/addarecord/${id}`, {myanmar, english, math, student_year});

      if (res.status !== 200) {
        console.log("Unable to add new record");
      }
       
      return res;
      
    }catch(err) {
      console.log("Error adding a new academic record", err.message);
      throw new Error('Unable to add new academic record');
    }
  }


const updateStudentInfo = async (id, formData) => {
  try {
    const res = await axios.put(`/students/updatedata/${id}`, formData);

    if (res.status !== 200) {
      console.log("Unable to update student data");
    }

    else {
      console.log(res.data);
    }
     
    return res;
    
  }catch(err) {
    console.log("Error updating student information", err.message);
    throw new Error('Unable to update information');
  }
}

const deleteStudentInfo = async (id) => {
  
  try {
    const res = await axios.delete(`/students/deletedata/${id}`);
    return res.data;
  }catch(err) {
    console.log("Could not delete student data", err.message);
  }
}

const deleteARecord = async (id) => {
  try {
    const res = await axios.delete(`/students/deleterecord/${id}`);
    return res;
  }catch(err) {
    console.log("Could not delete record", err.message);
  }
}
const helpers = {
  getAllStudents,
  registerNewStudent,
  getAStudent,
  addAcademicInfo,
  updateStudentInfo,
  deleteStudentInfo,
  deleteARecord,
}

export default helpers;
