import httpRequest from '../../services/repository'

const state = {
    // partners2: [
    //     {
    //         "id": 1,
    //         "name": "Gov. Issac Kirlin",
    //         "address": "Suite 220 66880 Carl Road, Russelchester, NM 65073",
    //         "phone_number": "0909168073",
    //         "email": "partner1@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-22T15:46:39.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:02.839Z",
    //         "updated_at": "2021-04-09T16:41:02.839Z",
    //         "categories": [
    //             {
    //                 "id": 2,
    //                 "name": "Japanese",
    //                 "parent_id": 1,
    //                 "partner_id": 1,
    //                 "created_at": "2021-04-09T16:41:03.512Z",
    //                 "updated_at": "2021-04-09T16:41:03.512Z",
    //                 "products": [
    //                     {
    //                         "id": 3,
    //                         "name": "Vegetable Soup",
    //                         "quantity_sold": 1,
    //                         "price": 36.57,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.648Z",
    //                         "updated_at": "2021-04-09T16:41:03.648Z"
    //                     },
    //                     {
    //                         "id": 4,
    //                         "name": "Chicken Wings",
    //                         "quantity_sold": 9,
    //                         "price": 78.17,
    //                         "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.661Z",
    //                         "updated_at": "2021-04-09T16:41:03.661Z"
    //                     },
    //                     {
    //                         "id": 8,
    //                         "name": "Souvlaki",
    //                         "quantity_sold": 5,
    //                         "price": 87.81,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.718Z",
    //                         "updated_at": "2021-04-09T16:41:03.718Z"
    //                     },
    //                     {
    //                         "id": 9,
    //                         "name": "Stinky Tofu",
    //                         "quantity_sold": 4,
    //                         "price": 37.88,
    //                         "description": "Three egg whites with spinach, mushrooms, caramelized onions, tomatoes and low-fat feta cheese. With herbed quinoa, and your choice of rye or whole-grain toast.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.732Z",
    //                         "updated_at": "2021-04-09T16:41:03.732Z"
    //                     },
    //                     {
    //                         "id": 16,
    //                         "name": "Pho",
    //                         "quantity_sold": 1,
    //                         "price": 56.72,
    //                         "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.832Z",
    //                         "updated_at": "2021-04-09T16:41:03.832Z"
    //                     },
    //                     {
    //                         "id": 21,
    //                         "name": "Pierogi",
    //                         "quantity_sold": 2,
    //                         "price": 23.35,
    //                         "description": "Breaded fried chicken with waffles. Served with maple syrup.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.902Z",
    //                         "updated_at": "2021-04-09T16:41:03.902Z"
    //                     },
    //                     {
    //                         "id": 23,
    //                         "name": "Cauliflower Penne",
    //                         "quantity_sold": 3,
    //                         "price": 47.43,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 2,
    //                         "created_at": "2021-04-09T16:41:03.931Z",
    //                         "updated_at": "2021-04-09T16:41:03.931Z"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 2,
    //         "name": "Ayanna Runolfsdottir",
    //         "address": "400 Jean Causeway, New Alejandrashire, CA 84647-1002",
    //         "phone_number": "0731015577",
    //         "email": "partner2@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-14T13:27:52.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:02.859Z",
    //         "updated_at": "2021-04-09T16:41:02.859Z",
    //         "categories": [
    //             {
    //                 "id": 3,
    //                 "name": "Chinese",
    //                 "parent_id": 2,
    //                 "partner_id": 2,
    //                 "created_at": "2021-04-09T16:41:03.528Z",
    //                 "updated_at": "2021-04-09T16:41:03.528Z",
    //                 "products": [
    //                     {
    //                         "id": 1,
    //                         "name": "Barbecue Ribs",
    //                         "quantity_sold": 8,
    //                         "price": 45.88,
    //                         "description": "Two buttermilk waffles, topped with whipped cream and maple syrup, a side of two eggs served any style, and your choice of smoked bacon or smoked ham.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.621Z",
    //                         "updated_at": "2021-04-09T16:41:03.621Z"
    //                     },
    //                     {
    //                         "id": 10,
    //                         "name": "Sushi",
    //                         "quantity_sold": 1,
    //                         "price": 52.15,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.745Z",
    //                         "updated_at": "2021-04-09T16:41:03.745Z"
    //                     },
    //                     {
    //                         "id": 11,
    //                         "name": "Poutine",
    //                         "quantity_sold": 2,
    //                         "price": 34.04,
    //                         "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.759Z",
    //                         "updated_at": "2021-04-09T16:41:03.759Z"
    //                     },
    //                     {
    //                         "id": 12,
    //                         "name": "Scotch Eggs",
    //                         "quantity_sold": 3,
    //                         "price": 14.62,
    //                         "description": "Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.775Z",
    //                         "updated_at": "2021-04-09T16:41:03.775Z"
    //                     },
    //                     {
    //                         "id": 13,
    //                         "name": "Arepas",
    //                         "quantity_sold": 5,
    //                         "price": 43.43,
    //                         "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.790Z",
    //                         "updated_at": "2021-04-09T16:41:03.790Z"
    //                     },
    //                     {
    //                         "id": 15,
    //                         "name": "Pork Belly Buns",
    //                         "quantity_sold": 8,
    //                         "price": 80.71,
    //                         "description": "Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.819Z",
    //                         "updated_at": "2021-04-09T16:41:03.819Z"
    //                     },
    //                     {
    //                         "id": 17,
    //                         "name": "Poutine",
    //                         "quantity_sold": 4,
    //                         "price": 54.36,
    //                         "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.846Z",
    //                         "updated_at": "2021-04-09T16:41:03.846Z"
    //                     },
    //                     {
    //                         "id": 20,
    //                         "name": "Seafood Paella",
    //                         "quantity_sold": 3,
    //                         "price": 19.77,
    //                         "description": "Granny Smith apples mixed with brown sugar and butter filling, in a flaky all-butter crust, with ice cream.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.888Z",
    //                         "updated_at": "2021-04-09T16:41:03.888Z"
    //                     },
    //                     {
    //                         "id": 22,
    //                         "name": "Pasta Carbonara",
    //                         "quantity_sold": 8,
    //                         "price": 79.76,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.917Z",
    //                         "updated_at": "2021-04-09T16:41:03.917Z"
    //                     },
    //                     {
    //                         "id": 25,
    //                         "name": "Bruschette with Tomato",
    //                         "quantity_sold": 2,
    //                         "price": 21.74,
    //                         "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 3,
    //                         "created_at": "2021-04-09T16:41:03.958Z",
    //                         "updated_at": "2021-04-09T16:41:03.958Z"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 3,
    //         "name": "Santina Hartmann DVM",
    //         "address": "Suite 196 748 Hermiston Shoals, East Peiburgh, NM 05836",
    //         "phone_number": "0004349009",
    //         "email": "partner3@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-24T08:29:49.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:02.882Z",
    //         "updated_at": "2021-04-09T16:41:02.882Z",
    //         "categories": [
    //             {
    //                 "id": 4,
    //                 "name": "Vietnam",
    //                 "parent_id": 1,
    //                 "partner_id": 3,
    //                 "created_at": "2021-04-09T16:41:03.553Z",
    //                 "updated_at": "2021-04-09T16:41:03.553Z",
    //                 "products": [
    //                     {
    //                         "id": 7,
    //                         "name": "Philadelphia Maki",
    //                         "quantity_sold": 5,
    //                         "price": 14.32,
    //                         "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.702Z",
    //                         "updated_at": "2021-04-09T16:41:03.702Z"
    //                     },
    //                     {
    //                         "id": 14,
    //                         "name": "Risotto with Seafood",
    //                         "quantity_sold": 9,
    //                         "price": 96.27,
    //                         "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.805Z",
    //                         "updated_at": "2021-04-09T16:41:03.805Z"
    //                     },
    //                     {
    //                         "id": 18,
    //                         "name": "Fettuccine Alfredo",
    //                         "quantity_sold": 4,
    //                         "price": 69.66,
    //                         "description": "Two buttermilk waffles, topped with whipped cream and maple syrup, a side of two eggs served any style, and your choice of smoked bacon or smoked ham.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.860Z",
    //                         "updated_at": "2021-04-09T16:41:03.860Z"
    //                     },
    //                     {
    //                         "id": 19,
    //                         "name": "Scotch Eggs",
    //                         "quantity_sold": 4,
    //                         "price": 88.34,
    //                         "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.874Z",
    //                         "updated_at": "2021-04-09T16:41:03.874Z"
    //                     },
    //                     {
    //                         "id": 26,
    //                         "name": "Pappardelle alla Bolognese",
    //                         "quantity_sold": 8,
    //                         "price": 69.65,
    //                         "description": "Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.973Z",
    //                         "updated_at": "2021-04-09T16:41:03.973Z"
    //                     },
    //                     {
    //                         "id": 27,
    //                         "name": "Meatballs with Sauce",
    //                         "quantity_sold": 4,
    //                         "price": 77.03,
    //                         "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:03.987Z",
    //                         "updated_at": "2021-04-09T16:41:03.987Z"
    //                     },
    //                     {
    //                         "id": 28,
    //                         "name": "Pierogi",
    //                         "quantity_sold": 5,
    //                         "price": 59.56,
    //                         "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:04.002Z",
    //                         "updated_at": "2021-04-09T16:41:04.002Z"
    //                     },
    //                     {
    //                         "id": 29,
    //                         "name": "Chilli con Carne",
    //                         "quantity_sold": 1,
    //                         "price": 35.49,
    //                         "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:04.014Z",
    //                         "updated_at": "2021-04-09T16:41:04.014Z"
    //                     },
    //                     {
    //                         "id": 30,
    //                         "name": "Chicken Wings",
    //                         "quantity_sold": 9,
    //                         "price": 76.24,
    //                         "description": "Three egg whites with spinach, mushrooms, caramelized onions, tomatoes and low-fat feta cheese. With herbed quinoa, and your choice of rye or whole-grain toast.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 4,
    //                         "created_at": "2021-04-09T16:41:04.028Z",
    //                         "updated_at": "2021-04-09T16:41:04.028Z"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 4,
    //         "name": "Cornell Herman",
    //         "address": "Suite 723 86710 Murphy Forks, Willmsberg, KY 03384",
    //         "phone_number": "0351276141",
    //         "email": "partner4@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-11T21:42:50.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:02.901Z",
    //         "updated_at": "2021-04-09T16:41:02.901Z",
    //         "categories": [
    //             {
    //                 "id": 5,
    //                 "name": "French",
    //                 "parent_id": 2,
    //                 "partner_id": 4,
    //                 "created_at": "2021-04-09T16:41:03.576Z",
    //                 "updated_at": "2021-04-09T16:41:03.576Z",
    //                 "products": [
    //                     {
    //                         "id": 2,
    //                         "name": "Hummus",
    //                         "quantity_sold": 5,
    //                         "price": 67.38,
    //                         "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 5,
    //                         "created_at": "2021-04-09T16:41:03.635Z",
    //                         "updated_at": "2021-04-09T16:41:03.635Z"
    //                     },
    //                     {
    //                         "id": 5,
    //                         "name": "Pizza",
    //                         "quantity_sold": 1,
    //                         "price": 18.73,
    //                         "description": "Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 5,
    //                         "created_at": "2021-04-09T16:41:03.675Z",
    //                         "updated_at": "2021-04-09T16:41:03.675Z"
    //                     },
    //                     {
    //                         "id": 6,
    //                         "name": "Pizza",
    //                         "quantity_sold": 3,
    //                         "price": 43.04,
    //                         "description": "Fresh parsley, Italian sausage, shallots, garlic, sun-dried tomatoes and mozzarella cheese in an all-butter crust. With a side of mixed fruits.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 5,
    //                         "created_at": "2021-04-09T16:41:03.689Z",
    //                         "updated_at": "2021-04-09T16:41:03.689Z"
    //                     },
    //                     {
    //                         "id": 24,
    //                         "name": "Bruschette with Tomato",
    //                         "quantity_sold": 4,
    //                         "price": 96.05,
    //                         "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
    //                         "image": {
    //                             "url": null
    //                         },
    //                         "category_id": 5,
    //                         "created_at": "2021-04-09T16:41:03.944Z",
    //                         "updated_at": "2021-04-09T16:41:03.944Z"
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 5,
    //         "name": "Clarice Hessel",
    //         "address": "Apt. 490 349 Tana Spurs, Bethanychester, AL 00379",
    //         "phone_number": "0900944540",
    //         "email": "partner5@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-19T04:36:55.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:02.920Z",
    //         "updated_at": "2021-04-09T16:41:02.920Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 6,
    //         "name": "Song Bins DC",
    //         "address": "23793 Macejkovic Extension, Lake Giovannimouth, SC 93048-0881",
    //         "phone_number": "0577224252",
    //         "email": "partner6@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-19T04:40:05.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:02.940Z",
    //         "updated_at": "2021-04-09T16:41:02.940Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 7,
    //         "name": "Nathanial Yost",
    //         "address": "8262 Alyse Pike, Port Norah, MS 67955",
    //         "phone_number": "0741782939",
    //         "email": "partner7@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-11T15:53:47.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:02.961Z",
    //         "updated_at": "2021-04-09T16:41:02.961Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 8,
    //         "name": "Ileen Hermiston",
    //         "address": "Apt. 955 824 Julianne Cliffs, South Leah, NC 68630",
    //         "phone_number": "0080227167",
    //         "email": "partner8@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-19T07:44:03.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:02.981Z",
    //         "updated_at": "2021-04-09T16:41:02.981Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 9,
    //         "name": "Gov. Indira Keebler",
    //         "address": "Apt. 390 91098 Lanita Divide, South Faustinoside, MA 41263",
    //         "phone_number": "0459135830",
    //         "email": "partner9@gmail.com",
    //         "time_open": "2021-04-09T16:41:02.000Z",
    //         "time_close": "2021-04-12T03:21:47.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.002Z",
    //         "updated_at": "2021-04-09T16:41:03.002Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 10,
    //         "name": "Elisha Wunsch",
    //         "address": "9409 Saul Points, South Tom, MA 19783-3731",
    //         "phone_number": "0034930597",
    //         "email": "partner10@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-21T10:26:17.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.024Z",
    //         "updated_at": "2021-04-09T16:41:03.024Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 11,
    //         "name": "Un Skiles LLD",
    //         "address": "Apt. 795 12859 Reichel Route, Schulistshire, HI 91458",
    //         "phone_number": "0547091033",
    //         "email": "partner11@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-24T07:55:14.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.045Z",
    //         "updated_at": "2021-04-09T16:41:03.045Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 12,
    //         "name": "Quentin Auer DDS",
    //         "address": "Apt. 172 61135 Agnes Squares, New Rufus, MT 28956-3092",
    //         "phone_number": "0542222496",
    //         "email": "partner12@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-13T22:52:18.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.066Z",
    //         "updated_at": "2021-04-09T16:41:03.066Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 13,
    //         "name": "Rory Herzog",
    //         "address": "70145 Pierre Mills, Port Bryon, NY 41052-5291",
    //         "phone_number": "0960312409",
    //         "email": "partner13@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-15T17:08:32.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.086Z",
    //         "updated_at": "2021-04-09T16:41:03.086Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 14,
    //         "name": "Shantelle Pacocha",
    //         "address": "52101 Brekke Turnpike, Jinnychester, ID 48707-5236",
    //         "phone_number": "0163087814",
    //         "email": "partner14@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-09T22:19:34.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.106Z",
    //         "updated_at": "2021-04-09T16:41:03.106Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 15,
    //         "name": "Zackary Quigley",
    //         "address": "6609 Rosanne Greens, Dietrichport, MD 64860-8018",
    //         "phone_number": "0541936246",
    //         "email": "partner15@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-11T11:34:59.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.126Z",
    //         "updated_at": "2021-04-09T16:41:03.126Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 16,
    //         "name": "Rema Zemlak Ret.",
    //         "address": "Apt. 539 119 Frances Ford, Bauchfurt, TX 35568-9393",
    //         "phone_number": "0368455458",
    //         "email": "partner16@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-14T13:29:55.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.146Z",
    //         "updated_at": "2021-04-09T16:41:03.146Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 17,
    //         "name": "Adrien Hartmann",
    //         "address": "Suite 349 32673 Ullrich Fall, Jackelinemouth, CO 98927-3574",
    //         "phone_number": "0677702185",
    //         "email": "partner17@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-12T01:50:39.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.166Z",
    //         "updated_at": "2021-04-09T16:41:03.166Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 18,
    //         "name": "Mrs. Sherwood Larkin",
    //         "address": "Apt. 184 5406 Koepp Route, East Consuela, RI 04080",
    //         "phone_number": "0092892600",
    //         "email": "partner18@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-18T05:15:50.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.188Z",
    //         "updated_at": "2021-04-09T16:41:03.188Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 19,
    //         "name": "Simon Bashirian Sr.",
    //         "address": "9762 Brandon Mountain, Samuelland, RI 41577-8592",
    //         "phone_number": "0319613459",
    //         "email": "partner19@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-14T20:49:07.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.208Z",
    //         "updated_at": "2021-04-09T16:41:03.208Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 20,
    //         "name": "Lacy Renner Jr.",
    //         "address": "Apt. 112 4721 Nader Rapids, West Lizaberg, OH 61899-9168",
    //         "phone_number": "0235592025",
    //         "email": "partner20@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-19T09:33:52.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.231Z",
    //         "updated_at": "2021-04-09T16:41:03.231Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 21,
    //         "name": "Ms. Nelson Pagac",
    //         "address": "78570 Mohr Motorway, Greenfeldershire, MD 95671",
    //         "phone_number": "0474299057",
    //         "email": "partner21@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-24T00:35:21.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 2,
    //         "created_at": "2021-04-09T16:41:03.256Z",
    //         "updated_at": "2021-04-09T16:41:03.256Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 22,
    //         "name": "Deborah Kuvalis",
    //         "address": "Apt. 607 6813 Jast Harbor, North Manual, NM 51582-9145",
    //         "phone_number": "0431982535",
    //         "email": "partner22@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-16T15:24:16.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.279Z",
    //         "updated_at": "2021-04-09T16:41:03.279Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 23,
    //         "name": "Thanh Kunze",
    //         "address": "Suite 187 6987 Colene Shores, Port Laurena, CA 11454",
    //         "phone_number": "0584048738",
    //         "email": "partner23@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-10T10:54:52.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.305Z",
    //         "updated_at": "2021-04-09T16:41:03.305Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 24,
    //         "name": "Herman Sanford PhD",
    //         "address": "88649 Aaron Throughway, West Markfurt, IN 78039",
    //         "phone_number": "0305336029",
    //         "email": "partner24@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-18T18:14:57.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.332Z",
    //         "updated_at": "2021-04-09T16:41:03.332Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 25,
    //         "name": "Gov. Rosina Mayer",
    //         "address": "591 Donnelly Centers, Crooksview, KY 32513-8603",
    //         "phone_number": "0256067933",
    //         "email": "partner25@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-12T01:03:05.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 1,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.357Z",
    //         "updated_at": "2021-04-09T16:41:03.357Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 26,
    //         "name": "Malika Krajcik",
    //         "address": "438 Mertz Hollow, West Moriah, DE 40622-8503",
    //         "phone_number": "0673861302",
    //         "email": "partner26@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-18T03:49:50.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.380Z",
    //         "updated_at": "2021-04-09T16:41:03.380Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 27,
    //         "name": "Sherly Hane",
    //         "address": "2638 Gleason Pine, Dickensfort, UT 07545",
    //         "phone_number": "0307314161",
    //         "email": "partner27@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-13T09:18:30.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.401Z",
    //         "updated_at": "2021-04-09T16:41:03.401Z",
    //         "categories": [
    //             {
    //                 "id": 1,
    //                 "name": "Korean",
    //                 "parent_id": null,
    //                 "partner_id": 27,
    //                 "created_at": "2021-04-09T16:41:03.492Z",
    //                 "updated_at": "2021-04-09T16:41:03.492Z",
    //                 "products": [

    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         "id": 28,
    //         "name": "Mr. Kurtis Simonis",
    //         "address": "2157 Stiedemann Ford, West Darlene, KS 72192-6055",
    //         "phone_number": "0179815800",
    //         "email": "partner28@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-12T16:12:52.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.423Z",
    //         "updated_at": "2021-04-09T16:41:03.423Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 29,
    //         "name": "Sen. Jamal Wolff",
    //         "address": "7991 Mitchell Courts, West Alexis, HI 39055",
    //         "phone_number": "0998844685",
    //         "email": "partner29@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-14T09:07:04.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 2,
    //         "type_id": 1,
    //         "created_at": "2021-04-09T16:41:03.445Z",
    //         "updated_at": "2021-04-09T16:41:03.445Z",
    //         "categories": [

    //         ]
    //     },
    //     {
    //         "id": 30,
    //         "name": "Otis Corkery",
    //         "address": "Apt. 588 64406 Lanita Meadows, West Brettmouth, IN 11639-8482",
    //         "phone_number": "0787204305",
    //         "email": "partner30@gmail.com",
    //         "time_open": "2021-04-09T16:41:03.000Z",
    //         "time_close": "2021-04-13T10:04:00.000Z",
    //         "status": null,
    //         "latitude": null,
    //         "longitude": null,
    //         "image": {
    //             "url": null
    //         },
    //         "city_id": 3,
    //         "type_id": 3,
    //         "created_at": "2021-04-09T16:41:03.468Z",
    //         "updated_at": "2021-04-09T16:41:03.468Z",
    //         "categories": [

    //         ]
    //     }
    // ],
    partners2: JSON.parse(localStorage.getItem('partners')),
    partnerId: 0,
}

const getters = {
    getPartnersLocal(state) {
        return state.partners2;
    },
    getPartnerId(state) {
        return state.partnerId;
    }
}

const mutations = {
    setPartners(state, data) {
        state.partners2 = data;
    },
    setPartnerId(state, data) {
        state.partnerId = data
    }
}

const actions = {
    getPartners({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    localStorage.setItem('partners', JSON.stringify(response.data));
                    res(response.data);
                    commit('setPartners', JSON.parse(localStorage.getItem('partners')));
                }).catch(err => {
                    rej(err.response ? err.response.data.message : err);
                });
        })
    },
    partnerId({ commit }, params) {
        commit('setPartnerId', params)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}