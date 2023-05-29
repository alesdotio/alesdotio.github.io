module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/**/*.(jpg|png|gif)");
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
