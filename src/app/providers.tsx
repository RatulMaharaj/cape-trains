"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import posthog from "posthog-js";
// import { PostHogProvider } from "posthog-js/react";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(new QueryClient());

  //   if (typeof window !== "undefined") {
  //     posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
  //       api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  //     });
  //   }

  return (
    <>
      {/* <PostHogProvider client={posthog}> */}
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          closeOnClick={true}
          autoClose={5000}
          closeButton={false}
          draggable={true}
          toastClassName={() =>
            `bg-notification text-notification-content mb-2 relative flex flex-row p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer`
          }
          bodyClassName={() => `flex p-4 flex-row justify-center rounded-md`}
        />
      </QueryClientProvider>
      {/* </PostHogProvider> */}
    </>
  );
}
