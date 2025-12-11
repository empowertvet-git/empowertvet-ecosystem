import { db } from '@/lib/db'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

export default async function AdminCoursesPage() {
    const courses = await db.course.findMany({
        orderBy: { title: 'asc' },
        include: {
            _count: {
                select: { enrollments: true }
            }
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Course Management</h1>
                <Button>Add Course</Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>{course.category}</TableCell>
                                <TableCell>GMD {course.price}</TableCell>
                                <TableCell>
                                    <Badge variant={course.published ? 'default' : 'secondary'}>
                                        {course.published ? 'Published' : 'Draft'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{course._count.enrollments}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="size-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
