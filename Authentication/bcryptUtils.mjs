import bcrypt from 'bcryptjs';

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

const comparePasswords = async (enteredPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};

export { encryptPassword, comparePasswords };
