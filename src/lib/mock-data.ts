export const mockOrders = [
    {
        id: "ORD-001",
        customer: {
            name: "Rahul Gupta",
            email: "rahul@example.com",
            phone: "+91 98765 43210"
        },
        restaurant: {
            name: "Burger King",
            address: "Connaught Place, New Delhi"
        },
        deliveryPartner: {
            name: "Amit Kumar",
            phone: "+91 91234 56789",
            status: "On Way"
        },
        items: [
            { name: "Whopper Meal", quantity: 2, price: 350 },
            { name: "Coke", quantity: 2, price: 60 }
        ],
        amount: 820,
        status: "Out for Delivery",
        paymentStatus: "Paid",
        paymentMethod: "UPI",
        date: "2023-10-25T10:30:00Z"
    },
    {
        id: "ORD-002",
        customer: {
            name: "Priya Sharma",
            email: "priya@example.com",
            phone: "+91 87654 32109"
        },
        restaurant: {
            name: "Pizza Hut",
            address: "Saket, New Delhi"
        },
        deliveryPartner: null,
        items: [
            { name: "Farmhouse Pizza", quantity: 1, price: 550 },
            { name: "Garlic Bread", quantity: 1, price: 150 }
        ],
        amount: 700,
        status: "Pending",
        paymentStatus: "Paid",
        paymentMethod: "Card",
        date: "2023-10-25T11:15:00Z"
    },
    {
        id: "ORD-003",
        customer: {
            name: "Vikram Singh",
            email: "vikram@example.com",
            phone: "+91 76543 21098"
        },
        restaurant: {
            name: "Haldiram's",
            address: "Noida Sector 18"
        },
        deliveryPartner: {
            name: "Suresh Yadav",
            phone: "+91 99887 76655",
            status: "Delivered"
        },
        items: [
            { name: "Raj Kachori", quantity: 2, price: 120 },
            { name: "Chole Bhature", quantity: 2, price: 150 }
        ],
        amount: 540,
        status: "Delivered",
        paymentStatus: "Paid",
        paymentMethod: "Cash",
        date: "2023-10-24T18:45:00Z"
    },
    {
        id: "ORD-004",
        customer: {
            name: "Anjali Mehta",
            email: "anjali@example.com",
            phone: "+91 99999 88888"
        },
        restaurant: {
            name: "Wow! Momo",
            address: "Gurgaon Cyber Hub"
        },
        deliveryPartner: {
            name: "Ravi Verma",
            phone: "+91 88888 77777",
            status: "Picked Up"
        },
        items: [
            { name: "Chicken Momos", quantity: 2, price: 180 },
            { name: "Thukpa", quantity: 1, price: 200 }
        ],
        amount: 560,
        status: "On Way",
        paymentStatus: "Paid",
        paymentMethod: "UPI",
        date: "2023-10-25T11:45:00Z"
    },
    {
        id: "ORD-005",
        customer: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+91 77777 66666"
        },
        restaurant: {
            name: "Starbucks",
            address: "Vasant Kunj, New Delhi"
        },
        deliveryPartner: null,
        items: [
            { name: "Cappuccino", quantity: 1, price: 350 },
            { name: "Croissant", quantity: 1, price: 250 }
        ],
        amount: 600,
        status: "Cancelled",
        paymentStatus: "Refunded",
        paymentMethod: "Card",
        date: "2023-10-24T09:00:00Z"
    }
];

