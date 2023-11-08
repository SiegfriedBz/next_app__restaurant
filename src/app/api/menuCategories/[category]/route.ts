import { prisma } from '@/utils/prismaClient'

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params

  try {
    const menuCategoryWithItemsPrisma = await prisma.menuCategory.findMany({
      where: { slug: category },
      include: {
        menuItems: true,
      },
    })

    const menuCategoryItemsPrisma = menuCategoryWithItemsPrisma?.[0].menuItems

    // not serializable prisma dates
    const menuCategoryItems = JSON.parse(
      JSON.stringify(menuCategoryItemsPrisma)
    )

    return Response.json({ menuCategoryItems }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
