import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";
import { requestWithAuthRefresh } from "@/app/api/_utils/requestWithAuthRefresh";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await requestWithAuthRefresh((cookieHeader) =>
      api.post("/recipes", formData, {
        headers: {
          Cookie: cookieHeader,
        },
      }),
    );

    return NextResponse.json(response.data, {
      status: response.status,
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
