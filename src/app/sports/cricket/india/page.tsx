import { redirect } from "next/navigation";

/**
 * Legacy /sports/cricket/india → the generic global country page. India is now
 * one of many countries served by the same reusable /sports/cricket/team/:id
 * page — no dedicated implementation, no special-casing.
 */
export default function IndiaRoute() {
  redirect("/sports/cricket/team/india");
}
