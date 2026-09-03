import type { CartItem } from "../types";

/**
 * TODO: order-hub-application has no cart endpoint yet (confirmed while
 * planning this feature — cart state today only exists client-side). Once a
 * real endpoint exists (e.g. POST /api/v1/cart/merge via api-gateway), point
 * this at `/api/gateway/cart/merge`. Until then this is a stub: called after
 * login so the wiring/UI flow is proven end-to-end, but it no-ops instead of
 * hitting a route that doesn't exist.
 */
export async function mergeCartOnLogin(items: CartItem[]): Promise<void> {
  if (items.length === 0) return;

  console.info("[cart] merge-on-login stub — would sync", items.length, "item(s)");

  // Real call, once the backend supports it. Only productId/quantity travel
  // — never priceCents/name, which are client-side display data (the doc's
  // rule: the backend recalculates, the frontend never dictates price). See
  // the same stripping in features/orders/actions.ts.
  // await http<void>("/api/gateway/cart/merge", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
  //   }),
  // });
}