export const mockRestaurants = [
    {
        id: "RES-001",
        name: "Burger King",
        partnerName: "Rohan Miller",
        email: "bk.cp@example.com",
        phone: "+91 98765 43210",
        location: "Connaught Place, New Delhi",
        status: "Active",
        rating: 4.5,
        totalOrders: 1250,
        revenue: 450000,
        activeSince: "2023-01-15",
        cuisine: ["American", "Fast Food"],
        fssai: "12345678901234",
        gst: "07AAAAA0000A1Z5",
        coordinates: { lat: 28.6315, lng: 77.2167 }
    },
    {
        id: "RES-002",
        name: "Pizza Hut",
        partnerName: "Sanya Malhotra",
        email: "ph.saket@example.com",
        phone: "+91 87654 32109",
        location: "Saket, New Delhi",
        status: "Active",
        rating: 4.2,
        totalOrders: 850,
        revenue: 320000,
        activeSince: "2023-03-10",
        cuisine: ["Italian", "Pizza"],
        fssai: "12345678901235",
        gst: "07AAAAA0000A1Z6",
        coordinates: { lat: 28.5205, lng: 77.2201 }
    },
    {
        id: "RES-003",
        name: "Haldiram's",
        partnerName: "Amit Agarwal",
        email: "haldirams.noida@example.com",
        phone: "+91 76543 21098",
        location: "Noida Sector 18",
        status: "Pending",
        rating: 0,
        totalOrders: 0,
        revenue: 0,
        activeSince: "-",
        cuisine: ["North Indian", "Sweets"],
        fssai: "Pending",
        gst: "Pending"
    },
    {
        id: "RES-004",
        name: "Wow! Momo",
        partnerName: "Rahul Roy",
        email: "wowmomo.ggn@example.com",
        phone: "+91 99999 88888",
        location: "Gurgaon Cyber Hub",
        status: "Active",
        rating: 4.6,
        totalOrders: 2100,
        revenue: 150000,
        activeSince: "2022-11-20",
        cuisine: ["Asian", "Momos"],
        fssai: "12345678901236",
        gst: "07AAAAA0000A1Z7"
    },
    {
        id: "RES-005",
        name: "Suspicious Kitchen",
        partnerName: "Unknown User",
        email: "sus@example.com",
        phone: "+91 00000 00000",
        location: "Unknown",
        status: "Suspended",
        rating: 1.2,
        totalOrders: 5,
        revenue: 1200,
        activeSince: "2023-10-01",
        cuisine: ["Unknown"],
        fssai: "Invalid",
        gst: "Invalid"
    }
];

export const mockCustomers = [
    {
        id: "CUST-001",
        name: "Arsh Verma",
        email: "arsh@example.com",
        phone: "+91 99999 88888",
        status: "Active",
        registeredOn: "2023-01-01",
        totalOrders: 154,
        totalSpent: 45000,
        addresses: [
            { id: 1, type: "Home", address: "123, Vasant Kunj, New Delhi" },
            { id: 2, type: "Work", address: "Cyber City, Gurgaon" }
        ],
        recentOrders: ["ORD-001", "ORD-010"]
    },
    {
        id: "CUST-002",
        name: "Simran Kaur",
        email: "simran@example.com",
        phone: "+91 88888 77777",
        status: "Blocked",
        registeredOn: "2023-02-15",
        totalOrders: 2,
        totalSpent: 500,
        addresses: [
            { id: 1, type: "Home", address: "Saket, New Delhi" }
        ],
        recentOrders: []
    }
];

export const mockDeliveryPartners = [
    {
        id: "DP-001",
        name: "Amit Kumar",
        email: "amit.dp@example.com",
        phone: "+91 91234 56789",
        status: "Active",
        verificationStatus: "Verified",
        registeredOn: "2023-01-10",
        currentZone: "South Delhi",
        vehicleNumber: "DL 3S AB 1234",
        vehicleType: "Bike",
        dlNumber: "DL1234567890",
        earnings: 15600,
        rating: 4.8,
        totalDeliveries: 1200,
        coordinates: { lat: 28.6290, lng: 77.2190 }
    },
    {
        id: "DP-002",
        name: "Suresh Yadav",
        email: "suresh.dp@example.com",
        phone: "+91 99887 76655",
        status: "Pending",
        verificationStatus: "Pending Documents",
        registeredOn: "2023-10-20",
        currentZone: "Noida",
        vehicleNumber: "UP 16 XY 9876",
        vehicleType: "Scooter",
        dlNumber: "UP9876543210",
        earnings: 0,
        rating: 0,
        totalDeliveries: 0,
        coordinates: { lat: 28.5355, lng: 77.3910 }
    },
];

export const mockRestaurantPartners = [
    {
        id: "RP-001",
        name: "Rohan Miller",
        email: "rohan@example.com",
        phone: "+91 77777 00000",
        status: "Active",
        registeredOn: "2023-01-15",
        restaurantsManaged: ["RES-001"]
    },
    {
        id: "RP-002",
        name: "Sanya Malhotra",
        email: "sanya@example.com",
        phone: "+91 66666 55555",
        status: "Active",
        registeredOn: "2023-03-10",
        restaurantsManaged: ["RES-002"]
    }
];

export const mockTransactions = [
    {
        id: "TXN-001",
        orderId: "ORD-001",
        customerName: "Rahul Gupta",
        amount: 820,
        paymentMethod: "UPI",
        status: "Success",
        date: "2023-10-25T10:30:00Z"
    },
    {
        id: "TXN-002",
        orderId: "ORD-002",
        customerName: "Priya Sharma",
        amount: 700,
        paymentMethod: "Card",
        status: "Success",
        date: "2023-10-25T11:15:00Z"
    },
    {
        id: "TXN-003",
        orderId: "ORD-005",
        customerName: "John Doe",
        amount: 600,
        paymentMethod: "Card",
        status: "Refunded",
        date: "2023-10-24T09:00:00Z"
    },
    {
        id: "TXN-004",
        orderId: "ORD-010",
        customerName: "Arsh Verma",
        amount: 1200,
        paymentMethod: "Net Banking",
        status: "Pending",
        date: "2023-10-26T14:20:00Z"
    }
];

