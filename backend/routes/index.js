import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import employeeRoutes from './employees.routes.js';
import departmentRoutes from './department.routes.js';
import validateToken from '../middlewares/validate-token.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', validateToken, userRoutes);
router.use('/employees', validateToken, employeeRoutes);
router.use('/departments', validateToken, departmentRoutes);

export default router;