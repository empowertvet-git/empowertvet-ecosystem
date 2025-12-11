import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, Star } from 'lucide-react'
import { db } from '@/lib/db'

export default async function MarketplacePage() {
    const products = await db.product.findMany({
        include: {
            seller: true
        }
    })

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto flex h-20 items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="EmpowerTVET"
                            width={300}
                            height={90}
                            className="h-24 w-auto"
                            priority
                        />
                        <span className="text-xl font-medium text-muted-foreground">| Marketplace</span>
                    </Link>

                    <div className="hidden max-w-md flex-1 px-8 md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Search products & services..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="hidden md:flex">Become a Seller</Button>
                        <Button size="icon" variant="outline" className="relative">
                            <ShoppingCart className="size-5" />
                            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">0</span>
                        </Button>
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-muted/30 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Support Student Innovation</h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                        Discover high-quality products and services created by EmpowerTVET students.
                        Every purchase directly supports their education and future careers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary" className="cursor-pointer px-4 py-2 text-sm">All</Badge>
                        <Badge variant="outline" className="cursor-pointer px-4 py-2 text-sm hover:bg-secondary">Furniture</Badge>
                        <Badge variant="outline" className="cursor-pointer px-4 py-2 text-sm hover:bg-secondary">Fashion</Badge>
                        <Badge variant="outline" className="cursor-pointer px-4 py-2 text-sm hover:bg-secondary">Food</Badge>
                        <Badge variant="outline" className="cursor-pointer px-4 py-2 text-sm hover:bg-secondary">Services</Badge>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <Card key={product.id} className="overflow-hidden">
                                <div className="aspect-square w-full overflow-hidden bg-muted">
                                    <img
                                        src={product.image || '/placeholder.svg'}
                                        alt={product.title}
                                        className="size-full object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <Badge variant="outline">{product.category}</Badge>
                                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                                            <Star className="size-3 fill-current" />
                                            {product.rating}
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg">{product.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">by {product.seller.name}</p>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t p-4">
                                    <span className="text-lg font-bold">GMD {product.price}</span>
                                    <Button size="sm">Add to Cart</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-muted/30 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-4">
                            <Image
                                src="/logo.png"
                                alt="EmpowerTVET"
                                width={500}
                                height={150}
                                className="h-24 w-auto"
                            />
                            <p className="text-sm text-muted-foreground">&copy; 2025 EmpowerTVET Marketplace.</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <Link href="/" className="hover:text-primary">Home</Link>
                            <Link href="/marketplace/terms" className="hover:text-primary">Terms</Link>
                            <Link href="/marketplace/sell" className="hover:text-primary">Sell with Us</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
