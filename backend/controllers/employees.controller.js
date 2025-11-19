import employees from '../models/employees.js';

export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await employees.find();
    res.status(200).json(allEmployees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employees.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { code, firstName, lastName1, lastName2, departmentCode } = req.body;
  try {
    const newEmployee = new employees({
      code,
      firstName,
      lastName1,
      lastName2,
      departmentCode
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { code, firstName, lastName1, lastName2, departmentCode } = req.body;
  try {
    const updatedEmployee = await employees.findByIdAndUpdate(
      id,
      { code, firstName, lastName1, lastName2, departmentCode },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await employees.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};