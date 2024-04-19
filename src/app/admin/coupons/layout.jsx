'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';


const navLinks = [
    { name: 'Coupons', href: '/admin/coupons' },
    { name: 'Campains', href: '/admin/coupons/campains' }
  ]
  
function Layout({ children }) {
    const path = usePathname();
    const router = useRouter();
    const activeLink = navLinks.find(link => link.href == path);

    return (
        <div className='p-2'>
            <div className="flex">
                <h2 className="text-3xl font-bold my-2">Coupons</h2>
            </div>

            <div className="flex-column">
                {
                    (
                        <Tabs defaultValue={activeLink && activeLink.name} className="w-[400px] my-3">
                            <TabsList>
                                {
                                    navLinks.map((link, index) => (
                                        <TabsTrigger key={index} value={link.name} onClick={() => router.push(link.href)}>{link.name}</TabsTrigger>
                                    ))
                                }
                            </TabsList>
                        </Tabs>
                    )
                }

            </div>

            {children}
        </div>
    )
}

export default Layout