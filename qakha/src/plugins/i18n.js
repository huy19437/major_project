import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        welcomeMsg: 'Welcome to Your Vue.js App',
        header: {
            login: 'Login',
            logout: 'Logout',
            searchProducts: 'Search for products',
            listOfProducts: 'List of products',
            headerInner: {
                home: 'Home',
                bestSeller: 'Best seller',
                service: 'Service',
                store: {
                    title: 'Cart',
                    cart: 'View Cart',
                },
                mart: {
                    title: 'Restaurants',
                    ourMart: 'Our Restaurants'
                },
                contact: 'Contact Us',
            },
            middleInner: {
                item: 'Items',
                cart: 'Cart',
                checkout: 'Checkout',
                total: 'Total'
            }
        },
        listPartners: {
            restaurants: 'Restaurants',
            sortBy: 'Sort by',
            searchBy: {
                title: 'Search by',
                name: 'Name',
                location: 'Location'
            },
            open: 'open',
            close: 'close',
            locked: 'locked',
            not_activated: 'not activated'

        },
        listProducts: {
            categoriesList: 'CATEGORIES LIST',
            productsList: 'PRODUCTS LIST'
        },
        carousel: {
            bestSeller: 'BEST SELLER',
            products: 'PRODUCTS'
        },
        feedback: {
            title: 'Feedback of',
            customers: 'Customers',
            reviews: 'Reviews',
            modal: 'FeedBack Details'
        },
        shopService: {
            freeShipping: {
                title: 'FREE SHIPPING',
                desc: 'Orders over $5'
            },
            freeReturn: {
                title: 'FREE RETURN',
                desc: 'Within 1 hour returns'
            },
            securePayment: {
                title: 'SECURE PAYMENT',
                desc: '100% secure payment'
            },
            bestPrice: {
                title: 'BEST PRICE',
                desc: 'Guaranteed price'
            }

        },
        newsletter: {
            title: 'NEWSLETTER',
            desc: 'Subscribe to our newsletter and get 10% off your first purchase',
            email: 'Your email address',
            subscribe: 'SUBSCRIBE'
        },
        footer: {
            session1: {
                desc: 'Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.',
                contact: 'Got Question? Call us 24/7',
            },
            session2: {
                title: 'Information',
                aboutUs: 'About Us',
                Faq: 'Faq',
                termsAndConditions: 'Terms & Conditions',
                ContactUs: 'Contact Us',
                help: 'Help'
            },
            session3: {
                title: 'Customer Service',
                paymentMethods: 'Payment Methods',
                moneyBack: 'Money-back',
                returns: 'Returns',
                shipping: 'Shipping',
                privacy: 'Privacy Policy'
            },
            session4: {
                title: 'Get In Touch',
            }
        },
        cartContent: {
            goBack: 'Go back and push products into the cart!',
            table: {
                product: 'PRODUCT',
                desc: 'NAME AND DESCRIPTION',
                unitPrice: 'UNIT PRICE',
                quantity: 'QUANTITY',
                total: 'TOTAL',
                delete: 'DELETE'
            },
            Subtotal: 'Subtotal',
            Checkout: 'Checkout',
            continueShipping: 'Continue shopping'
        },
        checkout: {
            title: 'Make Your Checkout Here',
            fee: 'ORDER COST',
            deliveryTo: 'Deliver to',
            name: 'Name',
            email: 'Email',
            phone: 'Phone Number',
            address: 'Address',
            voucher: 'Voucher',
            button: {
                apply: 'Apply',
                cancel: 'Cancel'
            },
            cart: {
                cartTotal: 'CART TOTALS',
                subTotal: 'Sub Total',
                shipping: 'Shipping Fee',
                discount: 'Discount',
                total: 'Total',
                payments: 'Payments',
                cod: 'Cash On Delivery',
                coins: 'Coins',
                proceedToCheckout: 'proceed to checkout'
            },
            modal: {
                title: 'Waiting for Checkout'
            }
        },
        driver: {
            title: 'Driver Registration',
            name: 'Driver Name',
            phone: 'Phone Number',
            address: 'Address',
            email: 'Email',
            password: 'Password',
            passwordConfirmation: 'Password confirmation',
            idCard: 'ID Card Number',
            license: 'License Plate',
            driverAvatar: 'Driver Avatar',
            imageUpload: 'Image Uploaded',
            buttons: {
                back: 'Back to login',
                submitCode: 'Submit',
                submitRegister: 'Submit'
            },
            activeCode: 'Active code is required',
            placeholder: {
                name: 'Enter Name Here...',
                phone: "Enter Phone Number Here...",
                address: 'Enter Address Here...',
                email: 'Enter Email Address Here...',
                password: 'Enter Password Here...',
                passwordConfirmation: 'Enter Password Confirmation Here...',
                idCard: 'Enter ID Card Number Here...',
                license: 'Enter License Plate Here...'
            }
        },
        editAddress: {
            back: 'BACK',
            title: 'User Address Edit',
            name: 'Name',
            action: 'Action',
            waiting: 'Waiting for Response'
        },
        historyOrders: {
            title: 'History Order',
            content: {
                status: 'Status',
                orderTime: 'Order time',
                search: 'Search',
                action: 'Action'
            },
            table: {
                type: 'Order code/type',
                time: 'Time',
                place: 'Place',
                driver: 'Driver',
                totalAmount: 'Total amount',
                detail: 'Detail',
                status: 'Status',
                body: {
                    orderTime: 'Order time',
                    viewOrderDetail: 'View Order Detail'
                }
            },
            feedbackModal: {
                close: 'Close',
                submit: 'Submit'
            },
            orderDetailsModal: {
                title: 'Your order at',
                fee: 'fee',
                discount: 'discount',
                table: {
                    member: 'Member',
                    dish: 'Dish',
                    quantity: 'Quantity',
                    price: 'Price',
                    total: 'Total'
                }
            }
        },
        login: {
            back: 'Back to Home',
            way: {
                signup: 'Sign Up',
                signin: 'Sign In'
            },
            password: 'Password',
            forgotPassword: 'Forgot Password?',
            login: 'Log In',
            active: 'Click to Active account'
        },
        forgotPassword: {
            title: 'Forgot Password',
            submit: 'Submit'
        },
        resetPassword: {
            title: 'Reset Password',
            newPassword: 'New Password',
            code: 'Code',
            submit: 'Submit'
        },
        registerUser: {
            name: 'User Name',
            phone: 'Phone Number',
            password: 'Password',
            passwordConfirmation: 'Confirm Password',
            signup: 'Sign Up',
            becomePartner: 'Become a partner',
            becomeDriver: 'Become a driver'
        },
        orderConfirm: {
            alert: 'Go back and make a order',
            restaurants: 'Restaurants',
            thanks: 'Thank You For Your Order!',
            yourOrder: 'Your Order',
            orderConfirm: 'Order Confirmation',
            purchaseItem: 'Purchase Item',
            shippingFee: 'Shipping Fee',
            total: 'TOTAL',
            address: 'Delivery Address',
            date: 'Order Time'
        },
        partner: {
            title: 'Partner Registration',
            name: 'Partner Name',
            address: 'Address',
            phone: 'Phone Number',
            email: 'Email',
            password: 'Password',
            image: 'Image',
            imageUpload: 'Image Uploaded',
            timeOpen: 'Time open',
            timeClose: 'Time close',
            type: 'Type',
            buttons: {
                back: 'Back to login',
                submitCode: 'Submit',
                submitRegister: 'Submit'
            },
            activeCode: 'Active code is required',
            placeholder: {
                name: 'Enter Name Here...',
                address: 'Enter Address Here...',
                phone: "Enter Phone Number Here...",
                email: 'Enter Email Address Here...',
                password: 'Enter Password Here...',
            }
        },
        productDetails: {
            currentPrice: 'current price',
            sold: 'sold',
            addToCart: 'Add to cart'
        },
        userProfile: {
            aboutMe: 'Personal Information',
            name: 'Name',
            role: 'Role',
            address: 'Address',
            email: 'Email',
            phone: 'Phone',
            update: 'Update',
            historyOrder: 'History Order',
            upload: 'Uploading',
            changeAvatar: 'Change Avatar User',
            changePassWord: {
                title: 'Change Password',
                placeholder: {
                    currentPassword: 'Current Password',
                    newPassword: 'New Password',
                    passwordConfirmation: 'Password Confirmation'
                },
                close: 'Close',
                submit: 'Submit'

            },
            changeEmail: {
                title: 'Change Email',
                placeholder: {
                    newEmail: 'New Email',
                    code: 'Code confirm'
                },
                close: 'Close',
                submit: 'Submit'

            }
        }
    },
    'vi': {
        welcomeMsg: 'Chào mừng đến với ứng dụng Vue.js của bạn',
        header: {
            login: 'Đăng nhập',
            logout: 'Đăng xuất',
            searchProducts: 'Tìm kiếm sản phẩm',
            listOfProducts: 'Danh sách sản phẩm',
            headerInner: {
                home: 'Trang Chủ',
                bestSeller: 'Bán chạy',
                service: 'Dịch vụ',
                store: {
                    title: 'Giỏ Hàng',
                    cart: 'Xem Giỏ hàng',
                },
                mart: {
                    title: 'Cửa hàng',
                    ourMart: 'Quán ăn của chúng tôi'
                },
                contact: 'Liên hệ',
            },
            middleInner: {
                item: 'Sản phẩm',
                cart: 'Giỏ hàng',
                checkout: 'Thanh toán',
                total: 'Tổng'

            }
        },
        listPartners: {
            restaurants: 'Quán Ăn',
            sortBy: 'Lọc theo',
            searchBy: {
                title: 'Tìm kiếm theo',
                name: 'Tên',
                location: 'Địa điểm'
            },
            open: 'mở',
            close: 'đóng',
            locked: 'khoá',
            not_activated: 'chưa kích hoạt'
        },
        listProducts: {
            categoriesList: 'DANH MỤC',
            productsList: 'DANH SÁCH SẢN PHẨM'
        },
        carousel: {
            bestSeller: 'SẢN PHẨM',
            products: 'BÁN CHẠY NHẤT'
        },
        feedback: {
            title: 'Đánh giá của',
            customers: 'Khánh hàng',
            reviews: 'Đánh giá',
            modal: 'Chi Tiết Đánh Giá'
        },
        shopService: {
            freeShipping: {
                title: 'MIỄN PHÍ SHIP',
                desc: 'Đơn hàng hơn 100k'
            },
            freeReturn: {
                title: 'ĐỐI TRẢ MIỄN PHÍ',
                desc: 'Trong vòng một giờ'
            },
            securePayment: {
                title: 'THANH TOÁN AN TOÀN',
                desc: '100% bảo mật'
            },
            bestPrice: {
                title: 'GIÁ TỐT NHẤT',
                desc: 'Giá cả đảm bảo'
            }

        },
        newsletter: {
            title: 'BẢN TIN',
            desc: 'Đăng ký bản tin của chúng tôi và được giảm giá 10% cho đơn hàng đầu tiên của bạn',
            email: 'Địa chỉ email của bạn',
            subscribe: 'ĐĂNG KÝ'
        },
        footer: {
            session1: {
                desc: 'Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.',
                contact: 'Có thắc mắc? Liên hệ chúng tôi 24/7',
            },
            session2: {
                title: 'Thông tin',
                aboutUs: 'Về chúng tôi',
                Faq: 'Faq',
                termsAndConditions: 'Điều khoản & Điều kiện',
                ContactUs: 'Liên hệ chúng tôi',
                help: 'Giúp đỡ'
            },
            session3: {
                title: 'Chăm sóc khách hàng',
                paymentMethods: 'Phương thức thanh toán',
                moneyBack: 'Hoàn trả tiền',
                returns: 'Đổi trả',
                shipping: 'Giao hàng',
                privacy: 'Chính sách bảo mật'
            },
            session4: {
                title: 'Liên hệ',
            }
        },
        cartContent: {
            goBack: 'Quay lại và thêm sản phẩm vào giỏ hàng!',
            table: {
                product: 'SẢN PHẨM',
                desc: 'TÊN VÀ MÔ TẢ',
                unitPrice: 'ĐƠN GIÁ',
                quantity: 'SỐ LƯỢNG',
                total: 'TỔNG',
                delete: 'XOÁ'
            },
            Subtotal: 'Tổng giá s.p',
            Checkout: 'Thanh toán',
            continueShipping: 'Tiếp tục đặt hàng'
        },
        checkout: {
            title: 'Tạo thanh toán tại đây',
            fee: 'CHI PHÍ ĐƠN HÀNG',
            deliveryTo: 'Giao hàng đến',
            name: 'Tên',
            email: 'Email',
            phone: 'Số điện thoại',
            address: 'Địa chỉ',
            voucher: 'Voucher',
            button: {
                apply: 'Áp dụng',
                cancel: 'Huỷ bỏ'
            },
            cart: {
                title: 'TỔNG GIỎ HÀNG',
                subTotal: 'Tiền sản phẩm',
                shipping: 'Phí vận chuyển',
                discount: 'Giảm giá',
                total: 'Tổng',
                payments: 'Thanh toán',
                cod: 'Thanh toán khi nhận hàng',
                coins: 'Coins',
                proceedToCheckout: 'tiến hành thanh toán'
            },
            modal: {
                title: 'Chờ để thanh toán'
            }
        },
        driver: {
            title: 'ĐĂNG KÍ TÀI XẾ',
            name: 'Tên tài xế',
            address: 'Địa chỉ',
            phone: 'Số điện thoại',
            email: 'Email',
            password: 'Mật khẩu',
            passwordConfirmation: 'Nhập lại mật khẩu',
            idCard: 'Số chứng minh thư',
            license: 'Biển số xe',
            driverAvatar: 'Ảnh đại diện',
            imageUpload: 'Ảnh đã chọn',
            buttons: {
                back: 'Quay lại đăng nhập',
                submitCode: 'Gửi',
                submitRegister: 'Đăng ký'
            },
            activeCode: 'Nhập mã kích hoạt',
            placeholder: {
                name: 'Nhập tên tài xế ở đây...',
                address: 'Nhập địa chỉ ở đây...',
                phone: "Nhập số điện thoại ở đây...",
                email: 'Nhập email ở đây...',
                password: 'Nhập mật khẩu ở đây...',
                passwordConfirmation: 'Xác nhận mật khẩu ở đây...',
                idCard: 'Nhập số chứng minh ở đây...',
                license: 'Nhập biến số xe ở đây...'
            }
        },
        editAddress: {
            back: 'QUAY LẠI',
            title: 'Chỉnh sửa địa chỉ người dùng',
            name: 'Tên',
            action: 'Hành động',
            waiting: 'Đang chờ phản hồi'
        },
        historyOrders: {
            title: 'Lịch sử Đặt hàng',
            content: {
                status: 'Trạng thái',
                orderTime: 'Thời gian đặt hàng',
                search: 'Tìm kiếm',
                action: 'Hành động'
            },
            table: {
                type: 'Loại thanh toán',
                time: 'Thời gian',
                place: 'Địa chỉ',
                driver: 'Người giao',
                totalAmount: 'Tổng tiền',
                detail: 'Chi tiết',
                status: 'Trạng thái',
                body: {
                    orderTime: 'Thời gian đặt',
                    viewOrderDetail: 'Xem chi tiết đơn hàng'
                }
            },
            feedbackModal: {
                close: 'Đóng',
                submit: 'Gửi'
            },
            orderDetailsModal: {
                title: 'Bạn đặt hàng tại',
                fee: 'phí',
                discount: 'giảm giá',
                table: {
                    member: 'Thành viên',
                    dish: 'Món',
                    quantity: 'Số lượng',
                    price: 'Giá',
                    total: 'Tổng'
                }
            }
        },
        login: {
            back: 'Về trang chủ',
            way: {
                signup: 'Đăng Ký',
                signin: 'Đăng nhập'
            },
            password: 'Mật khẩu',
            forgotPassword: 'Quên mật khẩu?',
            login: 'Đăng Nhập',
            active: 'Nhấn để kích hoạt tài khoản'
        },
        forgotPassword: {
            title: 'Quên mật khẩu',
            submit: 'Gửi'
        },
        resetPassword: {
            title: 'Đặt lại mật khẩu',
            newPassword: 'Mật khẩu mới',
            code: 'Mã',
            submit: 'Gửi'
        },
        registerUser: {
            name: 'Tên người dùng',
            phone: 'Số điện thoại',
            password: 'Mật khẩu',
            passwordConfirmation: 'Xác nhận mật khẩu',
            signup: 'Đăng Ký',
            becomePartner: 'Đăng ký Đối tác',
            becomeDriver: 'Đăng ký tài xế'
        },
        orderConfirm: {
            alert: 'Quay lại và đặt hàng!',
            restaurants: 'Quán Ăn',
            thanks: 'Cảm ơn bạn đã đặt hàng!',
            yourOrder: 'Đơn hàng của bạn',
            orderConfirm: 'Xác nhận đơn hàng',
            purchaseItem: 'Sản phẩm đã mua',
            shippingFee: 'Phí vận chuyển',
            total: 'TỔNG',
            address: 'Địa chỉ giao hàng',
            date: 'Thời gian đặt hàng'
        },
        partner: {
            title: 'Đăng ký Đối tác',
            name: 'Tên đối tác',
            address: 'Địa chỉ',
            phone: 'Số điện thoại',
            email: 'Email',
            password: 'Mật khẩu',
            image: 'Hình ảnh',
            imageUpload: 'Ảnh đã tải lên',
            timeOpen: 'Thời gian mở cửa',
            timeClose: 'Thời gian đóng cửa',
            type: 'Loại',
            buttons: {
                back: 'Quay lại đăng nhập',
                submitCode: 'Gửi',
                submitRegister: 'Đăng ký'
            },
            activeCode: 'Active code is required',
            placeholder: {
                name: 'Nhập tên đối tác ở đây...',
                address: 'Nhập địa chỉ ở đây...',
                phone: "Nhập số điện thoại ở đây...",
                email: 'Nhập email ở đây...',
                password: 'Nhập mật khẩu ở đây...',
            }
        },
        productDetails: {
            currentPrice: 'Giá hiện tại',
            sold: 'đá bán',
            addToCart: 'Thêm vào giỏ hàng'
        },
        userProfile: {
            aboutMe: 'Thông tin cá nhân',
            name: 'Tên',
            role: 'Quyền',
            address: 'Địa chỉ',
            email: 'Email',
            phone: 'Điện thoại',
            update: 'Cập nhật',
            historyOrder: 'Lịch sử đặt hàng',
            upload: 'Đang tải lên',
            changeAvatar: 'Thay Đổi Ảnh đại diện Người dùng',
            changePassWord: {
                title: 'Đặt lại mật khẩu',
                placeholder: {
                    currentPassword: 'Mật khẩu hiện tại',
                    newPassword: 'Mật khẩu mới',
                    passwordConfirmation: 'Xác nhận mật khẩu mới'
                },
                close: 'Đóng',
                submit: 'Gửi'
            },
            changeEmail: {
                title: 'Thay đổi Email',
                placeholder: {
                    newEmail: 'Email mới',
                    code: 'Mã xác nhận'
                },
                close: 'Đóng',
                submit: 'Gửi'

            }
        }
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
});

export default i18n;