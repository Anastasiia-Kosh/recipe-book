import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = [
  "/profile",
  "/recipes/create",
  "/favorites",
  "/my-recipes",
];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Окрема перевірка для маршруту редагування рецепту, оскільки він не входить до списку приватних маршрутів, але вимагає авторизації.
  // ^/recipes/ → починається з /recipes/
  // [^/]+      → тут має бути будь-який id
  // /edit$     → закінчується на /edit
  const isEditRecipeRoute = /^\/recipes\/[^/]+\/edit$/.test(pathname);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute =
    privateRoutes.some((route) => pathname.startsWith(route)) ||
    isEditRecipeRoute;

  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      try {
        const data = await checkSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };
            if (parsed.accessToken)
              cookieStore.set("accessToken", parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set("refreshToken", parsed.refreshToken, options);
            if (parsed.sessionId)
              cookieStore.set("sessionId", parsed.sessionId, options);
          }
          // Якщо сесія все ще активна:
          // для публічного маршруту — виконуємо редірект на головну.
          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
          // для приватного маршруту — дозволяємо доступ
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      } catch {
        const response = isPublicRoute
          ? NextResponse.next()
          : NextResponse.redirect(new URL("/sign-in", request.url));

        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        response.cookies.delete("sessionId");

        return response;
      }
    }
    // Якщо refreshToken або сесії немає:
    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }
    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  // Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/profile/:path*",
    "/recipes/create/:path*",
    "/favorites/:path*",
    "/recipes/:id/edit",
    "/my-recipes/:path*",
  ],
};
