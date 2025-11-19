import Department from "../models/department.js";

export const createDepartment = async (req, res) => {
  try {
    const { code, name, location } = req.body;
    const newDepartment = new Department({ code, name, location });
    await newDepartment.save();
    res.status(201).json({ message: "Department created successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { code, name, location } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { code, name, location },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};