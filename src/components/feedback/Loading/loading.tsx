import type { TLoading } from "@customTypes/shared"

type LoadingProps ={
    loading: TLoading;
    error: string | null;
    children: React.ReactNode; // to make the elements take children without adding fragment "<> </>"
}

export default function loading({loading, error,children}: LoadingProps) {
    if(status === "pending"){
        return <p>loading please wait</p>
    }
    if(loading === "failed"){
        return <p>{error}</p>
    }
  return (
    <>
     {children}
    </>
  )
}
