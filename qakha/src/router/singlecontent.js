import ProductDetail from '@/components/product_details/ProductDetail.vue'
import Cart from '@/components/cart/Cart.vue'
import Profile from '@/components/profile/Profile.vue'
import Checkout from '@/components/checkout/Checkout.vue'
import OrderConfirm from '@/components/order_confirmation/OrderConfirm.vue'

export const singlecontent = [
    {
        path: '/',
        component: {
            render: (h) => h('router-view')
        },
        children: [
            {
                path: '/product-details',
                name: 'ProductDetail',
                component: ProductDetail
            },
            {
                path: '/cart',
                name: 'Cart',
                component: Cart,
                meta: {
                    auth: true
                },
            },
            {
                path: '/checkout',
                name: 'Checkout',
                component: Checkout,
                meta: {
                    auth: true
                },
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    auth: true
                },
            },
            {
                path: '/orderconfirm',
                name: 'OrderConfirm',
                component: OrderConfirm,
                meta: {
                    auth: true
                },
            },
        ],
    }
]