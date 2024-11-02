import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");

/** @type {import('esbuild').BuildOptions} */
const commonConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "neutral",
  minify: true,
  sourcemap: false,
  logLevel: "info",
};

async function build() {
  try {
    await esbuild.build({
      ...commonConfig,
      format: "esm",
      outfile: "dist/index.js",
    });

    await esbuild.build({
      ...commonConfig,
      format: "cjs",
      outfile: "dist/index.cjs",
    });

    if (watch) {
      console.log("Watching for changes...");
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

if (watch) {
  const ctx = await esbuild.context(commonConfig);
  await ctx.watch();
} else {
  build();
}
