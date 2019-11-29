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

  markName: {
    presence: {
      message: '^Location name is required',
      allowEmpty: false
    },
    length: {
      maximum: 20,
      message: '^Maximum of 30 characters'
    },
    format: {
      pattern: '.*[^ ].*',
      message: '^only white space is not allowed'
    }
  },

  locationAddress: {
    presence: {
      message: '^Location Address is required',
      allowEmpty: false
    },
    format: {
      pattern: '.*[^ ].*',
      message: '^only white space is not allowed'
    }
  },

  loactionPriceRange: {
    presence: {
      message: '^Price Range is required',
      allowEmpty: false
    }
  },

  additionalInformation: {
    presence: {
      message: '^Description is required',
      allowEmpty: false
    },
    length: {
      maximum: 150,
      message: '^Maximum of 150 characters'
    },
    format: {
      pattern: '.*[^ ].*',
      message: '^only white space is not allowed'
    }
  },

  postCaption: {
    presence: {
      message: '^Caption is required',
      allowEmpty: false
    },
    length: {
      maximum: 100,
      message: '^Maximum of 100 characters'
    },
  },

  chatMessage: {
    presence: {
      message: '^A Message is required',
      allowEmpty: false
    },
    length: {
      maximum: 100,
      message: '^Maximum of 100 characters'
    },
  },

  groupNamePresent: {
    presence: {
      message: '^A Group Name is required',
      allowEmpty: false
    },
  },

  groupNameMinLength: {
    length: {
      minimum: 3,
      message: '^Group Name must be at least 3 characters',
    }
  },

  groupNameMaxLength: {
    length: {
      maximum: 15,
      message: '^Group Name must be less than 15 characters',
    }
  },

  groupDescriptionPresent:{
    presence: {
      message: '^A Group Description is required',
      allowEmpty: false
    },
  },

  groupDescriptionMaxLength:{
    length: {
      maximum: 50,
      message: '^Group Description must be less than 50 characters',
    }
  },
};

export default validation;
