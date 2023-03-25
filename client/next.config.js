/** @type {import('next').NextConfig} */
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}
// Deployment issue on Vercel was fixed with:
// https://github.com/ivansevillaa/use-next-blurhash/issues/4
// https://github.com/Automattic/node-canvas/issues/1779
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
