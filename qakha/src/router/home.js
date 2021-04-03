import Home from '../views/Home.vue'
import ListProducts from '@/components/homepage/content/listProducts/ListProducts.vue'
import ListPartners from "@/components/homepage/content/listPartners/ListPartners"


export const home = [
    {
        path: '/',
        redirect: 'list-partners',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'list-partners',
                name: 'ListPartners',
                component: ListPartners,
            },
            {
                path: 'list-products',
                name: 'ListProducts',
                component: ListProducts,
            }
        ]
    }
]