export const mockRefunds = [
    {
        id: "REF-001",
        orderId: "ORD-005",
        customerName: "John Doe",
        amount: 600,
        reason: "Order Cancelled by User",
        status: "Processed",
        requestedOn: "2023-10-24T09:05:00Z",
        processedOn: "2023-10-24T14:00:00Z"
    },
    {
        id: "REF-002",
        orderId: "ORD-012",
        customerName: "Simran Kaur",
        amount: 350,
        reason: "Wrong Item Delivered",
        status: "Pending",
        requestedOn: "2023-10-26T10:00:00Z",
        processedOn: "-"
    }
];

export const mockPayouts = [
    {
        id: "PO-001",
        partnerName: "Burger King (Connaught Place)",
        type: "Restaurant",
        period: "15 Oct - 21 Oct 2023",
        amount: 45000,
        status: "Processed",
        processedDate: "2023-10-22"
    },
    {
        id: "PO-002",
        partnerName: "Amit Kumar",
        type: "Delivery Partner",
        period: "15 Oct - 21 Oct 2023",
        amount: 5600,
        status: "Pending",
        processedDate: "-"
    }
];

export const mockTickets = [
    {
        id: "TKT-001",
        subject: "Order not delivered",
        type: "Order Issue",
        priority: "High",
        customerName: "Rahul Gupta",
        status: "Open",
        assignedTo: "Support Agent 1",
        createdOn: "2023-10-26T10:00:00Z",
        lastUpdated: "2023-10-26T10:30:00Z"
    },
    {
        id: "TKT-002",
        subject: "Payment deduction issue",
        type: "Payment Issue",
        priority: "Critical",
        customerName: "Priya Sharma",
        status: "In Progress",
        assignedTo: "Support Agent 2",
        createdOn: "2023-10-25T14:00:00Z",
        lastUpdated: "2023-10-26T09:00:00Z"
    },
    {
        id: "TKT-003",
        subject: "Change phone number",
        type: "Account Issue",
        priority: "Low",
        customerName: "John Doe",
        status: "Resolved",
        assignedTo: "Support Agent 1",
        createdOn: "2023-10-24T11:00:00Z",
        lastUpdated: "2023-10-25T16:00:00Z"
    }
];

export const mockDisputes = [
    {
        id: "DSP-001",
        orderId: "ORD-005",
        type: "Order Cancelled by User",
        status: "Open",
        parties: ["John Doe", "Starbucks"],
        evidence: ["Screenshot of chat"],
        amount: 600,
        createdOn: "2023-10-24T10:00:00Z"
    },
    {
        id: "DSP-002",
        orderId: "ORD-012",
        type: "Wrong Item Delivered",
        status: "Resolved",
        parties: ["Simran Kaur", "Pizza Hut"],
        evidence: ["Photo of food"],
        amount: 350,
        createdOn: "2023-10-25T12:00:00Z"
    }
];

export const mockAnalyticsData = [
    { name: 'Mon', revenue: 4000, orders: 24, newCustomers: 5 },
    { name: 'Tue', revenue: 3000, orders: 18, newCustomers: 3 },
    { name: 'Wed', revenue: 5500, orders: 35, newCustomers: 8 },
    { name: 'Thu', revenue: 4500, orders: 28, newCustomers: 4 },
    { name: 'Fri', revenue: 7000, orders: 55, newCustomers: 12 },
    { name: 'Sat', revenue: 8500, orders: 70, newCustomers: 15 },
    { name: 'Sun', revenue: 9000, orders: 75, newCustomers: 18 },
];

export const mockOrdersByStatus = [
    { name: 'Delivered', value: 450, color: '#10b981' }, // emerald-500
    { name: 'Cancelled', value: 50, color: '#ef4444' }, // red-500
    { name: 'Pending', value: 80, color: '#f59e0b' }, // amber-500
];

export const mockOrdersByTime = [
    { name: '8-10 AM', orders: 150 },
    { name: '11-1 PM', orders: 450 },
    { name: '2-4 PM', orders: 200 },
    { name: '5-7 PM', orders: 350 },
    { name: '8-10 PM', orders: 600 },
];

