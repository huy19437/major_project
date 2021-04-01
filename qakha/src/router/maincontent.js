import ListProducts from '@/components/homepage/content/listProducts/ListProducts.vue'
import ListPartners from "@/components/homepage/content/listPartners/ListPartners"

export const maincontent = [
    {
        path: '/',
        component: {
            render: (h) => h('router-view')
        },
        children: [
            {
                path: '/',
                name: 'ListPartners',
                component: ListPartners
            },
            {
                path: '/list-products',
                name: 'ListProducts',
                component: ListProducts
            },
        ],
    }
]