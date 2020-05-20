const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

  // 11ty uses folder DIST as it's output folder
  // encore reads from DIST and outputs to BUILD
  
  var payload = {
    pathPrefix: process.env.ELEVENTY_ENV === "development" ? "/" : "/moab",
    dir: {
      input: "_site",
      output: "dist"
    }
  };

  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("build");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addCollection("nav", function(collection) {
    return collection.getFilteredByTag("menu").sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addPairedNunjucksShortcode("expanding_content_block", function(content, data) {
    return `
      <div class="section tutorial-item" id="${data.trigger_url}">
        <div class="left">
          <span class="expand-button"></span>
        </div>
        <div class="right">
          <div class="subheading">${data.title}</div>
          <div class="summary">${data.summary}</div>
          <div class="content">
            <div class="details">
              ${content}
            </div>
          </div>
        </div>
      </div>`;
  });

  eleventyConfig.addPairedNunjucksShortcode("fuji_block", function(content, data) {
    return `
      <div class="section tutorial-item">
        <div class="left">
          <a class="external-button" target="_blank" href="${data.url}"></a>
        </div>
        <div class="right">
          <div class="subheading"><a target="_blank" href="${data.url}">${data.title}</a></div>
          <div class="summary">${content}</div>
        </div>
      </div>`;
  });

  eleventyConfig.addNunjucksShortcode("link_content_block", function(data) {
    return `
      <div class="section tutorial-item">
        <div class="left">
          <a class="external-button" target="_blank" href="${data.url}"></a>
        </div>
        <div class="right">
          <div class="subheading">${data.title}</div>
          <div class="summary">${data.summary}</div>
        </div>
      </div>`;
  });

  eleventyConfig.addNunjucksShortcode("download_content_block", function(data) {
    return `
      <div class="section download">
        <a class="download-button" href="${data.url}"></a>
        <div class="content">
          <div class="subheading3">${data.title}</div>
          <span>${data.summary}</span>
        </div>
      </div>`;
  });

  eleventyConfig.addPairedNunjucksShortcode("video_content_wrapper", function (content) {
    return `
      <div class="tiles">
        ${content}
      </div>
    `
  })

  eleventyConfig.addNunjucksShortcode("video_content_block", function(data) {
    var anchorBody = '';
    if (data.image) {
      anchorBody = `<span></span><img src="${data.image}" alt="${data.alt}"/>`;
    } else {
      anchorBody = '<span class="no-image"></span>';
    }

    return `
      <a class="tile" target="_blank" href="${data.link}">
        <div class="tile-top">
          ${anchorBody}
        </div>
        <div class="tile-bottom">
          <span class="subheading3">${data.title}</span>
        </div>
      </a>`;
  });

  return payload;
};
