let currentId = 1; // Initialize outside to ensure unique IDs across all categories

export const generateMenuItem = (item, categoryEmoji) => ({
    id: currentId++,
    name: item.name,
    desc: item.desc || `Delicious ${item.name.toLowerCase()}.`, // Default description if not provided
    price: item.price,
    tag: "Veg", // All items are veg as per your instruction
    emoji: categoryEmoji, // Use category emoji as default for items
    cal: "N/A", // Default calories, as not provided in the input
});

export const menuCategories = [
    {
        category: "Pizza Menu",
        emoji: "🍕",
        items: [
            { name: "Plain Cheese Classic", price: "Rs. 90/-", desc: "A timeless classic with rich cheese." },
            { name: "Vegetables Cheese", price: "Rs. 100/-", desc: "Fresh garden vegetables topped with gooey cheese." },
            { name: "Jain Spicy", price: "Rs. 110/-", desc: "A spicy Jain-friendly pizza, bursting with flavor." },
            { name: "Veg. Paneer Cheese", price: "Rs. 120/-", desc: "Soft paneer cubes and melted cheese on a delicious base." },
            { name: "Jain Paneer", price: "Rs. 120/-", desc: "A delightful Jain pizza featuring succulent paneer." },
            { name: "Hot Potato (Double Cheese)", price: "Rs. 130/-", desc: "Spicy potato chunks with an extra layer of cheese." },
            { name: "Spl. Veg. American Corn With Paneer (Double Cheese)", price: "Rs. 130/-", desc: "Sweet American corn and paneer, generously topped with double cheese." },
            { name: "Spl. Chatpata Chat Paneer (Double Cheese)", price: "Rs. 130/-", desc: "Tangy and spicy chat-style paneer with double cheese." },
            { name: "Spl. Veg. Paneer Cheesey Peasy (Double Cheese)", price: "Rs. 130/-", desc: "A super cheesy and peasy paneer pizza with double cheese." },
            { name: "Spl. Hot & Sweet Chocolate with Choco Butter Dip", price: "Rs. 140/-", desc: "A unique dessert pizza with hot & sweet chocolate, served with choco butter dip." },
            { name: "Spl. Olives Pizza", price: "Rs. 140/-", desc: "Classic pizza loaded with savory black olives." },
            { name: "Spl. Jalapeno Pizza", price: "Rs. 140/-", desc: "A zesty pizza with fiery jalapenos for a kick." },
            { name: "Spl. Maxican Pizza", price: "Rs. 140/-", desc: "Experience the flavors of Mexico on a pizza." },
            { name: "Spl. Garlic Pizza", price: "Rs. 140/-", desc: "Aromatic garlic-infused pizza, simple yet delicious." },
            { name: "Spl. Cheese Burst (Double Cheese)", price: "Rs. 140/-", desc: "An explosion of cheese with a double cheese burst crust." },
            { name: "Spl. Paneer Tikka (Double Cheese)", price: "Rs. 150/-", desc: "Marinated paneer tikka pieces with double cheese." },
            { name: "Spl. Hot Cocktail (Double Cheese)", price: "Rs. 150/-", desc: "A spicy and flavorful cocktail of veggies with double cheese." },
            { name: "Spl. Paneer Piri Piri Golden Corn", price: "Rs. 150/-", desc: "Spicy piri piri paneer and sweet golden corn." },
            { name: "Spl. Paneer Makhani Chatkara Pizza", price: "Rs. 150/-", desc: "Rich and creamy paneer makhani flavor on a pizza." },
            { name: "Spl. Rosted Tandoori Paneer Pizza", price: "Rs. 150/-", desc: "Smoky roasted tandoori paneer for an authentic taste." },
            { name: "Spl. Schezwan Pizza", price: "Rs. 150/-", desc: "A fiery Schezwan sauce base with delicious toppings." },
            { name: "Spl. Paneer Marwadi Tikha (Kadhai Paneer)", price: "Rs. 160/-", desc: "Spicy Marwadi-style paneer, reminiscent of Kadhai Paneer." },
            { name: "Spl. Spicy Cheese Chilly Garlic", price: "Rs. 160/-", desc: "A hot and pungent pizza with spicy cheese, chili, and garlic." },
            { name: "Spl. Thin Crust Pizza", price: "Rs. 160/-", desc: "Crispy thin crust with your favorite toppings." },
            { name: "Spl. Macaroni Pasta Pizza", price: "Rs. 170/-", desc: "A unique fusion of macaroni pasta and pizza." },
            { name: "Spl. Mozzarella Cheese Pizza", price: "Rs. 170/-", desc: "Extra gooey and stretchy mozzarella cheese pizza." },
            { name: "Spl. Baby Corn Pizza", price: "Rs. 170/-", desc: "Sweet and tender baby corn as the star topping." },
        ].map(item => generateMenuItem(item, "🍕"))
    },
    {
        category: "Sandwich Menu (Regular)",
        emoji: "🥪",
        items: [
            { name: "Spl. Veg Cheese Roll", price: "Rs. 50/-", desc: "A delicious vegetarian cheese roll." },
            { name: "Nutella Jam Sandwich", price: "Rs. 50/-", desc: "Sweet Nutella and jam in a delightful sandwich." },
            { name: "Chocolate Grill Sandwich", price: "Rs. 60/-", desc: "Warm, gooey chocolate grilled to perfection." },
            { name: "Veg Cheese Grill Sandwich", price: "Rs. 60/-", desc: "Classic grilled sandwich with vegetables and cheese." },
            { name: "Veg Mayo Grill Sandwich", price: "Rs. 60/-", desc: "Grilled sandwich with creamy vegetable mayonnaise." },
            { name: "Paneer Cheese Grill", price: "Rs. 70/-", desc: "Grilled sandwich with paneer and cheese." },
            { name: "Spl. Paneer Cheese Grill", price: "Rs. 80/-", desc: "Special grilled sandwich with paneer and cheese." },
            { name: "Veg Paneer Sandwich", price: "Rs. 60/-", desc: "A wholesome sandwich with vegetables and paneer." },
            { name: "Spl. Veg Paneer Sandwich", price: "Rs. 70/-", desc: "Special sandwich with vegetables and paneer." },
            { name: "Veg Paneer Cheese Grill", price: "Rs. 70/-", desc: "Grilled sandwich with vegetables, paneer, and cheese." },
            { name: "Spl. Paneer Cheese Grill", price: "Rs. 80/-", desc: "Another special grilled sandwich with paneer and cheese." }, // Assuming this is a distinct item despite name collision
            { name: "Spl. Baby Corn Cheese Grill", price: "Rs. 80/-", desc: "Grilled sandwich featuring baby corn and cheese." },
            { name: "Cold Coffee", price: "Rs. 50/-", desc: "Refreshing cold coffee." },
            { name: "Cold Coffee with Ice Cream", price: "Rs. 70/-", desc: "Cold coffee topped with a scoop of ice cream." },
            { name: "Chocolate Shake", price: "Rs. 60/-", desc: "Rich and creamy chocolate shake." },
            { name: "Vanilla Shake", price: "Rs. 60/-", desc: "Classic vanilla flavored shake." },
            { name: "Strawberry Shake", price: "Rs. 60/-", desc: "Sweet and fruity strawberry shake." },
            { name: "Butterscotch Shake", price: "Rs. 60/-", desc: "Delicious butterscotch flavored shake." },
        ].map(item => generateMenuItem(item, "🥪"))
    },
    {
        category: "Burger Menu",
        emoji: "🍔",
        items: [
            { name: "Aloo Tikki Burger", price: "Rs. 50/-", desc: "A classic burger with a crispy aloo tikki patty." },
            { name: "Veg. Cheese Aloo Tikki", price: "Rs. 60/-", desc: "Aloo tikki burger with melted cheese." },
            { name: "Tandoori Butter Cheese Burger", price: "Rs. 70/-", desc: "Burger with tandoori butter and cheese." },
            { name: "Mexican Cheese Ball Burger", price: "Rs. 70/-", desc: "Burger featuring Mexican-style cheese balls." },
            { name: "Paneer Cheese Burger", price: "Rs. 70/-", desc: "Burger with succulent paneer and cheese." },
            { name: "Corn Cheese Burger", price: "Rs. 70/-", desc: "Burger with sweet corn and cheese." },
            { name: "Paneer Chilli Fry Aloo Tikki", price: "Rs. 70/-", desc: "Aloo tikki burger with spicy paneer chili fry." },
            { name: "Tandoori Paneer Cheese Burger", price: "Rs. 70/-", desc: "Burger with tandoori paneer and cheese." },
            { name: "Maharaja Paneer Cheese Burger", price: "Rs. 80/-", desc: "A royal burger with Maharaja-style paneer and cheese." },
            { name: "Schezwan Paneer Cheese Burger", price: "Rs. 80/-", desc: "Spicy Schezwan paneer and cheese burger." },
            { name: "Peri Peri Paneer Cheese Burger", price: "Rs. 80/-", desc: "Burger with fiery Peri Peri paneer and cheese." },
            { name: "Spl. Maharaja Cheese Burger", price: "Rs. 90/-", desc: "Special Maharaja-style cheese burger." },
        ].map(item => generateMenuItem(item, "🍔"))
    },
    {
        category: "Garlic Bread",
        emoji: "🧄",
        items: [
            { name: "Garlic Bread", price: "Rs. 60/-", desc: "Classic toasted garlic bread." },
            { name: "Cheese Garlic Bread", price: "Rs. 80/-", desc: "Garlic bread topped with melted cheese." },
            { name: "Spl. Garlic Bread", price: "Rs. 100/-", desc: "Special garlic bread with extra flavor." },
        ].map(item => generateMenuItem(item, "🧄"))
    },
    {
        category: "Extra Shakes / Beverages",
        emoji: "🥤",
        items: [
            { name: "Oreo Shake", price: "Rs. 70/-", desc: "Creamy Oreo cookie shake." },
            { name: "KitKat Shake", price: "Rs. 80/-", desc: "Delicious KitKat chocolate shake." },
            { name: "Chocolate Thick Shake", price: "Rs. 90/-", desc: "Rich and thick chocolate shake." },
        ].map(item => generateMenuItem(item, "🥤"))
    }
];