export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";
import { requestWithAuthRefresh } from "../../_utils/requestWithAuthRefresh";

export async function GET() {
  try {
    const res = await requestWithAuthRefresh((cookieHeader) =>
      api.get("/users/me", {
        headers: {
          Cookie: cookieHeader,
        },
      }),
    );
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const res = await requestWithAuthRefresh((cookieHeader) =>
      api.patch("/users/me", body, {
        headers: {
          Cookie: cookieHeader,
        },
      }),
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
