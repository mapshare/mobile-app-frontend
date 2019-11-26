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
      pattern: '^[0-9]+ .+$',
      message: '^Please enter a valid address'
    }
  },

  loactionPriceRange: {
    presence: {
      message: '^Price Range is required',
      allowEmpty: false
    }
  },

  locationReview: {
    presence: {
      message: '^Review is required',
      allowEmpty: false
    },
    length: {
      maximum: 150,
      message: '^Maximum of 200 characters'
    },
    format: {
      pattern: '.*[^ ].*',
      message: '^only white space is not allowed'
    }
  },

  postCaption:{
    length: {
      maximum: 100,
      message: '^Maximum of 100 characters'
    },
  }
};

export default validation;
