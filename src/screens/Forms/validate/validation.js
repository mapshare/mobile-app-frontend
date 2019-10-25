const validation = {
    
    firstName: {
        presence: {
            message: '^Please enter a first name',
            allowEmpty: false
        }
    },

    lastName: {
        presence: {
            message: '^Please enter a last Name',
            allowEmpty: false
        }
    },

    email: {
        presence: {
            message: '^Please enter a email address',
            allowEmpty: false
        },
        email: {
            message: '^Please enter a valid email address'
        }
    },

    password: {
        presence: {
            message: '^Please enter a password',
            allowEmpty: false
        },
        length: {
            minimum: 5,
            message: '^Your password must be at least 5 characters'
        }
    },
}

export default validation
