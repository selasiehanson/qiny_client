const initialState = {
    all: [
        {
            link: '/dashboard',
            text: 'Dashboard',
            icon: 'fa fa-bar-chart',
            description: {
                title: 'Dashboard',
                content: 'See all your app actities'
            },
            childrenLinks: [
                {
                    link: '/dashboard/home',
                    text: 'Home'
                },
                {
                    link: '/dashboard/help',
                    text: 'Help'
                }
            ]
        },
        {
            link: '/clients',
            text: 'Clients',
            icon: 'fa fa-users'
        },
        {
            link: '/products',
            text: 'Products',
            icon: 'fa fa-barcode'
        },
        {
            link: '/invoices',
            text: 'Invoices',
            icon: 'fa fa-file-text'
        },
        {
            link: '/taxes',
            text: 'Taxes',
            icon: 'fa fa-usd'
        },        
        {
            link: '/reports',
            text: 'Reports',
            icon: 'fa fa-area-chart'
        }
    ],
    current: 0,
    currentChild: 0
};

const links = (state = initialState, action) => {
    return state;
}

export default links;