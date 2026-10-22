import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // BuildWithin superadmin case: old slug -> new slug, on every route
      // that serves project pages (portfolio, projects, marketplace...).
      {
        source: "/:path*/buildwithin-design-system",
        destination: "/:path*/buildwithin-superadmin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
