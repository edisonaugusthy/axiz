import { environment } from './../../../environments/environment';
// const version = 'http://iroidtechnologies.in/axis_laravel/api/';

const API_BASE_URL = environment.baseUrl;

export class ApiConstants {
    // super admin
    public static ADMIN_LOGIN = API_BASE_URL + 'user-admin/login';
    public static ADMIN_LOGOUT = API_BASE_URL + 'user-admin/logout';
    public static SECOND_LOGIN = API_BASE_URL + 'user/superadmin/secondlogin';

    public static SUPER_ADMIN_REGISTER_COMPANY = API_BASE_URL + 'admin/register/company';
    public static SUPER_ADMIN_DELETE_COMPANY = API_BASE_URL + 'admin/delete/company';
    public static SUPER_ADMIN_UPDATE_COMPANY = API_BASE_URL + 'admin/update/company';
    public static SUPER_ADMIN_COMPANY_TABLE = API_BASE_URL + 'admin/company';

    public static SUPER_ADMIN_CREATE_USER = API_BASE_URL + 'admin/register/user';
    public static SUPER_ADMIN_UPDATE_USER = API_BASE_URL + 'admin/update/user';
    public static SUPER_ADMIN_DELETE_USER = API_BASE_URL + 'admin/delete/user';
    public static SUPER_ADMIN_USER_TABLE = API_BASE_URL + 'admin/tabledata';

    public static SUPER_ADMIN_ADD_COMPANY_ACCESS = API_BASE_URL + 'admin/add/CompanyAccess';
    public static SUPER_ADMIN_UPDATE_COMPANY_ACCESS = API_BASE_URL + 'admin/update/CompanyAccess';
    public static SUPER_ADMIN_DELETE_COMPANY_ACCESS = API_BASE_URL + 'admin/delete/CompanyAccess';
    public static SUPER_ADMIN_COMPANY_ACCESS_TABLE = API_BASE_URL + 'admin/view/CompanyAccess';

    // admin
    public static ADD_CHAIN = API_BASE_URL + 'user/add/chain';
    public static DELETE_CHAIN = API_BASE_URL + 'user/delete/chain';
    public static UPDATE_CHAIN = API_BASE_URL + 'user/update/chain';
    public static GET_CHAINS = API_BASE_URL + 'user/view/chains';

    public static ADD_LOCATION = API_BASE_URL + 'user/add/location';
    public static DELETE_LOCATION = API_BASE_URL + 'user/delete/location';
    public static UPDATE_LOCATION = API_BASE_URL + 'user/update/location';
    public static GET_LOCATIONS = API_BASE_URL + 'user/view/locations';

    public static ADD_USER = API_BASE_URL + 'user/add/user';
    public static DELETE_USER = API_BASE_URL + 'user/delete/user';
    public static UPDATE_USER = API_BASE_URL + 'user/update/user';
    public static GET_USERS = API_BASE_URL + 'user/view/localusers';

    public static DELETE_COST_CENTER_ACCESS = API_BASE_URL + 'user/delete/costcenteraccess';
    public static UPDATE_COST_CENTER_ACCESS = API_BASE_URL + 'user/update/costcenteraccess';
    public static GET_COST_CENTER_ACCESS = API_BASE_URL + 'user/view/costcenteraccess';
    public static ADD_COST_CENTER_ACCESS = API_BASE_URL + 'user/add/costcenteraccess';


    public static GET_DASHBOARD_ADMIN = API_BASE_URL + 'user/dashboard';
    public static GET_SUPER_ADMIN_DASHBOARD = API_BASE_URL + 'admin/dashboard';

    public static GET_CURRENCY_LIST = API_BASE_URL + 'admin/currencylist';
    public static ADD_CURRENCY = API_BASE_URL + 'admin/currencyreg';
    public static DELETE_CURRENCY = API_BASE_URL + 'admin/currencydelete';
    public static EDIT_CURRENCY = API_BASE_URL + 'admin/currencyedit';


    public static GET_ALL_COMPANIES_LIST = API_BASE_URL + 'admin/companyList';
    public static GET_USER_CHAIN_LIST = API_BASE_URL + 'user/chainlist';
    public static GET_CHAIN_LIST = API_BASE_URL + 'user/chainlist';
    public static GET_LOCATION_LIST = API_BASE_URL + 'user/locationlist';

}
