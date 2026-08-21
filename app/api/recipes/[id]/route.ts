import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
    
        const res = await api.delete(`/recipes/${id}`,{
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
        return NextResponse.json(res.data, { status: res.status });
      } catch (error) {
        if (isAxiosError(error)) {
          logErrorResponse(error.response?.data);
          return NextResponse.json(
            { error: error.message, response: error.response?.data },
            { status: error.response?.status ?? 500 }
          );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
    const formData = await request.formData();
        const res = await api.patch(`/recipes/${id}`, formData, {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
        return NextResponse.json(res.data, { status: res.status });
      } catch (error) {
        if (isAxiosError(error)) {
          logErrorResponse(error.response?.data);
          return NextResponse.json(
            { error: error.message, response: error.response?.data },
            { status: error.response?.status ?? 500 }
          );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}