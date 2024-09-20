import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
};

export const listUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await User.find({});
        if(!users) {
            return res.status(204).send()
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: "Error finding users"})
    }
}
