import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName1: {
      type: String,
      required: true,
    },
    lastName2: {
      type: String,
    },
    departmentCode: {
      type: String,
      required: true,
      ref: "Department",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;