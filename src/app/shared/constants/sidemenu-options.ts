export class SideMenuOptions {

    public static USER_MENU = [
        { name: 'Dashboard', path: 'dashbord', sub_menu: false, img: 'dashboard-icon.svg' },
        {
            name: 'Dimension', path: 'chain', img: 'dimension-icon.svg',
            sub_menu: [
                { name: 'Chain', path: 'chain', img: 'dimension-icon.svg', },
                { name: 'Location', path: 'location', img: 'dimension-icon.svg', }]
        },
        {
            name: 'User Management', path: 'user', img: 'user-management-icon.svg',
            sub_menu: [{ name: 'User', path: 'user' }, { name: 'Cost Center Acess', path: 'cost-center-access' }]
        },
        { name: 'Connecting Path', path: 'connecting-path', sub_menu: false, img: 'connecting-icon.svg' },
    ];

    public static SUPER_ADMIN_MENU = [
        { name: 'Dashboard', path: 'dashbord', sub_menu: false, img: 'dashboard-icon.svg' },
        {
            name: 'Licensing', path: 'company', img: 'licensing-icon.svg',
            sub_menu: [
                { name: 'Company', path: 'company', img: 'dimension-icon.svg', },
                { name: 'User', path: 'admin-user', img: 'dimension-icon.svg' },
                { name: 'Currency', path: 'currency', img: 'dimension-icon.svg' },
                { name: 'Company Access', path: 'company-access', img: 'dimension-icon.svg' },
            ]
        }
    ]
}

