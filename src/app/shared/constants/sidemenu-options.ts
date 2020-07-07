export class SideMenuOptions {

    public static USER_MENU = [
        { name: 'Dashboard', path: 'dashbord', sub_menu: false, img: 'dashboard-icon.png' },
        {
            name: 'Dimension', path: 'chain', img: 'dimension-icon.png',
            sub_menu: [
                { name: 'Chain', path: 'chain', img: 'dimension-icon.png', },
                { name: 'Location', path: 'location', img: 'dimension-icon.png', }]
        },
        {
            name: 'User Management', path: 'user', img: 'user-management-icon.png',
            sub_menu: [{ name: 'User', path: 'user' }, { name: 'Cost Center Acess', path: 'cost-center-access' }]
        },

    ];

    public static SUPER_ADMIN_MENU = [
        { name: 'Dashboard', path: 'dashbord', sub_menu: false, img: 'dashboard-icon.png' },
        {
            name: 'Licensing', path: 'company', img: 'licensing-icon.png',
            sub_menu: [
                { name: 'Company', path: 'company', img: 'dimension-icon.png', },
                { name: 'User', path: 'admin-user', img: 'dimension-icon.png' },
                { name: 'Currency', path: 'currency', img: 'dimension-icon.png' },
                { name: 'Company Access', path: 'company-access', img: 'dimension-icon.png' },
            ]
        },
        // { name: 'Connecting Path', path: 'connecting-path', sub_menu: false, img: 'connecting-icon.png' },
    ]
}

