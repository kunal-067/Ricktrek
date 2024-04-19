import bcrypt from 'bcrypt';
const salt_round = process.env.SALT_ROUND || 10;

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(salt_round);
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch (error) {
        throw new Error({message:'error in hashing password at hashpass util', error});
    }
}

export const matchPassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        if (match) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error({message:'error in matching password at hash util', error});
    }
}

// module.exports = {hashPassword, matchPassword}