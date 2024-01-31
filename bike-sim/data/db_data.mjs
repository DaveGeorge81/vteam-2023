/**
 * Bike rental simulation data.
 * © Jonas B., Vteam 2023 Group 8.
 */

const cities = [
    {
        name: "Karlskrona",
        lat: 56.193,
        lon: 15.628,
        dlat: 0.023,
        dlon: 0.038
    },
    {
        name: "Stockholm",
        lat: 59.325,
        lon: 18.071,
        dlat: 0.06,
        dlon: 0.12
    },
    {
        name: "Helsingborg",
        lat: 56.046,
        lon: 12.72,
        dlat: 0.038,
        dlon: 0.04
    }
];

const stations = [
    [
        {
            num: 60,
            lat_rel: -0.1,
            lon_rel: -0.05
        },
        {
            num: 40,
            lat_rel: 0.85,
            lon_rel: 0.5
        },
        {
            num: 50,
            lat_rel: -0.55,
            lon_rel: -0.7
        }
    ],
    [
        {
            num: 80,
            lat_rel: 0.15,
            lon_rel: 0.15
        },
        {
            num: 60,
            lat_rel: 0.75,
            lon_rel: 0.55
        },
        {
            num: 60,
            lat_rel: -0.4,
            lon_rel: 0.1
        },
        {
            num: 50,
            lat_rel: -0.25,
            lon_rel: 0.55
        },
        {
            num: 60,
            lat_rel: -0.65,
            lon_rel: -0.8
        },
        {
            num: 50,
            lat_rel: 0.15,
            lon_rel: -0.85
        }
    ],
    [
        {
            num: 50,
            lat_rel: 0.1,
            lon_rel: 0.1
        },
        {
            num: 40,
            lat_rel: 0.75,
            lon_rel: 0.2
        },
        {
            num: 40,
            lat_rel: -0.4,
            lon_rel: -0.3
        }
    ]
];

const parkZones = [
    [
        {
            lat_rel: -0.1,
            lon_rel: 0.15,
            dlat_rel: 0.1,
            dlon_rel: 0.13
        },
        {
            lat_rel: 0.45,
            lon_rel: -0.3,
            dlat_rel: 0.12,
            dlon_rel: 0.14
        },
        {
            lat_rel: -0.5,
            lon_rel: -0.35,
            dlat_rel: 0.12,
            dlon_rel: 0.14
        },
        {
            lat_rel: 0.8,
            lon_rel: 0.75,
            dlat_rel: 0.11,
            dlon_rel: 0.14
        }
    ],
    [
        {
            lat_rel: 0.1,
            lon_rel: -0.1,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        },
        {
            lat_rel: 0.45,
            lon_rel: -0.5,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        },
        {
            lat_rel: -0.2,
            lon_rel: 0.7,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        },
        {
            lat_rel: -0.65,
            lon_rel: 0.2,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        },
        {
            lat_rel: -0.45,
            lon_rel: -0.5,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        },
        {
            lat_rel: 0.6,
            lon_rel: 0.7,
            dlat_rel: 0.1,
            dlon_rel: 0.1
        }
    ],
    [
        {
            lat_rel: -0.1,
            lon_rel: -0.1,
            dlat_rel: 0.1,
            dlon_rel: 0.16
        },
        {
            lat_rel: 0.55,
            lon_rel: 0.4,
            dlat_rel: 0.1,
            dlon_rel: 0.16
        },
        {
            lat_rel: -0.7,
            lon_rel: -0.3,
            dlat_rel: 0.1,
            dlon_rel: 0.2
        }
    ]
];

const pricing = [
    {
        start: 10,
        minute: 3,
        extra: 10,
        discount: 10
    },
    {
        start: 15,
        minute: 4,
        extra: 15,
        discount: 20
    },
    {
        start: 12,
        minute: 3,
        extra: 12,
        discount: 15
    }
];

export { cities, stations, parkZones, pricing };

