import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { AxiosResponse, isAxiosError } from "axios";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type AuthenticatedRequest<T> = (
  cookieHeader: string,
) => Promise<AxiosResponse<T>>;

async function refreshAuthCookies(cookieStore: CookieStore) {
  const refreshResponse = await api.post("/auth/refresh", null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const setCookie = refreshResponse.headers["set-cookie"];

  if (!setCookie) {
    throw new Error("Refresh did not return auth cookies");
  }

  const cookieArray = Array.isArray(setCookie)
    ? setCookie
    : [setCookie];

  const isProduction = process.env.NODE_ENV === "production";

  for (const cookieString of cookieArray) {
    const parsedCookie = parse(cookieString);

    const options = {
      expires: parsedCookie.Expires
        ? new Date(parsedCookie.Expires)
        : undefined,
      path: parsedCookie.Path ?? "/",
      maxAge: parsedCookie["Max-Age"]
        ? Number(parsedCookie["Max-Age"])
        : undefined,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? ("none" as const)
        : ("lax" as const),
    };

    if (parsedCookie.accessToken) {
      cookieStore.set(
        "accessToken",
        parsedCookie.accessToken,
        options,
      );
    }

    if (parsedCookie.refreshToken) {
      cookieStore.set(
        "refreshToken",
        parsedCookie.refreshToken,
        options,
      );
    }

    if (parsedCookie.sessionId) {
      cookieStore.set(
        "sessionId",
        parsedCookie.sessionId,
        options,
      );
    }
  }
}

export async function requestWithAuthRefresh<T>(
  request: AuthenticatedRequest<T>,
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Якщо access token уже відсутній, оновлюємо його
  // до надсилання основного запиту.
  if (!accessToken && refreshToken) {
    await refreshAuthCookies(cookieStore);
  }

  const sendRequest = () => request(cookieStore.toString());

  try {
    return await sendRequest();
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      throw error;
    }

    const currentRefreshToken =
      cookieStore.get("refreshToken")?.value;

    if (!currentRefreshToken) {
      throw error;
    }

    await refreshAuthCookies(cookieStore);

    return await sendRequest();
  }
}