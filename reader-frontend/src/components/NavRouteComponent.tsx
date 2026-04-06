import { Link } from "react-router-dom"

interface NavRouteProps {
    route: string
    children: React.ReactNode
}
export default function NavRouteComponent({children,route}: NavRouteProps) {
    return<Link to={route} className="text-[#D2D0C3]">
        {children}
    </Link>
}