export const mockAdminUsers = [
    {
        id: "ADM-001",
        name: "Arsh Verma",
        email: "arsh@zomato.com",
        role: "Super Admin",
        status: "Active",
        lastActive: "2023-10-26T14:00:00Z"
    },
    {
        id: "ADM-002",
        name: "Support Lead",
        email: "support@zomato.com",
        role: "Support",
        status: "Active",
        lastActive: "2023-10-26T12:30:00Z"
    },
    {
        id: "ADM-003",
        name: "Finance Manager",
        email: "finance@zomato.com",
        role: "Finance",
        status: "Inactive",
        lastActive: "2023-10-20T09:00:00Z"
    }
];

export const mockRoles = [
    {
        id: "ROLE-001",
        name: "Super Admin",
        permissions: ["All Access"]
    },
    {
        id: "ROLE-002",
        name: "Support",
        permissions: ["View Orders", "Manage Tickets", "View Users"]
    },
    {
        id: "ROLE-003",
        name: "Finance",
        permissions: ["View Payments", "Process Refunds", "View Analytics"]
    }
];

export const mockSystemLogs = [
    {
        id: "LOG-001",
        user: "Arsh Verma",
        action: "Updated Platform Fees",
        timestamp: "2023-10-26T14:05:00Z",
        details: "Changed Commission from 20% to 22%"
    },
    {
        id: "LOG-002",
        user: "Support Lead",
        action: "Resolved Ticket TKT-003",
        timestamp: "2023-10-26T12:35:00Z",
        details: "Ticket marked as Resolved"
    },
    {
        id: "LOG-003",
        user: "System",
        action: "Backup Completed",
        timestamp: "2023-10-26T00:00:00Z",
        details: "Daily database backup successful"
    }
];

export const mockPromos = [
    {
        id: "PROMO-001",
        code: "WELCOME50",
        description: "50% off on first order",
        type: "Percentage",
        discountValue: 50,
        maxDiscount: 150,
        minOrderValue: 200,
        usageLimit: 1000,
        usedCount: 450,
        perUserLimit: 1,
        validFrom: "2023-10-01T00:00:00Z",
        validUntil: "2023-12-31T23:59:59Z",
        status: "Active",
        applicableTo: "New Customers"
    },
    {
        id: "PROMO-002",
        code: "FREEDEL",
        description: "Free delivery on all orders",
        type: "Free Delivery",
        discountValue: 0,
        maxDiscount: 50,
        minOrderValue: 150,
        usageLimit: 5000,
        usedCount: 3200,
        perUserLimit: 5,
        validFrom: "2023-09-15T00:00:00Z",
        validUntil: "2023-10-31T23:59:59Z",
        status: "Expired",
        applicableTo: "All Customers"
    },
    {
        id: "PROMO-003",
        code: "NEWYEAR100",
        description: "Flat ₹100 off",
        type: "Flat",
        discountValue: 100,
        maxDiscount: 100,
        minOrderValue: 300,
        usageLimit: 2000,
        usedCount: 0,
        perUserLimit: 2,
        validFrom: "2024-01-01T00:00:00Z",
        validUntil: "2024-01-15T23:59:59Z",
        status: "Scheduled",
        applicableTo: "All Customers"
    }
];

export const mockZones = [
    {
        id: "ZONE-001",
        name: "South Delhi",
        status: "Active",
        activeRestaurants: 45,
        activePartners: 120,
        avgDeliveryTime: 28,
        deliveryFee: 30,
        minOrderValue: 150,
        maxDeliveryDistance: 8,
        surgePricing: true,
        peakHours: ["12:00-14:00", "19:00-22:00"],
        ordersToday: 850,
        revenueToday: 425000
    },
    {
        id: "ZONE-002",
        name: "North Delhi",
        status: "Active",
        activeRestaurants: 38,
        activePartners: 95,
        avgDeliveryTime: 32,
        deliveryFee: 25,
        minOrderValue: 100,
        maxDeliveryDistance: 10,
        surgePricing: false,
        peakHours: ["12:00-14:00", "19:00-21:00"],
        ordersToday: 620,
        revenueToday: 310000
    },
    {
        id: "ZONE-003",
        name: "Noida",
        status: "Active",
        activeRestaurants: 52,
        activePartners: 140,
        avgDeliveryTime: 25,
        deliveryFee: 35,
        minOrderValue: 200,
        maxDeliveryDistance: 12,
        surgePricing: true,
        peakHours: ["12:00-14:00", "20:00-23:00"],
        ordersToday: 920,
        revenueToday: 460000
    },
    {
        id: "ZONE-004",
        name: "Gurgaon",
        status: "Inactive",
        activeRestaurants: 0,
        activePartners: 0,
        avgDeliveryTime: 0,
        deliveryFee: 40,
        minOrderValue: 250,
        maxDeliveryDistance: 15,
        surgePricing: false,
        peakHours: [],
        ordersToday: 0,
        revenueToday: 0
    }
];
