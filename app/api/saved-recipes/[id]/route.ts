import { NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { requestWithAuthRefresh } from "@/app/api/_utils/requestWithAuthRefresh";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const res = await requestWithAuthRefresh((cookieHeader) =>
      api.post(
        `/saved-recipes/${id}`,
        {},
        {
          headers: {
            Cookie: cookieHeader,
          },
        },
      ),
    );

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const res = await requestWithAuthRefresh((cookieHeader) =>
      api.delete(`/saved-recipes/${id}`, {
        headers: {
          Cookie: cookieHeader,
        },
      }),
    );

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
