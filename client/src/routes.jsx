import Dashboard from "./pages/dashboard"

import Devices from "./pages/devices"

export default [
    {
        path: "/",
        element: <Dashboard/>,
    },
    {
        path: "/devices",
        element: <Devices/>
    }
]