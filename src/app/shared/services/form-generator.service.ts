import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  constructor() { }

  editChain(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['chainname'] : '',
        key: 'chainname',
        label: 'Chain Name',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['chaincode'] : '',
        key: 'chaincode',
        label: 'Chain Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit Chain',
      fields: data
    };
    return formData;
  }
  editLocation(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['chaincode'] : '',
        key: 'chaincode',
        label: 'Chain Code',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['locationcode'] : '',
        key: 'locationcode',
        label: 'Location Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['locationname'] : '',
        key: 'locationname',
        label: 'Location Name',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit Location',
      fields: data
    };
    return formData;
  }
  editUser(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['user_id'] : '',
        key: 'userid',
        label: 'User ID',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['user_name'] : '',
        key: 'username',
        label: 'User Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['user_phone'] : '',
        key: 'mobile',
        label: 'Mobile',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['user_email'] : '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 4,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['UDID'] : '',
        key: 'udid',
        label: 'UDID',
        required: true,
        order: 5,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['LoginPin'] : '',
        key: 'loginpin',
        label: 'Password',
        required: true,
        order: 6,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit User',
      fields: data
    };
    return formData;
  }
  editCostCenterAccess(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['id'] : '',
        key: 'id',
        label: 'Id',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['chain_code'] : '',
        key: 'chain_code',
        label: 'Chain Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['chain_name'] : '',
        key: 'chain_name',
        label: 'Chain Name',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit Cost Center Access',
      fields: data
    };
    return formData;
  }
  editUsersInSuperAdmin(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['user_id'] : '',
        key: 'user_id',
        label: 'Id',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['user_name'] : '',
        key: 'user_name',
        label: 'Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['company'] : '',
        key: 'company',
        label: 'Company',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['email'] : '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['password'] : '',
        key: 'password',
        label: 'Password',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit User',
      fields: data
    };
    return formData;
  }
  editCompanyAccess(currentValuse, companies) {
    let data = [
      {
        value: currentValuse ? currentValuse['UserID'] : '',
        key: 'userid',
        label: 'User ID',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: '',
        disabled: true
      },
      {
        value: currentValuse ? currentValuse['CompanyID'] : '',
        key: 'companyid',
        label: 'Company',
        required: true,
        order: 2,
        controlType: 'dropdown',
        type: '',
        options: companies,
        displayKey: 'CompanyName',
        returnKey: 'CompanyID'
      },
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit Company Access',
      fields: data
    };
    return formData;
  }
  editCompany(currentValuse) {
    let data = [
      {
        value: currentValuse ? currentValuse['company_code'] : '',
        key: 'company_code',
        label: 'Company Code',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['company_name'] : '',
        key: 'company_name',
        label: 'Company Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['address'] : '',
        key: 'address',
        label: 'Address',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['mobile'] : '',
        key: 'mobile',
        label: 'Mobile',
        required: true,
        order: 4,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['email'] : '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 5,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['headof'] : '',
        key: 'headof',
        label: 'Head Office',
        required: true,
        order: 6,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: currentValuse ? currentValuse['headofloc'] : '',
        key: 'headofloc',
        label: 'Head Office Location',
        required: true,
        order: 7,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Edit Company',
      fields: data
    };
    return formData;
  }


  AddChain() {
    let data = [
      {
        value: '',
        key: 'chainname',
        label: 'Chain Name',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'chaincode',
        label: 'Chain Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'companycode',
        label: 'Company Code',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add Chain',
      fields: data
    };
    return formData;
  }
  addCompany() {
    let data = [
      {
        value: '',
        key: 'company_name',
        label: 'Company Name',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'company_code',
        label: 'Company Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'address',
        label: 'Address',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'mobile',
        label: 'Mobile',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'headof',
        label: 'Head Office',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'headofloc',
        label: 'Office Location',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add Company',
      fields: data
    };
    return formData;
  }
  addCompanyAccess() {
    let data = [
      {
        value: '',
        key: 'users',
        label: 'Id',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'company',
        label: 'Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'headof',
        label: 'Head Office',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'headofloc',
        label: 'Head Office location',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add Company Access',
      fields: data
    };
    return formData;
  }
  addCostCenterAccess() {
    let data = [
      {
        value: '',
        key: 'id',
        label: 'Id',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'chain_code',
        label: 'Chain Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'chain_name',
        label: 'Chain Name',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add Cost Center Access',
      fields: data
    };
    return formData;
  }
  addUser() {
    let data = [
      {
        value: '',
        key: 'userid',
        label: 'User ID',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'username',
        label: 'User Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'mobile',
        label: 'Mobile',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 4,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'udid',
        label: 'UDID',
        required: true,
        order: 5,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'loginpin',
        label: 'Login Pin',
        required: true,
        order: 6,
        controlType: 'number',
        type: '',
        regex: '',
        options: ''
      },
      {
        value: '',
        key: 'company',
        label: 'Company',
        required: false,
        order: 7,
        controlType: 'textbox',
        type: '',
        options: ''
      },
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add User',
      fields: data
    };
    return formData;
  }
  addLocation() {
    let data = [
      {
        value: '',
        key: 'chaincode',
        label: 'Chain Code',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'locationcode',
        label: 'Location Code',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'locationname',
        label: 'Location Name',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      // {
      //   value: "",
      //   key: "company_code",
      //   label: "Company Code",
      //   required: true,
      //   order: 4,
      //   controlType: "textbox",
      //   type: "",
      //   options: ""
      // }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add Location',
      fields: data
    };
    return formData;
  }
  addUsersInSuperAdmin() {
    let data = [
      {
        value: '',
        key: 'user_id',
        label: 'Id',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'user_name',
        label: 'User Name',
        required: true,
        order: 2,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'company',
        label: 'Company',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'email',
        label: 'Email',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      },
      {
        value: '',
        key: 'password',
        label: 'Password',
        required: true,
        order: 3,
        controlType: 'textbox',
        type: '',
        options: ''
      }
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Add User',
      fields: data
    };
    return formData;
  }

  SuperAdminLoginForm(val) {
    let data = [
      {
        value: 'Super Admin',
        key: 'email',
        label: 'Super Admin',
        required: true,
        order: 1,
        controlType: 'textbox',
        type: '',
        options: '',
        disabled: true
      },
      {
        value: '',
        key: 'admincode',
        label: 'Code',
        required: true,
        order: 2,
        controlType: 'number',
        type: '',
        options: ''
      },
    ];
    data = data.sort((a, b) => a.order - b.order);
    const formData = {
      header: 'Super Admin login',
      fields: data,
      buttonText: 'Login'
    };
    return formData;
  }
}
