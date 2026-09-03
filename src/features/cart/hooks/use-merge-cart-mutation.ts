"use client";

import { useMutation } from "@tanstack/react-query";
import { mergeCartOnLogin } from "../api/merge-cart";

export function useMergeCartMutation() {
  return useMutation({ mutationFn: mergeCartOnLogin });
}
