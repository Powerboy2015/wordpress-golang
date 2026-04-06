
interface NavRouteProps {
    route: string
    children: React.ReactNode
}
export default function NavRouteComponent({children,route}: NavRouteProps) {
    return<a href={route} className="text-[#D2D0C3]">
        {children}
    </a>
}