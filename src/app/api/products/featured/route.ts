import { NextResponse } from "next/server"

import data from '../data.json'

export async function GET() {
    const featuredProducts = data.products.filter((product) => product.featured)

    return NextResponse.json({
        data: featuredProducts
    })

}