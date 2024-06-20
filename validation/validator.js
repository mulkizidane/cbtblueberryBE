import validator from "validator";

export const validateNIP = {
    notNull: {
        msg: "NIP is required"
    },
    isInt: {
        msg: "NIP must be an integer"
    }
};

export const validateNIS = {
    notNull: {
        msg: "NIS is required"
    },
    isInt: {
        msg: "NIS must be an integer"
    }
};

export const validateName = {
    notNull: {
        msg: "Name is required"
    },
    notEmpty: {
        msg: "Name cannot be empty"
    },
}

export const validateUsername = {
    notNull: {
        msg: "Username is required"
    },
    notEmpty: {
        msg: "Username cannot be empty"
    },
    isAlphanumeric: {
        msg: "Username must be alphanumeric"
    }
}

export const validatePassword = {
    notNull: {
        msg: "Password is required"
    },
    notEmpty: {
        msg: "Password cannot be empty"
    },
    len: {
        args: [6, 100],
        msg: "Password must be at least 6 characters long"
    },
    isStrongPassword(value) {
        if (!value) {
            throw new Error('Password cannot be empty');
        }
        if (value.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(value)) {
            throw new Error('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(value)) {
            throw new Error('Password must contain at least one number');
        }
        if (!/[\W_]/.test(value)) {
            throw new Error('Password must contain at least one special character');
        }
    }
};


