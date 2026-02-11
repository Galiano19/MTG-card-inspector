"use client";

import { useSet } from "@/hooks/useSets";
import { useParams } from "next/navigation";

export default function setPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data } = useSet(slug);

  console.log(data);
  return <div>set</div>;
}
