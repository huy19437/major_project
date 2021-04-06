import httpRequest from '../../services/repository'

const state = {
    partners: [
        {
            "id": 1,
            "name": "Kermit Schultz",
            "address": "3197 West Branch, Gleasonport, ME 96891-3198",
            "phone_number": "0192074515",
            "email": "partner1@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-09T18:34:13.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:10.757Z",
            "updated_at": "2021-04-06T13:09:10.757Z",
            "categories": [
                {
                    "id": 2,
                    "name": "Japanese",
                    "parent_id": 1,
                    "partner_id": 1,
                    "created_at": "2021-04-06T13:09:11.917Z",
                    "updated_at": "2021-04-06T13:09:11.917Z",
                    "products": [
                        {
                            "id": 3,
                            "name": "Barbecue Ribs",
                            "quantity_sold": 8,
                            "price": 92.08,
                            "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.061Z",
                            "updated_at": "2021-04-06T13:09:12.061Z"
                        },
                        {
                            "id": 10,
                            "name": "Chicken Wings",
                            "quantity_sold": 7,
                            "price": 56.04,
                            "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.208Z",
                            "updated_at": "2021-04-06T13:09:12.208Z"
                        },
                        {
                            "id": 12,
                            "name": "Linguine with Clams",
                            "quantity_sold": 5,
                            "price": 55.51,
                            "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.244Z",
                            "updated_at": "2021-04-06T13:09:12.244Z"
                        },
                        {
                            "id": 14,
                            "name": "Chicken Milanese",
                            "quantity_sold": 6,
                            "price": 75.55,
                            "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.278Z",
                            "updated_at": "2021-04-06T13:09:12.278Z"
                        },
                        {
                            "id": 16,
                            "name": "Fish and Chips",
                            "quantity_sold": 7,
                            "price": 71.56,
                            "description": "28-day aged 300g USDA Certified Prime Ribeye, rosemary-thyme garlic butter, with choice of two sides.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.310Z",
                            "updated_at": "2021-04-06T13:09:12.310Z"
                        },
                        {
                            "id": 20,
                            "name": "Chicken Fajitas",
                            "quantity_sold": 6,
                            "price": 47.61,
                            "description": "Two buttermilk waffles, topped with whipped cream and maple syrup, a side of two eggs served any style, and your choice of smoked bacon or smoked ham.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.373Z",
                            "updated_at": "2021-04-06T13:09:12.373Z"
                        },
                        {
                            "id": 26,
                            "name": "Pork Sausage Roll",
                            "quantity_sold": 6,
                            "price": 32.63,
                            "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
                            "image": {
                                "url": null
                            },
                            "category_id": 2,
                            "created_at": "2021-04-06T13:09:12.488Z",
                            "updated_at": "2021-04-06T13:09:12.488Z"
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "Vietnam",
                    "parent_id": 1,
                    "partner_id": 1,
                    "created_at": "2021-04-06T13:09:11.953Z",
                    "updated_at": "2021-04-06T13:09:11.953Z",
                    "products": [
                        {
                            "id": 1,
                            "name": "Risotto with Seafood",
                            "quantity_sold": 1,
                            "price": 88.05,
                            "description": "Granny Smith apples mixed with brown sugar and butter filling, in a flaky all-butter crust, with ice cream.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.017Z",
                            "updated_at": "2021-04-06T13:09:12.017Z"
                        },
                        {
                            "id": 11,
                            "name": "Chilli con Carne",
                            "quantity_sold": 5,
                            "price": 98.09,
                            "description": "Three egg whites with spinach, mushrooms, caramelized onions, tomatoes and low-fat feta cheese. With herbed quinoa, and your choice of rye or whole-grain toast.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.226Z",
                            "updated_at": "2021-04-06T13:09:12.226Z"
                        },
                        {
                            "id": 13,
                            "name": "Pasta and Beans",
                            "quantity_sold": 7,
                            "price": 33.03,
                            "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.262Z",
                            "updated_at": "2021-04-06T13:09:12.262Z"
                        },
                        {
                            "id": 17,
                            "name": "Pasta Carbonara",
                            "quantity_sold": 6,
                            "price": 15.99,
                            "description": "Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce, with choice of two sides.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.326Z",
                            "updated_at": "2021-04-06T13:09:12.326Z"
                        },
                        {
                            "id": 28,
                            "name": "Pork Belly Buns",
                            "quantity_sold": 9,
                            "price": 10.08,
                            "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.528Z",
                            "updated_at": "2021-04-06T13:09:12.528Z"
                        },
                        {
                            "id": 30,
                            "name": "Linguine with Clams",
                            "quantity_sold": 4,
                            "price": 54.79,
                            "description": "Two buttermilk waffles, topped with whipped cream and maple syrup, a side of two eggs served any style, and your choice of smoked bacon or smoked ham.",
                            "image": {
                                "url": null
                            },
                            "category_id": 4,
                            "created_at": "2021-04-06T13:09:12.571Z",
                            "updated_at": "2021-04-06T13:09:12.571Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Cindy Fahey",
            "address": "455 Breitenberg Corner, Busterborough, MI 46837-2057",
            "phone_number": "0284306154",
            "email": "partner2@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-13T07:10:11.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:10.785Z",
            "updated_at": "2021-04-06T13:09:10.785Z",
            "categories": [
                {
                    "id": 3,
                    "name": "Chinese",
                    "parent_id": 1,
                    "partner_id": 2,
                    "created_at": "2021-04-06T13:09:11.935Z",
                    "updated_at": "2021-04-06T13:09:11.935Z",
                    "products": [
                        {
                            "id": 4,
                            "name": "Chilli con Carne",
                            "quantity_sold": 6,
                            "price": 13.87,
                            "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.080Z",
                            "updated_at": "2021-04-06T13:09:12.080Z"
                        },
                        {
                            "id": 5,
                            "name": "Peking Duck",
                            "quantity_sold": 9,
                            "price": 78.26,
                            "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.101Z",
                            "updated_at": "2021-04-06T13:09:12.101Z"
                        },
                        {
                            "id": 6,
                            "name": "Tuna Sashimi",
                            "quantity_sold": 2,
                            "price": 31.59,
                            "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.123Z",
                            "updated_at": "2021-04-06T13:09:12.123Z"
                        },
                        {
                            "id": 7,
                            "name": "Souvlaki",
                            "quantity_sold": 9,
                            "price": 41.53,
                            "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.141Z",
                            "updated_at": "2021-04-06T13:09:12.141Z"
                        },
                        {
                            "id": 9,
                            "name": "Lasagne",
                            "quantity_sold": 5,
                            "price": 70.86,
                            "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.191Z",
                            "updated_at": "2021-04-06T13:09:12.191Z"
                        },
                        {
                            "id": 19,
                            "name": "Chicken Parm",
                            "quantity_sold": 7,
                            "price": 16.03,
                            "description": "Fresh parsley, Italian sausage, shallots, garlic, sun-dried tomatoes and mozzarella cheese in an all-butter crust. With a side of mixed fruits.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.357Z",
                            "updated_at": "2021-04-06T13:09:12.357Z"
                        },
                        {
                            "id": 21,
                            "name": "Meatballs with Sauce",
                            "quantity_sold": 4,
                            "price": 56.73,
                            "description": "Creamy mascarpone cheese and custard layered between espresso and rum soaked house-made ladyfingers, topped with Valrhona cocoa powder.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.390Z",
                            "updated_at": "2021-04-06T13:09:12.390Z"
                        },
                        {
                            "id": 22,
                            "name": "Fettuccine Alfredo",
                            "quantity_sold": 9,
                            "price": 99.25,
                            "description": "Three egg whites with spinach, mushrooms, caramelized onions, tomatoes and low-fat feta cheese. With herbed quinoa, and your choice of rye or whole-grain toast.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.415Z",
                            "updated_at": "2021-04-06T13:09:12.415Z"
                        },
                        {
                            "id": 25,
                            "name": "Bruschette with Tomato",
                            "quantity_sold": 7,
                            "price": 36.38,
                            "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.471Z",
                            "updated_at": "2021-04-06T13:09:12.471Z"
                        },
                        {
                            "id": 29,
                            "name": "Risotto with Seafood",
                            "quantity_sold": 3,
                            "price": 27.56,
                            "description": "Smoked salmon, poached eggs, diced red onions and Hollandaise sauce on an English muffin. With a side of roasted potatoes.",
                            "image": {
                                "url": null
                            },
                            "category_id": 3,
                            "created_at": "2021-04-06T13:09:12.551Z",
                            "updated_at": "2021-04-06T13:09:12.551Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "name": "Joseph Beahan",
            "address": "9639 Teresia Locks, Brekkeville, MN 89464",
            "phone_number": "0618437036",
            "email": "partner3@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-20T15:52:07.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:10.809Z",
            "updated_at": "2021-04-06T13:09:10.809Z",
            "categories": [
                {
                    "id": 5,
                    "name": "French",
                    "parent_id": 4,
                    "partner_id": 3,
                    "created_at": "2021-04-06T13:09:11.973Z",
                    "updated_at": "2021-04-06T13:09:11.973Z",
                    "products": [
                        {
                            "id": 2,
                            "name": "California Maki",
                            "quantity_sold": 5,
                            "price": 71.98,
                            "description": "Fresh Norwegian salmon, lightly brushed with our herbed Dijon mustard sauce, with choice of two sides.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.038Z",
                            "updated_at": "2021-04-06T13:09:12.038Z"
                        },
                        {
                            "id": 8,
                            "name": "Chicken Parm",
                            "quantity_sold": 6,
                            "price": 68.72,
                            "description": "Fresh parsley, Italian sausage, shallots, garlic, sun-dried tomatoes and mozzarella cheese in an all-butter crust. With a side of mixed fruits.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.162Z",
                            "updated_at": "2021-04-06T13:09:12.162Z"
                        },
                        {
                            "id": 15,
                            "name": "Pizza",
                            "quantity_sold": 6,
                            "price": 63.77,
                            "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.294Z",
                            "updated_at": "2021-04-06T13:09:12.294Z"
                        },
                        {
                            "id": 18,
                            "name": "Vegetable Soup",
                            "quantity_sold": 8,
                            "price": 84.15,
                            "description": "Thick slices of French toast bread, brown sugar, half-and-half and vanilla, topped with powdered sugar. With two eggs served any style, and your choice of smoked bacon or smoked ham.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.342Z",
                            "updated_at": "2021-04-06T13:09:12.342Z"
                        },
                        {
                            "id": 23,
                            "name": "Ebiten maki",
                            "quantity_sold": 4,
                            "price": 62.11,
                            "description": "Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.434Z",
                            "updated_at": "2021-04-06T13:09:12.434Z"
                        },
                        {
                            "id": 24,
                            "name": "Pork Belly Buns",
                            "quantity_sold": 8,
                            "price": 37.19,
                            "description": "Three egg omelet with Roquefort cheese, chives, and ham. With a side of roasted potatoes, and your choice of toast or croissant.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.452Z",
                            "updated_at": "2021-04-06T13:09:12.452Z"
                        },
                        {
                            "id": 27,
                            "name": "Tuna Sashimi",
                            "quantity_sold": 1,
                            "price": 46.28,
                            "description": "Two butter croissants of your choice (plain, almond or cheese). With a side of herb butter or house-made hazelnut spread.",
                            "image": {
                                "url": null
                            },
                            "category_id": 5,
                            "created_at": "2021-04-06T13:09:12.508Z",
                            "updated_at": "2021-04-06T13:09:12.508Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": 4,
            "name": "Wilber Bosco Sr.",
            "address": "Suite 157 427 Schroeder Ports, Rippinstad, NE 66317",
            "phone_number": "0576964624",
            "email": "partner4@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-15T08:48:08.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:10.883Z",
            "updated_at": "2021-04-06T13:09:10.883Z",
            "categories": []
        },
        {
            "id": 5,
            "name": "Edris Hammes",
            "address": "869 Gerald Loaf, Nathanton, WI 42199",
            "phone_number": "0131907311",
            "email": "partner5@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-11T04:55:57.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:10.931Z",
            "updated_at": "2021-04-06T13:09:10.931Z",
            "categories": []
        },
        {
            "id": 6,
            "name": "Dr. Pok Wyman",
            "address": "Apt. 527 825 Lang Ways, Iraport, WA 73395-5708",
            "phone_number": "0846963602",
            "email": "partner6@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-07T15:55:07.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:10.960Z",
            "updated_at": "2021-04-06T13:09:10.960Z",
            "categories": []
        },
        {
            "id": 7,
            "name": "Matthew Toy",
            "address": "Apt. 947 817 Alfred Valley, Cheryleshire, IL 70716",
            "phone_number": "0241487755",
            "email": "partner7@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:10.000Z",
            "time_close": "2021-04-09T00:29:05.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:10.996Z",
            "updated_at": "2021-04-06T13:09:10.996Z",
            "categories": []
        },
        {
            "id": 8,
            "name": "Kay Bednar",
            "address": "Suite 173 4310 Ramiro Squares, Geraldoburgh, TX 94805",
            "phone_number": "0080064316",
            "email": "partner8@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-21T09:20:01.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.051Z",
            "updated_at": "2021-04-06T13:09:11.051Z",
            "categories": []
        },
        {
            "id": 9,
            "name": "Prof. Tammy Murazik",
            "address": "2796 Russel Vista, Toyton, OH 24809",
            "phone_number": "0573794849",
            "email": "partner9@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-15T21:00:20.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.096Z",
            "updated_at": "2021-04-06T13:09:11.096Z",
            "categories": []
        },
        {
            "id": 10,
            "name": "Antonia Gulgowski",
            "address": "Suite 680 614 Loria Greens, Lake Robtview, OH 88586",
            "phone_number": "0552598413",
            "email": "partner10@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-18T14:56:55.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.138Z",
            "updated_at": "2021-04-06T13:09:11.138Z",
            "categories": []
        },
        {
            "id": 11,
            "name": "Oscar Champlin",
            "address": "Suite 968 5867 Kathrine Isle, North Clementebury, DE 10655",
            "phone_number": "0737092795",
            "email": "partner11@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-09T03:42:19.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:11.178Z",
            "updated_at": "2021-04-06T13:09:11.178Z",
            "categories": []
        },
        {
            "id": 12,
            "name": "Keenan Conroy",
            "address": "9215 Claribel Club, New Quintonmouth, WV 75503",
            "phone_number": "0327340720",
            "email": "partner12@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-16T05:49:53.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:11.225Z",
            "updated_at": "2021-04-06T13:09:11.225Z",
            "categories": []
        },
        {
            "id": 13,
            "name": "Emery Schuster DDS",
            "address": "Apt. 870 8149 Oren Locks, Wunschstad, OR 64621-5767",
            "phone_number": "0985192805",
            "email": "partner13@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-15T04:28:40.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.262Z",
            "updated_at": "2021-04-06T13:09:11.262Z",
            "categories": []
        },
        {
            "id": 14,
            "name": "Brinda Torp",
            "address": "Apt. 323 13167 Gerhold Alley, Port Mauro, WI 84683-1407",
            "phone_number": "0376240651",
            "email": "partner14@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-06T21:52:31.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.299Z",
            "updated_at": "2021-04-06T13:09:11.299Z",
            "categories": []
        },
        {
            "id": 15,
            "name": "Rev. Laraine Koepp",
            "address": "418 Marta Shores, East Lazaro, WI 95577",
            "phone_number": "0605464866",
            "email": "partner15@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-07T09:59:59.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.338Z",
            "updated_at": "2021-04-06T13:09:11.338Z",
            "categories": []
        },
        {
            "id": 16,
            "name": "Christal Kessler",
            "address": "2181 Herman Curve, Samanthaport, WI 57248",
            "phone_number": "0951021673",
            "email": "partner16@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-19T19:44:24.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.370Z",
            "updated_at": "2021-04-06T13:09:11.370Z",
            "categories": []
        },
        {
            "id": 17,
            "name": "Aldo McGlynn",
            "address": "Apt. 107 59701 Stuart Ridge, North Douglasbury, MS 11295-2197",
            "phone_number": "0011431731",
            "email": "partner17@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-11T08:04:05.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:11.406Z",
            "updated_at": "2021-04-06T13:09:11.406Z",
            "categories": []
        },
        {
            "id": 18,
            "name": "Young Nader",
            "address": "Apt. 977 6211 Margaretta Cove, West Joyaborough, NC 57337",
            "phone_number": "0172494364",
            "email": "partner18@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-12T11:32:41.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.436Z",
            "updated_at": "2021-04-06T13:09:11.436Z",
            "categories": []
        },
        {
            "id": 19,
            "name": "Sigrid Turner",
            "address": "Apt. 970 41608 Cedric Isle, Darenborough, NJ 24426-5803",
            "phone_number": "0539121865",
            "email": "partner19@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-06T19:20:00.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.466Z",
            "updated_at": "2021-04-06T13:09:11.466Z",
            "categories": []
        },
        {
            "id": 20,
            "name": "Jessi Moore",
            "address": "Apt. 166 146 Nicholas Isle, Zemlakside, NY 13975",
            "phone_number": "0679453984",
            "email": "partner20@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-14T12:12:17.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.506Z",
            "updated_at": "2021-04-06T13:09:11.506Z",
            "categories": []
        },
        {
            "id": 21,
            "name": "Mike Maggio DO",
            "address": "70132 Hickle Well, South Jackquelinemouth, SC 27578",
            "phone_number": "0872118375",
            "email": "partner21@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-12T08:24:44.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.541Z",
            "updated_at": "2021-04-06T13:09:11.541Z",
            "categories": []
        },
        {
            "id": 22,
            "name": "Donte Gutmann",
            "address": "97687 Berge Meadows, Harrisonville, IN 80462",
            "phone_number": "0217243002",
            "email": "partner22@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-19T07:58:59.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.576Z",
            "updated_at": "2021-04-06T13:09:11.576Z",
            "categories": []
        },
        {
            "id": 23,
            "name": "Desmond Spinka Ret.",
            "address": "Suite 183 67307 Alix Hill, Port Jamison, WA 84019-1191",
            "phone_number": "0235752256",
            "email": "partner23@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-07T10:18:56.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:11.625Z",
            "updated_at": "2021-04-06T13:09:11.625Z",
            "categories": []
        },
        {
            "id": 24,
            "name": "Susanne Bogisich I",
            "address": "15828 Swift Keys, Carrolmouth, KS 21713-0691",
            "phone_number": "0225512789",
            "email": "partner24@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-15T12:50:19.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.664Z",
            "updated_at": "2021-04-06T13:09:11.664Z",
            "categories": []
        },
        {
            "id": 25,
            "name": "The Hon. Hunter Jakubowski",
            "address": "1609 Karolyn Green, South Willieburgh, WI 97338",
            "phone_number": "0844529706",
            "email": "partner25@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-09T23:16:41.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.705Z",
            "updated_at": "2021-04-06T13:09:11.705Z",
            "categories": []
        },
        {
            "id": 26,
            "name": "Francisco Marks",
            "address": "Apt. 453 83467 Jo Circle, Yukbury, CT 67621",
            "phone_number": "0910787856",
            "email": "partner26@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-17T08:24:15.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 2,
            "created_at": "2021-04-06T13:09:11.735Z",
            "updated_at": "2021-04-06T13:09:11.735Z",
            "categories": []
        },
        {
            "id": 27,
            "name": "Jed Balistreri",
            "address": "41315 Shawanda Greens, Kohlermouth, NJ 44853-0413",
            "phone_number": "0907864631",
            "email": "partner27@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-11T01:54:52.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.769Z",
            "updated_at": "2021-04-06T13:09:11.769Z",
            "categories": []
        },
        {
            "id": 28,
            "name": "Zackary Smitham",
            "address": "Apt. 782 60044 Johnston Land, Simonisborough, ME 97224-1124",
            "phone_number": "0518320899",
            "email": "partner28@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-17T09:44:20.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 1,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.803Z",
            "updated_at": "2021-04-06T13:09:11.803Z",
            "categories": [
                {
                    "id": 1,
                    "name": "Korean",
                    "parent_id": null,
                    "partner_id": 28,
                    "created_at": "2021-04-06T13:09:11.902Z",
                    "updated_at": "2021-04-06T13:09:11.902Z",
                    "products": []
                }
            ]
        },
        {
            "id": 29,
            "name": "Jerilyn Nikolaus",
            "address": "32013 Mariam Junction, East Kalynstad, OK 09373-1126",
            "phone_number": "0155564611",
            "email": "partner29@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-09T10:34:00.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 3,
            "type_id": 1,
            "created_at": "2021-04-06T13:09:11.839Z",
            "updated_at": "2021-04-06T13:09:11.839Z",
            "categories": []
        },
        {
            "id": 30,
            "name": "Matilda Towne",
            "address": "Apt. 291 28436 Les Spur, East Damionshire, NV 52019-2338",
            "phone_number": "0665233995",
            "email": "partner30@gmail.com",
            "password": "Test123@",
            "time_open": "2021-04-06T13:09:11.000Z",
            "time_close": "2021-04-15T00:37:44.000Z",
            "status": null,
            "latitude": null,
            "longitude": null,
            "image": {
                "url": null
            },
            "city_id": 2,
            "type_id": 3,
            "created_at": "2021-04-06T13:09:11.874Z",
            "updated_at": "2021-04-06T13:09:11.874Z",
            "categories": []
        }
    ],
    partners2: []
}

const getters = {
    getPartnersLocal(state) {
        return state.partners2;
    },
}

const mutations = {
    addNewPartner(state, data) {
        state.partners2.data.unshift(data);
    },
    setPartners(state, data) {
        state.partners2 = data;
    },
    deleteOnePartner(state, partnerId) {
        state.partners2.data = state.partners2.data.filter(partner => partner.id != partnerId);
    },
    updateOnePartner(state, params) {
        state.partners2.data = state.partners2.data.map(partner => {
            if (partner.id == params.id) {
                partner = params.data;
                partner.id = params.id;
            }
            return partner
        })
    }
}

const actions = {
    getPartners({ commit }) {
        return new Promise((res, rej) => {
            httpRequest.get('/partners')
                .then((response) => {
                    // console.log(response);
                    res();
                    commit('setPartners', response.data);
                }).catch(err => {
                    rej(err.response);
                });
        })
    },
    addPartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.post('/partners', params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    deletePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.delete('/partners/' + params)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
    updatePartner({ commit }, params) {
        return new Promise((res, rej) => {
            httpRequest.put('/partners/' + params.id, params.data)
                .then((response) => {
                    res(response.data);
                }).catch(err => {
                    rej(err.response.data.error);
                });
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}