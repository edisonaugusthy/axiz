import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteMessageService {

  constructor() { }

  deleteChain(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }


  deleteCompany(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }


  deleteCompanyAcess(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }

  deleteCostCenterAcess(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }

  deleteLocation(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }

  deleteUser(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }

  deleteAdminUser(item) {
    return {
      header: 'Warning',
      message: 'Are you sure you want to delete ?',
      itemDetails: item
    }
  }
}
