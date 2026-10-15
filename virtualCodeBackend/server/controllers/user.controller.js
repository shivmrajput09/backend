import User from "../models/userModel";

export const home =  (req, res) => {
    res.json({ name: "shivam", age: 22 });
}


export const home1 = (req, res) => {
    console.log(req.body);
    res.send({ success: true });
}

export const create = async (req, res) => {
            try {
                let { name, age, email, userName } = req.body;
                const newUser = await User.create({
                    name,
                    age,
                    email,
                    userName
                });
                return res.status(201).json({ message: "User Create Succesfully.", user: newUser });
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }


        export const readAlluser = async (req, res) => {
            try {
                const user = await User.findOne({ userName: req.params.userName });
                return res.status(200).json(user);
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        }

        export const read2 = async (req, res) => {
            try {
                const users = await User.find({ age: { $eq: 35 } });
                return res.status(200).json(users);
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        }

        export const update =   async (req, res) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { userName: req.params.userName }, 
                    req.body, 
                    { new: true } // new: true se database mein update hone ke baad naya data return hota hai
                );

                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json({ message: "User Updated Successfully", user: updatedUser });
                
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }


    export const delete1 = async (req, res) => {
            try {
                let { userName } = req.body;
                const deletedUser = await User.findOneAndDelete({ userName });
                
                if (!deletedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json({ message: "User Deleted Successfully", user: deletedUser });
            } catch (error) {
                return res.status(400).json({ message: "user not found" });
            }
        }
 
        
